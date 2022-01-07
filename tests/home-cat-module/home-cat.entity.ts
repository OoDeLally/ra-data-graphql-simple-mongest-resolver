import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { registerEntityClassForSchema } from 'src/registerEntityClassForSchema';
import { Cat } from 'tests/cat-module/cat.entity';

@Schema()
export class HomeCat extends Cat {
  @Prop({ required: true, type: String })
  humanSlave!: string;
}

export const HomeCatSchema = SchemaFactory.createForClass(HomeCat);
registerEntityClassForSchema(HomeCat, HomeCatSchema);
