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
		<div className="container fluid align-center">
		  <div className="form-body">
			<div className="row">
			    <h1 className="text-center">Un usuario ha opinado de tu local</h1>
			    <h5 className="text-center">Ayúdale a mejorar la experiencia o agradécele el comentario</h5>
            </div>
			<div className="row">
                <div className="row justify-content-center">
                    <div className="col-4 py-3 px-0 mx-0">
                        <img src={local.image_url} className="alinear-derecha" alt="" width="60%" height="60%"/>
                    </div>
                    <div className="col-4 py-3 px-2 mx-2">
						<p className="my-0"><strong>{local.name} ({params.id_local} - {params.id_comment})</strong></p>
                        <p className="my-0">{local.address} </p>
                        <p className="my-0">{local.telf} - {local.email}</p>
                        <p className="my-0">{local.url}</p>
                    </div>
                </div>
                <div className="row">
                    <h1 className="text-center">El usuario es: {store.comentario && store.comentario.user_name}</h1>
                    <h5 className="text-center">Ha puntuado con <strong>{store.comentario && store.comentario.puntuacion} estrellas</strong></h5>
                </div>
				
				<div className="border border-warning my-3">
					<span className="p-2"><p>{store.comentario && store.comentario.comment}</p></span>
				</div>

				<div className="col-md-12">
					<div className="text ma-home-section">  
                          <p><strong>Sobre la relación calidad/precio: </strong>{store.comentario && store.comentario.price}</p> 
                          <p><strong>Indicó si se sive a domicilio: </strong>{store.comentario && store.comentario.a_domicilio}</p> 
                          <p><strong>Indicó si se sive en la mesa: </strong>{store.comentario && store.comentario.mesa}</p> 
                          <p><strong>Indicó si se sive Alcohol: </strong>{store.comentario && store.comentario.alcohol}</p> 
                          <p><strong>Fue una visita: </strong>{store.comentario && store.comentario.visita}</p> 
                          <p><strong>Fue una visita: </strong>{store.comentario && store.comentario.photo_location1}</p> 
						  {store.comentarioFotos && store.comentarioFotos.map((foto, index) => {
								return  <img  className="m-4" src={foto.location}></img>
						   })}
                     </div>
				</div>

				<div className="col-md-12">
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<h5>Responde al usuario</h5>
							<textarea name="comment" required rows="3" cols="100" onChange={handleChange} ></textarea>
						</div>

						<br/>
						<button type="submit"  id="button">Comentario</button>
						{(mensaje != null) && <p>{mensaje}</p>}
					</form>				  
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