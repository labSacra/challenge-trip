import {useNavigation} from '@react-navigation/native';

type SplashRouter = {
  goToLogin: () => void;
};

export const useSplashRouter = (): SplashRouter => {
  const navigation = useNavigation();

  return {
    goToLogin: () => navigation.navigate('Login'),
  };
};
