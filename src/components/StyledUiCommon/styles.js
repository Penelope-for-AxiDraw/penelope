import styled, { css } from 'styled-components';

const getButtonColors = (props) => {
  let bgColor = 'var(--dark-purple)';

  if (props.variant === 'alternate') {
    bgColor = 'var(--purple)';
    return `background-color: ${bgColor};`;
  }
  
  if (props.variant === 'secondary') {
    bgColor = 'var(--dark-gray)';
    return `background-color: ${bgColor};`;
  }
  
  if (props.variant === 'light') {
    bgColor = 'var(--light-lavender)';
    const color = 'var(--purple)';
    return `background-color: ${bgColor}; color: ${color};`;
  }
  
  return `background-color: ${bgColor};`;
};

const ClearBtn = styled.button`
  background-color: transparent;  
  display: inline-block;
  border: none;
  margin: 0;
  padding: 0;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background 250ms ease-in-out, 
              transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:focus {
    outline: none;
  }

  ${props => props.wide && 'width: 100%;'}
  ${props => props.wd && `width: ${props.wd}rem;`}
`;

const Button = styled(ClearBtn)`
  font-size: 1rem;
  height: 2.25rem;
  color: #ffffff;
  ${(props) => getButtonColors(props)}
  padding: 0.5rem 1.5rem;
  border-radius: 2px;

  ${(props) => (props.disabled
    ? css`opacity: 0.84;`
    : css`opacity: 1;`)}

  transition: opacity 160ms ease-in-out;
`;

const IconButton = styled(ClearBtn)`
    color: red;
`;

// const OutlineBtn = styled(ClearBtn)`
//   font-family: 'Averta Bold';
//   border: 1px solid var(--deep-sky-blue);
//   color: var(--deep-sky-blue);
  
//   padding: var(--px8);
//   border-radius: 2px;

//   ${(props) => (props.disabled
//     ? css`opacity: 0.5;`
//     : css`opacity: 1;`)}  
// `;

// const IconBtn = styled.button`
//   cursor: pointer;
//   background: transparent;
//   border: none;
//   font-family: inherit;
//   font-size: 100%;
//   line-height: 1.15;
//   margin: 0;
//   padding: var(--px4);
//   overflow: visible;
//   text-transform: none;
//   -webkit-appearance: button;

//   &:hover, &:focus {
//     background: rgba(255, 255, 255, 0.2);
//   }

//   &:focus {
//     outline: none;
//   }

//   &:active {
//     transform: scale(0.99);
//   }
// `;

// const LinkButton = styled(ClearBtn)`
//   color: var(--deep-sky-blue);
  
//   ${(props) => (props.small ? 'font-size: 12px;' : 'font-size: var(--smallText);')}
// `;

// const InlineTextButton = styled(ClearBtn)`
//   ${(props) => (props.semibold && 'font-family: \'Averta Semibold\';')}
//   font-size: var(--smallText);
//   text-decoration: underline;

//   ${(props) => (props.active
//     ? css`color: var(--deep-sky-blue);`
//     : css`color: var(--orange-flare);`
//   )}
// `;

// const InlineSelectCont = styled.div`
//     display: inline-block;

//     & > span {
//       margin-left: var(--px4);
//     }
// `;

const PanelSectionHeading = styled.h1`
  font-size: 0.875rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  color: var(--blek);
`;

const PanelInfoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;

  & > div {
    display: flex;
    align-items: center;
    height: 1.5rem;
  }

  & > div span {
    font-size: 0.875rem;
    margin-left: 0.5rem;
  }
`;

const ImageMetaInfoCont = styled.div`
  display: flex;
  align-items: start;
  margin-bottom: 2rem;

  & p {
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    margin: 0;
  }

  & p:first-child {
    font-weight: bold;
  }

  & p.description {
    font-weight: normal;
  }

  & .specs {
    margin-left: 0.75rem;

    p {
      font-size: 0.875rem;
      line-height: 1.4;
    }
  }

`;

const InputLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  margin-left: 0.125rem;
`;

const Input = styled.input`
  height: 1.875rem;
  font-size: 1rem;
  padding-left: 0.375rem;
  ${(props) => props.fieldWidth && `width: ${props.fieldWidth}rem;`}
  border-radius: 2px;
  border-width: 1px;
  border-top-color: rgba(107, 0, 255, 0.32);
  border-bottom-color: rgba(107, 0, 255, 0.32);
  border-left-color: rgba(107, 0, 255, 0.32);
  border-right-color: rgba(107, 0, 255, 0.32);

  &:focus-visible {
    outline-color: rgba(107, 0, 255, 0.64);
    outline-width: 1px;
    outline-style: inset;
  }
`;

const TextArea = styled.textarea`
  font-size: 1rem;
  padding-left: 0.375rem;
  ${(props) => props.fieldWidth && `width: ${props.fieldWidth}rem;`}
  ${(props) => props.fieldHeight && `height: ${props.fieldHeight}rem;`}
  resize: none;
  border-radius: 2px;
  border-width: 1px;
  border-top-color: rgba(107, 0, 255, 0.32);
  border-bottom-color: rgba(107, 0, 255, 0.32);
  border-left-color: rgba(107, 0, 255, 0.32);
  border-right-color: rgba(107, 0, 255, 0.32);

  &:focus-visible {
    outline-color: rgba(107, 0, 255, 0.64);
    outline-width: 1px;
    outline-style: inset;
  }
`;

const ControlsSection = styled.section`
  margin: 2rem;
`;

export {
  ClearBtn,
  Button,
  PanelSectionHeading,
  PanelInfoIcon,
  ImageMetaInfoCont,
  InputLabel,
  Input,
  IconButton,
  TextArea,
  ControlsSection,
  // OutlineBtn,
  // IconBtn,
  // LinkButton,
  // InlineTextButton,
  // InlineSelectCont,
};

