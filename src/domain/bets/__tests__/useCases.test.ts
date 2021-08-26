import { betOnCardUseCase } from 'domain/bets/useCases';
import { downBet, upBet } from 'domain/bets/__mocks__/mockData';
import * as cardsUseCases from 'domain/cards/useCases';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

describe('Bets UseCases', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    jest.clearAllMocks();
  });

  describe('The betOnCardUseCase', () => {
    describe('when player chooses UP', () => {
      it('should return WIN if the new card is bigger than the previous one', () => {
        jest
          .spyOn(cardsUseCases, 'drawNextCardUseCase')
          .mockReturnValueOnce(of(upBet.win.cards));

        scheduler.run(({ expectObservable }) => {
          const expectedMarble = '300ms (a|)';
          const expectedResult = { a: upBet.win };

          expectObservable(betOnCardUseCase('UP')).toBe(
            expectedMarble,
            expectedResult,
          );
        });
      });

      it('should return LOOSE if the new card is smaller than the previous one', () => {
        jest
          .spyOn(cardsUseCases, 'drawNextCardUseCase')
          .mockReturnValueOnce(of(upBet.loose.cards));

        scheduler.run(({ expectObservable }) => {
          const expectedMarble = '300ms (a|)';
          const expectedResult = { a: upBet.loose };

          expectObservable(betOnCardUseCase('UP')).toBe(
            expectedMarble,
            expectedResult,
          );
        });
      });
    });

    describe('when player chooses DOWM', () => {
      it('should return WIN if the new card is smaller than the previous one', () => {
        jest
          .spyOn(cardsUseCases, 'drawNextCardUseCase')
          .mockReturnValueOnce(of(downBet.win.cards));

        scheduler.run(({ expectObservable }) => {
          const expectedMarble = '300ms (a|)';
          const expectedResult = { a: downBet.win };

          expectObservable(betOnCardUseCase('DOWN')).toBe(
            expectedMarble,
            expectedResult,
          );
        });
      });

      it('should return LOOSE if the new card is bigger than the previous one', () => {
        jest
          .spyOn(cardsUseCases, 'drawNextCardUseCase')
          .mockReturnValueOnce(of(downBet.loose.cards));

        scheduler.run(({ expectObservable }) => {
          const expectedMarble = '300ms (a|)';
          const expectedResult = { a: downBet.loose };

          expectObservable(betOnCardUseCase('DOWN')).toBe(
            expectedMarble,
            expectedResult,
          );
        });
      });
    });
  });
});
