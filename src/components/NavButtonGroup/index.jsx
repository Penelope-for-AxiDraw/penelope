import { ButtonGroupContainer, StyledNavIconButton } from './styles';
import { ImagesIcon, InfoCircleIcon, ToolsIcon } from '../Icons';
import { useContext } from 'react';
import { store } from '../../providers/store';

const NavButtonGroup = ({ navIndex, selectTab }) => {
  const iconSize = 20;
  const light = '#fff';
  const dark = '#4400A3';

  const globalState = useContext(store);
  const entries = globalState.state;

  const navOptions = [
    {
      text: 'Setup',
      icon: (i) => <ToolsIcon width={0.8 * iconSize} height={0.8 * iconSize} fill={navIndex == i ? light: dark}  />,
    },
    {
      text: 'Images',
      icon: (i) => <ImagesIcon width={iconSize} height={iconSize} fill={navIndex == i ? light: dark} />,
    },
    {
      text: 'Info',
      icon: (i) => <InfoCircleIcon width={iconSize} height={iconSize} fill={navIndex == i ? light: dark} />,
    }
  ];

  return (
    <ButtonGroupContainer>
      {navOptions.map((option, index) => (
        <StyledNavIconButton
          key={index}
          className={navIndex === index ? 'active' : ''}
          onClick={(_evt) => selectTab(index)}
          disabled={index == 2 && !entries.length}
        >
          {option.icon(index)}
          <span>{option.text}</span>
        </StyledNavIconButton>
      ))}
    </ButtonGroupContainer>
  );
};

export default NavButtonGroup;
