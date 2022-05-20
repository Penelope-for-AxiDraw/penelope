import styled from "styled-components";

export const SpinnerContainer = styled.div`
  svg {
    animation-name: spinit;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
  }
`;
