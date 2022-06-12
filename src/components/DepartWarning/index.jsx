import Image from 'next/image';
import { Button, ClearBtn, OutlineBtn } from '../StyledUiCommon/styles';
import { WarningModalContainer } from './styles';
import { ScreenShade } from '../StyledUiCommon/styles';
import { XMarkIcon } from '../Icons';

const DepartWarning = ({
  warningCopy={},
  dismiss=()=>{},
  leave=()=>{},
}) => {
  return (
    <ScreenShade>
      <WarningModalContainer>
        <div className="warning-modal-header">
          <h4>{warningCopy.title}</h4>
          <ClearBtn onClick={dismiss}>
            <XMarkIcon fill='var(--dark-purple)' width='1rem' />
          </ClearBtn>
        </div>
        <div className="warning-modal-body">
          <p>{warningCopy.text}</p>
        </div>
        <div className="warning-modal-footer">
          <OutlineBtn onClick={dismiss}>CANCEL</OutlineBtn>
          <Button onClick={leave}>YES</Button>
        </div>
      </WarningModalContainer>
    </ScreenShade>
  );
};

export default DepartWarning;
