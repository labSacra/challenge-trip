import {Observable} from 'rxjs';

const dataProvider = {
  query: <T>(params: T): Observable<T> => {
    return new Observable(subscriber => {
      subscriber.next(params);
      subscriber.complete();

      return () => {};
    });
  },
};

export default dataProvider;
