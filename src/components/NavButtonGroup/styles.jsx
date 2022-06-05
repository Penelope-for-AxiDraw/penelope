import styled from 'styled-components';
import { ClearBtn } from '../StyledUiCommon/styles';

const StyledNavIconButton = styled(ClearBtn)`
  height: 2.5rem;
  background: rgb(255 255 255 / 0.48);
  flex: 1 1 0;
  display: flex;
  align-items: center;
  padding-left: 0.75rem;
  opacity: 0.75;

  &:first-child {
    border-top-left-radius: 0.125rem;
    border-bottom-left-radius: 0.125rem;
  }

  &:last-child {
    border-top-right-radius: 0.125rem;
    border-bottom-right-radius: 0.125rem;
  }

  &:not(:last-child) {
    margin-right: 0.0625rem;
  }

  & span {
    color: var(--dark-purple);
    font-size: 0.875rem;

    &:nth-child(2) {
      margin-left: 0.5rem;
    }
  }

  &.active {
    background: var(--purple);
    & span {
      color: #fff;
    }
    opacity: 1;
  }
`;

const ButtonGroupContainer = styled.div`
  display: flex;
  margin: 0 2rem;
`;

export {
  ButtonGroupContainer,
  StyledNavIconButton,
}