import { GraphQLResolveInfo, SelectionNode } from 'graphql';
import { chain, zipObject } from 'lodash';
import { MongoProjection } from 'mongest-service';

export const getProjectionFromGraphQlInfo = (
  info: GraphQLResolveInfo,
  virtualFieldDeps: Record<string, string[]>,
  discriminatorRequiredFields: string[],
): MongoProjection<unknown> => {
  // console.log("info", info);
  const fieldNodes = info.fieldNodes;
  if (fieldNodes.length !== 1) {
    // eslint-disable-next-line no-console
    console.warn(fieldNodes);
    throw Error(`Unexpected: fieldNodes.length === ${fieldNodes.length}`);
  }
  const selections = fieldNodes[0]!.selectionSet?.selections;
  // console.log('selections', selections);
  if (!selections) {
    // eslint-disable-next-line no-console
    console.warn(fieldNodes);
    throw Error(`Unexpected: no selections in selectionSet`);
  }
  const allFields = resolveSelectionsFields(selections, info.fragments);
  // console.log('allFields', allFields);
  const allRealFields = chain(allFields)
    .map((fieldName) => virtualFieldDeps[fieldName] || fieldName)
    .flatten()
    .push(...discriminatorRequiredFields)
    .uniq()
    .value();
  // console.log('allRealFields', allRealFields);
  return {
    _id: false,
    ...zipObject(
      allRealFields,
      allRealFields.map(() => true),
    ),
  };
};

const resolveSelectionsFields = (
  selections: readonly SelectionNode[],
  fragmentsByName: GraphQLResolveInfo['fragments'],
): string[] => {
  return chain(selections)
    .map((selection) => {
      switch (selection.kind) {
        case 'Field': {
          const fieldName = selection.name.value;
          return fieldName;
        }
        case 'FragmentSpread': {
          const fragmentName = selection.name.value;
          const fragment = fragmentsByName[fragmentName];
          if (!fragment) {
            throw Error(`Could not resolve fragment ${fragmentName}`);
          }
          return resolveSelectionsFields(fragment.selectionSet.selections, fragmentsByName);
        }
        case 'InlineFragment': {
          return resolveSelectionsFields(selection.selectionSet.selections, fragmentsByName);
        }
        default:
          throw Error(`Unsupported selection.kind ${(selection as { kind: string }).kind}`);
      }
    })
    .flatten()
    .uniq()
    .value();
};
