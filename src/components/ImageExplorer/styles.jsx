import styled from 'styled-components';

export const ExplorerContainer = styled.div`
  width: 27rem;
  height: 100vh;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;

  section {
    margin: 1.5rem;
  }

  & .explorer-body {
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    height: calc(100vh - 4.5rem - 5.125rem);
  }

  & .explorer-grid {
    display: grid;
    grid-template-areas: "a a";
    gap: 2rem;
    grid-auto-columns: 176px;
    width: calc(352px + 2rem);
    margin-top: 0.5rem;
  }

  & .explorer-header {
    height: 5.125rem;
    padding: 0 0 0 1.5rem;

    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1.5rem;
  
      h4 {
        font-size: 1.125rem;
        margin: 0;
      }

      button {
        display: flex;
      }
    }

    p {
      font-size: 0.875rem;
      margin: 0.25rem 0 0 0;
    }
  }

  & .explorer-footer {
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px -4px 8px -6px rgb(0 0 0 / 25%);
  }
`;