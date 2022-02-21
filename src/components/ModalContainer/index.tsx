import styled from 'styled-components'

const ModalContainer = ({ title, dismiss, children }) => {
  return (
    <>
      <div className="modal-background">
        <div className="modal-cont">
          <div className="modal-header">
            <Title>{title}</Title>
            <button onClick={dismiss}>×</button>
          </div>
          <div className="modal-contents">
            {children}
          </div>
        </div>
      </div>
    </>
  )
};

export default ModalContainer;


const Title = styled.h4`
  font-size: 20px;
  color: tomato;
`;
