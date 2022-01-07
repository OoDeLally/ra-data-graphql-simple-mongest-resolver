import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ListMetadata {
  @Field(() => Int)
  count!: number;

  constructor(count: number) {
    this.count = count;
  }
}

export type RaSortOrder = 'ASC' | 'DESC';
