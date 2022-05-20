import styled from 'styled-components';

import { ClearBtn } from '../StyledUiCommon/styles';

export const ImageCardContainer = styled.div`
  position: relative;
  cursor: pointer;
  color: var(--dark-gray);
  border: 1px solid #e1e1e1;
  ${(props) => props.isActive && `border-color: var(--purple);`}
  border-radius: 2px;
  width: calc(11rem - 0.125rem);
  height: calc(13.5rem - 0.125rem);

  & .image-container {
    width: calc(11rem - 0.125rem);
    height: calc(11rem - 0.125rem);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & span {
    font-size: 0.875rem;
  }

  & p {
    margin: 0 0 0 0.5rem;
    font-size: 0.8125rem;
  }

  & .image-card-footer {
    height: 2.5rem;
    // background: #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const DeleteOverlay = styled.div`
  position: absolute;
  z-index: 101;
  width: 100%;
  height: 100%;
  background-color: rgb(27, 27, 34, 0.96);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  & > span {
    color: #fefefe;
    margin-bottom: 0.5rem;
  }

  & > button:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

export const DeleteButton = styled(ClearBtn)`
  width: 2.5rem;
  height: 2.5rem;
`;
