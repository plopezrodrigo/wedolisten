import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const SignupUser = () => {
	const [formData, setFormData] = useState({tipo:"C"});
	const [mensaje, setMensaje] = useState(null);
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
  
	const handleChange = (evento) =>{
		setFormData({...formData, [evento.target.name]: evento.target.value});
	}

	const handleSubmit = (evento)=>{
		evento.preventDefault(); // para evitar la recarga ya que cancela el evento
		console.log("Fordata", formData)

		fetch(process.env.BACKEND_URL + "/api/signup", 
			{method: 'POST',
			headers:{"Content-Type": "application/json"},
			body: JSON.stringify(formData),
			})
		.then(response => {return response.json()})
		.then((response)=>{	console.log("signup", response)
							navigate("/login");
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
							<input type="text" name="name" className="form-control" id="InputName1" aria-describedby="nameHelp" placeholder="Nombre y apellidos" onChange={handleChange} />
						</div>
						<div className="form-group">
							<label htmlFor="InputEmail1">Email address</label>
							<input type="email" name="user" className="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="email" onChange={handleChange} />
						</div>
						<div className="form-group">
							<label htmlFor="InputPassword1">Password</label>
							<input type="password" name="password" className="form-control" id="InputPassword1" placeholder="Password" onChange={handleChange} />
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
							<input type="text" required name="address" className="form-control" id="InputPostal1" aria-describedby="nameHelp" placeholder="Dirección postal" onChange={handleChange} />
						</div>	   

						<br/>
						<button type="submit"  id="button">Registrarme</button>
						{(mensaje != null) && <p>{mensaje}</p>}
					</form>				  
				</div>
			</div>
			{/*
			<div>
				<p>Bienvenido a tu App para valorar establecimientos
				<Link to="/login">
					<button className="btn btn-primary" id="button">
						Log in
					</button>
				</Link>
				</p>
			</div>
			*/}
		  </div>
		</div>
	  );
};







/*


import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

const Login = () => {
  const [data, setData] = useState({});

  console.log("This is your token", store.token);
  const handleClick = () => {
    actions.login(data.email, data.password);
  };


  const handleChange = (e) => {
    setData({...data, [e.target.name]:e.target.value})
  };
    

};
export default Login
*/
