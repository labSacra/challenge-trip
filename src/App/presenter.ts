import { repoInitializationUseCase } from 'domain/initialization/useCases/repoInitializationUseCase';
import { useEffect, useState } from 'react';

type AppPresenter = {
  isReady: boolean;
};

const useAppPresenter = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const subscription = repoInitializationUseCase().subscribe({
      error: err => console.log(`Error initializing Repos: ${err.message}`),
      complete: () => {
        console.log('Repo initialization successful');
        setIsReady(true);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    isReady,
  };
};

export default useAppPresenter;
