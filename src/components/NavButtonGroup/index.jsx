import { ButtonGroupContainer, StyledNavIconButton } from './styles';
import { ImagesIcon, InfoCircleIcon, ToolsIcon } from '../Icons';

const NavButtonGroup = ({ navIndex, selectTab }) => {
  const iconSize = 20;
  const light = '#fff';
  const dark = '#4400A3';

  const navOptions = [
    {
      text: 'Setup',
      icon: (i) => <ToolsIcon width={iconSize} height={iconSize} fill={navIndex == i ? light: dark}  />,
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
        >
          {option.icon(index)}
          <span>{option.text}</span>
        </StyledNavIconButton>
      ))}

      {/* <StyledNavIconButton className={navIndex === 0 ? 'active' : ''}>
        <Image alt="temp" src={"/icn-square.svg"} width={20} height={20} />
        <span>Setup</span>
      </StyledNavIconButton>

      <StyledNavIconButton className={navIndex === 1 ? 'active' : ''}>
        <Image alt="temp" src={"/icn-square.svg"} width={20} height={20} />
        <span>Images</span>
      </StyledNavIconButton>

      <StyledNavIconButton className={navIndex === 2 ? 'active' : ''}>
        <Image alt="temp" src={"/icn-square.svg"} width={20} height={20} />
        <span>Info</span>
      </StyledNavIconButton> */}
    </ButtonGroupContainer>
  );
};

export default NavButtonGroup;
