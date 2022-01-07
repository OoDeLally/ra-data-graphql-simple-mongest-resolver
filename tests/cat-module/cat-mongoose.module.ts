import { MongooseModule } from '@nestjs/mongoose';
import { HomeCat, HomeCatSchema } from 'tests/home-cat-module/home-cat.entity';
import { StrayCat, StrayCatSchema } from '../stray-cat-module/stray-cat.entity';
import { Cat, CatSchema } from './cat.entity';

export const catMongooseModule = MongooseModule.forFeature([
  {
    name: Cat.name,
    schema: CatSchema,
    discriminators: [
      { name: StrayCat.name, schema: StrayCatSchema },
      { name: HomeCat.name, schema: HomeCatSchema },
    ],
  },
]);
