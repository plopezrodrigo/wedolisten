import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

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
                            <thead>
                                <tr>
                                    <th key="th1" scope="col">#</th>
                                    <th key="th2" scope="col" colSpan="2">Nombre</th>
                                    {/*<th key="th3" scope="col">Acción</th>*/}
                                </tr>
                            </thead>
                            <tbody>
                                {comentarios && comentarios.map((comentario, index)=>{   
                                    return  <>
                                                <tr key={index}>
                                                    <td key={`td1-${index}`} scope="row">{comentario.id} - {local.user_id}</td>
                                                    <td key={`td2-${index}`} colSpan="2">{comentario.comment}</td>
                                                    {/*<td key={`td3-${index}`}><a href={`/datosLocal/${local.id}`} className="btn btn-lg btn-outline-primary mb-3" key={`a-${index}`}><i className="fas fa-pencil-alt" key={`i-${index}`}/></a></td>*/}
                                                </tr>
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