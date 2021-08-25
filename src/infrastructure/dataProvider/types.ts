export type NetworkRequest = {
  url: string;
  body?: Record<string, unknown>;
};

/**
 * Common response object base on the API documentation.
 * It makes sense to be part of the infra layer since all responses seem
 * to be following this. If different for each endpoint or API, it should be somewhere
 * else more convenient.
 */
export type APIResponse = {
  success: boolean;
  remaining: number;
  error?: string;
};
