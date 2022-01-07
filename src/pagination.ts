import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { FindManyDocsPaginationArgs } from 'mongest-service/dist/pagination';
import { SortDirection } from 'mongodb';
import { EntityPayload } from 'src/types';

@ObjectType()
export class ListMetadata {
  @Field(() => Int)
  count!: number;

  constructor(count: number) {
    this.count = count;
  }
}

export type RaSortOrder = 'ASC' | 'DESC';

export interface IRaPaginationArgs<T> {
  page?: number;
  perPage?: number;
  sortField?: keyof T;
  sortOrder?: RaSortOrder;
}

@ArgsType()
export class RaPaginationArgs<T> implements IRaPaginationArgs<T> {
  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  perPage?: number;

  @Field(() => String, { nullable: true })
  sortField?: keyof T;

  @Field(() => String, { nullable: true })
  sortOrder?: RaSortOrder;
}

const raSortOrderToMongoSortDirection = (order: RaSortOrder): SortDirection =>
  order === 'ASC' ? 1 : -1;

export const raPaginationArgsToPaginationArgs = <T extends EntityPayload>(
  args?: IRaPaginationArgs<T>,
): FindManyDocsPaginationArgs<T> | undefined => {
  if (!args) {
    return undefined;
  }
  return {
    skip: (args.page || 0) * (args.perPage || 1),
    limit: args.perPage,
    ...(args.sortField
      ? {
          sort: {
            [args.sortField]: args.sortOrder ? raSortOrderToMongoSortDirection(args.sortOrder) : 1,
          } as Partial<Record<keyof T, SortDirection>>,
        }
      : {}),
  };
};
