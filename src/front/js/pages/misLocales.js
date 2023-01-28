import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import LocalCard from "../component/datosLocal";
import { DatosLocal } from "./datosLocal";

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
                    {locales && locales.map((local, index)=>{return <DatosLocal   name={local.name}
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
                                            })
                    }
                </div>
            </div>
        </div>
    )
}