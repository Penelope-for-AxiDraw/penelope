import styled from 'styled-components';

export const ImageContainer = styled.div`
  background: #fff;
  display: flex;
`;

export const InfoContainer = styled.div`
  margin-top: 1rem;

  p {
    margin: 0 0 1rem;
  }

  p:last-child {
    margin: 0;
  }

  & .info-label {
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0;
  }
`;
