import React from "react";
import "./Modal.css";

const Modal = ({show, onClose, children}) => {
    if (!show){
        return null;
    }
    return (
        <div className="Modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <button onClick={onClose} className="close">✖️</button>
                </div>
                <div className="modal-body">{children}</div>
            </div> 
        </div>
    )
}

export default Modal;