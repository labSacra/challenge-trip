import networkDataProvider from 'infrastructure/dataProvider/dataProvider';

/**
 * Adding API directly to service to keep things simple. If different services existed
 * based on the same URL, a network config file would be the place to have this.
 * Also, hard coding the deck ID to avoid recreating a new deck every time the application
 * opens and doing any local storage logic to save it
 */
const api = 'https://deckofcardsapi.com/api/deck/o7s8yn78anvt/';

const shuffleDeck = () =>
  networkDataProvider.get({
    url: `${api}shuffle/?deck_count=1`,
  });

const drawCard = () =>
  networkDataProvider.get({
    url: `${api}draw/?count=1`,
  });

const cardsService = {
  shuffleDeck,
  drawCard,
};

export default cardsService;
