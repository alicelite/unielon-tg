import wretch from 'wretch';
// eslint-disable-next-line import/no-unresolved
import { retry } from 'wretch/middlewares';

import {
  CARDINALS_API_V3_URL,
  CARDINALS_API_URL
} from './shared/constant';

const retryOptions = retry({
  delayTimer: 500,
  delayRamp: (delay, nbOfAttempts) => delay * nbOfAttempts,
  maxAttempts: 3,
  until: (response) => !!(response && response.ok),
  onRetry: () => {},
  retryOnNetworkError: false,
  resolveWithLatestResponse: false,
  skip: (_, opts) => opts.method !== 'GET',
});

export const cardinalsV3 = wretch(CARDINALS_API_V3_URL).middlewares([
  retryOptions,
]);
export const cardinals = wretch(CARDINALS_API_URL).middlewares([
  retryOptions,
]);