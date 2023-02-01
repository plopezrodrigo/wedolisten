import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const MisLocales = () => {
    const [locales, setLocales] = useState()
    const [mensaje, setMensaje] = useState();
	const { store, actions } = useContext(Context);

    const miUseEffect = async () => {
        const resp = await fetch( process.env.BACKEND_URL + "/api/comercial-place-user",{
            method: 'GET',
            headers: {"Content-Type": "application/json",
                      "Authorization": 'Bearer '+ sessionStorage.getItem("token")
            } 
          })
        if (resp.ok) return setLocales(await resp.json());
        else         return setMensaje(await resp.json());  
    }

    useEffect (()=> {
        miUseEffect(); 
    }, [])


    const conPermisos = () => {
		return (<>
                <div className="row">
                    <a href="/nuevoLocal" className="btn btn-lg btn-outline-primary mb-3" key="miLocalAlta">Nuevo local</a>
                </div>

                <div className="row">
                    <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th key="th1" scope="col">#</th>
                                    <th key="th2" scope="col" colSpan="2">Nombre</th>
                                    <th key="th3" scope="col">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {locales && locales.map((local, index)=>{   
                                    return  <>
                                                <tr key={index}>
                                                    <td key={`td1-${index}`} scope="row">{local.id} - {local.user_id}</td>
                                                    <td key={`td2-${index}`} colSpan="2">{local.name}</td>
                                                    <td key={`td3-${index}`}><a href={`/datosLocal/${local.id}`} className="btn btn-lg btn-outline-primary mb-3" key={`a-${index}`}><i className="fas fa-pencil-alt" key={`i-${index}`}/></a></td>
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
            <h3>Listado de Locales</h3>
			{(store.token && store.token != "" && store.token != undefined) ? conPermisos() : sinPermisos()} 
        </div>
    )
}