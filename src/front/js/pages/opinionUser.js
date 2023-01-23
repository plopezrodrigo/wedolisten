import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import imagen from "../../img/logo.png";
import { useNavigate } from "react-router-dom";

export const OpinionUser = () => {
	const [formData, setFormData] = useState({tipo:"manager"});
	const [mensaje, setMensaje] = useState(null);
	const navigate = useNavigate();
  
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
		/*
		if (store.token && store.token != "" && store.token != undefined){
		  navigate("/");
		}
		*/
	  },[]);

	return (
		<div className="container fluid align-center">
		  <div className="form-body">
			<div className="row">
			    <h1>Escriba una opinión y ayúdanos a mejorar</h1>
			    <h5>Historias como la suya ayudan a mejorar. Comparte tu experiencia y ayudanos</h5>
            </div>
			<div className="row">
                <div className="row justify-content-center">
                    <div className="col-4 py-3 px-0 mx-0">
                        <img src={imagen} className="alinear-derecha" alt="" />
                    </div>
                    <div className="col-4 py-5 px-0 mx-0">
                        <p className="my-0"><strong>Nombre de mi local</strong></p>
                        <p className="my-0">dirección</p>
                        <p className="my-0">Código postal - Localidad - Provincia</p>
                    </div>
                </div>
                <div className="row">
                    <h1>Tu experiencia es muy valiosa para nosotros. ¡Muchas gracias!</h1>
                </div>
				<div className="col-md-12">
					<form onSubmit={handleSubmit}>

                        <div className="form-group">
							<label htmlFor="InputSubs1">Puntuación</label>
							<input type="radio" name="puntuacion" className="form-check-input" id="InputPuntua1" aria-describedby="nameHelp" value="1" onChange={handleChange} />
							<input type="radio" name="puntuacion" className="form-check-input" id="InputPuntua1" aria-describedby="nameHelp" value="2" onChange={handleChange} />
							<input type="radio" name="puntuacion" className="form-check-input" id="InputPuntua1" aria-describedby="nameHelp" value="3" onChange={handleChange} />
							<input type="radio" name="puntuacion" className="form-check-input" id="InputPuntua1" aria-describedby="nameHelp" value="4" onChange={handleChange} />
							<input type="radio" name="puntuacion" className="form-check-input" id="InputPuntua1" aria-describedby="nameHelp" value="5" onChange={handleChange} />
						</div>	   


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