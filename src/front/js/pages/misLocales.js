import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
// import LocalCard from "../component/localCard";

export const MisLocales = () => {
    const [locales, setLocales] = useState()
    const [mensaje, setMensaje] = useState();
	const { store, actions } = useContext(Context);

    const conPermisos = () => {
		return (<div className="row">
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
                                                {/*<LocalCard name={local.name} key={local.id} id={local.id} index={index} address={local.address} description={local.description} email={local.email} telf={local.telf} location={local.location} url={local.url} />*/}
                                                <tr key={index}>
                                                    <td key={`td1-${index}`} scope="row">{local.id} - {local.user_id}</td>
                                                    <td key={`td2-${index}`} colSpan="2">{local.name}</td>
                                                    <td key={`td3-${index}`}><a href={`/datosLocal/${local.user_id}`} className="btn btn-lg btn-outline-primary mb-3" key={`a-${index}`}><i className="far fa-trash-alt" key={`i-${index}`}/></a></td>
                                                </tr>
                                            </>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>);
	}

	const sinPermisos = () => {
		return (<div> 
					<h1 className="card-title">{mensaje && mensaje["msg"]}</h1> 
				</div>);
	}


    const miUseEffect = async () => {
        const resp = await fetch( process.env.BACKEND_URL + "/api/comercial-place-user",{
            method: 'GET',
            headers: {"Content-Type": "application/json",
                      "Authorization": 'Bearer '+store.token
            } 
          })
        if (resp.ok) return setLocales(await resp.json());
        else         return setMensaje(await resp.json());
        
    }

    useEffect (()=> {
        console.log("token",store.token);
        //miUseEffect();
        fetch( process.env.BACKEND_URL + "/api/comercial-place-user",{
            method: 'GET',
            headers: {"Content-Type": "application/json",
                        "Authorization": 'Bearer '+store.token
            } 
            })
        .then((response) => {if(response.status = 200){return response.json(); } })
        .then((response)=>{	if(response["msg"]){
                                setMensaje(response);
                            }else{
                                setLocales(response)
                                setMensaje({});
                            };
        })
        .catch(error => {
                    setMensaje({msg: "No tienes permisos para entrar en esta sección ("+ error.toString() + ")"});
                });
    }, [])

    return (
        <div className="container">
            <h3>Listado de Locales</h3>
			{(store.token && store.token != "" && store.token != undefined) ? conPermisos() : sinPermisos()} 
        </div>
    )
}


{/*
 useEffect (()=> {
        console.log("token",store.token)
         fetch( process.env.BACKEND_URL + "/api/comercial-place-user",{
                method: 'GET',
                headers: {"Content-Type": "application/json",
                          "Authorization": 'Bearer '+store.token
                } 
              })
		.then((response) => {if(response.status = 200){return response.json(); } })
		.then((response)=>{	if(response["msg"]){
								setMensaje(response);
							}else{
                                setLocales(response)
								setMensaje({});
							};
		})
		.catch(error => {
					setMensaje({msg: "No tienes permisos para entrar en esta sección ("+ error.toString() + ")"});
				});
    }, [])
*/}