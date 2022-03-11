import styled from "styled-components";

export const SpinnerContainer = styled.div`
  #loading-bar-top {
    animation: loading-bar-morph 1s linear .1s infinite;
  }
    
  #loading-bar-top-middle {
    animation: loading-bar-morph 1s linear .2s infinite;
  }
  
  #loading-bar-middle {
    animation: loading-bar-morph 1s linear .3s infinite;
  }
    
  #loading-bar-middle-bottom {
    animation: loading-bar-morph 1s linear .4s infinite;
  }
  
  #loading-bar-bottom {
    animation: loading-bar-morph 1s linear .5s infinite;
  }
`;
