import styled from 'styled-components';

import { ClearBtn } from '../StyledUiCommon/styles';

export const ImageCardContainer = styled.div`
  position: relative;
  cursor: pointer;
  color: var(--dark-gray);
  border: 1px solid var(--muted-purple);
  ${(props) => props.isActive && `border-color: var(--purple);`}
  border-radius: 2px;

  & .checkmark-icon {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }

  & .image-container {
    width: calc(8.75rem - 0.125rem);
    height: calc(8.75rem - 0.125rem);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & span {
    font-size: 0.875rem;
  }

  & p {
    margin: 0 0.5rem 0;
    font-size: 0.8125rem;
  }

  & .image-card-footer {
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    & p {
      overflow-x: hidden;
      white-space: nowrap;
    }

    & button {
      display: none;
      background-color: var(--purple);
      position: absolute;
      right: 0;
    }
  }

  &:hover .image-card-footer button {
    display: block;
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
  width: 2rem;
  height: 2rem;
`;
