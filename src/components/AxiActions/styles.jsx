import styled from 'styled-components';

export const ControlsContainer = styled.div`
  &:not(:first-child) {
    margin-top: 1rem;
  }

  & .buttonGroup {
    display: flex;
    margin-top: 0.5rem;

    button:not(:last-child) {
      margin-right: 0.5rem;
    }
  }
`;