import { CanActivate, Type } from '@nestjs/common';
import { ObjectId } from 'mongodb';

export type EntityPayload = object;

export type PartialRecord<K extends string, T> = Partial<Record<K, T>>;

export type Nullable<T> = T | null | undefined;

export type ValueOf<T extends object> = T[keyof T];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AbstractType<T = any> = abstract new (...args: any[]) => T;

export type ObjectIdHex = string;

export type ItemOrArray<T> = T | T[];

export type InstanceOrClass<T> = T | Type<T>;

export type NestGuard = CanActivate;

export type NestGuardClassOrInstance = InstanceOrClass<NestGuard>;

export type ExtractIdType<E extends EntityPayload> = '_id' extends keyof E ? E['_id'] : ObjectId;
