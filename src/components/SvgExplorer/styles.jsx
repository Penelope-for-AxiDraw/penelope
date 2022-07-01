import styled from 'styled-components';

// export const ExplorerContainer = styled.div`
//   background-color: rgb(255 255 255 / 0.4);
//   z-index: 102;
//   display: flex;
//   flex-direction: column;

//   section {
//     margin: 1.5rem;
//   }

//   & .explorer-body {
//     flex-grow: 1;
//     display: flex;
//     justify-content: center;
//   }

//   & .explorer-grid {
//     display: grid;
//     grid-template-areas: "a a";
//     gap: 0.5rem;
//     grid-auto-columns: 8.75rem;
//     grid-auto-rows: 11.25rem;
//     width: calc(17.5rem - 0.5rem);
//     margin-top: 0.5rem;
//   }

//   & .explorer-header {
//     height: 5.125rem;
//     padding: 0 1.5rem 0;

//     & > div {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       margin-top: 1.5rem;
  
//       h4 {
//         font-size: 1.125rem;
//         margin: 0;
//       }

//       button {
//         display: flex;
//       }
//     }

//     p {
//       font-size: 0.875rem;
//       margin: 0.25rem 0 0 0;
//     }
//   }

//   & .explorer-footer {
//     height: 4.5rem;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     box-shadow: 0px -4px 8px -6px rgb(0 0 0 / 25%);
//   }
// `;
export const ExplorerGrid = styled.div`
  display: grid;
  grid-template-areas: "a a";
  gap: 0.5rem;
  grid-auto-columns: 8.75rem;
  grid-auto-rows: 10.75rem;
  width: calc(17.5rem + 0.5rem);
  margin-top: 1rem;
`;