import { Module } from '@nestjs/common';
import { catMongooseModule } from 'tests/cat-module/cat-mongoose.module';
import { HomeCatsService } from './home-cat.service';

@Module({
  imports: [catMongooseModule],
  providers: [HomeCatsService],
})
export class HomeCatModule {}
