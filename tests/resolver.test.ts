import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import * as path from 'path';
import request from 'supertest';
import { buildCatAppTestingModule } from './buildCatAppTestingModule';
import { ortieCat, pogoCat, safiCat, silverCat } from './cat-module/cat-test-data';
import { CatsService } from './cat-module/cat.service';
import { MongodInstance } from './database.module';
import introspectionSnapshot from './introspection-snapshot.json';

const introspectionQuery = fs
  .readFileSync(path.join(__dirname, './introspection-query.gql'))
  .toString();

describe('CatsResolver', () => {
  let app: INestApplication;
  let moduleRef: TestingModule;

  before(async () => {
    moduleRef = await buildCatAppTestingModule();
    app = moduleRef.createNestApplication();
    await app.init();
    await app.listen(1234);
  });
  after(async () => {
    await MongodInstance.stop();
    await app.close();
  });
  beforeEach(async function () {
    const catService = moduleRef.get<CatsService>(CatsService);
    await catService.deleteMany({});
    await catService.insertMany([pogoCat, safiCat, ortieCat, silverCat]);
    // const docs = await catService.find({})
    // console.log("docs", docs);
  });

  describe('Basic Resolver: Introspection', () => {
    it('should return correct introspection data', async function () {
      return request(await app.getUrl())
        .post('/graphql')
        .send({ query: introspectionQuery })
        .expect(200)
        .expect(introspectionSnapshot);
    });
  });
});
