import { Card } from 'domain/cards/types';
import inMemoryStorage from 'infrastructure/storage/inMemoryStorage';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Observer } from 'rxjs/src/internal/types';

const defaultValue: Card[] = [];
const inMemoryStore = inMemoryStorage<Card[]>('Cards');
const cardsRepo = new BehaviorSubject<Card[]>(defaultValue);

const cardsRepository = {
  subscribe: (subscriber: Observer<Card[]>): Subscription =>
    cardsRepo.subscribe(subscriber),
  observe: (): BehaviorSubject<Card[]> => cardsRepo,
  init: () => {
    cardsRepo.next(defaultValue);
  },
  save: (cards: Card[]) => {
    inMemoryStore.addItem(cards);
    cardsRepo.next(cards);
  },
  get: (): Card[] => inMemoryStore.getItem() ?? defaultValue,
  clear: () => {
    inMemoryStore.removeItem();
    cardsRepo.next(defaultValue);
  },
};

export default cardsRepository;
