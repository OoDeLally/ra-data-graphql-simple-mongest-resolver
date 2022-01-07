import { Module } from '@nestjs/common';
import { catMongooseModule } from '../cat-module/cat-mongoose.module';
import { StrayCatsService } from './stray-cat.service';

@Module({
  imports: [catMongooseModule],
  providers: [StrayCatsService],
})
export class StrayCatModule {}
