import React, { useRef, useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/home.css";
import CustomModal from "../component/customModal";
import { useModal } from "../hooks/UseModal";
import emailjs from '@emailjs/browser';
import { EnvioEmail } from "../hooks/EnvioEmail";


export const SignupManager = () => {
	const [formData, setFormData] = useState({tipo:"manager"});
	const [mensaje, setMensaje] = useState(null);
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	const [isModalOpened, setIsModalOpened, toggleModal] = useModal(false);
	const [tituloModal, setTituloModal] = useState("Ha surgido un problema");
	const [salir, setSalir] = useState(false);
	const form = useRef();


	const handleChange = (evento) =>{
		setFormData({...formData, [evento.target.name]: evento.target.value});
	}

	const handleSubmit = (evento)=>{
		evento.preventDefault(); // para evitar la recarga ya que cancela el evento

		fetch(process.env.BACKEND_URL + "/api/signup", 
			{method: 'POST',
			headers:{"Content-Type": "application/json"},
			body: JSON.stringify(formData),
			})
		.then(response => {
			if (response.status == 200){ 
				navigate("/login")
			}else{ 
				setMensaje(response["msg"])
			}
			return response.json();
		})
	}

	useEffect(()=>{
		if (store.token && store.token != "" && store.token != undefined) {
			navigate.push("/login");
		}
	  },[]);

	  const submit = (e) => {
		e.preventDefault();
	
		EnvioEmail(form, setMensaje, toggleModal, "template_k5ctw6a");
	
	
	  };

	return (
		<div className="vh-100 gradient-custom">
		  <div className="container text-center">
			<div className="row d-flex justify-content-center align-items-center h-100">
			  <h3>¡Hola Gestor!</h3>
			  <p>Bienvenido a tu App para gestionar tus establecimientos</p>
				<div className="col-12 col-md-8 col-lg-6 col-xl-5">
				<div className="card px-3" id="card">
					<form ref={form} className="form-outline" onSubmit={handleSubmit}>
					<div className="form-group">
								<label className="alinear-izquierda mt-3 ms-2" htmlFor="InputEmail1">Nombre y Apellidos</label>
								<input type="text" name="name" required className="form-control mb-2" id="InputName1" aria-describedby="nameHelp" onChange={handleChange} />
							</div>
							<div className="form-group">
								<label className="alinear-izquierda mt-3 ms-2" htmlFor="InputEmail1">Dirección de correo electrónico</label>
								<input type="email" name="user" required className="form-control mb-2" id="InputEmail1" aria-describedby="emailHelp" onChange={handleChange} />
							</div>
							<div className="form-group">
								<label className="alinear-izquierda mt-3 ms-2" htmlFor="InputPassword1">Crear contraseña</label>
								<input type="password" name="password" required className="form-control mb-2" id="InputPassword1"  onChange={handleChange} />
							</div>
							
							<br/>
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
							  <button className="btn btn-primary px-5 mb-3 mt-3" type="submit"  id="button">Registrarme</button>
							{(mensaje != null) && <p>{mensaje}</p>}
							<div>
                      		<p className="ms-3 me-3 mb-3 text-center">
                      		¿Ya tienes una cuenta?
                     		 <p className="ms-3 me-3 mt-3 text-center">
                      		<Link to="/login">
                      		<strong className="strong "> Inicia sesión </strong>
                      		</Link>
                      		con tu cuenta de Baby Friendly</p>
                    		</p>
                  			</div>
					</form>	
						
				</div>							  
				</div>
			</div>
		  </div>
		  <CustomModal  show={isModalOpened}
                    titulo={tituloModal}
                    handleClose={() => setIsModalOpened(false)}>
        	<div>{mensaje}</div>
      		</CustomModal>
     		 {(salir) && salimos()}
		</div>
	  );
};