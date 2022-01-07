import { GraphQLModule } from '@nestjs/graphql';

export const graphqlModule = GraphQLModule.forRoot({
  autoSchemaFile: true,
  sortSchema: true,
  debug: true,
  playground: true,
});
