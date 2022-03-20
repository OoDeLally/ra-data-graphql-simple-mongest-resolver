import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BuildMongestNestJsService } from 'mongest-nestjs-service';
import { Model } from 'mongoose';
import { HomeCat } from './home-cat.entity';

@Injectable()
export class HomeCatsService extends BuildMongestNestJsService(HomeCat) {
  constructor(@InjectModel(HomeCat.name) public model: Model<HomeCat>) {
    super(model);
  }
}
