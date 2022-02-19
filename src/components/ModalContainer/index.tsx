const ModalContainer = ({ title, dismiss, children }) => {
  return (
    <>
      <div className="modal-background">
        <div className="modal-cont">
          <div className="modal-header">
            <h4>{title}</h4>
            <button onClick={dismiss}>dismiss</button>
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
