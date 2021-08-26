import cardsService from 'domain/cards/services';
import { ShuffledDeckResponse } from 'domain/cards/types';
import { shuffleDeckUseCase } from 'domain/cards/useCases';
import { shuffleDeckAPI } from 'domain/cards/__mocks__/api';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

describe('Cards UseCases', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('The shuffleDeckUseCase', () => {
    it('should return in a successful response from shuffle service', () => {
      const mock = jest.spyOn(cardsService, 'shuffleDeck');
      mock.mockReturnValueOnce(of(shuffleDeckAPI.successResponse));

      scheduler.run(({ expectObservable }) => {
        const expectedMarble = '(a|)';
        const expectedResult = { a: undefined };

        expectObservable(shuffleDeckUseCase()).toBe(
          expectedMarble,
          expectedResult,
        );
      });
    });

    it('should throw error in a failed response from shuffle service', () => {
      const mock = jest.spyOn(cardsService, 'shuffleDeck');
      mock.mockReturnValueOnce(of(shuffleDeckAPI.failedResponse));

      scheduler.run(({ expectObservable }) => {
        const expectedMarble = '#';
        const error = new Error(
          'The dealer seems tired, maybe asking again will work?',
        );

        expectObservable(shuffleDeckUseCase()).toBe(
          expectedMarble,
          null,
          error,
        );
      });
    });
  });
});
