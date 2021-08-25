import cardsRepository from 'domain/cards/repository';
import cardsService from 'domain/cards/services';
import { Card } from 'domain/cards/types';
import { delay, map, mergeMap, Observable, of, pipe } from 'rxjs';

const shuffleDeckUseCase = (): Observable<void> =>
  cardsService.shuffleDeck().pipe(
    map(response => {
      if (response.success) {
        return;
      }

      throw new Error(response.error);
    }),
  );

const shuffleDeckAndDrawUseCase = (): Observable<Card> =>
  shuffleDeckUseCase().pipe(mergeMap(() => draw1CardUseCase()));

const draw1CardUseCase = (): Observable<Card> =>
  cardsService.drawCard(1).pipe(
    mergeMap(response => {
      if (response.success) {
        return of(response.cards[0]);
      } else if (response.remaining === 0) {
        return shuffleDeckAndDrawUseCase();
      }

      throw new Error('Something is not working');
    }),
  );

export const drawFirstCard = (): Observable<Card[]> =>
  draw1CardUseCase()
    .pipe(delay(500))
    .pipe(
      map(card => {
        cardsRepository.save([card]);

        return [card];
      }),
    );

export const drawNextCard = (): Observable<Card[]> =>
  draw1CardUseCase().pipe(
    map(card => {
      const { get, save } = cardsRepository;
      const cards = get();

      cards.push(card);

      if (cards.length >= 3) {
        cards.splice(0, 1);
      }

      save(cards);

      return cards;
    }),
  );
