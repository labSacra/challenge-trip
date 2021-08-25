import { Button } from 'components/buttons';
import { ErrorText, Text } from 'components/texts';
import { FlexView } from 'components/views';
import React, { FC } from 'react';
import { useHomePresenter } from 'screens/Home/presenter';
import { WrapperView, StyledImage } from 'screens/Home/styles';

const HomeScreen: FC = () => {
  const { values, onPress } = useHomePresenter();

  return (
    <FlexView>
      {!values.loading && values.outcome && (
        <Text>
          {values.outcome === 'WIN' ? 'You won!!' : 'Better luck next draw :('}
        </Text>
      )}
      {values.loading && <Text>Drawing card...</Text>}
      <WrapperView>
        {values.cards.map(card => (
          <StyledImage key={card.code} source={{ uri: card.image }} />
        ))}
      </WrapperView>
      {values.cards.length > 0 && (
        <WrapperView>
          <Button
            title="Up"
            onPress={() => onPress.placeBet('UP')}
            isDisabled={values.loading}
          />
          <Button
            title="Down"
            onPress={() => onPress.placeBet('DOWN')}
            isDisabled={values.loading}
          />
        </WrapperView>
      )}
      {values.error && values.cards.length === 0 && (
        <Button
          title="Start"
          onPress={onPress.startGame}
          isDisabled={values.loading}
        />
      )}
      {values.error && <ErrorText>{values.error}</ErrorText>}
    </FlexView>
  );
};

export default HomeScreen;
