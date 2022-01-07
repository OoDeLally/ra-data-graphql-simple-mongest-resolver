import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { buildCatAppTestingModule } from './buildCatAppTestingModule';
import { ortieCat, pogoCat, safiCat, silverCat } from './cat-module/cat-test-data';
import { CatsService } from './cat-module/cat.service';
import { MongodInstance } from './database.module';
import { INTROSPECTION_QUERY, INTROSPECTION_QUERY_EXPECTED } from './introspection';

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
        .send({ query: INTROSPECTION_QUERY })
        .expect(200)
        .expect(INTROSPECTION_QUERY_EXPECTED);
    });
  });
});
