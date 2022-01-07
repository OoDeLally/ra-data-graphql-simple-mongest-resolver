import { FilterQuery } from 'mongoose';

export type CustomFilter = Record<string, unknown>;

export type FilterBuilder<T, F extends CustomFilter> = (
  filter: F,
) => FilterQuery<T> | Promise<FilterQuery<T>>;
