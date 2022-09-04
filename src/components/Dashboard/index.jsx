import { useContext, useEffect, useState } from 'react';
import { createClient } from 'contentful-management';

import AuthView from '../AuthView';
import { LoginScreen } from './styles';
import { fetchAxiSvgContent, getFromLocalStorage, saveToLocalStorage } from '../../utils';
import { store } from '../../providers/store';
import { CONTENT_TYPE_ID, CONTENT_TYPE_NAME, PLOT } from '../../constants';
import BurstSpinner from '../BurstSpinner';

const Dashboard = ({ updateAppMode }) => {
  const globalState = useContext(store);
  const { dispatch, entries } = globalState;
  const SPACE_ID = 'spaceId';
  const TOKEN = 'accessToken';
  const isDevMode = process.env.NODE_ENV === 'development';

  const [isLoading, setIsLoading] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isAutoSignIn, setIsAutoSignIn] = useState(true);
  const [retrievedEntries, setRetrievedEntries] = useState(false);
  const [fieldCreds, setFieldCreds] = useState({
    values: {
      [TOKEN]: isDevMode ? process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN : '',
      [SPACE_ID]: isDevMode ? process.env.NEXT_PUBLIC_SPACE : '',
    },
    errors: {
      [TOKEN]: '',
      [SPACE_ID]: '',
    },
  });
  const credentialsLocalStorage = getFromLocalStorage('contentfulCreds');

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

  // Move this process to after sign-in and before fetching content
  const checkContentType = async (space) => {
    const contentTypeExists = await space.getEnvironment('master')
      .then((environment) => environment.getContentTypes())
      .then((response) => {
        const contentTypeIds = response.items.map(item => item.sys.id);
        return contentTypeIds.includes(CONTENT_TYPE_ID);
      })
      .catch(console.error);

    return contentTypeExists;
  };

  const createContentType = async (space) => {
    // Create the new content type for AxiDraw SVG data
    await space.getEnvironment('master')
      .then((environment) => environment.createContentTypeWithId(CONTENT_TYPE_ID, {
        name: CONTENT_TYPE_NAME,
        fields: [
          {
            id: 'title',
            name: 'Title',
            type: 'Symbol',
            localized: false,
            required: true,
          },
          {
            id: 'description',
            name: 'Description',
            type: 'Symbol',
            localized: false,
            required: false,
          },
          {
            id: 'thumbnail',
            name: 'Thumbnail',
            type: 'Link',
            localized: false,
            required: false,
            linkType: 'Asset'
          },
          {
            id: 'svgFile',
            name: 'SVG File',
            type: 'Link',
            localized: false,
            required: false,
            linkType: 'Asset'
          }
        ]
      }))
      .then((contentType) => console.info(`Content type ${contentType.sys.id} was created.`))
      .catch(console.error);

    // Activate (publish) the new axiSvgData content type
    await space.getEnvironment('master')
      .then((environment) => environment.getContentType(CONTENT_TYPE_ID))
      .then((contentType) => contentType.publish())
      .then((contentType) => console.info(`Content type ${contentType.sys.id} was activated.`))
      .catch(console.error);
  };

  const confirmContentTypeExists = async (space) => {
    const typeExists = await checkContentType(space);
    if (typeExists) {
      return true;
    }
    console.log('Content type does not exist yet. Creating it now…');
    await createContentType(space);
    return false;
  };

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
      // await confirmContentTypeExists(space);
      // const data = await fetchAxiSvgContent(space);
      console.log("checking if content type exists");
      return null;  // delete this
      // const exists = await confirmContentTypeExists(space);
      // console.log(exists ? "It exists" : "It does not yet exist");
      // const data = exists ? await fetchAxiSvgContent(space) : {};
      // console.log("data is", data);

      // // 2. Save content into local storage
      // saveToLocalStorage('axiSvgContent', data);
      // dispatch({
      //   type: 'SET_ENTRIES_DATA',
      //   payload: {
      //     data,
      //   },
      // });

      // // 3. Show the main app component
      // updateAppMode(PLOT);
    } catch (err) {
      updateSignInErrors(err);
      setIsSigningIn(false);
      // throw err
    }

    return true
  }

  useEffect(() => {
    console.log('hello there');
    // THE CODE INSIDE THIS useEffect IS ALMOST IDENTICAL
    // TO THE CODE THAT RUNS WHEN USER CLICKS SIGN IN.
    // MAYBE THEY CAN BE CONSOLIDATED
    // if (!credentialsLocalStorage?.accessToken || !credentialsLocalStorage?.spaceId) {
    //   setIsAutoSignIn(false);
    //   // return;
    // }

    const initClientFromStoredCreds = async () => {
      // setIsAutoSignIn(true);
      setRetrievedEntries(true);
      try {
        const { accessToken, spaceId } = credentialsLocalStorage;
        const client = createClient({ accessToken: accessToken });
        const space = await client.getSpace(spaceId);
        console.log('got space');

        const user = await client.getCurrentUser();
        const { email, firstName, lastName, avatarUrl } = user;
        console.log('got user');
        dispatch({
          type: 'SET_USER',
          payload: {
            data: { email, firstName, lastName, avatarUrl }
          },
        });

        // 1. Authenticated! Now fetch Axi SVG Content
        setIsLoading(true);
        const data = await fetchAxiSvgContent(space);
        console.log('got data');

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
        // setIsAutoSignIn(false);
        console.error('Auto sign-in failed', err);
      }

      return true;
    }

    const hasCredentials = credentialsLocalStorage?.accessToken && credentialsLocalStorage?.spaceId;

    if (hasCredentials && !retrievedEntries) {
      console.log('attempting to sign in from stored credentials');
      initClientFromStoredCreds();
    }
  }, [dispatch, credentialsLocalStorage, updateAppMode, retrievedEntries]);

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
