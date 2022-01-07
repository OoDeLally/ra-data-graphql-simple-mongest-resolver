import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { registerEntityClassForSchema } from 'mongest-service';
import { Cat } from '../cat-module/cat.entity';

@Schema()
@ObjectType('StrayCat', { implements: Cat })
export class StrayCat extends Cat {
  @Field(() => Number)
  @Prop({ required: true, type: Number })
  territorySize!: number;
}

export const StrayCatSchema = SchemaFactory.createForClass(StrayCat);
registerEntityClassForSchema(StrayCat, StrayCatSchema);
