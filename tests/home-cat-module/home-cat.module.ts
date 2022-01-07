import { Module } from '@nestjs/common';
import { catMongooseModule } from '../cat-module/cat-mongoose.module';
import { HomeCatsResolver } from './home-cat.resolver';
import { HomeCatsService } from './home-cat.service';

@Module({
  imports: [catMongooseModule],
  providers: [HomeCatsService, HomeCatsResolver],
})
export class HomeCatModule {}
