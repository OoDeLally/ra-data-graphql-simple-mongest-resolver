export const INTROSPECTION_QUERY = `
  query IntrospectionQuery {
  __schema {
    queryType {
      name
    }
    mutationType {
      name
    }
    subscriptionType {
      name
    }
    types {
      ...FullType
    }
  }
}

fragment FullType on __Type {
  kind
  name
  fields(includeDeprecated: true) {
    name
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
  }
  possibleTypes {
    ...TypeRef
  }
}

fragment InputValue on __InputValue {
  name
  type {
    ...TypeRef
  }
  defaultValue
}

fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}

`;

export const INTROSPECTION_QUERY_EXPECTED = {
  data: {
    __schema: {
      queryType: {
        name: 'Query',
      },
      mutationType: {
        name: 'Mutation',
      },
      subscriptionType: null,
      types: [
        {
          kind: 'SCALAR',
          name: 'Boolean',
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: null,
          possibleTypes: null,
        },
        {
          kind: 'INTERFACE',
          name: 'Cat',
          fields: [
            {
              name: 'age',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'Int',
                  ofType: null,
                },
              },
            },
            {
              name: 'color',
              args: [],
              type: {
                kind: 'SCALAR',
                name: 'String',
                ofType: null,
              },
            },
            {
              name: 'fancyName',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'String',
                  ofType: null,
                },
              },
            },
            {
              name: 'id',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'ID',
                  ofType: null,
                },
              },
            },
            {
              name: 'kind',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'ENUM',
                  name: 'CatKind',
                  ofType: null,
                },
              },
            },
            {
              name: 'name',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'String',
                  ofType: null,
                },
              },
            },
            {
              name: 'stripeColor',
              args: [],
              type: {
                kind: 'SCALAR',
                name: 'String',
                ofType: null,
              },
            },
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: [
            {
              kind: 'OBJECT',
              name: 'HomeCat',
              ofType: null,
            },
            {
              kind: 'OBJECT',
              name: 'StrayCat',
              ofType: null,
            },
          ],
        },
        {
          kind: 'ENUM',
          name: 'CatKind',
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: [
            {
              name: 'HomeCat',
            },
            {
              name: 'StrayCat',
            },
          ],
          possibleTypes: null,
        },
        {
          kind: 'SCALAR',
          name: 'Float',
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: null,
          possibleTypes: null,
        },
        {
          kind: 'OBJECT',
          name: 'HomeCat',
          fields: [
            {
              name: 'age',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'Int',
                  ofType: null,
                },
              },
            },
            {
              name: 'color',
              args: [],
              type: {
                kind: 'SCALAR',
                name: 'String',
                ofType: null,
              },
            },
            {
              name: 'fancyName',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'String',
                  ofType: null,
                },
              },
            },
            {
              name: 'humanSlave',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'String',
                  ofType: null,
                },
              },
            },
            {
              name: 'id',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'ID',
                  ofType: null,
                },
              },
            },
            {
              name: 'kind',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'ENUM',
                  name: 'CatKind',
                  ofType: null,
                },
              },
            },
            {
              name: 'name',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'String',
                  ofType: null,
                },
              },
            },
            {
              name: 'stripeColor',
              args: [],
              type: {
                kind: 'SCALAR',
                name: 'String',
                ofType: null,
              },
            },
          ],
          inputFields: null,
          interfaces: [
            {
              kind: 'INTERFACE',
              name: 'Cat',
              ofType: null,
            },
          ],
          enumValues: null,
          possibleTypes: null,
        },
        {
          kind: 'SCALAR',
          name: 'ID',
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: null,
          possibleTypes: null,
        },
        {
          kind: 'SCALAR',
          name: 'Int',
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: null,
          possibleTypes: null,
        },
        {
          kind: 'OBJECT',
          name: 'ListMetadata',
          fields: [
            {
              name: 'count',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'Int',
                  ofType: null,
                },
              },
            },
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null,
        },
        {
          kind: 'OBJECT',
          name: 'Mutation',
          fields: [
            {
              name: 'createCat',
              args: [
                {
                  name: 'age',
                  type: {
                    kind: 'SCALAR',
                    name: 'Int',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'color',
                  type: {
                    kind: 'SCALAR',
                    name: 'String',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'kind',
                  type: {
                    kind: 'ENUM',
                    name: 'CatKind',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'name',
                  type: {
                    kind: 'SCALAR',
                    name: 'String',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'stripeColor',
                  type: {
                    kind: 'SCALAR',
                    name: 'String',
                    ofType: null,
                  },
                  defaultValue: null,
                },
              ],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'INTERFACE',
                  name: 'Cat',
                  ofType: null,
                },
              },
            },
            {
              name: 'createHomeCat',
              args: [
                {
                  name: 'age',
                  type: {
                    kind: 'SCALAR',
                    name: 'Int',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'color',
                  type: {
                    kind: 'SCALAR',
                    name: 'String',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'humanSlave',
                  type: {
                    kind: 'SCALAR',
                    name: 'String',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'kind',
                  type: {
                    kind: 'ENUM',
                    name: 'CatKind',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'name',
                  type: {
                    kind: 'SCALAR',
                    name: 'String',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'stripeColor',
                  type: {
                    kind: 'SCALAR',
                    name: 'String',
                    ofType: null,
                  },
                  defaultValue: null,
                },
              ],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'OBJECT',
                  name: 'HomeCat',
                  ofType: null,
                },
              },
            },
            {
              name: 'createStrayCat',
              args: [
                {
                  name: 'age',
                  type: {
                    kind: 'SCALAR',
                    name: 'Int',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'color',
                  type: {
                    kind: 'SCALAR',
                    name: 'String',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'kind',
                  type: {
                    kind: 'ENUM',
                    name: 'CatKind',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'name',
                  type: {
                    kind: 'SCALAR',
                    name: 'String',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'stripeColor',
                  type: {
                    kind: 'SCALAR',
                    name: 'String',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'territorySize',
                  type: {
                    kind: 'SCALAR',
                    name: 'Float',
                    ofType: null,
                  },
                  defaultValue: null,
                },
              ],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'OBJECT',
                  name: 'StrayCat',
                  ofType: null,
                },
              },
            },
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null,
        },
        {
          kind: 'OBJECT',
          name: 'Query',
          fields: [
            {
              name: 'Cat',
              args: [
                {
                  name: 'id',
                  type: {
                    kind: 'NON_NULL',
                    name: null,
                    ofType: {
                      kind: 'SCALAR',
                      name: 'ID',
                      ofType: null,
                    },
                  },
                  defaultValue: null,
                },
              ],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'INTERFACE',
                  name: 'Cat',
                  ofType: null,
                },
              },
            },
            {
              name: 'HomeCat',
              args: [
                {
                  name: 'id',
                  type: {
                    kind: 'NON_NULL',
                    name: null,
                    ofType: {
                      kind: 'SCALAR',
                      name: 'ID',
                      ofType: null,
                    },
                  },
                  defaultValue: null,
                },
              ],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'OBJECT',
                  name: 'HomeCat',
                  ofType: null,
                },
              },
            },
            {
              name: 'StrayCat',
              args: [
                {
                  name: 'id',
                  type: {
                    kind: 'NON_NULL',
                    name: null,
                    ofType: {
                      kind: 'SCALAR',
                      name: 'ID',
                      ofType: null,
                    },
                  },
                  defaultValue: null,
                },
              ],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'OBJECT',
                  name: 'StrayCat',
                  ofType: null,
                },
              },
            },
            {
              name: '_allCatsMeta',
              args: [
                {
                  name: 'page',
                  type: {
                    kind: 'SCALAR',
                    name: 'Int',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'perPage',
                  type: {
                    kind: 'SCALAR',
                    name: 'Int',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'sortField',
                  type: {
                    kind: 'SCALAR',
                    name: 'String',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'sortOrder',
                  type: {
                    kind: 'SCALAR',
                    name: 'String',
                    ofType: null,
                  },
                  defaultValue: null,
                },
              ],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'OBJECT',
                  name: 'ListMetadata',
                  ofType: null,
                },
              },
            },
            {
              name: '_allHomeCatsMeta',
              args: [
                {
                  name: 'page',
                  type: {
                    kind: 'SCALAR',
                    name: 'Int',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'perPage',
                  type: {
                    kind: 'SCALAR',
                    name: 'Int',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'sortField',
                  type: {
                    kind: 'SCALAR',
                    name: 'String',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'sortOrder',
                  type: {
                    kind: 'SCALAR',
                    name: 'String',
                    ofType: null,
                  },
                  defaultValue: null,
                },
              ],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'OBJECT',
                  name: 'ListMetadata',
                  ofType: null,
                },
              },
            },
            {
              name: '_allStrayCatsMeta',
              args: [
                {
                  name: 'page',
                  type: {
                    kind: 'SCALAR',
                    name: 'Int',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'perPage',
                  type: {
                    kind: 'SCALAR',
                    name: 'Int',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'sortField',
                  type: {
                    kind: 'SCALAR',
                    name: 'String',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'sortOrder',
                  type: {
                    kind: 'SCALAR',
                    name: 'String',
                    ofType: null,
                  },
                  defaultValue: null,
                },
              ],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'OBJECT',
                  name: 'ListMetadata',
                  ofType: null,
                },
              },
            },
            {
              name: 'allCats',
              args: [
                {
                  name: 'page',
                  type: {
                    kind: 'SCALAR',
                    name: 'Int',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'perPage',
                  type: {
                    kind: 'SCALAR',
                    name: 'Int',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'sortField',
                  type: {
                    kind: 'SCALAR',
                    name: 'String',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'sortOrder',
                  type: {
                    kind: 'SCALAR',
                    name: 'String',
                    ofType: null,
                  },
                  defaultValue: null,
                },
              ],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'LIST',
                  name: null,
                  ofType: {
                    kind: 'NON_NULL',
                    name: null,
                    ofType: {
                      kind: 'INTERFACE',
                      name: 'Cat',
                      ofType: null,
                    },
                  },
                },
              },
            },
            {
              name: 'allHomeCats',
              args: [
                {
                  name: 'page',
                  type: {
                    kind: 'SCALAR',
                    name: 'Int',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'perPage',
                  type: {
                    kind: 'SCALAR',
                    name: 'Int',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'sortField',
                  type: {
                    kind: 'SCALAR',
                    name: 'String',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'sortOrder',
                  type: {
                    kind: 'SCALAR',
                    name: 'String',
                    ofType: null,
                  },
                  defaultValue: null,
                },
              ],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'LIST',
                  name: null,
                  ofType: {
                    kind: 'NON_NULL',
                    name: null,
                    ofType: {
                      kind: 'OBJECT',
                      name: 'HomeCat',
                      ofType: null,
                    },
                  },
                },
              },
            },
            {
              name: 'allStrayCats',
              args: [
                {
                  name: 'page',
                  type: {
                    kind: 'SCALAR',
                    name: 'Int',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'perPage',
                  type: {
                    kind: 'SCALAR',
                    name: 'Int',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'sortField',
                  type: {
                    kind: 'SCALAR',
                    name: 'String',
                    ofType: null,
                  },
                  defaultValue: null,
                },
                {
                  name: 'sortOrder',
                  type: {
                    kind: 'SCALAR',
                    name: 'String',
                    ofType: null,
                  },
                  defaultValue: null,
                },
              ],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'LIST',
                  name: null,
                  ofType: {
                    kind: 'NON_NULL',
                    name: null,
                    ofType: {
                      kind: 'OBJECT',
                      name: 'StrayCat',
                      ofType: null,
                    },
                  },
                },
              },
            },
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null,
        },
        {
          kind: 'OBJECT',
          name: 'StrayCat',
          fields: [
            {
              name: 'age',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'Int',
                  ofType: null,
                },
              },
            },
            {
              name: 'color',
              args: [],
              type: {
                kind: 'SCALAR',
                name: 'String',
                ofType: null,
              },
            },
            {
              name: 'fancyName',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'String',
                  ofType: null,
                },
              },
            },
            {
              name: 'id',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'ID',
                  ofType: null,
                },
              },
            },
            {
              name: 'kind',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'ENUM',
                  name: 'CatKind',
                  ofType: null,
                },
              },
            },
            {
              name: 'name',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'String',
                  ofType: null,
                },
              },
            },
            {
              name: 'stripeColor',
              args: [],
              type: {
                kind: 'SCALAR',
                name: 'String',
                ofType: null,
              },
            },
            {
              name: 'territorySize',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'Float',
                  ofType: null,
                },
              },
            },
          ],
          inputFields: null,
          interfaces: [
            {
              kind: 'INTERFACE',
              name: 'Cat',
              ofType: null,
            },
          ],
          enumValues: null,
          possibleTypes: null,
        },
        {
          kind: 'SCALAR',
          name: 'String',
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: null,
          possibleTypes: null,
        },
        {
          kind: 'OBJECT',
          name: '__Directive',
          fields: [
            {
              name: 'name',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'String',
                  ofType: null,
                },
              },
            },
            {
              name: 'description',
              args: [],
              type: {
                kind: 'SCALAR',
                name: 'String',
                ofType: null,
              },
            },
            {
              name: 'isRepeatable',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'Boolean',
                  ofType: null,
                },
              },
            },
            {
              name: 'locations',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'LIST',
                  name: null,
                  ofType: {
                    kind: 'NON_NULL',
                    name: null,
                    ofType: {
                      kind: 'ENUM',
                      name: '__DirectiveLocation',
                      ofType: null,
                    },
                  },
                },
              },
            },
            {
              name: 'args',
              args: [
                {
                  name: 'includeDeprecated',
                  type: {
                    kind: 'SCALAR',
                    name: 'Boolean',
                    ofType: null,
                  },
                  defaultValue: 'false',
                },
              ],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'LIST',
                  name: null,
                  ofType: {
                    kind: 'NON_NULL',
                    name: null,
                    ofType: {
                      kind: 'OBJECT',
                      name: '__InputValue',
                      ofType: null,
                    },
                  },
                },
              },
            },
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null,
        },
        {
          kind: 'ENUM',
          name: '__DirectiveLocation',
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: [
            {
              name: 'QUERY',
            },
            {
              name: 'MUTATION',
            },
            {
              name: 'SUBSCRIPTION',
            },
            {
              name: 'FIELD',
            },
            {
              name: 'FRAGMENT_DEFINITION',
            },
            {
              name: 'FRAGMENT_SPREAD',
            },
            {
              name: 'INLINE_FRAGMENT',
            },
            {
              name: 'VARIABLE_DEFINITION',
            },
            {
              name: 'SCHEMA',
            },
            {
              name: 'SCALAR',
            },
            {
              name: 'OBJECT',
            },
            {
              name: 'FIELD_DEFINITION',
            },
            {
              name: 'ARGUMENT_DEFINITION',
            },
            {
              name: 'INTERFACE',
            },
            {
              name: 'UNION',
            },
            {
              name: 'ENUM',
            },
            {
              name: 'ENUM_VALUE',
            },
            {
              name: 'INPUT_OBJECT',
            },
            {
              name: 'INPUT_FIELD_DEFINITION',
            },
          ],
          possibleTypes: null,
        },
        {
          kind: 'OBJECT',
          name: '__EnumValue',
          fields: [
            {
              name: 'name',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'String',
                  ofType: null,
                },
              },
            },
            {
              name: 'description',
              args: [],
              type: {
                kind: 'SCALAR',
                name: 'String',
                ofType: null,
              },
            },
            {
              name: 'isDeprecated',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'Boolean',
                  ofType: null,
                },
              },
            },
            {
              name: 'deprecationReason',
              args: [],
              type: {
                kind: 'SCALAR',
                name: 'String',
                ofType: null,
              },
            },
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null,
        },
        {
          kind: 'OBJECT',
          name: '__Field',
          fields: [
            {
              name: 'name',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'String',
                  ofType: null,
                },
              },
            },
            {
              name: 'description',
              args: [],
              type: {
                kind: 'SCALAR',
                name: 'String',
                ofType: null,
              },
            },
            {
              name: 'args',
              args: [
                {
                  name: 'includeDeprecated',
                  type: {
                    kind: 'SCALAR',
                    name: 'Boolean',
                    ofType: null,
                  },
                  defaultValue: 'false',
                },
              ],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'LIST',
                  name: null,
                  ofType: {
                    kind: 'NON_NULL',
                    name: null,
                    ofType: {
                      kind: 'OBJECT',
                      name: '__InputValue',
                      ofType: null,
                    },
                  },
                },
              },
            },
            {
              name: 'type',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'OBJECT',
                  name: '__Type',
                  ofType: null,
                },
              },
            },
            {
              name: 'isDeprecated',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'Boolean',
                  ofType: null,
                },
              },
            },
            {
              name: 'deprecationReason',
              args: [],
              type: {
                kind: 'SCALAR',
                name: 'String',
                ofType: null,
              },
            },
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null,
        },
        {
          kind: 'OBJECT',
          name: '__InputValue',
          fields: [
            {
              name: 'name',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'String',
                  ofType: null,
                },
              },
            },
            {
              name: 'description',
              args: [],
              type: {
                kind: 'SCALAR',
                name: 'String',
                ofType: null,
              },
            },
            {
              name: 'type',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'OBJECT',
                  name: '__Type',
                  ofType: null,
                },
              },
            },
            {
              name: 'defaultValue',
              args: [],
              type: {
                kind: 'SCALAR',
                name: 'String',
                ofType: null,
              },
            },
            {
              name: 'isDeprecated',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'Boolean',
                  ofType: null,
                },
              },
            },
            {
              name: 'deprecationReason',
              args: [],
              type: {
                kind: 'SCALAR',
                name: 'String',
                ofType: null,
              },
            },
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null,
        },
        {
          kind: 'OBJECT',
          name: '__Schema',
          fields: [
            {
              name: 'description',
              args: [],
              type: {
                kind: 'SCALAR',
                name: 'String',
                ofType: null,
              },
            },
            {
              name: 'types',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'LIST',
                  name: null,
                  ofType: {
                    kind: 'NON_NULL',
                    name: null,
                    ofType: {
                      kind: 'OBJECT',
                      name: '__Type',
                      ofType: null,
                    },
                  },
                },
              },
            },
            {
              name: 'queryType',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'OBJECT',
                  name: '__Type',
                  ofType: null,
                },
              },
            },
            {
              name: 'mutationType',
              args: [],
              type: {
                kind: 'OBJECT',
                name: '__Type',
                ofType: null,
              },
            },
            {
              name: 'subscriptionType',
              args: [],
              type: {
                kind: 'OBJECT',
                name: '__Type',
                ofType: null,
              },
            },
            {
              name: 'directives',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'LIST',
                  name: null,
                  ofType: {
                    kind: 'NON_NULL',
                    name: null,
                    ofType: {
                      kind: 'OBJECT',
                      name: '__Directive',
                      ofType: null,
                    },
                  },
                },
              },
            },
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null,
        },
        {
          kind: 'OBJECT',
          name: '__Type',
          fields: [
            {
              name: 'kind',
              args: [],
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'ENUM',
                  name: '__TypeKind',
                  ofType: null,
                },
              },
            },
            {
              name: 'name',
              args: [],
              type: {
                kind: 'SCALAR',
                name: 'String',
                ofType: null,
              },
            },
            {
              name: 'description',
              args: [],
              type: {
                kind: 'SCALAR',
                name: 'String',
                ofType: null,
              },
            },
            {
              name: 'specifiedByUrl',
              args: [],
              type: {
                kind: 'SCALAR',
                name: 'String',
                ofType: null,
              },
            },
            {
              name: 'fields',
              args: [
                {
                  name: 'includeDeprecated',
                  type: {
                    kind: 'SCALAR',
                    name: 'Boolean',
                    ofType: null,
                  },
                  defaultValue: 'false',
                },
              ],
              type: {
                kind: 'LIST',
                name: null,
                ofType: {
                  kind: 'NON_NULL',
                  name: null,
                  ofType: {
                    kind: 'OBJECT',
                    name: '__Field',
                    ofType: null,
                  },
                },
              },
            },
            {
              name: 'interfaces',
              args: [],
              type: {
                kind: 'LIST',
                name: null,
                ofType: {
                  kind: 'NON_NULL',
                  name: null,
                  ofType: {
                    kind: 'OBJECT',
                    name: '__Type',
                    ofType: null,
                  },
                },
              },
            },
            {
              name: 'possibleTypes',
              args: [],
              type: {
                kind: 'LIST',
                name: null,
                ofType: {
                  kind: 'NON_NULL',
                  name: null,
                  ofType: {
                    kind: 'OBJECT',
                    name: '__Type',
                    ofType: null,
                  },
                },
              },
            },
            {
              name: 'enumValues',
              args: [
                {
                  name: 'includeDeprecated',
                  type: {
                    kind: 'SCALAR',
                    name: 'Boolean',
                    ofType: null,
                  },
                  defaultValue: 'false',
                },
              ],
              type: {
                kind: 'LIST',
                name: null,
                ofType: {
                  kind: 'NON_NULL',
                  name: null,
                  ofType: {
                    kind: 'OBJECT',
                    name: '__EnumValue',
                    ofType: null,
                  },
                },
              },
            },
            {
              name: 'inputFields',
              args: [
                {
                  name: 'includeDeprecated',
                  type: {
                    kind: 'SCALAR',
                    name: 'Boolean',
                    ofType: null,
                  },
                  defaultValue: 'false',
                },
              ],
              type: {
                kind: 'LIST',
                name: null,
                ofType: {
                  kind: 'NON_NULL',
                  name: null,
                  ofType: {
                    kind: 'OBJECT',
                    name: '__InputValue',
                    ofType: null,
                  },
                },
              },
            },
            {
              name: 'ofType',
              args: [],
              type: {
                kind: 'OBJECT',
                name: '__Type',
                ofType: null,
              },
            },
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null,
        },
        {
          kind: 'ENUM',
          name: '__TypeKind',
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: [
            {
              name: 'SCALAR',
            },
            {
              name: 'OBJECT',
            },
            {
              name: 'INTERFACE',
            },
            {
              name: 'UNION',
            },
            {
              name: 'ENUM',
            },
            {
              name: 'INPUT_OBJECT',
            },
            {
              name: 'LIST',
            },
            {
              name: 'NON_NULL',
            },
          ],
          possibleTypes: null,
        },
      ],
    },
  },
};
