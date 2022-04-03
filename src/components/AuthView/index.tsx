import { useState } from 'react';

import { CredentialsBox } from './styles';

const AuthView = ({
  attemptSignIn,
  isSigningIn,
  fieldCreds,
  handleChangeInput,
}) => {
  const SPACE_ID = 'spaceId';
  const TOKEN = 'accessToken';

  const [blanks, setBlanks] = useState({
    [TOKEN]: false,
    [SPACE_ID]: false,
  });

  const tokenError = fieldCreds.errors[TOKEN];
  const spaceError = fieldCreds.errors[SPACE_ID];

  const doHandleChangeInput = (e) => {
    const isBlank = e.target.value.trim() === '';
    setBlanks({
      ...blanks,
      [e.target.name]: isBlank,
    });
    handleChangeInput(e);
  };

  const anyBlankFields = blanks[TOKEN] || blanks[SPACE_ID];

  return (
    <CredentialsBox>
      <p>Enter your Contentful personal access token and space ID</p>
      <div className="field-cont">
        <input
          className="input-field"
          placeholder="your-personal-access-token"
          onChange={doHandleChangeInput}
          value={fieldCreds.values[TOKEN]}
          name="accessToken"
          disabled={isSigningIn}
        />
      </div>
      {tokenError && (
        <p className="input-field-error">{tokenError}</p>
      )}

      <div className="field-cont">
        <input
          className="input-field"
          placeholder="your-space-ID"
          onChange={doHandleChangeInput}
          value={fieldCreds.values[SPACE_ID]}
          name="spaceId"
          disabled={isSigningIn}
        />
      </div>
      {spaceError && (
        <p className="input-field-error">{spaceError}</p>
      )}

      {anyBlankFields && (
        <p className="input-field-error">Please enter both an access token and a space ID</p>
      )}

      <button
        className="login-button"
        onClick={() => attemptSignIn(fieldCreds)}
        disabled={isSigningIn || anyBlankFields}
      >
        Yeah!
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
