import { Field, InputType, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { escapeRegExp } from 'lodash';
import { FilterQuery } from 'mongoose';
import { BuildMongestRaResolver, MongestRaResolverOptions } from '../../src/BuildMongestRaResolver';
import { Cat } from './cat.entity';
import { CatsService } from './cat.service';

@InputType()
class CatFilter {
  @Field(() => String)
  nameRegexp?: string;
}

const graphqlFilterToMongoFilter = async ({ nameRegexp }: CatFilter): Promise<FilterQuery<Cat>> => {
  // The filter builder can be synchronous or asynchronous
  const filter: FilterQuery<Cat> = {};
  if (nameRegexp) {
    filter.name = new RegExp(escapeRegExp(nameRegexp), 'i');
  }
  return filter;
};

const CatsResolverOptions: MongestRaResolverOptions<Cat, CatFilter> = {
  filter: {
    classRef: CatFilter,
    filterBuilder: graphqlFilterToMongoFilter,
  },
  virtualFields: {
    fancyName: { dependsOn: ['name'] },
  },
  discriminatorRequiredExtraFields: ['age'],
  endpoints: {
    create: {
      enable: false,
    },
  },
};

@Resolver(() => Cat)
export class CatsResolver extends BuildMongestRaResolver(Cat, CatsResolverOptions) {
  constructor(service: CatsService) {
    super(service);
  }

  @ResolveField(() => String)
  async fancyName(@Parent() parent: { name: string }) {
    return `Fancy ${parent.name}`;
  }
}
