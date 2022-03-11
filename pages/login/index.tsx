import { isValidElement, useEffect, useState } from 'react';
import { createClient } from 'contentful-management';

import { CredentialsBox, LoginScreen } from './styles';
import Spinner from '../../src/components/Spinner';

const Login = () => {
  const isDevMode = process.env.NODE_ENV === 'development';
  const defaultValue = 'xxxxxxxx';
  const buttonText = 'Yeah!';
  const SPACE_ID = 'spaceId';
  const TOKEN = 'accessToken';

  const [loading, setLoading] = useState(false);
  const [creds, setCreds] = useState({
    accessToken: {
      value: isDevMode ? process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN : defaultValue,
      error: '',
    },
    spaceId: { 
      value: isDevMode ? process.env.NEXT_PUBLIC_SPACE: defaultValue,
      error: '',
    },
  });

  const validateFields = () => {
    const blankAccessCode = creds.accessToken.value.trim() === '';
    const blankSpace = creds.spaceId.value.trim() === '';

    if (blankAccessCode || blankSpace) {
      const updatedCreds = {
        ...creds,
        accessToken: {
          ...creds.accessToken,
          error: blankAccessCode ? 'Personal access token cannot be blank' : '',
        },
        spaceId: {
          ...creds.spaceId,
          error: blankSpace ? 'Space ID cannot be blank' : '',
        },
      };

      setCreds(updatedCreds);

      return false;
    }

    return true;
  }

  const manageSignInError = (err) => {
    const errorObj = JSON.parse(err.message);
    let fieldErrorMessage;
    let fieldName;

    switch (errorObj.status) {
      case 404:
        fieldErrorMessage = 'Could not find this space ID';
        fieldName = 'spaceId';
        break;
      case 401:
        fieldErrorMessage = 'This personal access token is not valid';
        fieldName = 'accessToken';
        break;
      default:
        fieldErrorMessage = 'Unknown sign-in error';
        fieldName = 'spaceId';    
    }

    const updatedCreds = {
      ...creds,
      [fieldName]: {
        ...creds[fieldName],
        error: fieldErrorMessage,
      },
    };

    setCreds(updatedCreds);
    console.error('Error: ', fieldErrorMessage);
  }

  const initClient = async () => {
    const areFieldsValid = validateFields();
    if (!areFieldsValid) {
      return;
    }

    const accessToken = creds.accessToken.value;
    const spaceId = creds.spaceId.value;
    let client = null;
    let space = null;  

    try {
      client = createClient({ accessToken });
      space = await client.getSpace(spaceId);

      window.localStorage.setItem(
        'contentfulCreds',
        JSON.stringify({
          personalAccessToken: accessToken,
          space: spaceId,
        })
      );
      console.log('Successfully signed in');
      setLoading(true);

      // 1. Fetch Axi SVG Content
      const dat = await fetchAxiSvgContent(space);

      // 2. Save content into application state
      updateStore(dat);

      // 3. Go to main app screen
      // …

    } catch (err) {
      manageSignInError(err);
      // throw err
    }
  
    return true
  }

  // const loadUserContent = async () => {};

  const fetchAxiSvgContent = async (space) => {
    const fieldsToGet = ['title', 'description', 'thumbnail', 'svgFile'];
    const { items: entries } = await space.getEnvironment("master")
      .then((environment) =>
        environment.getEntries({
          content_type: 'axiSvgData',
          select: fieldsToGet.map(f => `fields.${f}`).join(',')
        })
      );

    const { items: assets } = await space.getEnvironment("master")
      .then((environment) => environment.getAssets());

    const entriesWithImageUrls = entries.map(item => {
      const thumbnailID = item.fields.thumbnail['en-US'].sys.id;
      const thumbnailAsset = assets.find(asset => asset.sys.id === thumbnailID);
      const svgID = item.fields.svgFile['en-US'].sys.id;
      const svgAsset = assets.find(asset => asset.sys.id === svgID);

      return ({
        description: item.fields.description['en-US'],
        title: item.fields.title['en-US'],
        images: {
          thumbnail: {
            id: thumbnailAsset?.sys.id,
            url: `https:${thumbnailAsset.fields.file['en-US'].url}`,
            fileName: thumbnailAsset?.fields.file['en-US'].fileName,
            width: thumbnailAsset?.fields.file['en-US'].details.image.width / 2,
            height: thumbnailAsset?.fields.file['en-US'].details.image.height / 2,
          },
          svg: {
            id: svgAsset?.sys.id,
            url: `https:${svgAsset.fields.file['en-US'].url}`,
            fileName: svgAsset?.fields.file['en-US'].fileName,
            width: svgAsset?.fields.file['en-US'].details.image.width,
            height: svgAsset?.fields.file['en-US'].details.image.height,
          }
        },
        uploadDate: item.sys.publishedAt,
      });
    });

    return entriesWithImageUrls;
    // setEntries(entriesWithImageUrls);
  }

  const updateStore = (data) => {
    console.log('Update store with this data:');
    console.log(data);
    // TBD
  };

  // const handleClickSignIn = () => {
  //   // if (isValidCredentials()) {
  //   //   console.log('This token is valid. Loading your content...');
  //   //   window.localStorage.setItem('contentfulCreds', JSON.stringify({personalAccessToken: creds.accessToken.value, space: creds.spaceId.value}));
  //   //   // Load this user's SVG content and go to the main app screen
  //   //   // loadUserContent()
  //   //   //   .then(redirect to main app screen…);
  //   // } else {
  //   //   console.log('Invalid token or spaceID');
  //   // }

  //   if (creds.accessToken.value.trim() === '') {
  //     const updatedCreds = {
  //       ...creds,
  //       accessToken: {
  //         ...creds.accessToken,
  //         error: 'Personal access token cannot be blank',
  //       },
  //     };

  //     setCreds(updatedCreds);
  //   }

  //   if (creds.spaceId.value.trim() === '') {
  //     const updatedCreds = {
  //       ...creds,
  //       spaceId: {
  //         ...creds.spaceId,
  //         error: 'Space ID cannot be blank',
  //       },
  //     };

  //     setCreds(updatedCreds);
  //   }

  //   // checkCredentials()
  //   //   .then((res) => res.json())
  //   //   .then((status) => {
  //   //     if (status.OK) {
  //   //       window.localStorage.setItem(
  //   //         'contentfulCreds',
  //   //         JSON.stringify({
  //   //           personalAccessToken: creds.accessToken.value,
  //   //           space: creds.spaceId.value,
  //   //         })
  //   //       );
  //   //       loadUserContent(creds).then(() => {
  //   //         updateStore();
  //   //         // Redirect to main app screen
  //   //         // history.push(…);
  //   //       });
  //   //     } else {
  //   //       // set error message(s)
  //   //       const error = status.error;
  //   //       updateFieldErrors(error);
  //   //     }
  //   //   });


  //   checkCredentials()
  //     .then(console.log);
  //     // .then((res) => res.json())
  //     // .then((status) => {
  //     //   if (status.OK) {
  //     //     window.localStorage.setItem(
  //     //       'contentfulCreds',
  //     //       JSON.stringify({
  //     //         personalAccessToken: creds.accessToken.value,
  //     //         space: creds.spaceId.value,
  //     //       })
  //     //     );
  //     //     loadUserContent(creds).then(() => {
  //     //       updateStore();
  //     //       // Redirect to main app screen
  //     //       // history.push(…);
  //     //     });
  //     //   } else {
  //     //     // set error message(s)
  //     //     const error = status.error;
  //     //     updateFieldErrors(error);
  //     //   }
  //     // });
  // };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCreds = {
      ...creds,
      [e.target.name]: {
        value: e.target.value,
        error: '',
      },
    };

    setCreds(updatedCreds);
  };

  // useEffect(() => {
  //   // Retrieve Contentful credentials from window.localStorage
  //   const credsLocalStorage = JSON.parse(window.localStorage.getItem('contentfulCreds'));
  //   // If token and space are present
  //   if (credsLocalStorage) {
  //     console.log('found creds in local storage', credsLocalStorage);
  //     // Verify they are valid
  //     // isValid = getIsValid()
  //     // if (isValid) {
  //     //   // load this user's SVG content and go to main app screen
  //     // } else {
  //     //   // Show access token and space input fields
  //     // }
  //     // If not valid, clear these credentials from localStorage and show the input field
  //   } else {
  //     // Show access token and space input fields
  //   }
  // });

  return (
    <>
      <LoginScreen>
        {loading ? (
          <Spinner />
        ) : (
          <CredentialsBox>
            <p>Enter your Contentful personal access token and spaceID</p>
            <div className="field-cont">
              <input
                className="login-field"
                placeholder="your-personal-access-token"
                onChange={handleChangeInput}
                value={creds.accessToken.value}
                name="accessToken"
              />
            </div>
            {creds.accessToken.error && (
              <p className="input-field-error">{creds.accessToken.error}</p>
            )}

            <div className="field-cont">
              <input
                className="login-field"
                placeholder="your-space-ID"
                onChange={handleChangeInput}
                value={creds.spaceId.value}
                name="spaceId"
              />
            </div>
            {creds.spaceId.error && (
              <p className="input-field-error">{creds.spaceId.error}</p>
            )}

            {/* <button className="login-button" onClick={handleClickSignIn}> */}
            <button className="login-button" onClick={() => initClient()}>
              {buttonText}
            </button>

            <p className="input-field-hint">
              Don&apos;t have a token?{' '}
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
        )}
      </LoginScreen>
    </>
  );
};

export default Login;
