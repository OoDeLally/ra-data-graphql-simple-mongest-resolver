import { Resolver } from '@nestjs/graphql';
import { BuildMongestRaResolver, MongestRaResolverOptions } from '../../src/BuildMongestRaResolver';
import { StrayCat } from './stray-cat.entity';
import { StrayCatsService } from './stray-cat.service';

const StrayCatsResolverOptions: MongestRaResolverOptions<StrayCat> = {
  endpoints: {
    create: {
      enable: true,
    },
    update: {
      enable: true,
    },
  },
};

@Resolver(() => StrayCat)
export class StrayCatsResolver extends BuildMongestRaResolver(StrayCat, StrayCatsResolverOptions) {
  constructor(service: StrayCatsService) {
    super(service);
  }
}
