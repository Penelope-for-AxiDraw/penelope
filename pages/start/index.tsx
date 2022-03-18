import { useState } from 'react';

import LoadingView from '../../src/components/LoadingView';
import AuthView from '../../src/components/AuthView';
import { LoginScreen } from './styles';
// import { store } from '../../src/providers/store';

const Start = () => {
  // const globalState = useContext(store);
  // const { state: { user } } = globalState;

  const [loading, setLoading] = useState(false);

  return (
    <>
      <LoginScreen>
        {loading ? (
          <LoadingView />
        ) : (
          <AuthView handleSuccess={() => setLoading(true)} />
        )}
      </LoginScreen>
    </>
  );
};

export default Start;
