import { APIResponse } from 'infrastructure/dataProvider/types';

/**
 * Domain types
 */
export type CardValue =
  | 'ACE'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'JACK'
  | 'QUEEN'
  | 'KING';

export type CardSuit = 'SPADES' | 'DIAMONDS' | 'HEARTS' | 'CLUBS';

export type Card = {
  code: string;
  image: string;
  value: CardValue;
  suit: CardSuit;
};

/**
 * Domain responses types
 */
export type ShuffledDeckResponse = {
  shuffled: boolean;
} & APIResponse;

export type DrawResponse = {
  cards: Card[];
} & APIResponse;
