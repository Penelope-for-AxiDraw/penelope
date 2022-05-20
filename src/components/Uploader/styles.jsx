import styled from 'styled-components';
import { ClearBtn } from '../StyledUiCommon/styles';

export const UploaderContainer = styled.div`
  margin: 0 1.5rem;
  display: flex;
  flex-direction: column;

  & input {
    margin-top: 0.5rem;
  }

  & textarea {
    margin-top: 0.5rem;
  }

  & .upload-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(68 0 163 / 86%);
    display: flex;
    justify-content: center;
    align-items: center;

    & div.fade-in-fade-out {
      border-radius: 50%;
      width: 7.5rem;
      height: 7.5rem;
      border: 1px solid #fff;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 1;
      border-color: rgb(255 255 255 / 100%);
      animation: fade 2s infinite;
    }
  }
`;

export const FolderButton = styled(ClearBtn)`
  position: absolute;
  right: 0.25rem;
  bottom: 0.25rem;
  width: 2rem;
  height: 2rem;
  background: var(--purple);
`;