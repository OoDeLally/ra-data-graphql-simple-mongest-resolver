import { ObjectId } from 'mongodb';
import { HomeCat } from '../home-cat-module/home-cat.entity';
import { StrayCat } from '../stray-cat-module/stray-cat.entity';
import { CatKind } from './cat.entity';

export const pogoCat: StrayCat = {
  _id: new ObjectId('111111111111111111111111'),
  kind: CatKind.StrayCat,
  territorySize: 45,
  name: 'Pogo',
  age: 5,
};

export const ortieCat: StrayCat = {
  _id: new ObjectId('222222222222222222222222'),
  kind: CatKind.StrayCat,
  territorySize: 80,
  name: 'Ortie',
  age: 6,
};

export const safiCat: StrayCat = {
  _id: new ObjectId('333333333333333333333333'),
  kind: CatKind.StrayCat,
  territorySize: 80,
  name: 'Safi',
  age: 3,
};

export const silverCat: HomeCat = {
  _id: new ObjectId('444444444444444444444444'),
  kind: CatKind.HomeCat,
  name: 'Silver',
  age: 5,
  humanSlave: 'mom',
};
