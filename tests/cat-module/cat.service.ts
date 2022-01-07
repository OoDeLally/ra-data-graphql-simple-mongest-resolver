import { Injectable } from '@nestjs/common';
import { BuildMongestService } from 'mongest-service';
import { Cat } from './cat.entity';

@Injectable()
export class CatsService extends BuildMongestService(Cat) {}
