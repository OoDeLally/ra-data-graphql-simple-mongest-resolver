import { Injectable } from '@nestjs/common';
import { BuildMongestService } from 'mongest-service';
import { StrayCat } from './stray-cat.entity';

@Injectable()
export class StrayCatsService extends BuildMongestService(StrayCat) {}
