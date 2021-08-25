import {observeUserRepoUseCase} from 'domain/authentication/useCases/subscribeToUserUseCase';
import {useEffect, useState} from 'react';

type NavigationState = 'Loading' | 'Not_Authenticated' | 'Authenticated';

type NavigationPresenter = {
  navigationState: NavigationState;
};

export const useNavigationPresenter = (): NavigationPresenter => {
  const [navigationState, setNavigationState] = useState<NavigationState>(
    'Loading',
  );

  return {
    navigationState,
  };
};
