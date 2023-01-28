import React, { useState, useEffect, useContext } from "react";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const SignupManager = () => {
	const [formData, setFormData] = useState({tipo:"manager"});
	const [mensaje, setMensaje] = useState(null);
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);

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

	return (
		<div className="container fluid align-center">
		  <div className="form-body">
			<div className="row">
			  <h1>Hola!</h1>
			  <h5>Bienvenido a tu App para valorar establecimientos</h5>
				<div className="col-md-12">
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="InputEmail1">Nombre y apellidos</label>
							<input type="text" name="name" required className="form-control" id="InputName1" aria-describedby="nameHelp" placeholder="Nombre y apellidos" onChange={handleChange} />
						</div>
						<div className="form-group">
							<label htmlFor="InputEmail1">Email address</label>
							<input type="email" name="user" required className="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="email" onChange={handleChange} />
						</div>
						<div className="form-group">
							<label htmlFor="InputPassword1">Password</label>
							<input type="password" name="password" required className="form-control" id="InputPassword1" placeholder="Password" onChange={handleChange} />
						</div>
						
						<br/>
						<button type="submit"  id="button">Registrarme</button>
						{(mensaje != null) && <p>{mensaje}</p>}
					</form>				  
				</div>
			</div>
		  </div>
		</div>
	  );
};