import styled from 'styled-components';

export const WarningModalContainer = styled.div`
  width: 21rem;
  background: #fff;
  border-radius: 0.125rem;
  display: flex;
  flex-direction: column;

  & .warning-modal-header {
    height: 3rem;
    padding: 0 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & h4 {
      margin: 0;
    }

    & button {
      height: 1.5rem;
    }
  }

  & .warning-modal-body {
    padding: 0 0.75rem;
    min-height: 6.25rem;
  }

  & .warning-modal-footer {
    height: 2.5rem;
    padding: 0 0.75rem 0.75rem;

    display: flex;
    justify-content: flex-end;

    & :last-child {
      margin-left: 0.5rem;
    }

  }
`;
