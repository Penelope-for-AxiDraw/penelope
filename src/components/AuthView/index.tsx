import { useState } from 'react';

import { CredentialsBox } from './styles';

const AuthView = ({
  attemptSignIn,
  isSigningIn,
  fieldCreds,
  handleChangeInput,
}) => {
  const buttonText = 'Yeah!';
  const SPACE_ID = 'spaceId';
  const TOKEN = 'accessToken';

  const [blanks, setBlanks] = useState({
    [TOKEN]: false,
    [SPACE_ID]: false,
  });

  // useEffect(() => {
  //   const credsLocalStorage = getFromLocalStorage('contentfulCreds');
  //   console.log('creds', credsLocalStorage);
  // }, []);


  // const [fieldCreds, setFieldCreds] = useState({
  //   values: {
  //     [TOKEN]: isDevMode ? process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN : defaultValue,
  //     [SPACE_ID]: isDevMode ? process.env.NEXT_PUBLIC_SPACE: defaultValue,
  //   },
  //   errors: {
  //     [TOKEN]: '',
  //     [SPACE_ID]: '',
  //   },
  // });
  // const [isSigningIn, setIsSigningIn] = useState(false);

  // const fetchAxiSvgContent = async (space) => {
  //   const fieldsToGet = ['title', 'description', 'thumbnail', 'svgFile'];
  //   const { items: entries } = await space.getEnvironment("master")
  //     .then((environment) =>
  //       environment.getEntries({
  //         content_type: 'axiSvgData',
  //         select: fieldsToGet.map(f => `fields.${f}`).join(',')
  //       })
  //     );

  //   const { items: assets } = await space.getEnvironment("master")
  //     .then((environment) => environment.getAssets());

  //   const entriesWithImageUrls = entries.map(item => {
  //     const thumbnailID = item.fields.thumbnail['en-US'].sys.id;
  //     const thumbnailAsset = assets.find(asset => asset.sys.id === thumbnailID);
  //     const svgID = item.fields.svgFile['en-US'].sys.id;
  //     const svgAsset = assets.find(asset => asset.sys.id === svgID);

  //     return ({
  //       description: item.fields.description['en-US'],
  //       title: item.fields.title['en-US'],
  //       images: {
  //         thumbnail: {
  //           id: thumbnailAsset?.sys.id,
  //           url: `https:${thumbnailAsset.fields.file['en-US'].url}`,
  //           fileName: thumbnailAsset?.fields.file['en-US'].fileName,
  //           width: thumbnailAsset?.fields.file['en-US'].details.image.width / 2,
  //           height: thumbnailAsset?.fields.file['en-US'].details.image.height / 2,
  //         },
  //         svg: {
  //           id: svgAsset?.sys.id,
  //           url: `https:${svgAsset.fields.file['en-US'].url}`,
  //           fileName: svgAsset?.fields.file['en-US'].fileName,
  //           width: svgAsset?.fields.file['en-US'].details.image.width,
  //           height: svgAsset?.fields.file['en-US'].details.image.height,
  //         }
  //       },
  //       uploadDate: item.sys.publishedAt,
  //     });
  //   });

  //   return entriesWithImageUrls;
  // }

  const validateFields = () => {
    const blankAccessCode = fieldCreds.values[TOKEN].trim() === '';
    const blankSpace = fieldCreds.values[SPACE_ID].trim() === '';

    if (blankAccessCode || blankSpace) {
      // const updatedCreds = {
      //   ...fieldCreds,
      //   accessToken: {
      //     ...fieldCreds[TOKEN],
      //     error: blankAccessCode ? 'Personal access token cannot be blank' : '',
      //   },
      //   spaceId: {
      //     ...fieldCreds[SPACE_ID],
      //     error: blankSpace ? 'Space ID cannot be blank' : '',
      //   },
      // };
      // const updatedCreds = {
      //   ...fieldCreds,
      //   // values: {
      //   //   [TOKEN]: '',
      //   //   [SPACE_ID]: '',
      //   // },
      //   errors: {
      //     [TOKEN]: blankAccessCode ? 'Personal access token cannot be blank' : '',
      //     [SPACE_ID]: blankSpace ? 'Space ID cannot be blank' : '',
      //   },

      //   // accessToken: {
      //   //   ...fieldCreds[TOKEN],
      //   //   error: blankAccessCode ? 'Personal access token cannot be blank' : '',
      //   // },
      //   // spaceId: {
      //   //   ...fieldCreds[SPACE_ID],
      //   //   error: blankSpace ? 'Space ID cannot be blank' : '',
      //   // },
      // };

      // setFieldCreds(updatedCreds);

      return false;
    }

    return true;
  }

  // const manageSignInError = useCallback((err) => {
  //   const errorObj = JSON.parse(err.message);
  //   let fieldErrorMessage;
  //   let fieldName;

  //   switch (errorObj.status) {
  //     case 404:
  //       fieldErrorMessage = 'Could not find this space ID';
  //       fieldName = SPACE_ID;
  //       break;
  //     case 401:
  //       fieldErrorMessage = 'This personal access token is not valid';
  //       fieldName = TOKEN;
  //       break;
  //     default:
  //       fieldErrorMessage = 'Unknown sign-in error';
  //       fieldName = SPACE_ID;    
  //   }

  //   const updatedCreds = {
  //     ...fieldCreds,
  //     [fieldName]: {
  //       ...fieldCreds[fieldName],
  //       error: fieldErrorMessage,
  //     },
  //   };

  //   setFieldCreds(updatedCreds);
  //   console.error('Error: ', fieldErrorMessage);
  // }, [fieldCreds])

  // const initClientFromInput = async () => {
  //   const areFieldsValid = validateFields();
  //   if (!areFieldsValid) {
  //     return;
  //   }

  //   const accessToken = fieldCreds[TOKEN].value;
  //   const spaceId = fieldCreds[SPACE_ID].value;
  //   setIsSigningIn(true);
  //   let space;

  //   try {
  //     const client = createClient({ accessToken });
  //     space = await client.getSpace(spaceId);

  //     window.localStorage.setItem(
  //       'contentfulCreds',
  //       JSON.stringify({
  //         accessToken,
  //         spaceId,
  //       })
  //     );
  //     console.log('Successfully signed in');
  //     handleSuccess();

  //     // 1. Fetch Axi SVG Content
  //     const data = await fetchAxiSvgContent(space);

  //     // 2. Save content into local storage
  //     saveToLocalStorage(data);
  //     console.log('fetched content and saved to local storage');

  //   } catch (err) {
  //     manageSignInError(err);
  //     setIsSigningIn(false);
  //     // throw err
  //   }
  
  //   return true
  // }

  // const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const updatedCreds = {
  //     ...fieldCreds,
  //     values: {
  //       ...fieldCreds.values,
  //       [e.target.name]: e.target.value,        
  //     },
  //     errors: {
  //       [TOKEN]: '',
  //       [SPACE_ID]: '',
  //     },
  //   };

  //   setFieldCreds(updatedCreds);
  // };

  // const handleClickSignIn = () => {
  //   const areFieldsValid = validateFields();
  //   if (!areFieldsValid) {
  //     return;
  //   }

  //   attemptSignIn(fieldCreds);
  // }

  // useEffect(() => {
  //   const initClientFromStoredCreds = async () => {
  //     const credentialsLocalStorage = getCredentialsLocalStorage();
  //     if (credentialsLocalStorage) {
  //       setIsSigningIn(true);
  //       try {
  //         const { accessToken, spaceId } = credentialsLocalStorage;
  //         const client = createClient({ accessToken });
  //         await client.getSpace(spaceId);
  //         console.log('Successfully signed in');
  //         handleSuccess();
  //       } catch (err) {
  //         // manageSignInError(err);
  //         setIsSigningIn(false);
  //         // throw err
  //       }
      
  //       return true
  //     }
  
  //     return;
  //   }

  //   // Retrieve Contentful credentials from window.localStorage
  //   const credentials = getCredentialsLocalStorage();
  //   if (credentials) {
  //     initClientFromStoredCreds();

  //     // Attempt automatic sign-in; Maybe we can use initClient?
  //     // If automatic sign-in does not work, do NOT show field errors
  //     // This differs from manual sign-in where, if the user enters
  //     // incorrect token/space info, the field should show the error
  //   } else {
  //     console.log('No credentials found in local storage; Show the sign-in fields');
  //     // Display the sign-in fields
  //   }
  //   // If token and space are present
  //   // if () {
  //   //   console.log('found creds in local storage', credsLocalStorage);
  //   //   // Verify they are valid
  //   //   // isValid = getIsValid()
  //   //   // if (isValid) {
  //   //   //   // load this user's SVG content and go to main app screen
  //   //   // } else {
  //   //   //   // Show access token and space input fields
  //   //   // }
  //   //   // If not valid, clear these credentials from localStorage and show the input field
  //   // } else {
  //   //   // Show access token and space input fields
  //   // }
  // }, [handleSuccess, manageSignInError]);

  // const tokenError = fieldCreds.errors[TOKEN] || errors[TOKEN] || '';
  // const spaceError = fieldCreds.errors[SPACE_ID] || errors[SPACE_ID] || '';
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

  // const checkHasContent = (e) => {
  //   const isBlank = e.target.value.trim() === '';
  //   setBlanks({
  //     ...blanks,
  //     [e.target.name]: isBlank,
  //   });
  // }

  const anyBlankFields = blanks[TOKEN] || blanks[SPACE_ID];

  return (
    <CredentialsBox>
      <p>Enter your Contentful personal access token and space ID</p>
      <div className="field-cont">
        <input
          className="login-field"
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
          className="login-field"
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

      {/* <button className="login-button" onClick={() => initClientFromInput()} disabled={isSigningIn}>
        {buttonText}
      </button> */}
      <button className="login-button" onClick={() => attemptSignIn(fieldCreds)} disabled={isSigningIn || anyBlankFields}>
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


// const getCredentialsLocalStorage = () => {
//   // const credsLocalStorage = JSON.parse(window.localStorage.getItem('contentfulCreds'));
//   const credsLocalStorage = getFromLocalStorage('contentfulCreds');
//   if (credsLocalStorage.accessToken && credsLocalStorage.spaceId) {
//     return credsLocalStorage;
//   }

//   return null;
// };
