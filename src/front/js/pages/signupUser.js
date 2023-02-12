import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";

import "../../styles/home.css";


export const SignupUser = () => {
	const [formData, setFormData] = useState({tipo:"customer"});
	const [mensaje, setMensaje] = useState(null);
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);

	const handleChange = (evento) =>{
		setFormData({...formData, [evento.target.name]: evento.target.value});
	} 

	const handleSubmit = (evento)=>{
		evento.preventDefault(); // para evitar la recarga ya que cancela el evento

		if (formData["subscription"]){
			setFormData({...formData, "subscription": (formData["subscription"]=='on')});
		}

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

	return (
		<div className="vh-100 gradient-custom">
		  <div className="container text-center">
			<div className="row d-flex justify-content-center align-items-center h-100">
			  <h3>¡Hola de nuevo!</h3>
			  <p className="mb-3">Bienvenido a tu App para valorar establecimientos</p>
			<div className="col-12 col-md-8 col-lg-6 col-xl-5">
				<div className="card px-3" id="card">
					<form className="form-outline" onSubmit={handleSubmit}>
							<div className="form-group">
								<label className="alinear-izquierda mt-3 ms-2" htmlFor="InputEmail1">Nombre y Apellidos</label>
								<input type="text" name="name" required className="form-control mb-2" id="InputName1" aria-describedby="nameHelp" onChange={handleChange} />
							</div>
							<div className="form-group">
								<label className="alinear-izquierda mt-3 ms-2" htmlFor="InputEmail1">Email</label>
								<input type="email" name="user" required className="form-control mb-2" id="InputEmail1" aria-describedby="emailHelp" onChange={handleChange} />
							</div>
							<div className="form-group">
								<label className="alinear-izquierda mt-3 ms-2" htmlFor="InputPassword1">Contraseña</label>
								<input type="password" name="password" required className="form-control mb-2" id="InputPassword1"  onChange={handleChange} />
							</div>
							
							<div className="form-group">
								<label className="alinear-izquierda mt-3 ms-2" htmlFor="InputCumple1">Fecha de Nacimiento</label>
								<input type="date" name="birthday" className="form-control mb-2" id="InputCumple1" aria-describedby="nameHelp" placeholder="Cumpleaños" onChange={handleChange} />
							</div>

							<div className="form-group">
								<label className="alinear-izquierda mt-3 ms-2" htmlFor="InputGender1">Género</label>
								<select name="gender" id="InputGender1" className="form-control mb-2" aria-describedby="nameHelp" onChange={handleChange} >
									<option value="">--Elige una opción--</option>
									<option value="female">female</option>
									<option value="male">male</option>
								</select>
							</div>
							<br/>
							<div className="form-group">
								<label className="alinear-izquierda" htmlFor="InputSubs1">Suscripción</label>
								<input type="checkbox" name="subscription" className="form-check-input alinear-izquierda" id="InputSubs1" aria-describedby="nameHelp" placeholder="Subscripción" onChange={handleChange} />
							</div>	   
							<br/>
							<div className="form-group">
								<label className="alinear-izquierda mt-3 ms-2" htmlFor="InputPostal1">Dirección postal</label>
								<input type="text" name="address" className="form-control mb-2" id="InputPostal1" aria-describedby="nameHelp" onChange={handleChange} />
							</div>	   


							<br/>
							<button className="mb-3 col-md-12 btn-lg px-5 mb-3 mt-3" type="submit"  id="button">Registrarme</button>
							{(mensaje != null) && <p>{mensaje}</p>}
							<div>
                    		<p className="ms-3 me-3 mb-3 text-center">
                     		 ¿Ya tienes una cuenta?
							<Link to="/login">
                      		<strong className="strong">  Login</strong>
                      		</Link>
                    		</p>
                  			</div>
					</form>	
				</div>								  
			</div>
			</div>
		  </div>
		</div>
	  );
};