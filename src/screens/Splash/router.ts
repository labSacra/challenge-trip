import { useNavigation } from '@react-navigation/native';

type SplashRouter = {
  goToHome: () => void;
};

export const useSplashRouter = (): SplashRouter => {
  const navigation = useNavigation();

  /**
   * @todo Update navigation types to understand screens strings
   */
  return {
    goToHome: () => navigation.navigate('Home'),
  };
};
