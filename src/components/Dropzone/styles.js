import styled from 'styled-components';

export const Prompt = styled.h4`
  font-size: 1.375rem;
  margin: 0 0 1.5rem;
  font-weight: 600;
  color: var(--dark-gray);
`;

export const SubPrompt = styled.p`
  margin: 1.5rem 0 0;
`;

export const DropzoneContainer = styled.div`
  width: calc(40rem - 3rem);
  height: calc(22.5rem - 3rem);
  padding: 1.5rem;
  border-radius: 0.25rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fafafa;

  & button {
    align-self: flex-end;
  }
`;

export const DropzoneZone = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.125rem;

  border: 1px solid rgb(107, 0, 255, 0.20);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fafafa;
  transition: background-color 360ms ease;
  ${(props) => props.highlight && `background-color: var(--light-lavender);`}

  & svg {
    opacity: 0.36;
    transition: opacity 360ms ease;

    ${(props) => props.highlight && `opacity: 0.64;`}
  }
`;
