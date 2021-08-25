import { Button } from 'components/buttons';
import { FlexView } from 'components/views';
import React, { FC } from 'react';
import { useHomePresenter } from 'screens/Home/presenter';
import { WrapperView, StyledImage } from 'screens/Home/styles';

const HomeScreen: FC = () => {
  const { cards, placeBet } = useHomePresenter();

  return (
    <FlexView>
      <WrapperView>
        {cards.map(card => (
          <StyledImage key={card.code} source={{ uri: card.image }} />
        ))}
      </WrapperView>
      <WrapperView>
        <Button title="Up" onPress={placeBet} />
        <Button title="Down" />
      </WrapperView>
    </FlexView>
  );
};

export default HomeScreen;
