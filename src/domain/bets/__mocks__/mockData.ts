import { BetResult } from 'domain/bets/types';
import { Card } from 'domain/cards/types';

export const upBet = {
  win: {
    cards: [
      {
        value: '4',
      } as Card,
      {
        value: '9',
      } as Card,
    ],
    outcome: 'WIN',
  } as BetResult,
  loose: {
    cards: [
      {
        value: '4',
      } as Card,
      {
        value: '2',
      } as Card,
    ],
    outcome: 'LOOSE',
  } as BetResult,
};

export const downBet = {
  win: {
    cards: [
      {
        value: '4',
      } as Card,
      {
        value: '9',
      } as Card,
    ],
    outcome: 'LOOSE',
  } as BetResult,
  loose: {
    cards: [
      {
        value: '4',
      } as Card,
      {
        value: '2',
      } as Card,
    ],
    outcome: 'WIN',
  } as BetResult,
};
