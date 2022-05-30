import { useState } from 'react';
import { InputLabel, OutlineBtn } from '../StyledUiCommon/styles';
import { ControlsContainer } from './styles';

// interface actionsProps {
//   sendCommand: (option:string) => void;
// }

export default function AxiActions(props) {
  // const [penUp, setPenUp] = useState(true);
  const penUp = true;
  const RAISE = 'Raise Pen';
  const LOWER = 'Lower Pen';

  const { sendCommand } = props;

  const cmdAlignMode = () => {
    console.log('set axi to align mode');
    sendCommand('align');
  }

  const cmdToggle = () => {
    console.log('toggle axi pen up or down');
    sendCommand('toggle');
  }

  return (
    <div>
      <ControlsContainer>
        <InputLabel>Pen Controls</InputLabel>
        <div className="button-group">
          <OutlineBtn onClick={cmdToggle}>{penUp ? LOWER : RAISE }</OutlineBtn>
          <OutlineBtn onClick={cmdAlignMode}>Align Pen</OutlineBtn>
        </div>
      </ControlsContainer>
    </div>
  );
};