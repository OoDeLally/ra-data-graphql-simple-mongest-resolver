import { Module } from '@nestjs/common';
import { catMongooseModule } from './cat-mongoose.module';
import { CatsService } from './cat.service';

@Module({
  imports: [catMongooseModule],
  providers: [CatsService],
})
export class CatModule {}
