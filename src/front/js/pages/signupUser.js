import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

// prueba

export const SignupUser = () => {
	const [formData, setFormData] = useState({tipo:"customer"});
	const [mensaje, setMensaje] = useState(null);
	const navigate = useNavigate();
  
	const handleChange = (evento) =>{
		setFormData({...formData, [evento.target.name]: evento.target.value});
	} 

	const handleSubmit = (evento)=>{
		evento.preventDefault(); // para evitar la recarga ya que cancela el evento

		if (formData["subscription"]){
			console.log("subscription",formData["subscription"]);
			setFormData({...formData, "subscription": (formData["subscription"]=='on')});
			console.log("subscription2",formData);
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
						
						<div className="form-group">
							<label htmlFor="InputCumple1">Cumpleaños</label>
							<input type="date" name="birthday" className="form-control" id="InputCumple1" aria-describedby="nameHelp" placeholder="Cumpleaños" onChange={handleChange} />
						</div>

						<div className="form-group">
							<label htmlFor="InputGender1">Género</label>
							<select name="gender" id="InputGender1" className="form-control" aria-describedby="nameHelp" onChange={handleChange} >
								<option value="">--Elige una opción--</option>
								<option value="female">female</option>
								<option value="male">male</option>
							</select>
						</div>
						<br/>
						<div className="form-group">
							<label htmlFor="InputSubs1">Subscripción</label>
							<input type="checkbox" name="subscription" className="form-check-input" id="InputSubs1" aria-describedby="nameHelp" placeholder="Subscripción" onChange={handleChange} />
						</div>	   
						<br/>
						<div className="form-group">
							<label htmlFor="InputPostal1">Dirección postal</label>
							<input type="text" name="address" className="form-control" id="InputPostal1" aria-describedby="nameHelp" placeholder="Dirección postal" onChange={handleChange} />
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