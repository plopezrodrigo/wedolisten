import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
// import LocalCard from "../component/localCard";

export const MisLocales = () => {
    const params = useParams()
    const [locales, setLocales] = useState()
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

    useEffect (()=> {
        if (store.token && store.token != "" && store.token != undefined) {
			navigate.push("/login");
		}

        fetch(process.env.BACKEND_URL + "/api/comercial-place/" + params.user_id)
        .then(response => {
            return response.json()
        }).then(response => {
            setLocales(response)      
        })
    }, [])

    return (
        <div className="container">
            <h3>Listado de Locales</h3>
            <div className="row">
                <div>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col" colspan="2">Nombre</th>
                                <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locales && locales.map((local, index)=>{    
                                return  <>
                                            {/*<LocalCard name={local.name} key={local.id} id={local.id} index={index} address={local.address} description={local.description} email={local.email} telf={local.telf} location={local.location} url={local.url} />*/}
                                            <tr>
                                                <th scope="row">{local.id} - {local.user_id}</th>
                                                <td colspan="2">{local.name}</td>
                                                <td><a href={`/datosLocal/${local.user_id}`} className="btn btn-lg btn-outline-primary mb-3"><i className="far fa-trash-alt"/></a></td>
                                            </tr>
                                        </>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}