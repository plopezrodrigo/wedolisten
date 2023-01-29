import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import LocalCard from "../component/localCard";

export const MisLocales = () => {
    const params = useParams()
    const [locales, setLocales] = useState()
	const { store, actions } = useContext(Context);

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
                <div className="col-3">
                {locales && locales.map((local, index)=>{    
                        return <>
                                    <LocalCard name={local.name}
                                                key={local.id}
                                                id={local.id}
                                                index={index}
                                                address={local.address}
                                                description={local.description}
                                                email={local.email}
                                                telf={local.telf}
                                                location={local.location}
                                                url={local.url}
                                    />
                                    <Link to={`/datosLocal/${local.user_id}`} className="btn btn-lg btn-outline-primary mb-3" id={`button${local.id}`}>
                                    Modificar
                                    </Link>      
                                </>
                        })
                    }
                </div>
            </div>
        </div>
    )
}