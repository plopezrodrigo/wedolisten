import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import imagen from "../../img/logo.png";

export const OpinionManager = () => {
	const params = useParams()
	const [local, setLocales] = useState({})
	const [comentario, setComentario] = useState();
	const [formData, setFormData] = useState({tipo:"manager", comercial_place_id:params.id_local, comment_id: params.id_comment});
	const [mensaje, setMensaje] = useState(null); 
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
  

	const useEffectComentario = async () => { 
		const resp = await fetch(`${process.env.BACKEND_URL}/api/comment/${params.id_comment}`,{
			method: 'GET',
			headers: {"Content-Type": "application/json",
					  "Authorization": 'Bearer '+ sessionStorage.getItem("token") // hará falta?
			} 
		  })
		if (resp.ok) return setComentario(await resp.json());
		else         return setMensaje(await resp.json());  
	} 

	useEffect (()=> {
		if (!(store.token && store.token != "" && store.token != undefined)) {
			console.log("Con token???", token);
			navigate.push("/login");
		}
		// Debe venir con un comentario y no de debe ser cero.
		if (!(params.id_comment) && params.id_comment != 0){  
			navigate.push("/login");
		}

		fetch(`${process.env.BACKEND_URL}/api/comercial-place-2/${params.id_local}`)
		.then(response => {
			return response.json()
		}).then(response => {
			setLocales(response)        
		})

		useEffectComentario();
	}, [])

	const handleChange = (evento) =>{
		setFormData({...formData, [evento.target.name]: evento.target.value});
	}

	const handleSubmit = (evento)=>{
		evento.preventDefault(); // para evitar la recarga ya que cancela el evento
		console.log("A ver que token", sessionStorage.getItem("token"));

		fetch(`${process.env.BACKEND_URL}/api/comment/${params.id_comment}`,		
			{method: 'POST',
			headers:{"Content-Type": "application/json"},
			"Authorization": 'Bearer '+ sessionStorage.getItem("token"), 
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
			    <h1 className="text-center">Un usuario ha opinado de tu local</h1>
			    <h5 className="text-center">Ayúdale a mejorar la experiencia o agradécele el comentario</h5>
            </div>
			<div className="row">
                <div className="row justify-content-center">
                    <div className="col-4 py-3 px-0 mx-0">
                        <img src={imagen} className="alinear-derecha" alt="" />
                    </div>
                    <div className="col-4 py-5 px-0 mx-0">
					<p className="my-0"><strong>{local.name} ({params.id_local} - {params.id_comment})</strong></p>
                        <p className="my-0">{local.address} </p>
                        <p className="my-0">{local.telf} - {local.email}</p>
                        <p className="my-0">{local.url}</p>
                    </div>
                </div>
                <div className="row">
                    <h1 className="text-center">El usuario es:</h1>
                    <h5 className="text-center">{comentario && comentario.user_name}</h5>
                    <h5 className="text-center">Ha puntuado con 3 estrellas</h5>
                    {/*<h5 className="text-center">Ha puntuado con {comentario && comentario.puntuacion} estrellas</h5>*/}
                </div>
				
				<div className="border border-warning my-3">
					<span className="p-2"><p>{comentario && comentario.comment}</p></span>
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
		</div>
	  );
};