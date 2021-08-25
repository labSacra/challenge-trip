import { Card } from 'domain/cards/types';
import { drawFirstCard, drawNextCard } from 'domain/cards/useCases';
import { useEffect, useState } from 'react';

type HomePresenter = {
  cards: Card[];
  placeBet: () => void;
};

export const useHomePresenter = (): HomePresenter => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const subscription = drawFirstCard().subscribe({
      next: setCards,
      error: error => console.log({ error }),
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    cards,
    placeBet: () => {
      drawNextCard().subscribe({
        next: setCards,
        error: error => console.log({ error }),
      });
    },
  };
};
