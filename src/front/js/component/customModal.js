import React from "react";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CustomModal = ({show, children, titulo, handleClose}) => {

    return (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title >{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" id="button" onClick={handleClose}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
};

CustomModal.propTypes = {
    children: PropTypes.element.isRequired,
    titulo: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default CustomModal;