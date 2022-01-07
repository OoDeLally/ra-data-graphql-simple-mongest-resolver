import { Module } from '@nestjs/common';
import { catMongooseModule } from './cat-mongoose.module';
import { CatsResolver } from './cat.resolver';
import { CatsService } from './cat.service';

@Module({
  imports: [catMongooseModule],
  providers: [CatsService, CatsResolver],
})
export class CatModule {}
