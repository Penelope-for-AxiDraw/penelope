import { useState } from "react";

import { ClearBtn, IconButton, Input } from "../StyledUiCommon/styles";
import { ButtonInlineText, CredentialsBox, MoreInfoBox, Welcome } from "./styles";
import { RocketLaunchIcon, XMarkIcon } from "../Icons";
import PenelopeLogo from "../PenelopeLogo";


const MoreInfo = ({ show, infoBoxOpen }) => {
  return (
    <MoreInfoBox infoBoxOpen={infoBoxOpen}>
      <div>
        <div className="more-info-header">
          <ClearBtn onClick={show}>
            <XMarkIcon fill='var(--dark-purple)' width='1rem' height='1rem' />
          </ClearBtn>
        </div>
        <div>
          <p>
            Hello there, lovely human. Welcome to Penelope, an interface for AxiDraw.
            You&apos;re free to use Penelope if you don&apos;t have an{' '}
            <a
              href="https://shop.evilmadscientist.com/productsmenu/846"
              target="_blank"
              rel="noreferrer"
            >
              AxiDraw
            </a>{' '}
            pen plotter. BUT… if you don&apos;t have access to an AxiDraw,
            this app might not be of much use to you.
          </p>
          <p>
            Still there? Fantastic. Penelope is a GUI on top of the{' '}
            <a
              href="https://axidraw.com/doc/py_api/#introduction"
              target="_blank"
              rel="noreferrer"
            >
              AxiDraw Python API
            </a>
            . While{' '}
            <a href="https://inkscape.org/" target="_blank" rel="noreferrer">
              Inkscape
            </a>{' '}
            has an extension for plotting from AxiDraw, it&apos;s not very fun
            to use. Penelope has some of the same functionality as the Inkscape
            extension and the AxiDraw API / CLI.
          </p>
          <p>
            A couple of things before we get started: First, you&apos;ll need to sign
            in here with a personal access token and space ID from Contentful. Basic accounts are{' '}
            <a
              href="https://www.contentful.com/"
              target="_blank"
              rel="noreferrer"
            >
              free
            </a>{' '}. To find out how to get your personal access token,{' '}
            <a
              href="https://www.contentful.com/help/personal-access-tokens/#how-to-get-a-personal-access-token-the-web-app"
              target="_blank"
              rel="noreferrer"
            >
              click here
            </a>
            . Then, if you haven&apos;t already,{' '}
            <a
              href="https://www.contentful.com/help/contentful-101/#step-2-create-a-space"
              target="_blank"
              rel="noreferrer"
            >
              create a space
            </a>{' '}. You can find out the space&apos;s id by following{' '}
            <a
              href="https://www.contentful.com/help/find-space-id/"
              target="_blank"
              rel="noreferrer"
            >
              these steps
            </a>. You&apos;ll also need to download and run the{' '}
            <a href="https://github.com/computershawn/penelope-server" target="_blank" rel="noreferrer">
              Penelope server app
            </a>{' '}
            on your computer.
          </p>
        </div>
      </div>
    </MoreInfoBox>
  );
};

const AuthView = ({
  attemptSignIn,
  isSigningIn,
  fieldCreds,
  handleChangeInput,
}) => {
  const SPACE_ID = "spaceId";
  const TOKEN = "accessToken";

  const [blanks, setBlanks] = useState({
    [TOKEN]: false,
    [SPACE_ID]: false,
  });

  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const tokenError = fieldCreds.errors[TOKEN];
  const spaceError = fieldCreds.errors[SPACE_ID];

  const doHandleChangeInput = (e) => {
    const isBlank = e.target.value.trim() === "";
    setBlanks({
      ...blanks,
      [e.target.name]: isBlank,
    });
    handleChangeInput(e);
  };

  const anyBlankFields = blanks[TOKEN] || blanks[SPACE_ID];

  return (
    <Welcome isOpen={showMoreInfo}>
      <CredentialsBox infoBoxOpen={showMoreInfo}>
        <div className="ui-container">
          <div style={{ lineHeight: '0' }}>
            <PenelopeLogo height={60} fill="var(--dark-purple)" />
          </div>
          <p className="form-description">Enter your personal access token and space ID</p>
          <section>
            <Input
              placeholder="your-personal-access-token"
              onChange={doHandleChangeInput}
              value={fieldCreds.values[TOKEN]}
              name="accessToken"
              disabled={isSigningIn}
              type="password"
            />
            {tokenError && <p className="input-field-error">{tokenError}</p>}
          </section>
          <section>
            <Input
              placeholder="your-space-ID"
              onChange={doHandleChangeInput}
              value={fieldCreds.values[SPACE_ID]}
              name="spaceId"
              disabled={isSigningIn}
              type="password"
            />
            {spaceError && <p className="input-field-error">{spaceError}</p>}
            {anyBlankFields && (
              <p className="input-field-error">
                Please enter both an access token and a space ID
              </p>
            )}
          </section>

          <IconButton className="cta" variant="alternate" onClick={() => attemptSignIn()} disabled={isSigningIn || anyBlankFields} wide>
            <RocketLaunchIcon width={24} height={24} fill="#fff" />
            <span>Let&apos;s Begin</span>
          </IconButton>

          <p className="input-field-hint">
            Not sure what the heck this is?{' '}
            <ButtonInlineText onClick={() => setShowMoreInfo(true)}>Click here for info</ButtonInlineText>
            .
          </p>
        </div>
      </CredentialsBox>
      <MoreInfo show={() => setShowMoreInfo(false)} infoBoxOpen={showMoreInfo} />
    </Welcome>
  );
};

export default AuthView;
