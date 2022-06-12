import { InputLabel, OutlineBtn } from '../StyledUiCommon/styles';
import { ControlsContainer } from './styles';

export default function AxiActions() {
  // const [penUp, setPenUp] = useState(true);
  // const RAISE = 'Raise Pen';
  // const LOWER = 'Lower Pen';
  // TODO: Use 'current_pen' AxiDraw Python API
  // method to determine up/down state of pen
  // https://axidraw.com/doc/py_api/#current_pen-turtle_pen

  const TOGGLE = 'Toggle Pen'

  return (
    // <div>
      <ControlsContainer>
        <InputLabel>Pen Controls</InputLabel>
        <div className="button-group">
          <OutlineBtn onClick={() => axiConnection.send('toggle')}>{TOGGLE}</OutlineBtn>
          <OutlineBtn onClick={() => axiConnection.send('align')}>Align Pen</OutlineBtn>
        </div>
      </ControlsContainer>
    // </div>
  );
};
