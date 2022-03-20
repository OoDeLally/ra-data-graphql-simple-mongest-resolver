import { Injectable } from '@nestjs/common';
import { BuildMongestNestJsService } from 'mongest-nestjs-service';
import { StrayCat } from './stray-cat.entity';

@Injectable()
export class StrayCatsService extends BuildMongestNestJsService(StrayCat) {}
