import { SpinnerContainer } from './styles';

const Spinner = ({ fillColor = "#000", scale = 1 }) => {
  return (
      <SpinnerContainer>
        <svg
          id="loading-bar"
          xmlns="http://www.w3.org/2000/svg"
          width={60 * scale}
          height={60 * scale}
          viewBox="0 0 60 60"
        >
          <g fill={fillColor}>
            <rect id="loading-bar-top" width="60" height="2" x="0" y="0" />
            <rect id="loading-bar-top-middle" width="60" height="2" x="0" y="14" />
            <rect id="loading-bar-middle" width="60" height="2" x="0" y="29" />
            <rect id="loading-bar-middle-bottom" width="60" height="2" x="0" y="44" />
            <rect id="loading-bar-bottom" width="60" height="2" x="0" y="58" />
          </g>
        </svg>
    </SpinnerContainer>
  );
};

export default Spinner;
