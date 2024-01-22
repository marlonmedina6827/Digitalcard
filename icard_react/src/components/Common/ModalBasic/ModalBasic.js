import React from 'react';
import { Modal } from "semantic-ui-react";
import "./ModalBasic.scss";


export function ModalBasic(props) {
    const { show, size, title, children, onClose } = props;
  return (
    <div>
        <Modal className='modal-basic' open={show} onClose={onClose} size={size}>
            {title && <Modal.Header>{title}</Modal.Header>}
            <Modal.Content>{children}</Modal.Content>
        </Modal>
    </div>
  )
}

ModalBasic.defaultProps ={
    size: "tiny"
}