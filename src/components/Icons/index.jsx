const TableListIcon = ({fill, width, height}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 512 512">
      <path fill={fill} d="M0 96C0 60.65 28.65 32 64 32H448C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96zM64 160H128V96H64V160zM448 96H192V160H448V96zM64 288H128V224H64V288zM448 224H192V288H448V224zM64 416H128V352H64V416zM448 352H192V416H448V352z" />
    </svg>
 );
}

const ImagesIcon = ({fill, width, height}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 576 512">
      <path fill={fill} d="M528 32H144c-26.51 0-48 21.49-48 48v256c0 26.51 21.49 48 48 48H528c26.51 0 48-21.49 48-48v-256C576 53.49 554.5 32 528 32zM223.1 96c17.68 0 32 14.33 32 32S241.7 160 223.1 160c-17.67 0-32-14.33-32-32S206.3 96 223.1 96zM494.1 311.6C491.3 316.8 485.9 320 480 320H192c-6.023 0-11.53-3.379-14.26-8.75c-2.73-5.367-2.215-11.81 1.332-16.68l70-96C252.1 194.4 256.9 192 262 192c5.111 0 9.916 2.441 12.93 6.574l22.35 30.66l62.74-94.11C362.1 130.7 367.1 128 373.3 128c5.348 0 10.34 2.672 13.31 7.125l106.7 160C496.6 300 496.9 306.3 494.1 311.6zM456 432H120c-39.7 0-72-32.3-72-72v-240C48 106.8 37.25 96 24 96S0 106.8 0 120v240C0 426.2 53.83 480 120 480h336c13.25 0 24-10.75 24-24S469.3 432 456 432z"/>
    </svg>
 );
}

const GearIcon = ({fill, width, height}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 512 512">
      <path fill={fill} d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z"/>
    </svg>
 );
}

const InfoIcon = ({fill, width, height}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 192 512">
      <path fill={fill} d="M160 448h-32V224c0-17.69-14.33-32-32-32L32 192c-17.67 0-32 14.31-32 32s14.33 31.1 32 31.1h32v192H32c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32S177.7 448 160 448zM96 128c26.51 0 48-21.49 48-48S122.5 32.01 96 32.01s-48 21.49-48 48S69.49 128 96 128z"/>
    </svg>
 );
}

const InfoCircleIcon = ({fill, width, height}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 512 512">
      <path fill={fill} d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z"/>
    </svg>
 );
}

const ToolsIcon = ({fill, width, height}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 512 512">
      <path fill={fill} d="M331.8 224.1c28.29 0 54.88 10.99 74.86 30.97l19.59 19.59c40.01-17.74 71.25-53.3 81.62-96.65c5.725-23.92 5.34-47.08 .2148-68.4c-2.613-10.88-16.43-14.51-24.34-6.604l-68.9 68.9h-75.6V97.2l68.9-68.9c7.912-7.912 4.275-21.73-6.604-24.34c-21.32-5.125-44.48-5.51-68.4 .2148c-55.3 13.23-98.39 60.22-107.2 116.4C224.5 128.9 224.2 137 224.3 145l82.78 82.86C315.2 225.1 323.5 224.1 331.8 224.1zM384 278.6c-23.16-23.16-57.57-27.57-85.39-13.9L191.1 158L191.1 95.99l-127.1-95.99L0 63.1l96 127.1l62.04 .0077l106.7 106.6c-13.67 27.82-9.251 62.23 13.91 85.39l117 117.1c14.62 14.5 38.21 14.5 52.71-.0016l52.75-52.75c14.5-14.5 14.5-38.08-.0016-52.71L384 278.6zM227.9 307L168.7 247.9l-148.9 148.9c-26.37 26.37-26.37 69.08 0 95.45C32.96 505.4 50.21 512 67.5 512s34.54-6.592 47.72-19.78l119.1-119.1C225.5 352.3 222.6 329.4 227.9 307zM64 472c-13.25 0-24-10.75-24-24c0-13.26 10.75-24 24-24S88 434.7 88 448C88 461.3 77.25 472 64 472z"/>
    </svg>
 );
}

const UserCircleIcon = ({fill, width, height}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 512 512">
      <path fill={fill} d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z"/>
    </svg>
 );
}

const PlugIcon = ({fill, width, height}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 512 512">
      <path fill={fill} d="M96 0C113.7 0 128 14.33 128 32V128H64V32C64 14.33 78.33 0 96 0zM288 0C305.7 0 320 14.33 320 32V128H256V32C256 14.33 270.3 0 288 0zM352 160C369.7 160 384 174.3 384 192C384 209.7 369.7 224 352 224V256C352 333.4 297 397.1 224 412.8V512H160V412.8C86.97 397.1 32 333.4 32 256V224C14.33 224 0 209.7 0 192C0 174.3 14.33 160 32 160H352z" />
    </svg>
 );
}

const NetworkWiredIcon = ({fill, width, height}) => {
  return (
    <svg height={height} width={width} viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g id="icon-network/dark" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <path fill={fill} d="M320,51 C341.2,51 358.4,68.192 358.4,89.4 L358.4,166.2 C358.4,187.4 341.2,204.6 320,204.6 L281.6,204.6 L281.6,230.2 L486.4,230.2 C500.56,230.2 512,241.64 512,255.8 C512,269.96 500.56,281.4 486.4,281.4 L409.6,281.4 L409.6,307 L448,307 C469.2,307 486.4,324.2 486.4,345.4 L486.4,422.2 C486.4,443.4 469.2,460.6 448,460.6 L320,460.6 C298.8,460.6 281.6,443.4 281.6,422.2 L281.6,345.4 C281.6,324.2 298.8,307 320,307 L358.4,307 L358.4,281.4 L153.6,281.4 L153.6,307 L192,307 C213.2,307 230.4,324.2 230.4,345.4 L230.4,422.2 C230.4,443.4 213.2,460.6 192,460.6 L64,460.6 C42.792,460.6 25.6,443.4 25.6,422.2 L25.6,345.4 C25.6,324.2 42.792,307 64,307 L102.4,307 L102.4,281.4 L25.6,281.4 C11.464,281.4 0,269.96 0,255.8 C0,241.64 11.464,230.2 25.6,230.2 L230.4,230.2 L230.4,204.6 L192,204.6 C170.8,204.6 153.6,187.4 153.6,166.2 L153.6,89.4 C153.6,68.192 170.8,51 192,51 L320,51 Z M204.8,102.2 L204.8,153.4 L307.2,153.4 L307.2,102.2 L204.8,102.2 Z M179.2,409.4 L179.2,358.2 L76.8,358.2 L76.8,409.4 L179.2,409.4 Z M332.8,358.2 L332.8,409.4 L435.2,409.4 L435.2,358.2 L332.8,358.2 Z" id="Shape" fillRule="nonzero"></path>
        </g>
    </svg>
 );
}

const CheckCircleIcon = ({fill, width, height}) => {
  return (
    <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill={fill} d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/>
    </svg>
 );
}

const TrashCanIcon = ({fill, width, height}) => {
  return (
    <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path fill={fill} d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"/>
    </svg>
 );
}

const UploadIcon = ({fill, width, height}) => {
  return (
    <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill={fill} d="M105.4 182.6c12.5 12.49 32.76 12.5 45.25 .001L224 109.3V352c0 17.67 14.33 32 32 32c17.67 0 32-14.33 32-32V109.3l73.38 73.38c12.49 12.49 32.75 12.49 45.25-.001c12.49-12.49 12.49-32.75 0-45.25l-128-128C272.4 3.125 264.2 0 256 0S239.6 3.125 233.4 9.375L105.4 137.4C92.88 149.9 92.88 170.1 105.4 182.6zM480 352h-160c0 35.35-28.65 64-64 64s-64-28.65-64-64H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456z"/>
    </svg>
 );
}




export {
  CheckCircleIcon,
  GearIcon,
  ImagesIcon,
  InfoCircleIcon,
  InfoIcon,
  NetworkWiredIcon,
  PlugIcon,
  TableListIcon,
  ToolsIcon,
  TrashCanIcon,
  UploadIcon,
  UserCircleIcon,
}
