import styled from 'styled-components';

const Prompt = styled.h4`
  font-size: 1.5rem;
  margin: 0 0 1.5rem;
  font-weight: 600;
`;

const SubPrompt = styled.p`
  font-size: 0.875rem;
  margin: 1.5rem 0 0;
`;

const DropzoneContainer = styled.div`
  width: calc(24rem - 0.25rem);
  height: calc(24rem - 0.25rem);
  border-radius: 0.125rem;
  // border: 0.125rem dashed var(--purple);
  border: 1px solid rgb(107, 0, 255, 0.20);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fafafa;
  transition: background-color 200ms ease;
  ${(props) => props.highlight && `background-color: var(--light-lavender)`}
`;

export { Prompt, SubPrompt, DropzoneContainer };
