import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../../styles/home.css";
import CustomModal from "../component/customModal";
import { useModal } from "../hooks/UseModal";

const Login = () => {
  const { store, actions } = useContext(Context);
  const [data, setData] = useState({});
	const [mensaje, setMensaje] = useState(null); 
  const navigate = useNavigate();
  const [isModalOpened, setIsModalOpened, toggleModal] = useModal(true);

	const [show, setShow] = useState(false);
	const handleShow  = () => setShow(true);
	const handleClose = () => setShow(false);


	function ModalAceptar() {
		return (  <>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                  <Modal.Title>Acceso al portal del Bebé</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{mensaje}</Modal.Body>
                  <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  </Modal.Footer>
                </Modal>
              </>
		);
	}

  const handleClick = () => {
    actions.login(data.email, data.password).then((response) => {
    if (response) navigate("/");
    else{ setMensaje("Las credenciales no son correctas");
          handleShow()};
          toggleModal();
    })
  };

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
    
  return (
    <div className="vh-100 gradient-custom">
      <div className="container text-center">
        <h1>Hola de nuevo!</h1>
        <h5 className="mb-5">Bienvenido de nuevo a tu app.</h5>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card" id="card">
              <div className="card-body text-center">
                <h5 className="ms-3 me-3 mb-3 text-center fw-bold">Login</h5>
              </div>
              <div className="form-outline">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-11">
                      <label className="form-label" for="typeEmailX">
                        Email
                      </label>
                      <input
                        type="text"
                        id="typeEmailX-2"
                        className="form-control mb-2 me-2"
                        name="email"
                        onChange={handleChange}
                      />
                      <label className="form-label" for="typeEmailX">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        id="typePasswordX-2"
                        name="password"
                        className="form-control mb-2 me-2"
                        onChange={handleChange}
                      />
                      <p className="small mt-2">
                        <a href="#!">¿Has olvidado tu contraseña?</a>
                      </p>
                      <button
                        className="col-md-12 btn-lg px-5 mb-3 mt-3"
                        onClick={handleClick}
                        id="button"
                      >
                        Login
                      </button>
                    </div>
                  <div>
                    <p className="ms-3 me-3 mb-3 text-center">
                      ¿No tienes una cuenta?
                      <Link to="/signupUser">
                      <strong className="strong"> Registrate</strong>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {ModalAceptar()}
      <CustomModal  show={isModalOpened}
                    titulo="Login en BabyFriendly"
                    mensaje={mensaje}
                    handleClose={() => setIsModalOpened(false)}
      >
        <div>Este es el texto que debe salir en la modal</div>
      </CustomModal>
    </div>
  );
};

export default Login;
