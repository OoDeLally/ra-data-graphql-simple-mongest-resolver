import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum CatKind {
  StrayCat = 'StrayCat',
  HomeCat = 'HomeCat',
}

@Schema({ discriminatorKey: 'kind' })
export class Cat {
  kind!: CatKind;

  @Prop({ required: true, type: String })
  name!: string;

  @Prop({ required: true, type: Number })
  age!: number;

  @Prop({ required: false, type: String })
  stripeColor?: 'black' | 'grey' | 'brown';

  @Prop({ required: false, type: String, default: 'black' })
  color?: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
