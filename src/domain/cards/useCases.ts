import cardsRepository from 'domain/cards/repository';
import cardsService from 'domain/cards/services';
import { Card } from 'domain/cards/types';
import { delay, map, mergeMap, Observable, of, pipe } from 'rxjs';

export const shuffleDeckUseCase = (): Observable<void> =>
  cardsService.shuffleDeck().pipe(
    map(response => {
      if (response.success) {
        return;
      }

      throw new Error('The dealer seems tired, maybe asking again will work?');
    }),
  );

export const shuffleDeckAndDrawUseCase = (): Observable<Card> =>
  shuffleDeckUseCase().pipe(mergeMap(() => draw1CardUseCase()));

export const draw1CardUseCase = (): Observable<Card> =>
  cardsService.drawCard(1).pipe(
    mergeMap(response => {
      if (response.success) {
        return of(response.cards[0]);
      } else if (response.remaining === 0) {
        return shuffleDeckAndDrawUseCase();
      }

      throw new Error('Where did that card go?');
    }),
  );

export const drawFirstCardUseCase = (): Observable<Card[]> =>
  draw1CardUseCase()
    .pipe(delay(500))
    .pipe(
      map(card => {
        cardsRepository.save([card]);

        return [card];
      }),
    );

export const drawNextCardUseCase = (): Observable<Card[]> =>
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
