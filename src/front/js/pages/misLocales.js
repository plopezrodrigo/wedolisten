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
            </div>
        </div>
    )
}