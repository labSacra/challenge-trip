import { useState } from 'react';

type AppPresenter = {
  isReady: boolean;
};

const useAppPresenter = () => {
  const [isReady, setIsReady] = useState(true);
  return {
    isReady,
  };
};

export default useAppPresenter;
