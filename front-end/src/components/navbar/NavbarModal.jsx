import React from "react";
import RegisterForm from "../auth/RegisterForm"; 
import LoginForm from "../auth/LoginForm";     
import { Modal } from "react-bootstrap";

const NavbarModal = ({ showModal, formType, onClose, setFormType, onLoginSuccess }) => {
    return (
      <Modal show={showModal} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{formType === "register" ? "Register" : "Login"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formType === "register" && <RegisterForm setShowForm={setFormType} setShowModal={onClose} />}
          {formType === "login" && <LoginForm onSuccess={onLoginSuccess} />}
        </Modal.Body>
      </Modal>
    );
};

export default NavbarModal;
