import {useState} from 'react';

type SplashPresenter = {
  user: string;
};

export const useSplashPresenter = (): SplashPresenter => {
  const [user, setUser] = useState('');

  return {user};
};
