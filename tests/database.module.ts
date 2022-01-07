import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export let MongodInstance: MongoMemoryServer;

export const databaseModule = MongooseModule.forRootAsync({
  useFactory: async (): Promise<MongooseModuleOptions> => {
    MongodInstance = await MongoMemoryServer.create();
    const uri = MongodInstance.getUri();
    return {
      uri,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  },
});
