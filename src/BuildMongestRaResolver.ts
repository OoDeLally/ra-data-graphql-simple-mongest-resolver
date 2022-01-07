/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import {
  NestInterceptor,
  NotFoundException,
  Type,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  Args,
  ArgsType,
  Field,
  ID,
  Info,
  IntersectionType,
  Mutation,
  OmitType,
  Parent,
  PartialType,
  PickType,
  Query,
  ResolveField,
  Resolver,
  TypeMetadataStorage,
} from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { mapValues } from 'lodash';
import { MongestService } from 'mongest-service';
import { DocOrProjectedDoc } from 'mongest-service/dist/MongestService';
import { FindManyDocsPaginationArgs } from 'mongest-service/dist/pagination';
import { ObjectId } from 'mongodb';
import { FilterQuery } from 'mongoose';
import pluralize from 'pluralize';
import { EntityPayload, ItemOrArray, MongoDoc, NestGuardClassOrInstance } from 'src/types';
import { CustomFilter, FilterBuilder } from './CustomFilter';
import { DecorateIf, NoopDecorator } from './decorators';
import { getProjectionFromGraphQlInfo } from './getProjectionFromGraphQlInfo';
import { RaPaginationArgs, raPaginationArgsToPaginationArgs } from './RaPaginationArgs';
import { ListMetadata } from './ReactAdmin';

interface ArgsOptions {
  omitFields?: string[];
}

interface ResolverDefaultOptions {
  guard?: ItemOrArray<NestGuardClassOrInstance>;
  interceptor?: ItemOrArray<NestInterceptor>;
  enable?: boolean;
}

interface VirtualFieldOptions<T> {
  // Fields required to resolve the given virtual field, e.g. `_id` is usually needed to resolve `id`.
  dependsOn?: (string & keyof T)[];
}

export interface MongestRaResolverOptions<
  T = any,
  F extends CustomFilter | undefined = undefined,
  IdType = ObjectId,
> {
  filter?: F extends undefined
    ? never
    : {
        classRef: Type<F>;
        filterBuilder: FilterBuilder<MongoDoc<T, IdType>, F extends undefined ? never : F>;
      };
  virtualFields?: Record<string, VirtualFieldOptions<MongoDoc<T>>>;
  discriminatorRequiredFields?: (string & keyof MongoDoc<T>)[];
  endpoints?: {
    getOne?: ResolverDefaultOptions;
    getMany?: ResolverDefaultOptions;
    create?: ResolverDefaultOptions & {
      args?: Type<EntityPayload> | ArgsOptions;
    };
    update?: ResolverDefaultOptions & {
      args?: Type<{ id: unknown } & EntityPayload> | ArgsOptions;
    };
    delete?: ResolverDefaultOptions;
  };
}

export type GetManyArgs<
  T extends EntityPayload,
  F extends object | undefined = undefined,
> = RaPaginationArgs<T> & { filter?: F };

export function BuildGetManyArgs<
  T extends EntityPayload,
  F extends CustomFilter | undefined,
  IdType = ObjectId,
>(filter: MongestRaResolverOptions<T, F, IdType>['filter'] | undefined): Type<GetManyArgs<T, F>> {
  const FilterClassRef = filter?.classRef;

  if (FilterClassRef) {
    @ArgsType()
    abstract class FindManyArgsHost extends RaPaginationArgs<T> {
      @Field(() => FilterClassRef, {
        nullable: true,
      })
      filter?: F;
    }
    return FindManyArgsHost as any;
  } else {
    @ArgsType()
    abstract class FindManyArgsHost extends RaPaginationArgs<T> {}
    return FindManyArgsHost as any;
  }
}

function GuardFromOptions(
  guard: ItemOrArray<NestGuardClassOrInstance> | undefined,
): MethodDecorator {
  return Array.isArray(guard) ? UseGuards(...guard) : guard ? UseGuards(guard) : NoopDecorator;
}

function InterceptorFromOptions(
  interceptor: ItemOrArray<NestInterceptor> | undefined,
): MethodDecorator {
  return Array.isArray(interceptor)
    ? UseInterceptors(...interceptor)
    : interceptor
    ? UseInterceptors(interceptor)
    : NoopDecorator;
}

export function BuildMongestRaResolver<
  T extends EntityPayload,
  F extends CustomFilter | undefined,
  Service extends MongestService<T, IdType>,
  IdType = ObjectId,
>(
  entity: Type<T>,
  options: MongestRaResolverOptions<T, F, IdType> = {},
): Type<T & { service: Service }> {
  const filterBuilder = options.filter?.filterBuilder;
  const entityClassRef = entity;
  const graphqlEntityName =
    TypeMetadataStorage.getObjectTypeMetadataByTarget(entityClassRef)?.name || entityClassRef.name;
  const nameSingularForm = graphqlEntityName;
  const namePluralForm = pluralize(graphqlEntityName);
  const virtualFieldOptions: Record<string, VirtualFieldOptions<MongoDoc<T>>> = {
    ...options?.virtualFields,
    id: options?.virtualFields?.id || { dependsOn: ['_id'] }, // This resolver has a builting ResolveField for id, but it could be overriden.
  };
  const virtualFieldDeps = mapValues(virtualFieldOptions, (val) => val.dependsOn || []);
  const discriminatorRequiredFields = options.discriminatorRequiredFields || [];

  @ArgsType()
  abstract class GetManyArgs extends BuildGetManyArgs<T, F, IdType>(options.filter) {}

  const endpointOptions = options.endpoints || {};

  const DefaultCreateArgs = PartialType(
    OmitType<any, any>(
      entityClassRef,
      (typeof endpointOptions.create?.args === 'object' &&
        endpointOptions.create.args.omitFields) || ['id'],
    ),
    ArgsType,
  );

  const CreateArgsClass =
    typeof endpointOptions.create?.args === 'function'
      ? endpointOptions.create.args
      : DefaultCreateArgs;

  const DefaultUpdateDocArgs = IntersectionType(
    PartialType(
      OmitType<any, any>(
        entityClassRef,
        (typeof endpointOptions.update?.args === 'object' &&
          endpointOptions.update.args.omitFields && [
            ...endpointOptions.update.args.omitFields,
            'id',
          ]) || ['id'],
      ),
      ArgsType,
    ),
    PickType(entityClassRef, ['id'] as any, ArgsType),
    ArgsType,
  );

  const UpdateArgs =
    typeof endpointOptions.update?.args === 'function'
      ? endpointOptions.update.args
      : DefaultUpdateDocArgs;

  const raFilterToMongoFilter = async (filter?: F): Promise<FilterQuery<MongoDoc<T, IdType>>> => {
    if (filterBuilder && filter) {
      return await filterBuilder(filter);
    } else {
      return {};
    }
  };

  const GetManyArgsToFindManyOptions = async (
    getManyArgs?: GetManyArgs,
  ): Promise<FindManyDocsPaginationArgs<T> | undefined> => {
    if (!getManyArgs) {
      return undefined;
    }
    return raPaginationArgsToPaginationArgs<MongoDoc<T, IdType>>(getManyArgs);
  };

  @Resolver(() => entityClassRef, { isAbstract: true })
  abstract class BaseResolverHost {
    constructor(protected service: Service) {}

    @DecorateIf(
      endpointOptions.getOne?.enable ?? true,
      Query(() => entityClassRef, {
        name: nameSingularForm,
      }),
    )
    @GuardFromOptions(endpointOptions.getOne?.guard)
    @InterceptorFromOptions(endpointOptions.getOne?.interceptor)
    async getOne(
      @Info() info: GraphQLResolveInfo,
      @Args('id', { type: () => ID }) id: IdType,
    ): Promise<DocOrProjectedDoc<MongoDoc<T, IdType>, any>> {
      const projection = getProjectionFromGraphQlInfo(
        info,
        virtualFieldDeps,
        discriminatorRequiredFields,
      );
      const doc = await this.service.findById(id, { projection });
      if (!doc) {
        throw new NotFoundException();
      }
      return doc;
    }

    @DecorateIf(
      endpointOptions.getMany?.enable ?? true,
      Query(() => [entityClassRef], {
        name: `all${namePluralForm}`,
      }),
    )
    @GuardFromOptions(endpointOptions.getMany?.guard)
    @InterceptorFromOptions(endpointOptions.getMany?.interceptor)
    async getMany(
      @Info() info: GraphQLResolveInfo,
      @Args() args?: GetManyArgs,
    ): Promise<DocOrProjectedDoc<MongoDoc<T, IdType>, any>[]> {
      // console.log('info', JSON.stringify(info.fieldNodes[0]?.selectionSet, null, 2));
      const projection = getProjectionFromGraphQlInfo(
        info,
        virtualFieldDeps,
        discriminatorRequiredFields,
      );
      const mongoFilter = await raFilterToMongoFilter(args?.filter);
      const queryOptions = {
        ...(await GetManyArgsToFindManyOptions(args)),
        projection,
      };
      // console.log('queryOptions', queryOptions);
      // console.log('projection', projection);
      // console.log('projection', projection);
      const docs = await this.service.find(mongoFilter, queryOptions);
      // console.log('docs', docs);
      return docs;
    }

    @DecorateIf(
      endpointOptions.getMany?.enable ?? true,
      Query(() => ListMetadata, {
        name: `_all${namePluralForm}Meta`,
      }),
    )
    @GuardFromOptions(endpointOptions.getMany?.guard)
    @InterceptorFromOptions(endpointOptions.getMany?.interceptor)
    async getManyMeta(@Args() args?: GetManyArgs): Promise<ListMetadata> {
      const mongoFilter = await raFilterToMongoFilter(args?.filter);
      const count = await this.service.countDocuments(mongoFilter);
      return new ListMetadata(count);
    }

    @DecorateIf(
      endpointOptions.create?.enable ?? true,
      Mutation(() => entityClassRef, {
        name: `create${nameSingularForm}`,
      }),
    )
    @GuardFromOptions(endpointOptions.create?.guard)
    @InterceptorFromOptions(endpointOptions.create?.interceptor)
    async create(@Args({ type: () => CreateArgsClass }) doc: Partial<T>): Promise<T> {
      return await this.service.insert(doc);
    }

    @DecorateIf(
      endpointOptions.update?.enable ?? false,
      Mutation(() => entityClassRef, {
        name: `update${nameSingularForm}`,
      }),
    )
    @GuardFromOptions(endpointOptions.update?.guard)
    @InterceptorFromOptions(endpointOptions.update?.interceptor)
    async update(
      @Info() info: GraphQLResolveInfo,
      @Args({ type: () => UpdateArgs }) doc: { id: IdType } & Partial<T>,
    ): Promise<T> {
      if (!doc.id) {
        throw Error(`field 'id' missing in update's args: ${JSON.stringify(doc)}`);
      }
      const projection = getProjectionFromGraphQlInfo(
        info,
        virtualFieldDeps,
        discriminatorRequiredFields,
      );
      const newDoc = await this.service.findByIdAndUpdate(doc.id, doc, { new: true, projection });
      if (!newDoc) {
        throw new NotFoundException(`Doc ${nameSingularForm} with id ${doc.id} not found`);
      }
      return newDoc;
    }

    @DecorateIf(
      endpointOptions.delete?.enable ?? false,
      Mutation(() => entityClassRef, {
        name: `delete${nameSingularForm}`,
      }),
    )
    @GuardFromOptions(endpointOptions.delete?.guard)
    @InterceptorFromOptions(endpointOptions.delete?.interceptor)
    async delete(@Args('id', { type: () => ID }) id: IdType): Promise<T> {
      const oldDoc = await this.service.findByIdAndDelete(id);
      if (!oldDoc) {
        throw new NotFoundException(`Doc ${nameSingularForm} with id ${String(id)} not found`);
      }
      return oldDoc;
    }

    @ResolveField(() => ID)
    async id(@Parent() parent: { _id: any }) {
      return parent._id;
    }
  }
  return BaseResolverHost as any;
}
