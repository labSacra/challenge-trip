import { Card } from 'domain/cards/types';

export type BetType = 'UP' | 'DOWN';

export type Outcome = 'WIN' | 'LOOSE';

export type BetResult = {
  cards: Card[];
  outcome: Outcome;
};
