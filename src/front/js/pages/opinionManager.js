import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import CustomModal from "../component/customModal";
import { useModal } from "../hooks/UseModal";
import "../../styles/home.css";
import imagen from "../../img/logo.png";

export const OpinionManager = () => {
	const params = useParams()
	const [local, setLocales] = useState({})
	const [formData, setFormData] = useState({tipo:"manager", comercial_place_id:params.id_local, comment_id: params.id_comment, puntuacion: null});
	const [mensaje, setMensaje] = useState(null); 
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	const [isModalOpened, setIsModalOpened, toggleModal] = useModal(false);

	const useEffectComentario = async () => { 
		if (actions.getComment(params.id_comment)){
			// Cargados stores: comentario y comentarioFotos
			return true;
		}else{
			return setMensaje(store.message ); 
		}
	} 

	useEffect (()=> {
		if (!(store.token && store.token != "" && store.token != undefined)) {
			navigate("/login");
		}
		// Debe venir con un comentario y no de debe ser cero.
		if (!(params.id_comment) && params.id_comment != 0){  
			navigate("/login");
		}

		fetch(`${process.env.BACKEND_URL}/api/comercial-place/${params.id_local}`)
		.then(response => {	return response.json()})
		.then(response => {	setLocales(response)})

		useEffectComentario();

		//useEffectfotosComentario();	
	}, [])

	const handleChange = (evento) =>{
		setFormData({...formData, [evento.target.name]: evento.target.value});
	}

	const handleSubmit = (evento)=>{
		evento.preventDefault(); // para evitar la recarga ya que cancela el evento
		console.log("A ver que token", sessionStorage.getItem("token"));

		fetch(`${process.env.BACKEND_URL}/api/comment/${params.id_comment}`,		
			{method: 'POST',
				headers:{"Content-Type": "application/json",
				"Authorization": 'Bearer '+ sessionStorage.getItem("token"), 
			},
			body: JSON.stringify(formData),
			})
		.then(response => {
			if (response.status == 200){ 
				setMensaje("Respuesta cargada correctamente")
				toggleModal();
			}else{ 
				setMensaje(response["msg"])
				toggleModal();
			}
		})
	}

	return (
		<div className="bg-contact3">
		<div className="vh-100 gradient-custom">
		<div className="container text-center">
		  <div className="row d-flex justify-content-center align-items-center h-10">
		  <div className="col-12 col-md-8 col-lg-6 col-xl-5 ">
		  	<h3 className="mt-3" id="iconbutton">Has recibido una opinión de un usuario</h3>
			<p className="mb-3">Ayúdale a mejorar la experiencia o agradécele el comentario.</p>
		  	<div className="card px-3" id="card">
                <div className="col-md-12">
                    <p className="alinear-izquierda mt-3">{store.comentario && store.comentario.user_name}</p>
                </div>
				<div className="col-md-12">
					<p className="alinear-izquierda">Ha puntuado con <strong>{store.comentario && store.comentario.puntuacion} estrellas</strong></p>
				</div>
				<div className="col-md-12">
					<label className="alinear-izquierda" htmlFor="InputEmail1">
						Su Opinión:
					</label>
					<textarea
						required
						className="form-control"
						type="description"
						name="description"
						id="textarea"
						aria-describedby="Descripción"
						row="3"
						cols="109"
						defaultValue={store.comentario && store.comentario.comment}
						onChange={handleChange}
					></textarea>
				</div>
				<div className="col-md-12">
					<div className="text ma-home-section mt-2 mb-2"> 
					<label className="alinear-izquierda" htmlFor="Inputurl1">
                    ¿Qué tal está de precio este local?
                  	</label>
					<input
                    type="text"
                    name="url"
                    className="form-control mb-1"
                    id="Inputurl1"
                    aria-describedby="urlHelp"
                    placeholder="Sobre la relación calidad/precio:"
					defaultValue={store.comentario && store.comentario.price}
                    onChange={handleChange}
                  	/>
					<label className="alinear-izquierda" htmlFor="Inputurl1">
                    ¿Este local tiene jardines o parque infantil?
                  	</label>
					<input
                    type="text"
                    name="url"
                    className="form-control mb-1"
                    id="Inputurl1"
                    aria-describedby="urlHelp"
                    placeholder="Sobre la relación calidad/precio:"
					defaultValue={store.comentario && store.comentario.a_domicilio}
                    onChange={handleChange}
                  	/>
					<label className="alinear-izquierda" htmlFor="Inputurl1">
                    ¿Repetirías la experiencia?
                  	</label>
					<input
                    type="text"
                    name="url"
                    className="form-control mb-1"
                    id="Inputurl1"
                    aria-describedby="urlHelp"
                    placeholder="Sobre la relación calidad/precio:"
					defaultValue={store.comentario && store.comentario.mesa}
                    onChange={handleChange}
                  	/>
					
                     </div>
				</div>

				<div className="col-md-12">
					<form onSubmit={handleSubmit}>
						<div className="col-md-12">
						<label className="alinear-izquierda" htmlFor="InputEmail1">
						Responde al usuario:
						</label>
						<textarea
						required
						className="form-control"
						type="comment"
						name="comment"
						id="textarea"
						aria-describedby="Descripción"
						row="3"
						cols="109"
						onChange={handleChange}
						></textarea>
						</div>
						<div className="">
                    	<button
                        className="btn btn-primary px-5 mb-3 mt-3"
                        id="button">
                        Responder
                     	 </button>
                    	</div>				
						{(mensaje != null) && <p>{mensaje}</p>}
					</form>				  
				</div>
			</div>
		  </div>
		  </div>
		</div>

		  <CustomModal  show={isModalOpened}
           		        titulo="Tu respuesta al mensaje"
                	    handleClose={() => {setIsModalOpened(false);
										   navigate(`/localDetail/${params.id_local}`);}
									}>
				<div>{mensaje}</div>
		  </CustomModal>
		</div>
		</div>
	  );
};


/**
 * 
 * const useEffectComentario = async () => { 
		const resp = await fetch(`${process.env.BACKEND_URL}/api/comment/${params.id_comment}`,{
			method: 'GET',
			headers: {"Content-Type": "application/json",
					  "Authorization": 'Bearer '+ sessionStorage.getItem("token") // hará falta?
			} 
		  })
		if (resp.ok) return setComentario(await resp.json()); 
		else         return setMensaje(await resp.json());  
	} 

	const useEffectfotosComentario = async () => { 
		const resp = await fetch(`${process.env.BACKEND_URL}/api/photos_comment/${params.id_comment}`,{
			method: 'GET',
			headers: {"Content-Type": "application/json",
					  "Authorization": 'Bearer '+ sessionStorage.getItem("token") // hará falta?
			} 
		  })
		if (resp.ok) return setFotos(await resp.json()); 
		else         return setMensaje(await resp.json());  
	} 
 */