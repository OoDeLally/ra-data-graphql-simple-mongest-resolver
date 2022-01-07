import { ArgsType, Field, Int } from '@nestjs/graphql';
import { FindManyDocsPaginationArgs } from 'mongest-service/dist/pagination';
import { SortDirection } from 'mongodb';
import { EntityPayload } from 'src/types';
import { RaSortOrder } from './ReactAdmin';

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
      ? { [args.sortField]: args.sortOrder ? raSortOrderToMongoSortDirection(args.sortOrder) : 1 }
      : {}),
  };
};
