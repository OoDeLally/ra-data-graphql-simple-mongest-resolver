import { FilterQuery } from 'mongoose';

export type CustomFilter = object;

export type FilterBuilder<T, F extends CustomFilter> = (
  filter: F,
) => FilterQuery<T> | Promise<FilterQuery<T>>;
