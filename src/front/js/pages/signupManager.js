import React, { useState } from "react";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const SignupManager = () => {
	const [formData, setFormData] = useState({});
	const navigate = useNavigate();

	const handleChange = (evento) =>{
		setFormData({...formData, [evento.target.name]: evento.target.value});
	}

	const handleSubmit = (evento)=>{
		evento.preventDefault(); // para evitar la recarga ya que cancela el evento
/*
		fetch(process.env.BACKEND_URL + "/api/signup", 
			  {method: 'POST',
			   headers:{"Content-Type": "application/json"},
			   body: JSON.stringify(formData),
			  })
		.then(response => response.json())
		.then((response)=>{navigate("/login");
			 })
*/
	}

    return (
		<>
			<div className="text-center mt-5">
				<h1>Esta es la pagina de alta</h1>
				<form onSubmit={handleSubmit}>
					<div className="row"  id="cajas">
						<div className="col form-group">
							<input type="text" className="form-control" id="InputNombre" name="nombre" onChange={handleChange}/>
						</div>
						<div className="col form-group">
							<input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email" name="user" onChange={handleChange}/>
							<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
						</div>
						<div className="col form-group">
							<input type="password" className="form-control" id="InputPassword" placeholder="Password" name="pwd" onChange={handleChange}/>
						</div>
						<div className="col">
							<button type="submit" className="btn btn-primary mx-3" id="button1" name="boton">Alta usuario</button>
						</div>
					</div>
				</form>


				<div className="alert alert-info">
					{/*<Link to="/okSignup" type="button" onClick={guardaDatos} className="btn btn-primary mx-3">SignUp</Link> */} 
					<Link to="/" type="button" className="btn btn-success mx-3">Home</Link>
				</div>
			</div>

			<div id="cajas">
			
			</div>
		</>
	);
};
