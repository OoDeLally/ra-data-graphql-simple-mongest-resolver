import { Injectable } from '@nestjs/common';
import { MongestService } from 'src/MongestService';
import { Cat } from './cat.entity';

@Injectable()
export class CatsService extends MongestService(Cat) {}
