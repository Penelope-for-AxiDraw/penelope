import { SpinnerContainer } from './styles';

const Spinner = ({ fillColor = "#000", scale = 1 }) => {
  return (
      <SpinnerContainer>
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 120 120">
          <defs>
            <symbol id="a" viewBox="0 0 17 101.5">
              <g>
                <rect x=".5" y=".5" width="16" height="85" fill="#fff" stroke="#000" strokeMiterlimit="10" />
                <rect x="6.5" y="81" width="4" height="20" fill="#fff" stroke="#000" strokeMiterlimit="10" />
              </g>
            </symbol>
          </defs>
          <g id="b" />
          <g id="c">
            <g id="d">
              <use width="17" height="101.5" transform="translate(55.75 7.5) scale(.5)" xlinkHref="#a" />
              <use width="17" height="101.5" transform="translate(107.67 82.27) rotate(120) scale(.5)" xlinkHref="#a" />
              <use width="17" height="101.5" transform="translate(16.95 89.85) rotate(-120) scale(.5)" xlinkHref="#a" />
              <circle cx="60" cy="60" r="3.75" fill="#fff" stroke="#000" strokeMiterlimit="10" />
              <circle cx="60" cy="60" r="60" fill="none" />
            </g>
          </g>
        </svg>
    </SpinnerContainer>
  );
};

export default Spinner;
