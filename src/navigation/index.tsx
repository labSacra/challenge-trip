import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useNavigationPresenter} from 'navigation/presenter';
import React from 'react';

import HomeScreen from 'screens/Home';
import SplashScreen from 'screens/Splash';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
