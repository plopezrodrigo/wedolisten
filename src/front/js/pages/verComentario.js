import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import "../../styles/home.css";

export const VerComentario = () => {
	const params = useParams()
	const { store, actions } = useContext(Context);
	const [respuesta, setRespuesta] = useState();
	const [tieneRespuesta, setTieneRespuesta] = useState(false);
  
	const useEffectComentario = async () => { 
		if (actions.getComment(params.id_comment)){
			// Cargados stores: comentario y comentarioFotos
			return true;
		}else{
			return setMensaje(store.message );  
		}
	} 

	async function useEffectComentarioRespuesta (){
		await fetch(`${process.env.BACKEND_URL}/api/respuesta/${params.id_comment}`)
		.then(response => {
        if (response.status == 200)       setTieneRespuesta(true);
        else if (response.status == 201)  setTieneRespuesta(false);
              else console.log("Error gordo, a ver que hacemos", response.status);

        return response.json()
		})
    .then(response => { setRespuesta(response.comment); })
  	}

	useEffect (()=> {
		useEffectComentario();

		useEffectComentarioRespuesta();
	}, [])

	return (
		<div className="container fluid align-center">
		  <div className="form-body">
			<div className="row">
			    <h1 className="text-center">Datos completos del comentario</h1>
            </div>
			<div className="row">
                <div className="row">
                    <h5 className="text-center">El usuario es: {store.comentario && store.comentario.user_name}</h5>
                    <h5 className="text-center">Ha puntuado con {store.comentario && store.comentario.puntuacion} estrellas</h5>
                </div>
				
				<div className="border border-warning my-3">
					<span className="p-2"><p>{store.comentario && store.comentario.comment}</p></span>
				</div>

				<div className="col-md-12">
					<div className="text ma-home-section">  
                          <p><strong>Relación calidad/precio: </strong>{store.comentario && store.comentario.price}</p> 
                          <p><strong>Se sive a domicilio: </strong>{store.comentario && store.comentario.a_domicilio}</p> 
                          <p><strong>Se sive en la mesa: </strong>{store.comentario && store.comentario.mesa}</p> 
                          <p><strong>Se sive Alcohol: </strong>{store.comentario && store.comentario.alcohol}</p> 
                          <p><strong>Visita: </strong>{store.comentario && store.comentario.visita}</p> 
						  {store.comentarioFotos && store.comentarioFotos.map((foto, index) => {
								return  <img className="m-4" src={foto.location}></img>

						   })}
                     </div>
                     <div>
						{(tieneRespuesta) &&
							<div className="text ma-home-section">  
										<p><strong>BabyFriendly: </strong>{respuesta}</p> 
							</div>
						}
                     </div>
				</div>
			</div>
		  </div>
		</div>
	  );
};