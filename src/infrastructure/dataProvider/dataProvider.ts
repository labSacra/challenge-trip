import { NetworkRequest } from 'infrastructure/dataProvider/types';
import { defer, Observable } from 'rxjs';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

type NetworkDataProvider = {
  get: <Response>(params: NetworkRequest) => Observable<Response>;
};

const networkDataProvider: NetworkDataProvider = {
  get: <Response>(params: NetworkRequest): Observable<Response> =>
    defer(async () => {
      try {
        const response = await fetch(params.url, {
          method: 'GET',
          headers,
          body: JSON.stringify(params.body),
        });
        const json = await response.json();
        // console.log({ json });
        return json as Response;
      } catch (error) {
        throw error;
      }
    }),
};

export default networkDataProvider;
