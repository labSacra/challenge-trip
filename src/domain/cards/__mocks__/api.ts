import { ShuffledDeckResponse } from 'domain/cards/types';

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
