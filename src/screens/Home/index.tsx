import { PrimaryButton } from 'components/buttons';
import { FlexView } from 'components/views';
import React, { FC } from 'react';
import { userHomePresenter } from 'screens/Home/presenter';

const HomeScreen: FC = () => {
  userHomePresenter();

  return (
    <FlexView>
      <PrimaryButton title="Up" />
      <PrimaryButton title="Down" />
    </FlexView>
  );
};

export default HomeScreen;
