import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const SignupUser = () => {
	const [formData, setFormData] = useState({});
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
  
	const handleChange = (evento) =>{
		setFormData({...formData, [evento.target.name]: evento.target.value});
	}

	const handleSubmit = (evento)=>{
		evento.preventDefault(); // para evitar la recarga ya que cancela el evento
		console.log("signup antes :", formData, process.env.BACKEND_URL)

		fetch(process.env.BACKEND_URL + "/api/signup", 
			  {method: 'POST',
			   headers:{"Content-Type": "application/json"},
			   body: JSON.stringify(formData),
			  })
		.then(response => response.json())
		.then((response)=>{	console.log(response)
							navigate("/login");
			 })

	}

	useEffect(()=>{
		if (store.token && store.token != "" && store.token != undefined){
		  navigate("/");
		}
	  },[]);

	return (
		<div className="container fluid align-center">
		  <div className="form-body">
			<div className="row">
			  <h1>Hola!</h1>
			  <h5>Bienvenido a tu App para valorar establecimientos</h5>
				<div className="col-md-12">
					<form action={handleSubmit} method="post">
					<div class="form-group">
							<label for="InputEmail1">Nombre y apellidos</label>
							<input type="text" className="form-control" id="InputName1" aria-describedby="nameHelp" placeholder="Nombre y apellidos" onChange={handleChange} />
						</div>
						<div class="form-group">
							<label for="InputEmail1">Email address</label>
							<input type="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="email" onChange={handleChange} />
						</div>
						<div class="form-group">
							<label for="InputPassword1">Password</label>
							<input type="password" className="form-control" id="InputPassword1" placeholder="Password" onChange={handleChange} />
						</div>
						<br/>
						<button type="submit" class="btn btn-primary">Submit</button>
						{/*<button onClick={handleSubmit} id="button">Registrarme</button>*/}
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
