import { BetResult, BetType, Outcome } from 'domain/bets/types';
import { CardValue } from 'domain/cards/types';
import { drawNextCard } from 'domain/cards/useCases';
import { map, Observable } from 'rxjs';

const cardOrder: CardValue[] = [
  'ACE',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'JACK',
  'QUEEN',
  'KING',
];

export const betOnCardUseCase = (betType: BetType): Observable<BetResult> =>
  drawNextCard().pipe(
    map(cards => {
      const previousCardIndex = cardOrder.findIndex(e => e === cards[0].value);
      const newCardIndex = cardOrder.findIndex(e => e === cards[1].value);

      if (previousCardIndex < 0 || newCardIndex < 0) {
        throw new Error('Something went wrong');
      }

      /**
       * if 0, it's the same card type
       * if less than 0, new card has lower value
       * if greater than 0, new card has higher value
       */
      const cardComparison = newCardIndex - previousCardIndex;

      let outcome: Outcome;
      if (
        (cardComparison < 0 && betType === 'DOWN') ||
        (cardComparison > 0 && betType === 'UP')
      ) {
        outcome = 'WIN';
      } else {
        outcome = 'LOOSE';
      }

      return {
        cards,
        outcome,
      };
    }),
  );
