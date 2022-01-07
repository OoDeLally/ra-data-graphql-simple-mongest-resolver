import { Injectable } from '@nestjs/common';
import { MongestService } from 'src/MongestService';
import { StrayCat } from './stray-cat.entity';

@Injectable()
export class StrayCatsService extends MongestService(StrayCat) {}
