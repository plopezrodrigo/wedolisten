import React, { useRef , useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import CustomModal from "../component/customModal";
import { useModal } from "../hooks/UseModal";
import emailjs from '@emailjs/browser';
import { EnvioEmail } from "../hooks/EnvioEmail";


export const Contact = (props) => {
  const { store, actions } = useContext(Context);
  const [isModalOpened, setIsModalOpened, toggleModal] = useModal(false);
  const [mensaje, setMensaje] = useState(null);
  const [formData, setFormData] = useState();
  const navigate = useNavigate();
  const form = useRef();

  const submit = (e) => {
    e.preventDefault();

    EnvioEmail(form, setMensaje, toggleModal, "template_3tm47vd");


    // emailjs.sendForm(process.env.EMAIL_SERVICE_ID, process.env.EMAIL_TEMPLATE_ID, form.current, process.env.EMAIL_PUBLIC_KEY)
    // .then((result) => {
    //     setMensaje("Correo enviado stisfactroiamente");
    //     toggleModal();
    // }, (error) => {
    //     setMensaje(error.text)
    //     return false;
    // });

    return true;
  };

	const handleChange = (evento) =>{
		setFormData({...formData, [evento.target.name]: evento.target.value});
	}  

  return (
    <div className="bg-contact3">
      <div className="vh-100 gradient-custom">
        <div className="container text-center">
          <h3>Contacto</h3>
          <p className="mb-0">¿Necesitas ayuda?</p>
          <p className="mt-0">Ponte en contacto con nosotros</p>
          <div className="row d-flex justify-content-center align-items-center h-10">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 ">
              <div className="card px-3" id="card">
                <h3 className="mt-3" id="iconbutton">Escríbenos</h3>
                  <form ref={form} className="form-outline" noValidate>
                    <div className="col-md-12">
                      <label htmlFor="InputEmail1" className="alinear-izquierda">Nombre y Apellidos</label>
                      <input  className="form-control mb-2"
                              type="text"
                              name="name"
                              defaultValue={ store.name}
                              required
                      />
                      <div className="valid-feedback">Campo nombre y apellidos es válido.</div>
                      <div className="invalid-feedback">Campo nombre y apellidos no puede estar en blanco.</div>
                    </div>
                    <div className="col-md-12">
                      <label forhtml="basic-url" className="form-label alinear-izquierda">Email</label>
                      <input  className="form-control mb-2"
                              type="email"
                              name="user_email"
                              defaultValue={ store.email }
                              required
                      />
                      <div className="valid-feedback">Campo Email es válido.</div>
                      <div className="invalid-feedback">Campo Email no puede estar en blanco.</div>
                    </div>
                    <div className="col-md-12">
                      <label forhtml="basic-url" className="form-label alinear-izquierda">Teléfono</label>
                      <input  className="form-control mb-2"
                              type="telefono"
                              name="Teléfono"
                              required
                      />
                      <div className="valid-feedback">Campo Teléfono es válido</div>
                      <div className="invalid-feedback">Campo Teléfono no puede estar en blanco</div>
                    </div>
                    <div className="col-md-12">
                      <label forhtml="basic-url" className="form-label alinear-izquierda">Tema de consulta</label>
                      <select className="form-select mt-3" required>
                        <option defaultValue="hgestor">Selecciona un tema de consulta </option>
                        <option value="hgestor">Hacerme Gestor </option>
                        <option value="jweb">Información sobre Baby Friendly</option>
                        <option value="sweb">Claves de acceso</option>
                        <option value="pmanager">Otras consultas</option>
                      </select>
                      <div className="valid-feedback">Has seleccionado un asunto.</div>
                      <div className="invalid-feedback">Por favor, selecciona un asunto.</div>
                    </div>
                    <div className="col-md-12">
                      <label forhtml="basic-url" className="form-label alinear-izquierda mt-3">Comentarios</label>
                      <input  id="commentinput"
                              className="form-control mb-2"
                              type="text"
                              name="Comentarios"
                              required
                      />
                      <div className="valid-feedback">Campo Comentarios es válido</div>
                      <div className="invalid-feedback">Campo Comentarios no puede estar en blanco</div>
                    </div>
                    <div className="form-check">
                      <input  className="form-check-input"
                              type="checkbox"
                              value=""
                              id="invalidCheck"
                              required
                      />
                      <label className="form-check-label"> Confirmo que he leido y acepto la Política de Privacidad y Aviso Legal.</label>
                      <div className="invalid-feedback">Por favor, confirma que has leido y aceptas la Política de Privacidad y Aviso Legal.</div>
                    </div>
                    <div className="">
                    <button
                        className="btn btn-primary px-5 mb-3 mt-3"
                        onClick={submit}
                        id="button">
                        Enviar
                      </button>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomModal  show={isModalOpened}
           		        titulo="Gracias por ponerte en contacto con nosotros"
                	    handleClose={() => {setIsModalOpened(false);
										   navigate(`/contact`);}
									}>
				<div>{mensaje}</div>
		  </CustomModal>
    </div>
  );};