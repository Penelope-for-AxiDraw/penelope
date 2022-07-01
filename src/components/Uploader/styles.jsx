import styled from 'styled-components';
import { ClearBtn } from '../StyledUiCommon/styles';

export const UploaderContainer = styled.div`
width: calc(40rem - 3rem);
height: calc(22.5rem - 3rem);
padding: 1.5rem;
border-radius: 0.25rem;

display: flex;
// align-items: center;
justify-content: center;
flex-direction: row;
background-color: #fff;

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
    // background: rgb(68 0 163 / 86%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const FieldsContainer = styled.div`
  width: 16.875rem;
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;

  & .fields-title {
    margin: 0;
    font-weight: 600;
  }
`;



// export const FolderButton = styled(ClearBtn)`
//   position: absolute;
//   right: 0.25rem;
//   bottom: 0.25rem;
//   width: 2rem;
//   height: 2rem;
//   background: var(--purple);
// `;
