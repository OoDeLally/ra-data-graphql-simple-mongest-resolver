import { buildCatAppTestingModule } from './buildCatAppTestingModule';
import {
  ortieCatMongoDoc,
  pogoCatMongoDoc,
  safiCatMongoDoc,
  silverCatMongoDoc,
} from './cat-module/cat-test-data';
import { CatsService } from './cat-module/cat.service';

const PORT = 1234;

async function startTestServer() {
  const moduleRef = await buildCatAppTestingModule();
  const app = moduleRef.createNestApplication();
  await app.init();
  await app.listen(PORT);
  const catService = moduleRef.get<CatsService>(CatsService);
  await catService.deleteMany({});
  await catService.insertMany([
    pogoCatMongoDoc,
    safiCatMongoDoc,
    ortieCatMongoDoc,
    silverCatMongoDoc,
  ]);
}

startTestServer()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log(`Playground available on http://localhost:${PORT}/graphql`);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
