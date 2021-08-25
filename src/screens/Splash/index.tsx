import React, {FC} from 'react';
import {ActivityIndicator, Button, Text, View} from 'react-native';
import {useSplashPresenter} from 'screens/Splash/presenter';

const SplashScreen: FC = () => {
  const {user} = useSplashPresenter();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Loading</Text>
    </View>
  );
};

export default SplashScreen;
