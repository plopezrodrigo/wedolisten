import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import CustomModal from "../component/customModal";
import { useModal } from "../hooks/UseModal";
import "../../styles/home.css";
import imagen from "../../img/logo.png";

export const OpinionUser = () => {
	const params = useParams()
	const [local, setLocales] = useState({})
	const [formData, setFormData] = useState({tipo:"customer", comercial_place_id:params.id_local, comment_id: params.id_comment});
	const [mensaje, setMensaje] = useState(null); 
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	const [isModalOpened, setIsModalOpened, toggleModal] = useModal(false);

	useEffect (()=> {
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
		if (formData.puntuacion) {
			fetch(process.env.BACKEND_URL + "/api/comment/0", 
				{	method: 'POST',
					headers:{"Content-Type": "application/json",
					"Authorization": 'Bearer '+ store.token
				},  	
				body: JSON.stringify(formData),
				})
			.then(response => {
				if (response.status == 200){ 
					setMensaje("Lo revisaremos con cariño")
					toggleModal();
				}else{ 
					setMensaje(response["msg"])
					toggleModal();
				}
				// ¿?¿?¿?¿?¿?¿??¿?¿? return response.json(); 
			})
		}else{	
			setMensaje("Debes introducir una puntuación")
			toggleModal();
		}
	}

	return (
		<div className="vh-100 gradient-custom">
			<div className="container text-center">
			<div className="form-body">
				<div className="row">
					<h3 className="text-center">Escribe una opinión y ayúdanos a mejorar</h3>
					<p className="text-center">Historias como la yuya ayudan a mejorar. Comparte tu experiencia y ayúdanos</p>
				</div>
				<div className="row d-flex justify-content-center align-items-center h-10">
					<div className="col-12 col-md-8 col-lg-6 col-xl-5 ">
						<div className="card px-3" id="card">
							<div class="container">
								<div class="row">
									<div class="col-4 alinear-izquierda">
									<img src={imagen} className="mt-2" alt="" height="150px" width="150px"/>
									</div>
									<div class="col-8 mt-2">
									<p className="my-0"><strong>{local.name} ({params.id_local})</strong></p>
									<p className="my-0">{local.address} </p>
									<p className="my-0">{local.telf} - {local.email}</p>
									<p className="my-0">{local.url}</p>
									</div>
								</div>
							</div>
							<div className="row">
						<h4 className="text-center">Tu experiencia es muy valiosa para nosotros.</h4>
					</div>
					<div className="col-md-12">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<p className="alinear-izquierda">Tu puntuación general de este local</p>
								<input type="radio" required name="puntuacion" className="form-check-input" id="InputPuntua1" aria-describedby="nameHelp" value="uno" onChange={handleChange} />
								<input type="radio" required name="puntuacion" className="form-check-input" id="InputPuntua2" aria-describedby="nameHelp" value="dos" onChange={handleChange} />
								<input type="radio" required name="puntuacion" className="form-check-input" id="InputPuntua3" aria-describedby="nameHelp" value="tres" onChange={handleChange} />
								<input type="radio" required name="puntuacion" className="form-check-input" id="InputPuntua4" aria-describedby="nameHelp" value="cuatro" onChange={handleChange} />
								<input type="radio" required name="puntuacion" className="form-check-input" id="InputPuntua5" aria-describedby="nameHelp" value="cinco" onChange={handleChange} />
							</div>	   
							<br/>
							<div className="form-group mb-0">
								<p className="alinear-izquierda">Título de tu opinión</p>
								<textarea placeholder="Resume tu visita o destaca algún detalle importante" name="comment" required rows="3" cols="50" onChange={handleChange} ></textarea>
							</div>
							<br/>
							<br/>
							<div className="form-group mt-0">
								<p className="alinear-izquierda">Tu opinión</p>
								<textarea placeholder="Cuenta tu experiencia a la gente: comida, ambiente, servicio..." name="comment" required rows="3" cols="50" onChange={handleChange} ></textarea>
							</div>
							<br/>
							<div className="form-group">
								<div>
									<p className="d-inline alinear-izquierda">¿Nos puedes contar algo mas?</p>
									<p className="d-inline alinear-izquierda">(opcional)</p>
								</div>
								<select name="price" id="InputPrice1" className="form-control" aria-describedby="PriceHelp" onChange={handleChange} >
									<option value="">¿Qué tal está de precio este local?</option>
									<option value="Barato">Barato</option>
									<option value="Normal">Normal</option>
									<option value="Caro">Caro</option>
								</select>
								<select name="a_domicilio" id="InputA_domicilio1" className="form-control" aria-describedby="A_domicilioHelp" onChange={handleChange} >
									<option value="">¿Ofrece este local entrega a domicilio?</option>
									<option value="Si">Si</option>
									<option value="No">No</option>
								</select>
								<select name="mesa" id="InputMesa1" className="form-control" aria-describedby="MesaHelp" onChange={handleChange} >
									<option value="">¿Este local ofrece servicio de mesa?</option>
									<option value="Si">Si</option>
									<option value="No">No</option>
								</select>
								<select name="alcohol" id="InputAlcohol1" className="form-control" aria-describedby="AlcoholHelp" onChange={handleChange} >
									<option value="">¿Se sirve en este restaurante alcohol?</option>
									<option value="Si">Si</option>
									<option value="No">No</option>
								</select>
							</div>
							<br/>
							<div className="form-group">
								<p className="alinear-izquierda">¿Que tipo de visita hiciste?</p>
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
								<p className="alinear-izquierda">¿Tienes alguna foto que compartir?</p>
								<input type="text" name="photo_location1" className="form-control" id="InputTphoto_location1" aria-describedby="photo_locationHelp" onChange={handleChange} />
								<input type="text" name="photo_location2" className="form-control" id="InputTphoto_location2" aria-describedby="photo_locationHelp" onChange={handleChange} />
								<input type="text" name="photo_location3" className="form-control" id="InputTphoto_location3" aria-describedby="photo_locationHelp" onChange={handleChange} />
							</div>

							<br/>
							<button className="col-md-10 btn-lg px-5 mb-3 mt-3 ms-2 me-2" type="submit"  id="button">Envía tu opinión</button>
							{(mensaje != null) && <p>{mensaje}</p>}
						</form>				  
					</div>
						</div>
					</div>
					</div>
			</div>

			<CustomModal  show={isModalOpened}
							titulo="Gracias por tu comentario!!!"
							handleClose={() => {setIsModalOpened(false); // essto es por pruebas, en realidad no debería venir a modal si es porque no ha puesto puntuación
												if (formData.puntuacion) navigate(`/localDetail/${params.id_local}`);
											}
											}>
					<div>{mensaje}</div>
			</CustomModal>
			</div>
		</div>
	  );
};