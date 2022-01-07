import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongestService } from 'src/MongestService';
import { HomeCat } from './home-cat.entity';

@Injectable()
export class HomeCatsService extends MongestService(HomeCat) {
  constructor(@InjectModel(HomeCat.name) public model: Model<HomeCat>) {
    super(model);
  }
}
