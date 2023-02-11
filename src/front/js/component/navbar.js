import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import imagen from "../../img/logo.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
	const [salir, setSalir] = useState(false)
	const [mensaje, setMensaje] = useState(null); 
	const navigate = useNavigate();
	const [formData, setFormData] = useState({});

	const [show, setShow] = useState(false);
	const handleShow  = () => setShow(true);
	const handleClose = () => setShow(false);

	const handleChange = (evento) =>{
		setFormData({...formData, [evento.target.name]: evento.target.value});
	}

	function ModalAceptar() {
		return (
		  <>
			<Modal show={show} onHide={handleClose}>
			  <Modal.Header closeButton>
				<Modal.Title>Búsqueda de Locales</Modal.Title>
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

	const handleSubmit = (evento)=>{
		evento.preventDefault(); // para evitar la recarga ya que cancela el evento
		console.log("Que buscamos", formData, evento.target.name, evento.target.value);

		fetch(`${process.env.BACKEND_URL}/api/comercial-place-search/${evento.target.value}`)
		.then(response => {
			if (response.status == 200) return response.json()
			else                        handleShow();
		})
    .then(datos=>{
      console.log(datos);
      navigate(`/listLocalesSearch/${datos}`);
    })
	}

  return (
    <div className="container-fluid">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <Link to="/">
              <span className="navbar-brand mb-0 h1">
                {" "}
                <img src={imagen} className="card-img-top mt-2" alt="" width="120" height="120" />
              </span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                  <Link to="/about">
                    <a className="nav-link active mt-4" aria-current="page" href="#" id="navbarSupportedContent" >Quienes Somos</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/listlocales">
                    <a className="nav-link active mt-4" aria-current="page" href="#" id="navbarSupportedContent">Locales</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact">
                    <a className="nav-link active mt-4" href="#" id="navbarSupportedContent">Contacto</a>
                  </Link>
                </li>
                <form onSubmit={handleSubmit}>
                  <input name="busca" className="form-control me-2 mt-4" type="search" placeholder="Buscar" aria-label="Buscar"onChange={handleChange}/>
                  <button className="btn btn-outline-success" type="submit" id="iconbutton">
                    <i className="far fa-search" />
                  </button>
                </form>
              </ul>

              <div className="">
                {!store.token ? (
                  <Link to="/login">
                    <button className="btn btn-primary" id="button">Log in</button>
                  </Link>
                ) : (
                  <>
                  {store.nameUser}{"   "}
                  <Link to="/account">
                    <button className="btn btn-primary" id="button"><i className="fas fa-user-circle"></i> Mi cuenta</button>
                  </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
      {ModalAceptar()}
    </div>
  );
};