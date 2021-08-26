import { Card, DrawResponse, ShuffledDeckResponse } from 'domain/cards/types';

export const cards: Card[] = [
  {
    code: '4H',
    image: 'https://deckofcardsapi.com/static/img/4H.png',
    value: '4',
    suit: 'HEARTS',
  },
  {
    code: '9C',
    image: 'https://deckofcardsapi.com/static/img/9C.png',
    value: '9',
    suit: 'CLUBS',
  },
  {
    code: '2S',
    image: 'https://deckofcardsapi.com/static/img/2S.png',
    value: '2',
    suit: 'SPADES',
  },
];

export const shuffleDeckAPI = {
  failedResponse: {
    success: false,
    error: 'Deck ID does not exist.',
  } as ShuffledDeckResponse,
  successResponse: {
    success: true,
    remaining: 52,
    shuffled: true,
  } as ShuffledDeckResponse,
};

export const drawCardApi = {
  successResponse: (card?: Card) =>
    ({
      success: true,
      cards: [card ? card : cards[0]],
      remaining: 51,
    } as DrawResponse),
  noRemainingResponse: {
    success: false,
    cards: [],
    remaining: 0,
    error: 'Not enough cards remaining to draw 1 additional',
  } as DrawResponse,
  failedResponse: {
    success: false,
    cards: [],
    remaining: 10,
  } as DrawResponse,
};
