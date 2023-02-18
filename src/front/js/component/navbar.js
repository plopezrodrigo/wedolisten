import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import CustomModal from "../component/customModal";
import { useModal } from "../hooks/UseModal";
import imagen from "../../img/logo.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
	const [mensaje, setMensaje] = useState(null); 
	const navigate = useNavigate();
	const [formData, setFormData] = useState({});
  const [isModalOpened, setIsModalOpened, toggleModal] = useModal(false);
	
	const handleChange = (evento) =>{
		setFormData({...formData, [evento.target.name]: evento.target.value}); 
	}

	const handleSubmit = (evento)=>{
		evento.preventDefault(); // para evitar la recarga ya que cancela el evento

    if (formData.busca.length > 0){
        // Cargamos store.locales para usarlo en listLocales
        actions.cargaLocales(formData.busca).then((response) => {
              if (response){
                  navigate("/listLocales");
              }else{
                  setMensaje(store.message);
                  toggleModal();
              }
        })
    }
  }


  return (
    <div className="container-fluid">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid me-5 ms-5">
            <Link to="/">
              <span className="navbar-brand mb-0 h1">
                {" "}
                <img src={imagen} className="card-img-top mt-3" alt="" width="120" height="120" />
              </span>
            </Link>
            <button className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
            </button>
            <div className="collapse navbar-collapse " id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-lg-0 text-end">
                <li className="nav-item">
                  <Link to="/about" className="nav-link active mt-4 ms-4" aria-current="page" href="#" id="navbarSupportedContent" >Quienes Somos</Link>
                </li>
                <li className="nav-item">
                  <Link to="/listlocales" className="nav-link active mt-4 ms-2" aria-current="page" href="#" id="navbarSupportedContent">Locales</Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="nav-link active mt-4 ms-2" href="#" id="navbarSupportedContent">Contacto</Link>
                </li>
                <form onSubmit={handleSubmit}>
                  <input name="busca" className="form-control ms-4 me-2 mt-4" type="search" placeholder="Buscar" aria-label="Buscar"onChange={handleChange}/>
                  <button className="" type="submit" id="iconbutton">
                  </button>
                </form>
              </ul>

              <div className="">
                {!store.token ? (
                  <Link to="/login" className="btn btn-primary" id="button">Iniciar Sesión</Link>
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

      <CustomModal  show={isModalOpened}
                    titulo="Búsqueda de Locales"
                    handleClose={() => setIsModalOpened(false)}>
        <div>{mensaje}</div>
      </CustomModal>
    </div>
  );
};