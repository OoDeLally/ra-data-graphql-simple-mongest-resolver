import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { registerEntityClassForSchema } from 'mongest-service';
import { Cat } from '../cat-module/cat.entity';

@Schema()
@ObjectType('HomeCat', { implements: Cat })
export class HomeCat extends Cat {
  @Field(() => String)
  @Prop({ required: true, type: String })
  humanSlave!: string;
}

export const HomeCatSchema = SchemaFactory.createForClass(HomeCat);
registerEntityClassForSchema(HomeCat, HomeCatSchema);
