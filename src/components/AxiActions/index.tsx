interface actionsProps {
  sendCommand: (option:string) => void;
}

export default function AxiActions(props: actionsProps) {
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

  return (
    <div>
      <div className="address-label">Controls</div>
      <button className="mt0" onClick={cmdAlignMode}>Align Mode</button>
      <button className="mt0" onClick={cmdToggle}>Toggle Pen</button>
      <button className="mt0" onClick={cmdBeginPlot}>Plot Image</button>
    </div>
  );
};