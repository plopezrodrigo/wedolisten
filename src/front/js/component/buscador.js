import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import CustomModal from "../component/customModal";
import { useModal } from "../hooks/UseModal";

const Buscador = () => {
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
                  navigate(`/buscarlistlocales/${formData.buscar}`);
              }else{
                  setMensaje(store.message);
                  toggleModal();
              }
        })
    }
  }

  return (
    <div className="container-buscador row">
      <div className="bloquebuscador col-12">
        <div className="fondo">
          <div className="picture">
          <img 
            src="https://static.tacdn.com/img2/brand/home/homemar2022_tw_trans.png"
            className="imagenbuscador"
            alt=""
          />
          </div>
          <div className="cajabuscador">
            <div className="searchbox">
              <form onSubmit={handleSubmit}>
                <input name="buscar" className="form-control ms-4 me-2 mt-4" type="search" placeholder="¿Qué quieres buscar?" aria-label="Buscar"onChange={handleChange}/>
                <button className="" type="submit" id="iconbutton"></button>
              </form>
            </div>
          </div>
        </div>
        <CustomModal 
          show={isModalOpened}
          titulo="¿Qué estás buscando?"
          handleClose={() => setIsModalOpened(false)}>
          <div>{mensaje}</div>
        </CustomModal>
      </div>
    </div>
  );
};

export default  Buscador;
