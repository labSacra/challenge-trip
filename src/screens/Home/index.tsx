import React, {FC} from 'react';
import {Button, Text, View} from 'react-native';
import Component1 from 'screens/Home/components/Component1';
import Component2 from 'screens/Home/components/Component2';
import Component3 from 'screens/Home/components/Component3';
import {userHomePresenter} from 'screens/Home/presenter';

const HomeScreen: FC = () => {
  userHomePresenter();

  return (
    <View style={{flex: 1}}>
    </View>
  );
};

export default HomeScreen;
