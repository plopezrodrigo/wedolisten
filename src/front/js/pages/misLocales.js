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
                    <div class="col-sm-10"></div>
                    <div className="col-2 align-self-end">
                        <button href="/nuevoLocal" id="button" key="miLocalAlta">Nuevo</button>
                    </div>
                </div>

                <div className="row">
                    <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th key="th1" scope="col">#</th>
                                    <th key="th2" scope="col" colSpan="3">Nombre</th>
                                    <th key="th3" scope="col">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {locales && locales.map((local, index)=>{   
                                    return  <>
                                                <tr key={index}>
                                                    <td key={`td1-${index}`} scope="row">{local.id} - {local.user_id}</td>
                                                    <td key={`td2-${index}`} colSpan="3">{local.name}</td>
                                                    <td key={`td3-${index}`}><a href={`/datosLocal/${local.id}`} id="iconbutton" key={`a1-${index}`}><i className="fas fa-pencil-alt" key={`i1-${index}`}/></a>
                                                                             <a href={`/localDetail/${local.id}`} id="iconbutton"key={`a2-${index}`}><i className="fas fa-eye" key={`i2-${index}`}/></a></td>
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