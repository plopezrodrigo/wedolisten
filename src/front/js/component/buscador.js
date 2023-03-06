import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import CustomModal from "../component/customModal";
import { useModal } from "../hooks/UseModal";
import imagen from "../../img/logo.png";


const Buscador = (props) => {
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

    if (formData.buscar.length > 0){
        // Cargamos store.locales para usarlo en listLocales
        actions.cargaLocales(formData.buscar).then((response) => {
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
    <div className="container-buscador">
      <div className="fondo-buscador">
        <div className="picture">
        <img 
          src="https://static.tacdn.com/img2/brand/home/homemar2022_tw_trans.png"
          className="imagenbuscador"
          alt=""
        />
        </div>
        <div className="buscando">
          <div className="searchbox">
            <form onSubmit={handleSubmit}>
              <input name="buscar" className="form-control mt-4 mr-2" type="search" placeholder="Buscar" aria-label="Buscar"onChange={handleChange}/>
              <button className="" type="submit" id="iconbutton"/>
            </form>
          </div>
        </div>
      </div>
      <CustomModal  show={isModalOpened}
                    titulo="Búsqueda de Locales"
                    handleClose={() => setIsModalOpened(false)}>
        <div>{mensaje}</div>
      </CustomModal>
    </div>
  );
};

export default  Buscador;
