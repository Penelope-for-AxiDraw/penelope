import { useContext } from 'react';

import { IconButton } from '../StyledUiCommon/styles';
import { plotDrawing } from '../../utils';
import { store } from '../../providers/store';
import { PlayIcon } from '../Icons';

const PlotButton = () => {
  const globalState = useContext(store);
  const { state: { currentEntryIndex, entries } } = globalState;

  return (
    <IconButton className="cta" variant="alternate" onClick={() => plotDrawing(entries[currentEntryIndex])} wide disabled={!entries.length}>
      <PlayIcon width={24} height={24} fill='#fff' />
      <span>Plot It!</span>
    </IconButton>
  )
};

export default PlotButton;
