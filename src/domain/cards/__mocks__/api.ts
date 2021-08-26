import { DrawResponse, ShuffledDeckResponse } from 'domain/cards/types';

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
  successResponse: {
    success: true,
    cards: [
      {
        code: '4H',
        image: 'https://deckofcardsapi.com/static/img/4H.png',
        value: '4',
        suit: 'HEARTS',
      },
    ],
    remaining: 51,
  } as DrawResponse,
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
