import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
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
    <div>
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
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse " id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-lg-0 text-end">
                <li className="nav-item">
                  <Link to="/about" className="nav-link active mt-4 mr-2" aria-current="page" id="navbarSupportedContent">Quienes Somos</Link>
                </li>
                <li className="nav-item">
                  <Link to="/listlocales" className="nav-link active mt-4 mr-2" aria-current="page" id="navbarSupportedContent">Locales</Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="nav-link active mt-4 mr-2" id="navbarSupportedContent">Contacto</Link>
                </li>
                <form onSubmit={handleSubmit}>
                  <input name="buscar" className="form-control mt-4 mr-2" type="search" placeholder="Buscar" aria-label="Buscar"onChange={handleChange}/>
                  <button className="" type="submit" id="iconbutton"/>
                </form>
              </ul>

              <div><span>{""}</span></div>

              <div className="">
                {!store.token 
                  ? (<div>
                      <Link to="/login" className="btn btn-primary" id="button">Iniciar Sesión</Link>
                     </div>) 
                  : (<div className="btn-group">
                          <Link to="/account" type="button" className="btn btn-primary" id="dropdown"><i className="fas fa-user-circle me-1"></i>Mi cuenta</Link>
                          <button type="button" className="btn btn-danger dropdown-toggle dropdown-toggle-split" id="dropdownarrow" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="visually-hidden">Toggle Dropdown</span>
                          </button>
                          <ul className="dropdown-menu" id="dropdownmenu">
                          <li><Link to="/data" className="dropdown-item" >Mis Datos</Link></li>
                          {store.usertype == "customer" ?
                          <li><Link to="/favorites" className="dropdown-item" >Mis Favoritos</Link></li>
                          :
                          <li><Link to="/comentarios" className="dropdown-item" >Mis Comentarios</Link></li>
                          }
                          {store.usertype == "manager" ?
                          <li><Link to="/misLocales" className="dropdown-item" >Mis Locales</Link></li>
                          :
                          ""
                          }
                          <li><hr className="dropdown-divider"/></li>
                          <li><a onClick={() => {actions.logout(); navigate("/")}}><p className="ms-3"> Cerrar sesión </p></a></li>
                          </ul>
                    </div>)
                }
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


/**
 * 
 *                         <Link to="/account" className="btn-group">
                          <button type="button" className="btn btn-danger" id="dropdown"><i class="fas fa-user-circle me-1"></i>Mi cuenta</button>
                          <button type="button" className="btn btn-danger dropdown-toggle dropdown-toggle-split" id="dropdownarrow" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="visually-hidden">Toggle Dropdown</span>
                          </button>
                          <ul className="dropdown-menu" id="dropdownmenu">
                          <li><Link to="/data" className="dropdown-item" >Mis Datos</Link></li>
                          {store.usertype == "customer" ?
                          <li><Link to="/favorites" className="dropdown-item" >Mis Favoritos</Link></li>
                          :
                          <li><Link to="/comentarios" className="dropdown-item" >Mis Comentarios</Link></li>
                          }
                          {store.usertype == "manager" ?
                          <li><Link to="/misLocales" className="dropdown-item" >Mis Locales</Link></li>
                          :
                          ""
                          }
                          <li><hr className="dropdown-divider"/></li>
                          <li><a onClick={() => {actions.logout(); navigate("/")}}><p className="ms-3"> Cerrar sesión </p></a></li>
                          </ul>
                        </Link>

 * 
 * 
 */