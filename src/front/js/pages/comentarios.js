import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import OpinionCard from "../component/opinionCard";

export const Comentarios = () => {
    const [comentarios, setComentarios] = useState()
    const [mensaje, setMensaje] = useState();
	const { store, actions } = useContext(Context);

    const miUseEffect = async () => {
        const resp = await fetch( process.env.BACKEND_URL + "/api/Comment",{
            method: 'GET',
            headers: {"Content-Type": "application/json",
                      "Authorization": 'Bearer '+ sessionStorage.getItem("token") // hará falta?
            } 
          })
        if (resp.ok) return setComentarios(await resp.json());
        else         return setMensaje(await resp.json());  
    }

    useEffect (()=> {
        miUseEffect(); 
    }, [])


    const conPermisos = () => {
		return (<>
                <div className="row">
                    <div>
                        <table className="table table-striped">
                            <tbody>
                                {comentarios && comentarios.map((comentario, index)=>{   
                                    return  <> 
                                                <div className="col mb-3"> 
                                                    <OpinionCard comment={comentario.comment}
                                                                 nombre="{comentario.user_name}"
                                                                 puntuacion="{comentario.puntuacion}"
                                                                 />
                                                </div>
                                            </>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                </>);
	}

	const sinPermisos = () => {
		return (<div> 
					<h1 className="card-title">{mensaje && mensaje["msg"]}</h1> 
				</div>);
	}

    return (
        <div className="container">
            <h3>Listado de últimos Comentarios</h3>
			{conPermisos()}
        </div>
    )
}