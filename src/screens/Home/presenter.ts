import networkDataProvider from 'infrastructure/dataProvider/dataProvider';
import { useEffect } from 'react';

type HomePresenter = {};

export const useHomePresenter = (): HomePresenter => {
  useEffect(() => {
    const subscription = networkDataProvider.get({}).subscribe({
      next: () => console.log('success'),
      error: error => console.log({ error }),
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {};
};
