import { wait } from './wait';

export const waitLong = async (context: Mocha.Context, ms = 10000000) => {
  context.timeout(2 * ms);
  await wait(ms);
};
