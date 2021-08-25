import { Button } from 'components/buttons';
import { FlexView } from 'components/views';
import React, { FC } from 'react';
import { Text } from 'react-native';
import { useHomePresenter } from 'screens/Home/presenter';
import { WrapperView, StyledImage } from 'screens/Home/styles';

const HomeScreen: FC = () => {
  const { values, placeBet } = useHomePresenter();

  return (
    <FlexView>
      <Text>{values.outcome}</Text>
      <WrapperView>
        {values.cards.map(card => (
          <StyledImage key={card.code} source={{ uri: card.image }} />
        ))}
      </WrapperView>
      <WrapperView>
        <Button title="Up" onPress={() => placeBet('UP')} />
        <Button title="Down" onPress={() => placeBet('DOWN')} />
      </WrapperView>
    </FlexView>
  );
};

export default HomeScreen;
