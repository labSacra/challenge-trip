import { NetworkRequest } from 'infrastructure/dataProvider/types';
import { defer, Observable } from 'rxjs';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

type NetworkDataProvider = {
  get: <T>(params: NetworkRequest) => Observable<T>;
};

const networkDataProvider: NetworkDataProvider = {
  get: <T>(params: NetworkRequest): Observable<T> =>
    defer(async () => {
      try {
        const response = await fetch(params.url, {
          method: 'GET',
          headers,
          body: JSON.stringify(params.body),
        });
        const json = await response.json();
        console.log({ json });
        return json as T;
      } catch (error) {
        throw error;
      }
    }),
};

export default networkDataProvider;
