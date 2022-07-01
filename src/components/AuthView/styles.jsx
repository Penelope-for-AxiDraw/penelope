import styled, { css } from 'styled-components';
import { ClearBtn } from '../StyledUiCommon/styles';

export const Welcome = styled.div`
  display: flex;
  width: 28rem;
  right: 0;
  transition: width 480ms cubic-bezier(0.65, 0, 0.35, 1);
  position: relative;
  box-shadow: 3px 3px 8px 2px rgb(0 0 0 / 12%);
  ${(props) => (props.isOpen && css`width: ${56}rem;`)}
'`;

export const CredentialsBox = styled.div`
  background: linear-gradient(0deg, var(--light-lavender) 0%, var(--lavender) 100%);
  width: 24rem;
  height: 24rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  border-radius: 0.25rem;
  ${(props) => (props.infoBoxOpen && css`border-top-right-radius: 0; border-bottom-right-radius: 0;`)}
  z-index: 103;

  & .ui-container {
    display: flex;
    flex-direction: column;
    width: 100%;

    & .form-description {
      margin: 0;
    }

    & input {
      width: calc(100% - 0.625rem);
      // background-color: #23232f;
      // color: #fefefe;

      // border-top-color: var(--lavender);
      // border-bottom-color: var(--lavender);
      // border-left-color: var(--lavender);
      // border-right-color: var(--lavender);
    }

    & > :not(:first-child) {
      margin-top: 0.75rem;
    }

    & a {
      color: var(--lavender);
    }

    & .input-field-hint {
      margin-bottom: 0;
    }

    & .input-field-hint, .form-description {
      font-size: 0.875rem;
    }
  }
`;

export const MoreInfoBox = styled.div`
  color: var(--blek);
  background-color: #fff;
  width: 24rem;
  height: 24rem;
  // outline: 0.0625rem solid var(--blek);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-radius: 0.25rem;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  justify-content: center;
  position: absolute;
  right: 0;
  transition: border-radius 480ms;
  ${(props) => (props.infoBoxOpen && css`border-top-left-radius: 0; border-bottom-left-radius: 0;`)}

  & .more-info-header {
    display: flex;
    justify-content: flex-end;

    & button {
      opacity: 0.2;
      transition: opacity 500ms ease;
      display: flex;

      &:hover {
        opacity: 1;
      }
    }
  }

  & > div p {
    font-size: 0.875rem;
    line-height: 1.4;
    margin: 0.5rem 0;
  }
`;

export const ButtonInlineText = styled(ClearBtn)`
  display: inline-block;
  color: var(--dark-purple);
  font-size: inherit;
  line-height: inherit;
`;
