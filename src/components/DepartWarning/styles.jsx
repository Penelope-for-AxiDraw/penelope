import styled from 'styled-components';

export const WarningModalContainer = styled.div`
  width: 21rem;
  background: #fff;
  border-radius: 0.125rem;
  display: flex;
  flex-direction: column;

  & .warning-modal-header {
    padding: 1rem 1.5rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & h4 {
      margin: 0;
    }

    & button {
      opacity: 0.2;
      height: 1rem;
      transition: opacity 500ms ease;

      &:hover {
        opacity: 1;
      }
    }
  }

  & .warning-modal-body {
    padding: 0 1.5rem;
    min-height: 6.25rem;
  }

  & .warning-modal-footer {
    height: 2.5rem;
    padding: 0 1.5rem 1rem;

    display: flex;
    justify-content: flex-end;

    & :last-child {
      margin-left: 0.5rem;
    }

  }
`;
