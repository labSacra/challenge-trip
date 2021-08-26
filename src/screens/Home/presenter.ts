import { BetType, Outcome } from 'domain/bets/types';
import { betOnCardUseCase } from 'domain/bets/useCases';
import { Card } from 'domain/cards/types';
import { drawFirstCardUseCase } from 'domain/cards/useCases';
import { useEffect, useState } from 'react';

type HomePresenter = {
  values: {
    cards: Card[];
    outcome: Outcome | null;
    loading: boolean;
    error: string | null;
  };
  onPress: {
    placeBet: (betType: BetType) => void;
    startGame: () => void;
  };
};

export const useHomePresenter = (): HomePresenter => {
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startRequest = () => {
    setLoading(true);
    setError(null);
  };

  const onRequestError = (err: Error) => {
    setError(err.message);
    setLoading(false);
  };

  const initialize = () => {
    startRequest();

    return drawFirstCardUseCase().subscribe({
      next: setCards,
      error: onRequestError,
      complete: () => setLoading(false),
    });
  };

  useEffect(() => {
    const subscription = initialize();

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    values: {
      cards,
      outcome,
      loading,
      error,
    },
    onPress: {
      placeBet: (betType: BetType) => {
        startRequest();

        betOnCardUseCase(betType).subscribe({
          next: betResult => {
            setCards([...betResult.cards]);
            setOutcome(betResult.outcome);
          },
          error: onRequestError,
          complete: () => setLoading(false),
        });
      },
      startGame: () => initialize(),
    },
  };
};
