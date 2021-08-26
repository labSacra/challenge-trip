import React from 'react';
import HomeScreen from 'screens/Home';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import cardsService from 'domain/cards/services';
import { of } from 'rxjs';
import { cards, drawCardApi } from 'domain/cards/__mocks__/mockData';

describe('The HomeScreen component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('expected cases', () => {
    test('should render correctly on successful startup', async () => {
      jest
        .spyOn(cardsService, 'drawCard')
        .mockReturnValueOnce(of(drawCardApi.successResponse(cards[0])));

      const { getAllByTestId, getByText } = render(<HomeScreen />);

      expect(getByText('Drawing card...')).toBeTruthy();

      await waitFor(() => {
        expect(getAllByTestId('card-image')).toHaveLength(1);
      });

      expect(getByText('Up')).toBeTruthy();
      expect(getByText('Down')).toBeTruthy();
    });

    describe('win cases', () => {
      test('should render correctly on up button interaction', async () => {
        jest
          .spyOn(cardsService, 'drawCard')
          .mockReturnValueOnce(of(drawCardApi.successResponse(cards[0])))
          .mockReturnValueOnce(of(drawCardApi.successResponse(cards[1])));

        const { getAllByTestId, getByText } = render(<HomeScreen />);

        await waitFor(() => {
          expect(getAllByTestId('card-image')).toHaveLength(1);
        });

        fireEvent.press(getByText('Up'));

        await waitFor(() => {
          expect(getByText('Drawing card...')).toBeTruthy();
        });

        await waitFor(() => {
          expect(getAllByTestId('card-image')).toHaveLength(2);
        });

        expect(getByText('Up')).toBeTruthy();
        expect(getByText('Down')).toBeTruthy();
        expect(getByText('You won!!')).toBeTruthy();
      });

      test('should render correctly on down button interaction', async () => {
        jest
          .spyOn(cardsService, 'drawCard')
          .mockReturnValueOnce(of(drawCardApi.successResponse(cards[0])))
          .mockReturnValueOnce(of(drawCardApi.successResponse(cards[2])));

        const { getAllByTestId, getByText } = render(<HomeScreen />);

        await waitFor(() => {
          expect(getAllByTestId('card-image')).toHaveLength(1);
        });

        fireEvent.press(getByText('Down'));

        await waitFor(() => {
          expect(getByText('Drawing card...')).toBeTruthy();
        });

        await waitFor(() => {
          expect(getAllByTestId('card-image')).toHaveLength(2);
        });

        expect(getByText('Up')).toBeTruthy();
        expect(getByText('Down')).toBeTruthy();
        expect(getByText('You won!!')).toBeTruthy();
      });
    });

    describe('loose cases', () => {
      test('should render correctly on up button interaction', async () => {
        jest
          .spyOn(cardsService, 'drawCard')
          .mockReturnValueOnce(of(drawCardApi.successResponse(cards[0])))
          .mockReturnValueOnce(of(drawCardApi.successResponse(cards[2])));

        const { getAllByTestId, getByText } = render(<HomeScreen />);

        await waitFor(() => {
          expect(getAllByTestId('card-image')).toHaveLength(1);
        });

        fireEvent.press(getByText('Up'));

        await waitFor(() => {
          expect(getByText('Drawing card...')).toBeTruthy();
        });

        await waitFor(() => {
          expect(getAllByTestId('card-image')).toHaveLength(2);
        });

        expect(getByText('Up')).toBeTruthy();
        expect(getByText('Down')).toBeTruthy();
        expect(getByText('Better luck next draw :(')).toBeTruthy();
      });

      test('should render correctly on down button interaction', async () => {
        jest
          .spyOn(cardsService, 'drawCard')
          .mockReturnValueOnce(of(drawCardApi.successResponse(cards[0])))
          .mockReturnValueOnce(of(drawCardApi.successResponse(cards[1])));

        const { getAllByTestId, getByText } = render(<HomeScreen />);

        await waitFor(() => {
          expect(getAllByTestId('card-image')).toHaveLength(1);
        });

        fireEvent.press(getByText('Down'));

        await waitFor(() => {
          expect(getByText('Drawing card...')).toBeTruthy();
        });

        await waitFor(() => {
          expect(getAllByTestId('card-image')).toHaveLength(2);
        });

        expect(getByText('Up')).toBeTruthy();
        expect(getByText('Down')).toBeTruthy();
        expect(getByText('Better luck next draw :(')).toBeTruthy();
      });
    });
  });

  describe('error cases', () => {
    describe('failed startup', () => {
      test('should render correctly on failed startup', async () => {
        jest
          .spyOn(cardsService, 'drawCard')
          .mockReturnValueOnce(of(drawCardApi.failedResponse));

        const { getByText } = render(<HomeScreen />);

        await waitFor(() => {
          expect(getByText('Start')).toBeTruthy();
        });

        expect(getByText('Where did that card go?')).toBeTruthy();
      });

      test('should recover correctly from failed startup', async () => {
        jest
          .spyOn(cardsService, 'drawCard')
          .mockReturnValueOnce(of(drawCardApi.failedResponse))
          .mockReturnValueOnce(of(drawCardApi.successResponse(cards[0])));

        const { getAllByTestId, getByText } = render(<HomeScreen />);

        await waitFor(() => {
          expect(getByText('Where did that card go?')).toBeTruthy();
        });

        fireEvent.press(getByText('Start'));

        expect(getByText('Drawing card...')).toBeTruthy();

        await waitFor(() => {
          expect(getAllByTestId('card-image')).toHaveLength(1);
        });

        expect(getByText('Up')).toBeTruthy();
        expect(getByText('Down')).toBeTruthy();
      });
    });

    describe('failed place bet', () => {
      test('should render correctly on failed draw', async () => {
        jest
          .spyOn(cardsService, 'drawCard')
          .mockReturnValueOnce(of(drawCardApi.successResponse(cards[0])))
          .mockReturnValueOnce(of(drawCardApi.failedResponse));

        const { getAllByTestId, getByText } = render(<HomeScreen />);

        await waitFor(() => {
          expect(getAllByTestId('card-image')).toHaveLength(1);
        });

        fireEvent.press(getByText('Up'));

        await waitFor(() => {
          expect(getAllByTestId('card-image')).toHaveLength(1);
        });

        expect(getByText('Up')).toBeTruthy();
        expect(getByText('Down')).toBeTruthy();
        expect(getByText('Where did that card go?')).toBeTruthy();
      });

      test('should recover correctly on failed draw', async () => {
        jest
          .spyOn(cardsService, 'drawCard')
          .mockReturnValueOnce(of(drawCardApi.successResponse(cards[0])))
          .mockReturnValueOnce(of(drawCardApi.failedResponse))
          .mockReturnValueOnce(of(drawCardApi.successResponse(cards[1])));

        const { getAllByTestId, getByText } = render(<HomeScreen />);

        await waitFor(() => {
          expect(getAllByTestId('card-image')).toHaveLength(1);
        });

        fireEvent.press(getByText('Up'));

        await waitFor(() => {
          expect(getAllByTestId('card-image')).toHaveLength(1);
        });

        expect(getByText('Up')).toBeTruthy();
        expect(getByText('Down')).toBeTruthy();
        expect(getByText('Where did that card go?')).toBeTruthy();

        fireEvent.press(getByText('Up'));

        await waitFor(() => {
          expect(getAllByTestId('card-image')).toHaveLength(2);
        });

        expect(getByText('Up')).toBeTruthy();
        expect(getByText('Down')).toBeTruthy();
        expect(getByText('You won!!')).toBeTruthy();
      });
    });
  });
});
