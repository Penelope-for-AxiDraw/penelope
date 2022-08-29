import { useContext, useEffect, useState } from 'react';
import { createClient } from 'contentful-management';

import AuthView from '../AuthView';
import { LoginScreen } from './styles';
import { fetchAxiSvgContent, getFromLocalStorage, saveToLocalStorage } from '../../utils';
import { store } from '../../providers/store';
import { PLOT } from '../../constants';
import BurstSpinner from '../BurstSpinner';

const Dashboard = ({ updateAppMode }) => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const SPACE_ID = 'spaceId';
  const TOKEN = 'accessToken';
  const isDevMode = process.env.NODE_ENV === 'development';

  const [isLoading, setIsLoading] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isAutoSignIn, setIsAutoSignIn] = useState(false);
  const [fieldCreds, setFieldCreds] = useState({
    values: {
      [TOKEN]: isDevMode ? process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN : '',
      [SPACE_ID]: isDevMode ? process.env.NEXT_PUBLIC_SPACE: '',
    },
    errors: {
      [TOKEN]: '',
      [SPACE_ID]: '',
    },
  });

  const handleChangeInput = (e) => {
    const updatedCreds = {
      ...fieldCreds,
      values: {
        ...fieldCreds.values,
        [e.target.name]: e.target.value,        
      },
      errors: {
        [TOKEN]: '',
        [SPACE_ID]: '',
      },
    };

    setFieldCreds(updatedCreds);
  };

  const updateSignInErrors = (err) => {
    console.error(err);
  }

  const initClientFromInput = async (fieldCreds) => {
    const accessToken = fieldCreds.values[TOKEN];
    const spaceId = fieldCreds.values[SPACE_ID];
    setIsSigningIn(true);

    try {
      const client = createClient({ accessToken });
      const space = await client.getSpace(spaceId);

      const user = await client.getCurrentUser();
      const { email, firstName, lastName, avatarUrl } = user;
      dispatch({
        type: 'SET_USER',
        payload: {
          data: { email, firstName, lastName, avatarUrl }
        },
      });

      saveToLocalStorage('contentfulCreds', { accessToken, spaceId });

      // 1. Authenticated! Now fetch Axi SVG Content
      setIsLoading(true);
      const data = await fetchAxiSvgContent(space);

      // 2. Save content into local storage
      saveToLocalStorage('axiSvgContent', data);
      dispatch({
        type: 'SET_ENTRIES_DATA',
        payload: {
          data,
        },
      });

      // 3. Show the main app component
      updateAppMode(PLOT);
    } catch (err) {
      updateSignInErrors(err);
      setIsSigningIn(false);
      // throw err
    }
  
    return true
  }

  useEffect(() => {
    // THE CODE INSIDE THIS useEffect IS ALMOST IDENTICAL
    // TO THE CODE THAT RUNS WHEN USER CLICKS SIGN IN.
    // MAYBE THEY CAN BE CONSOLIDATED
    const initClientFromStoredCreds = async () => {
      const credentialsLocalStorage = getFromLocalStorage('contentfulCreds');
      if (!credentialsLocalStorage?.accessToken || !credentialsLocalStorage?.spaceId) {
        return;
      }

      setIsAutoSignIn(true);
      try {
        const { accessToken, spaceId } = credentialsLocalStorage;
        const client = createClient({ accessToken: accessToken });
        const space = await client.getSpace(spaceId);
  
        const user = await client.getCurrentUser();
        const { email, firstName, lastName, avatarUrl } = user;
        dispatch({
          type: 'SET_USER',
          payload: {
            data: { email, firstName, lastName, avatarUrl }
          },
        });

        // 1. Authenticated! Now fetch Axi SVG Content
        setIsLoading(true);
        const data = await fetchAxiSvgContent(space);

        // 2. Save content into local storage
        saveToLocalStorage('axiSvgContent', data);
        dispatch({
          type: 'SET_ENTRIES_DATA',
          payload: {
            data,
          },
        });
  
        // 3. Show the main app component
        updateAppMode(PLOT);
      } catch (err) {
        setIsAutoSignIn(false);
        console.error('Auto sign-in failed', err);
      }
    
      return true;
    }

    if (!isAutoSignIn) {
      initClientFromStoredCreds();
    }

  }, [dispatch, isAutoSignIn, updateAppMode]);

  return (
    <>
      <LoginScreen>
        {isLoading || isAutoSignIn ? (
          <div className="dashboard-spinner">
            <BurstSpinner bgCo={[240, 238, 246]} ringCo={[107, 0, 255]} />
          </div>
        ) : (
          <AuthView
            attemptSignIn={initClientFromInput}
            isSigningIn={isSigningIn}
            fieldCreds={fieldCreds}
            handleChangeInput={handleChangeInput}
          />
        )}
      </LoginScreen>
    </>
  );
};

export default Dashboard;
