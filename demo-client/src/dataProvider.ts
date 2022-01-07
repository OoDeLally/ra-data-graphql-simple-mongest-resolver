import { ApolloClient, InMemoryCache } from '@apollo/client';
import buildGraphQLProvider from 'ra-data-graphql-simple';
import { DataProvider } from 'react-admin';

export const API_URL = (process.env as unknown as { REACT_APP_API_URL: string }).REACT_APP_API_URL;
if (!API_URL) {
  throw Error(`Missing env var $REACT_APP_API_URL`);
}

export const IS_PROD = (process.env as unknown as { NODE_ENV: string }).NODE_ENV === 'production';

export const apolloClient = new ApolloClient({ uri: API_URL, cache: new InMemoryCache() });

export const buildDataProvider = async (): Promise<DataProvider> => {
  const dataProvider: DataProvider = await buildGraphQLProvider({
    client: apolloClient,
  });
  return dataProvider;
};
