import { Resolver } from '@nestjs/graphql';
import { BuildMongestRaResolver, MongestRaResolverOptions } from '../../src/BuildMongestRaResolver';
import { HomeCat } from './home-cat.entity';
import { HomeCatsService } from './home-cat.service';

const HomeCatsResolverOptions: MongestRaResolverOptions<HomeCat> = {
  endpoints: {
    create: {
      enable: true,
    },
    update: {
      enable: true,
    },
  },
};

@Resolver(() => HomeCat)
export class HomeCatsResolver extends BuildMongestRaResolver(HomeCat, HomeCatsResolverOptions) {
  constructor(service: HomeCatsService) {
    super(service);
  }
}
