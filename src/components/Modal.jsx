import React from 'react';

const Modal = ({ isOpen, onClose, image, title, description }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        {image ? <img src={image} alt={title} /> : null}
        <h3>{title}</h3>
        <p>{description}</p>
        <button className="button" onClick={onClose} type="button">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
