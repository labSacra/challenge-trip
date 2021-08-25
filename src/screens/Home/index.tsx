import { Button } from 'components/buttons';
import { FlexView } from 'components/views';
import React, { FC } from 'react';
import { useHomePresenter } from 'screens/Home/presenter';
import { WrapperView, StyledImage } from 'screens/Home/styles';

const HomeScreen: FC = () => {
  useHomePresenter();

  return (
    <FlexView>
      <WrapperView>
        <StyledImage
          source={{ uri: 'https://deckofcardsapi.com/static/img/JD.png' }}
        />
        <StyledImage
          source={{ uri: 'https://deckofcardsapi.com/static/img/QD.png' }}
        />
      </WrapperView>
      <WrapperView>
        <Button title="Up" />
        <Button title="Down" />
      </WrapperView>
    </FlexView>
  );
};

export default HomeScreen;
