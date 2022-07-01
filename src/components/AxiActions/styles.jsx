import styled from 'styled-components';

export const ControlsContainer = styled.div`
  margin-top: 1.5rem;

  & .button-group {
    display: flex;
    margin-top: 0.5rem;

    button {
      flex: 1 1 0;
    }

    button:not(:last-child) {
      margin-right: 0.5rem;
    }
  }
`;