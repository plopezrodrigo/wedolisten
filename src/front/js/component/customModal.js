import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CustomModal = ({show, children, titulo, mensaje, handleClose}) => {
	const navigate = useNavigate();

    return (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{mensaje}
                        {children}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
};

CustomModal.propTypes = {
    children: PropTypes.element.isRequired,
    titulo: PropTypes.string.isRequired,
    mensaje: PropTypes.string.isRequired,
    show1: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default CustomModal;