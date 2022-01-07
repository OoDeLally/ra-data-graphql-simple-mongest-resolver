import { Test, TestingModule } from '@nestjs/testing';
import { CatModule } from './cat-module/cat.module';
import { databaseModule } from './database.module';
import { graphqlModule } from './graphql.module';
import { HomeCatModule } from './home-cat-module/home-cat.module';
import { StrayCatModule } from './stray-cat-module/stray-cat.module';

export async function buildCatAppTestingModule(): Promise<TestingModule> {
  return await Test.createTestingModule({
    imports: [databaseModule, graphqlModule, CatModule, HomeCatModule, StrayCatModule],
  }).compile();
}
