import {NavigationContainer} from '@react-navigation/native';
import useAppPresenter from 'App/presenter';
import RootNavigation from 'navigation';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const App = () => {
  const {isReady} = useAppPresenter();

  return (
    <NavigationContainer>
      {isReady ? (
        <RootNavigation />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </NavigationContainer>
  );
};

export default App;
