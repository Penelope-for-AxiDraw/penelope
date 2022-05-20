import { Button, InputLabel } from '../StyledUiCommon/styles';
import { ControlsContainer } from './styles';

// interface actionsProps {
//   sendCommand: (option:string) => void;
// }

export default function AxiActions(props) {
  const { sendCommand } = props;

  const cmdAlignMode = () => {
    console.log('set axi to align mode');
    sendCommand('align');
  }

  const cmdToggle = () => {
    console.log('toggle axi pen up or down');
    sendCommand('toggle');
  }

  const cmdBeginPlot = () => {
    console.log('begin plotting yay!');
    sendCommand('plot');
  }

  const cmdGetName = () => {
    // console.log('get name');
    sendCommand('get_name');
  }

  return (
    <div>
      <ControlsContainer>
        <InputLabel>Pen Controls</InputLabel>
        <div className="buttonGroup">
          <Button onClick={cmdToggle}>Up/Down</Button>
          <Button onClick={cmdAlignMode}>Align</Button>
        </div>
      </ControlsContainer>

      <ControlsContainer>
        <InputLabel>Plotting</InputLabel>
        <div className="buttonGroup">
          <Button onClick={cmdBeginPlot}>Plot Image</Button>
        </div>
      </ControlsContainer>
    </div>
  );
};