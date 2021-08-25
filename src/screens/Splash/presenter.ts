import { useEffect, useState } from 'react';
import { useSplashRouter } from 'screens/Splash/router';

type SplashPresenter = {};

export const useSplashPresenter = (): SplashPresenter => {
  const { goToHome } = useSplashRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      goToHome();
    }, 1000);

    return () => {
      clearInterval(timeout);
    };
  }, []);

  return {};
};
