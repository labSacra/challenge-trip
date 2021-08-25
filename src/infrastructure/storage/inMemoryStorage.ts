export type InMemoryStorage<T> = {
  addItem: (item: T) => void;
  getItem: () => T | null;
  removeItem: () => void;
};

const store: { [key: string]: unknown } = {};

const inMemoryStorage = <T>(key: string): InMemoryStorage<T> => ({
  addItem: (item: T) => {
    store[key] = item;
  },
  getItem: () => (store[key] as T) ?? null,
  removeItem: () => {
    console.log({ store });
    store[key] = undefined;
    console.log({ store });
  },
});

export default inMemoryStorage;
