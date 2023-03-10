import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import MilocalCard from "../component/milocalCard";


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
            <div className="myDetails">
                <div className="headerSection">
                    <div className="container">
                        <div className="row">
                            <div className="col-10">
                                <h2>Mis Locales</h2>
                                <span>Consulta o gestiona tus locales.</span>
                            </div>
                            <div className="col-2">
                                <button  className="btn btn-primary px-5 mb-3 mt-3" id="button">
                                    <Link to="/nuevoLocal"  key="miLocalAlta" className="linkfooter">Nuevo</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contaniner fluid">
                <div className="row align-items-start">
                    {locales && locales.map((local, index) => {
                        return <div key={local.id} className="col-3 mt-3 ms-2">
                        <MilocalCard
                            name={local.name}
                            key={local.id}
                            id={local.id}
                            index={index}
                            description={local.description}
                            image_url={local.image_url}
                            id_local={local.user_id}
                        />
                        </div>
                    })}
                </div>
                <div className="row align-items-start">
                    {locales && locales.map((local, index)=>{   
                        return  (
                        <tr key={index}>
                            <td key={`td1-${index}`} scope="row">{local.id} - {local.user_id}</td>
                            <td key={`td2-${index}`} colSpan="3">{local.name}</td>
                            <td key={`td3-${index}`}>
                                <a href={`/datosLocal/${local.id}`} id="iconbutton" key={`a1-${index}`}><i className="fas fa-pencil-alt" key={`i1-${index}`}/></a>
                                <a href={`/localDetail/${local.id}`} id="iconbutton"key={`a2-${index}`}><i className="fas fa-eye" key={`i2-${index}`}/></a></td>
                        </tr>)
                                            
                    })
                    }
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
			{(store.token && store.token != "" && store.token != undefined) ? conPermisos() : sinPermisos()} 
        </div>
    )
}