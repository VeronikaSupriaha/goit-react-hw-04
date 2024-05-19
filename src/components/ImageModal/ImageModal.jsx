import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

export default function ImageModal({ isOpen, onRequestClose, image }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      className={css.modal}
      overlayClassName={css.overlay}
      schouldCloseOnEsk={true}
      schouldCloseOnOverlayClick={true}
    >
      {image && (
        <div>
          <img src={image.urls.regular} alt={image.urls.description}></img>
          <button onClick={onRequestClose}>Close</button>
        </div>
      )}
    </Modal>
  );
}
