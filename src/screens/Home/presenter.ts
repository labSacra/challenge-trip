import { BetType, Outcome } from 'domain/bets/types';
import { betOnCardUseCase } from 'domain/bets/useCases';
import { Card } from 'domain/cards/types';
import { drawFirstCard } from 'domain/cards/useCases';
import { useEffect, useState } from 'react';

type HomePresenter = {
  values: {
    cards: Card[];
    outcome: Outcome | null;
  };
  placeBet: (betType: BetType) => void;
};

export const useHomePresenter = (): HomePresenter => {
  const [cards, setCards] = useState<Card[]>([]);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

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
    values: {
      cards,
      outcome,
    },
    placeBet: (betType: BetType) => {
      betOnCardUseCase(betType).subscribe({
        next: betResult => {
          setCards([...betResult.cards]);
          setOutcome(betResult.outcome);
        },
        error: error => console.log({ error }),
      });
    },
  };
};
