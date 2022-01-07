import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { BuildMongestRaResolver, MongestRaResolverOptions } from 'src/BuildMongestRaResolver';
import { Cat } from './cat.entity';
import { CatsService } from './cat.service';

const CatsResolverOptions: MongestRaResolverOptions<Cat> = {
  virtualFields: {
    fancyName: { dependsOn: ['name'] },
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
