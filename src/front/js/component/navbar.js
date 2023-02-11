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

		fetch(`${process.env.BACKEND_URL}/api/comercial-place-search/${formData.busca}`)
		.then(response => {
			if (response.status == 200) return response.json()
			else                        handleShow();
		})
    .then(datos=>{
        if (datos.length > 0)   navigate(`/listLocales/${datos}`);
        else {setMensaje(`No se han encontrado resultados para: "${formData.busca}"`);
              handleShow()};
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
                  <Link to="/about" className="nav-link active mt-4" aria-current="page" href="#" id="navbarSupportedContent" >Quienes Somos</Link>
                </li>
                <li className="nav-item">
                  <Link to="/listlocales" className="nav-link active mt-4" aria-current="page" href="#" id="navbarSupportedContent">Locales</Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="nav-link active mt-4" href="#" id="navbarSupportedContent">Contacto</Link>
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
                  <Link to="/login" className="btn btn-primary" id="button">Log in</Link>
                ) : (
                  <>
                  {store.nameUser}{"   "}
                  <Link to="/account" className="btn btn-primary" id="button"><i className="fas fa-user-circle"></i> Mi cuenta</Link>
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