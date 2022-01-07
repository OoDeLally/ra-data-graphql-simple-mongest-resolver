import { Field, Int, InterfaceType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum CatKind {
  StrayCat = 'StrayCat',
  HomeCat = 'HomeCat',
}
registerEnumType(CatKind, { name: 'CatKind' });
const resolveType = (cat: Cat) => {
  switch (cat.kind) {
    case CatKind.HomeCat:
      return 'HomeCat';
    case CatKind.StrayCat:
      return 'StrayCat';
    default:
      // eslint-disable-next-line no-console
      console.error(`Unknown cat kind from ${JSON.stringify(cat, null, 2)}`);
      throw Error(`Unknown cat kind ${cat.kind}`);
  }
};

@Schema({ discriminatorKey: 'kind' })
@InterfaceType('Cat', { resolveType })
export class Cat {
  @Field(() => CatKind)
  kind!: CatKind;

  @Field(() => String)
  @Prop({ required: true, type: String })
  name!: string;

  @Field(() => Int)
  @Prop({ required: true, type: Number })
  age!: number;

  @Field(() => String, { nullable: true })
  @Prop({ required: false, type: String })
  stripeColor?: 'black' | 'grey' | 'brown';

  @Field(() => String, { nullable: true })
  @Prop({ required: false, type: String, default: 'black' })
  color?: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
