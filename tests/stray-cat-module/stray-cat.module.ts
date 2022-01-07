import { Module } from '@nestjs/common';
import { catMongooseModule } from '../cat-module/cat-mongoose.module';
import { StrayCatsResolver } from './stray-cat.resolver';
import { StrayCatsService } from './stray-cat.service';

@Module({
  imports: [catMongooseModule],
  providers: [StrayCatsService, StrayCatsResolver],
})
export class StrayCatModule {}
