import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { registerEntityClassForSchema } from 'src/registerEntityClassForSchema';
import { Cat } from '../cat-module/cat.entity';

@Schema()
export class StrayCat extends Cat {
  @Prop({ required: true, type: Number })
  territorySize!: number;
}

export const StrayCatSchema = SchemaFactory.createForClass(StrayCat);
registerEntityClassForSchema(StrayCat, StrayCatSchema);
