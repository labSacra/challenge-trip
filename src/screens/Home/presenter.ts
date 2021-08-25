import cardsService from 'domain/cards/services';
import { useEffect } from 'react';

type HomePresenter = {};

export const useHomePresenter = (): HomePresenter => {
  useEffect(() => {
    const subscription = cardsService.drawCard().subscribe({
      next: () => console.log('success'),
      error: error => console.log({ error }),
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {};
};
