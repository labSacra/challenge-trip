import React, {FC} from 'react';
import {Button, Text, View} from 'react-native';
import {userHomePresenter} from 'screens/Home/presenter';

const HomeScreen: FC = () => {
  userHomePresenter();

  return (
    <View style={{flex: 1}}>
    </View>
  );
};

export default HomeScreen;
