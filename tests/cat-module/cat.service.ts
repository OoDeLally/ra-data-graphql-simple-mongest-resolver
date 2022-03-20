import { Injectable } from '@nestjs/common';
import { BuildMongestNestJsService } from 'mongest-nestjs-service';
import { Cat } from './cat.entity';

@Injectable()
export class CatsService extends BuildMongestNestJsService(Cat) {}
