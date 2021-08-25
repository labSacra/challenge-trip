import { defer, Observable } from 'rxjs';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

type NetworkDataProvider = {
  get: <T>(params: T) => Observable<T>;
};

const networkDataProvider: NetworkDataProvider = {
  get: <T>(params: T): Observable<T> =>
    defer(async () => {
      try {
        const response = await fetch(
          'https://deckofcardsapi.com/api/deck/o7s8yn78anvt/shuffle/?deck_count=1',
          {
            method: 'GET',
            headers,
          },
        );
        const json = await response.json();
        console.log({ json });
        return json as T;
      } catch (error) {
        throw error;
      }
    }),
};

export default networkDataProvider;
