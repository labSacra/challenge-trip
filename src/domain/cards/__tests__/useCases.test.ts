import cardsService from 'domain/cards/services';
import cardsRepository from 'domain/cards/repository';
import {
  draw1CardUseCase,
  drawFirstCardUseCase,
  shuffleDeckUseCase,
} from 'domain/cards/useCases';

jest.mock('domain/cards/repository');

import { cards, drawCardApi, shuffleDeckAPI } from 'domain/cards/__mocks__/api';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

describe('Cards UseCases', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    jest.clearAllMocks();
  });

  describe('The shuffleDeckUseCase', () => {
    it('should return in a successful response from shuffle service', () => {
      jest
        .spyOn(cardsService, 'shuffleDeck')
        .mockReturnValueOnce(of(shuffleDeckAPI.successResponse));

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
      jest
        .spyOn(cardsService, 'shuffleDeck')
        .mockReturnValueOnce(of(shuffleDeckAPI.failedResponse));

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

  describe('The draw1CardUseCase', () => {
    it('should return 1 card', () => {
      jest
        .spyOn(cardsService, 'drawCard')
        .mockReturnValueOnce(of(drawCardApi.successResponse));

      scheduler.run(({ expectObservable }) => {
        const expectedMarble = '(a|)';
        const expectedResult = { a: drawCardApi.successResponse.cards[0] };

        expectObservable(draw1CardUseCase()).toBe(
          expectedMarble,
          expectedResult,
        );
      });
    });

    it('should shuffle deck first and return 1 card', () => {
      jest
        .spyOn(cardsService, 'drawCard')
        .mockReturnValueOnce(of(drawCardApi.noRemainingResponse))
        .mockReturnValueOnce(of(drawCardApi.successResponse));

      jest
        .spyOn(cardsService, 'shuffleDeck')
        .mockReturnValueOnce(of(shuffleDeckAPI.successResponse));

      scheduler.run(({ expectObservable }) => {
        const expectedMarble = '(a|)';
        const expectedResult = { a: drawCardApi.successResponse.cards[0] };

        expectObservable(draw1CardUseCase()).toBe(
          expectedMarble,
          expectedResult,
        );
      });
    });

    it('should throw error in a failed response from draw service', () => {
      jest
        .spyOn(cardsService, 'drawCard')
        .mockReturnValueOnce(of(drawCardApi.failedResponse));

      scheduler.run(({ expectObservable }) => {
        const expectedMarble = '#';
        const error = new Error('Where did that card go?');

        expectObservable(draw1CardUseCase()).toBe(expectedMarble, null, error);
      });
    });
  });

  describe('The drawFirstCardUseCase', () => {
    it('should draw the first card', () => {
      jest
        .spyOn(cardsService, 'drawCard')
        .mockReturnValueOnce(of(drawCardApi.successResponse));

      scheduler.run(({ expectObservable, flush }) => {
        const expectedMarble = '500ms (a|)';
        const expectedResult = { a: [cards[0]] };

        const result = drawFirstCardUseCase();

        expectObservable(result).toBe(expectedMarble, expectedResult);

        flush();

        expect(cardsRepository.save).toHaveBeenCalledWith([cards[0]]);
      });
    });
  });
});
