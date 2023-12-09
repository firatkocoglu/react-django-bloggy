/* eslint react/prop-types: 0 */

const Modal = ({ closeModal, modalSettings, modalAction }) => {
  const { modalMessage, modalButtonAction } = modalSettings;

  return (
    <div className='modal'>
      <div className='modal-header'>
        <div className='modal-title'>
          <h1>Are you sure?</h1>
        </div>
      </div>
      <div className='modal-body'>
        <p>{modalMessage}</p>
        <p>
          <strong>This action can not be reversed.</strong>
        </p>
      </div>
      <div className='modal-footer'>
        <div className='cancel-button'>
          <button onClick={() => closeModal(false)}>Cancel</button>
        </div>
        <div className='confirm-button'>
          <button onClick={modalAction}>{modalButtonAction}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
