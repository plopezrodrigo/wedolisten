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
				<h3 className="mt-3" id="iconbutton">
				Escribe una opinión y ayúdanos a mejorar
        		</h3>
       			<p className="mb-0">Historias como la tuya ayudan a mejorar. Comparte tu experiencia y ayúdanos.</p>
					<div className="card px-3" id="card">
						<form className="form-outline" noValidate onSubmit={handleSubmit}>
							<div class="row d-flex justify-content-center align-items-center h-10">
								<p></p>
								<div class="col-12 mt-2">
									<p></p>
									<label htmlFor="InputEmail1" className="alinear-izquierda" defaultValue={local.name}>
                    				Nombre del local
                  					</label>
									<input type="text" name="name" defaultValue={local.name} required className="form-control" id="textarea" aria-describedby="nameHelp" onChange={handleChange}/>
								</div>
								<div className="col-md-12 mt-2">
								<label className="alinear-izquierda" htmlFor="Inputurl1">
									Información de contacto
								</label>
								<input
									type="text"
									name="url"
									className="form-control mb-1"
									id="Inputurl1"
									aria-describedby="urlHelp"
									placeholder="Página web"
									defaultValue={local.url}
									onChange={handleChange}
								/>
								<input
									type="text"
									name="email"
									required
									className="form-control mb-1"
									id="InputEmail1"
									aria-describedby="emailHelp"
									defaultValue={local.email}
									placeholder="Email"
									onChange={handleChange}
								/>
								<input
									type="text"
									name="telf"
									required
									className="form-control mb-1"
									id="InputTelf1"
									aria-describedby="TelfHelp"
									defaultValue={local.telf}
									placeholder="Teléfono"
									onChange={handleChange}
								/>
								<input
									type="text"
									name="address"
									required
									className="form-control mb-1"
									id="InputAddress1"
									ria-describedby="AddressHelp"
									defaultValue={local.address}
									placeholder="Dirección"
									onChange={handleChange}
								/>
                				</div>
								<div className="col-12 mt-2">
								<p className="alinear-izquierda">Tu puntuación general de este local</p>
								<input type="radio" required name="puntuacion" className="form-check-input" id="InputPuntua1" aria-describedby="nameHelp" value="uno" onChange={handleChange} />
								<input type="radio" required name="puntuacion" className="form-check-input" id="InputPuntua2" aria-describedby="nameHelp" value="dos" onChange={handleChange} />
								<input type="radio" required name="puntuacion" className="form-check-input" id="InputPuntua3" aria-describedby="nameHelp" value="tres" onChange={handleChange} />
								<input type="radio" required name="puntuacion" className="form-check-input" id="InputPuntua4" aria-describedby="nameHelp" value="cuatro" onChange={handleChange} />
								<input type="radio" required name="puntuacion" className="form-check-input" id="InputPuntua5" aria-describedby="nameHelp" value="cinco" onChange={handleChange} />
								</div>
							<div className="col-md-12 mt-2">
								<label className="alinear-izquierda" htmlFor="InputEmail1">
								Título de tu opinión
								</label>
								<textarea
									required
									className="form-control"
									type="description"
									name="description"
									id="textarea"
									aria-describedby="Descripción"
									row="5"
									cols="109"
									onChange={handleChange}
									placeholder="Resume tu visita o destaca algún detalle importante"
								></textarea>
                			</div>
							<div className="col-md-12 mt-2">
								<label className="alinear-izquierda" htmlFor="InputEmail1">
								Tu opinión
								</label>
								<textarea
									required
									className="form-control"
									type="description"
									name="description"
									id="textarea"
									aria-describedby="Descripción"
									row="5"
									cols="109"
									onChange={handleChange}
									placeholder="Cuenta tu experiencia al resto de usuarios y comparte qué es lo más te ha gustado y lo que menos."
								></textarea>
                			</div>	   
							<div className="col-12 mt-2">
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
								<select name="mesa" id="InputMesa1" className="form-control" aria-describedby="MesaHelp" onChange={handleChange} >
									<option value="">¿Este local tiene jardines o parque infantil?</option>
									<option value="Si">Si</option>
									<option value="No">No</option>
								</select>
								<select name="alcohol" id="InputAlcohol1" className="form-control" aria-describedby="AlcoholHelp" onChange={handleChange} >
									<option value="">¿Repetrías la experiencia?</option>
									<option value="Si">Si</option>
									<option value="No">No</option>
								</select>
							</div>
							<div className="col-12 mt-2">
								<p className="alinear-izquierda">¿Tienes alguna foto que compartir?</p>
								<input type="text" name="photo_location1" className="form-control" id="InputTphoto_location1" aria-describedby="photo_locationHelp" onChange={handleChange} />
								<input type="text" name="photo_location2" className="form-control" id="InputTphoto_location2" aria-describedby="photo_locationHelp" onChange={handleChange} />
							</div>
							<div className="col-12">
                				<div className="py-3 px-0 mx-0 d-flex justify-content-around">
                    				<button type="submit" className="btn btn-primary px-5 mb-3 mt-3" id="button">
                      				Guardar
                    				</button>
                  				</div>
                  			{mensaje != null && <p>{mensaje}</p>}
             				 </div>
							</div>
						</form>				  
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