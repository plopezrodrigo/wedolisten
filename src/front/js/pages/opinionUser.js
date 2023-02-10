import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import imagen from "../../img/logo.png";

export const OpinionUser = () => {
	const params = useParams()
	const [local, setLocales] = useState({})
	const [formData, setFormData] = useState({tipo:"customer", comercial_place_id:params.id_local, comment_id: params.id_comment});
	const [mensaje, setMensaje] = useState(null); 
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
  
	useEffect (()=> {
		console.log("Opinion User", formData, store.token);		
		if (!(store.token && store.token != "" && store.token != undefined)) {
			navigate("/login");
		}

		fetch(`${process.env.BACKEND_URL}/api/comercial-place/${params.id_local}`)
		.then(response => {
			return response.json()
		}).then(response => {
			setLocales(response)        
		})
	}, [])

	const handleChange = (evento) =>{
		setFormData({...formData, [evento.target.name]: evento.target.value});
	}

	const handleSubmit = (evento)=>{
		evento.preventDefault(); // para evitar la recarga ya que cancela el evento

		fetch(process.env.BACKEND_URL + "/api/comment/0", 
			{	method: 'POST',
				headers:{"Content-Type": "application/json",
				"Authorization": 'Bearer '+ store.token
			},  	
			body: JSON.stringify(formData),
			})
		.then(response => {
			if (response.status == 200){ 
				navigate("/")
			}else{ 
				setMensaje(response["msg"])
			}
			return response.json(); 
		})
	}

	return (
		<div className="container fluid align-center">
		  <div className="form-body">
			<div className="row">
			    <h1 className="text-center">Escriba una opinión y ayúdanos a mejorar</h1>
			    <h5 className="text-center">Historias como la suya ayudan a mejorar. Comparte tu experiencia y ayudanos</h5>
            </div>
			<div className="row">
                <div className="row justify-content-center">
                    <div className="col-4 py-3 px-0 mx-0">
                        <img src={imagen} className="alinear-derecha" alt="" />
                    </div>
                    <div className="col-4 py-5 px-0 mx-0">
                        <p className="my-0"><strong>{local.name} ({params.id_local})</strong></p>
                        <p className="my-0">{local.address} </p>
                        <p className="my-0">{local.telf} - {local.email}</p>
                        <p className="my-0">{local.url}</p>
                    </div>
                </div>
                <div className="row">
                    <h1 className="text-center">Tu experiencia es muy valiosa para nosotros.</h1>
                    <h1 className="text-center">¡Muchas gracias!</h1>
                </div>
				<div className="col-md-12">
					<form onSubmit={handleSubmit}>
                        <div className="form-group">
							<h5>Puntuación</h5>
							<input type="radio" name="puntuacion" className="form-check-input" id="InputPuntua1" aria-describedby="nameHelp" value="uno" onChange={handleChange} />
							<input type="radio" name="puntuacion" className="form-check-input" id="InputPuntua2" aria-describedby="nameHelp" value="dos" onChange={handleChange} />
							<input type="radio" name="puntuacion" className="form-check-input" id="InputPuntua3" aria-describedby="nameHelp" value="tres" onChange={handleChange} />
							<input type="radio" name="puntuacion" className="form-check-input" id="InputPuntua4" aria-describedby="nameHelp" value="cuatro" onChange={handleChange} />
							<input type="radio" name="puntuacion" className="form-check-input" id="InputPuntua5" aria-describedby="nameHelp" value="cinco" onChange={handleChange} />
						</div>	   
                        <br/>
						<div className="form-group">
							<h5>Tu opinión</h5>
							<textarea name="comment" required rows="3" cols="100" onChange={handleChange} ></textarea>
						</div>
                        <br/>
						<div className="form-group">
    						<div>
							    <h5 className="d-inline">Nos puedes contar algo mas</h5>
                                <p className="d-inline">(opcional)</p>
                            </div>
							<select name="price" id="InputPrice1" className="form-control" aria-describedby="PriceHelp" onChange={handleChange} >
								<option value="">--Elige una opción--</option>
								<option value="Barato">Barato</option>
								<option value="Normal">Normal</option>
								<option value="Caro">Caro</option>
							</select>
							<select name="a_domicilio" id="InputA_domicilio1" className="form-control" aria-describedby="A_domicilioHelp" onChange={handleChange} >
								<option value="">--Elige una opción--</option>
								<option value="Si">Si</option>
								<option value="No">No</option>
							</select>
							<select name="mesa" id="InputMesa1" className="form-control" aria-describedby="MesaHelp" onChange={handleChange} >
								<option value="">--Elige una opción--</option>
								<option value="Si">Si</option>
								<option value="No">No</option>
							</select>
							<select name="alcohol" id="InputAlcohol1" className="form-control" aria-describedby="AlcoholHelp" onChange={handleChange} >
								<option value="">--Elige una opción--</option>
								<option value="Si">Si</option>
								<option value="No">No</option>
							</select>
						</div>
                        <br/>
                        <div className="form-group">
                            <h5>¿Que tipo de visita hiciste?</h5>
                            <input type="radio" name="visita" className="form-check-input" id="InputTVisit1" aria-describedby="visitaHelp" value="Pareja" onChange={handleChange} />
                            <label htmlFor="InputTVisit1">Pareja</label><br/>
                            <input type="radio" name="visita" className="form-check-input" id="InputTVisit2" aria-describedby="visitaHelp" value="Familia" onChange={handleChange} />
                            <label htmlFor="InputTVisit2">Familia</label><br/>
                            <input type="radio" name="visita" className="form-check-input" id="InputTVisit3" aria-describedby="visitaHelp" value="Solo" onChange={handleChange} />
                            <label htmlFor="InputTVisit3">Solo</label><br/>
                            <input type="radio" name="visita" className="form-check-input" id="InputTVisit4" aria-describedby="visitaHelp" value="Amigos" onChange={handleChange} />
                            <label htmlFor="InputTVisit4">Amigos</label><br/>
                            <input type="radio" name="visita" className="form-check-input" id="InputTVisit5" aria-describedby="visitaHelp" value="Negocios" onChange={handleChange} />
                            <label htmlFor="InputTVisit5">Negocios</label><br/>
                        </div>
                        <br/>
						<div className="form-group">
							<h5>Introduce hasta 3 imágenes</h5>
                            <input type="text" name="photo_location1" className="form-control" id="InputTphoto_location1" aria-describedby="photo_locationHelp" onChange={handleChange} />
                            <input type="text" name="photo_location2" className="form-control" id="InputTphoto_location2" aria-describedby="photo_locationHelp" onChange={handleChange} />
                            <input type="text" name="photo_location3" className="form-control" id="InputTphoto_location3" aria-describedby="photo_locationHelp" onChange={handleChange} />
						</div>

						<br/>
						<button type="submit"  id="button">Comentar</button>
						{(mensaje != null) && <p>{mensaje}</p>}
					</form>				  
				</div>
			</div>
		  </div>
		</div>
	  );
};