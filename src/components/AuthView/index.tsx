import { useEffect, useCallback, useState } from 'react';
import { createClient } from 'contentful-management';
// import { useRouter } from 'next/router';

import { CredentialsBox } from './styles';

const AuthView = ({ handleSuccess }) => {
  const isDevMode = process.env.NODE_ENV === 'development';
  const defaultValue = 'xxxxxxxx';
  const buttonText = 'Yeah!';
  const SPACE_ID = 'spaceId';
  const TOKEN = 'accessToken';
  // const router = useRouter();

  // const globalState = useContext(store);
  // const { state: { user } } = globalState;

  const [fieldCreds, setFieldCreds] = useState({
    accessToken: {
      value: isDevMode ? process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN : defaultValue,
      error: '',
    },
    spaceId: { 
      value: isDevMode ? process.env.NEXT_PUBLIC_SPACE: defaultValue,
      error: '',
    },
  });
  const [isSigningIn, setIsSigningIn] = useState(true);

  const validateFields = () => {
    const blankAccessCode = fieldCreds[TOKEN].value.trim() === '';
    const blankSpace = fieldCreds[SPACE_ID].value.trim() === '';

    if (blankAccessCode || blankSpace) {
      const updatedCreds = {
        ...fieldCreds,
        accessToken: {
          ...fieldCreds[TOKEN],
          error: blankAccessCode ? 'Personal access token cannot be blank' : '',
        },
        spaceId: {
          ...fieldCreds[SPACE_ID],
          error: blankSpace ? 'Space ID cannot be blank' : '',
        },
      };

      setFieldCreds(updatedCreds);

      return false;
    }

    return true;
  }

  const manageSignInError = useCallback((err) => {
    const errorObj = JSON.parse(err.message);
    let fieldErrorMessage;
    let fieldName;

    switch (errorObj.status) {
      case 404:
        fieldErrorMessage = 'Could not find this space ID';
        fieldName = SPACE_ID;
        break;
      case 401:
        fieldErrorMessage = 'This personal access token is not valid';
        fieldName = TOKEN;
        break;
      default:
        fieldErrorMessage = 'Unknown sign-in error';
        fieldName = SPACE_ID;    
    }

    const updatedCreds = {
      ...fieldCreds,
      [fieldName]: {
        ...fieldCreds[fieldName],
        error: fieldErrorMessage,
      },
    };

    setFieldCreds(updatedCreds);
    console.error('Error: ', fieldErrorMessage);
  }, [fieldCreds])

  const initClientFromInput = async () => {
    const areFieldsValid = validateFields();
    if (!areFieldsValid) {
      return;
    }

    const accessToken = fieldCreds[TOKEN].value;
    const spaceId = fieldCreds[SPACE_ID].value;
    setIsSigningIn(true);
    try {
      const client = createClient({ accessToken });
      await client.getSpace(spaceId);

      window.localStorage.setItem(
        'contentfulCreds',
        JSON.stringify({
          accessToken,
          spaceId,
        })
      );
      console.log('Successfully signed in');
      handleSuccess();
    } catch (err) {
      manageSignInError(err);
      setIsSigningIn(false);
      // throw err
    }
  
    return true
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCreds = {
      ...fieldCreds,
      [e.target.name]: {
        value: e.target.value,
        error: '',
      },
    };

    setFieldCreds(updatedCreds);
  };

  useEffect(() => {
    const initClientFromStoredCreds = async () => {
      const credentialsLocalStorage = getCredentialsLocalStorage();
      if (credentialsLocalStorage) {
        setIsSigningIn(true);
        try {
          const { accessToken, spaceId } = credentialsLocalStorage;
          const client = createClient({ accessToken });
          await client.getSpace(spaceId);
          console.log('Successfully signed in');
          handleSuccess();
        } catch (err) {
          // manageSignInError(err);
          setIsSigningIn(false);
          // throw err
        }
      
        return true
      }
  
      return;
    }

    // Retrieve Contentful credentials from window.localStorage
    const credentials = getCredentialsLocalStorage();
    if (credentials) {
      initClientFromStoredCreds();

      // Attempt automatic sign-in; Maybe we can use initClient?
      // If automatic sign-in does not work, do NOT show field errors
      // This differs from manual sign-in where, if the user enters
      // incorrect token/space info, the field should show the error
    } else {
      console.log('No credentials found in local storage; Show the sign-in fields');
      // Display the sign-in fields
    }
    // If token and space are present
    // if () {
    //   console.log('found creds in local storage', credsLocalStorage);
    //   // Verify they are valid
    //   // isValid = getIsValid()
    //   // if (isValid) {
    //   //   // load this user's SVG content and go to main app screen
    //   // } else {
    //   //   // Show access token and space input fields
    //   // }
    //   // If not valid, clear these credentials from localStorage and show the input field
    // } else {
    //   // Show access token and space input fields
    // }
  }, [handleSuccess, manageSignInError]);
  return (
    <CredentialsBox>
      <p>Enter your Contentful personal access token and space ID</p>
      <div className="field-cont">
        <input
          className="login-field"
          placeholder="your-personal-access-token"
          onChange={handleChangeInput}
          value={fieldCreds[TOKEN].value}
          name="accessToken"
          disabled={isSigningIn}
        />
      </div>
      {fieldCreds[TOKEN].error && (
        <p className="input-field-error">{fieldCreds[TOKEN].error}</p>
      )}

      <div className="field-cont">
        <input
          className="login-field"
          placeholder="your-space-ID"
          onChange={handleChangeInput}
          value={fieldCreds[SPACE_ID].value}
          name="spaceId"
          disabled={isSigningIn}
        />
      </div>
      {fieldCreds[SPACE_ID].error && (
        <p className="input-field-error">{fieldCreds[SPACE_ID].error}</p>
      )}

      {/* <button className="login-button" onClick={handleClickSignIn}> */}
      <button className="login-button" onClick={() => initClientFromInput()} disabled={isSigningIn}>
        {buttonText}
      </button>

      <p className="input-field-hint">
        Don&apos;t have a token?{" "}
        <a
          rel="noreferrer"
          href="https://www.contentful.com/developers/docs/references/authentication/#:~:text=Getting%20a%20personal%20access%20token,section%20and%20create%20a%20token."
          target="_blank"
        >
          Click here for info about getting one
        </a>
        .
      </p>
    </CredentialsBox>
  );
};

export default AuthView;


const getCredentialsLocalStorage = () => {
  const credsLocalStorage = JSON.parse(window.localStorage.getItem('contentfulCreds'));
  if (credsLocalStorage.accessToken && credsLocalStorage.spaceId) {
    return credsLocalStorage;
  }

  return null;
};
