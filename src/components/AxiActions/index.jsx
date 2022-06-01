import { InputLabel, OutlineBtn } from '../StyledUiCommon/styles';
import { ControlsContainer } from './styles';

export default function AxiActions() {
  // const [penUp, setPenUp] = useState(true);
  const penUp = true;
  const RAISE = 'Raise Pen';
  const LOWER = 'Lower Pen';

  return (
    // <div>
      <ControlsContainer>
        <InputLabel>Pen Controls</InputLabel>
        <div className="button-group">
          <OutlineBtn onClick={() => axiConnection.send('toggle')}>{penUp ? LOWER : RAISE }</OutlineBtn>
          <OutlineBtn onClick={() => axiConnection.send('align')}>Align Pen</OutlineBtn>
        </div>
      </ControlsContainer>
    // </div>
  );
};
