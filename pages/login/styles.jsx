import styled from "styled-components";

export const LoginScreen = styled.div`
  width: 100vw;
  height: 100vh;
  background: #dbdbdb;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CredentialsBox = styled.div`
  width: 480px;

  & > p:first-of-type {
    margin-bottom: 0.5rem;
  }
`;
