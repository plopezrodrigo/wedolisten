import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import imagen from "../../img/logo.png";

export const DatosLocal = () => {
	const params = useParams()
	const [local, setLocales] = useState({})
	const [formData, setFormData] =  useState({tipo:"customer", user_id:1, comercial_place_id:params.id_local, comment_id: params.id_comment});
	const [mensaje, setMensaje] = useState(null); 
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
  
	const handleChange = (evento) =>{
		setFormData({...formData, [evento.target.name]: evento.target.value});
	}

	const handleSubmit = (evento)=>{
		evento.preventDefault(); // para evitar la recarga ya que cancela el evento
		console.log("Opinion User", formData, store.token);

		fetch(process.env.BACKEND_URL + "/api/Comment", 
			{method: 'POST',
			headers:{"Content-Type": "application/json"},
			body: JSON.stringify(formData),
			})
		.then(response => { 
			if (response.status == 200){ 
				navigate("/")
			}else{ 
				setMensaje(response["msg"])
			}
			return response.json(); 
		})
	}

	useEffect (()=> {
		if (store.token && store.token != "" && store.token != undefined) {
			navigate.push("/login");
		}

		fetch(`${process.env.BACKEND_URL}/api/comercial-place/${params.id_local}`)
		.then(response => {
			return response.json()
		}).then(response => {
			setLocales(response)        
		})
	}, [])

	return (
		<div className="container fluid align-center">
		  <div className="form-body">
			<div className="row">
			    <h1 className="text-center">Registro</h1>
			    <h5 className="text-center">Da de alta tus locales y mantenlos actualizados para recibir opiniones de tus usuarios</h5>
            </div>
			<div className="row">
                <div className="row justify-content-center">
                    <div className="col-4 py-3 px-0 mx-0">
                        <img src={local.image_url} className="alinear-derecha" alt="" />
                    </div>
                    <div className="col-4 py-5 px-0 mx-0">
                        <p className="my-0"><strong>{local.name} ({params.id_local} - {params.id_comment})</strong></p>
                        <p className="my-0">{local.address} </p>
                        <p className="my-0">{local.telf} - {local.email}</p>
                        <p className="my-0">{local.url}</p>
                    </div>
                </div>

				<div className="col-md-12">
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="InputEmail1">Nombre del local</label>
							<input type="text" name="name" required className="form-control" id="InputName1" aria-describedby="nameHelp" placeholder="Nombre del local" onChange={handleChange} />
						</div>
                        <br/>
						<div className="form-group">
							<h5>Descripción</h5>
							<textarea name="description" required rows="3" cols="100" onChange={handleChange} ></textarea>
						</div>
                        <br/>

						<div className="form-group">
							<label htmlFor="Inputurl1">Información de contacto</label>
							<input type="text" name="url" required className="form-control" id="Inputurl1" value={local.url} aria-describedby="urlHelp" placeholder="url" onChange={handleChange} />
	                        <br/>
							<input type="text" name="email" required className="form-control" id="InputEmail1" value={local.email} aria-describedby="emailHelp" placeholder="email" onChange={handleChange} />
							<input type="text" name="telf" required className="form-control" id="InputTelf1" value={local.telf} aria-describedby="TelfHelp" placeholder="Teléfono" onChange={handleChange} />
							<input type="text" name="address" required className="form-control" id="InputAddress1" value={local.address} ria-describedby="AddressHelp" placeholder="Dirección" onChange={handleChange} />
							<input type="text" name="location" required className="form-control" id="InputLocation1" value={local.location} aria-describedby="locationHelp" placeholder="Localización" onChange={handleChange} />
						</div>
                        <br/>
						<div className="form-group">
							<label htmlFor="InputTrona1">trona</label>
							<input type="radio" name="trona" className="form-check-input" id="InputTrona1" aria-describedby="tronaHelp" value={local.trona} onChange={handleChange} />
                            <label htmlFor="InputCambiador2">cambiador</label><br/>
                            <input type="radio" name="cambiador" className="form-check-input" id="InputCambiador2" aria-describedby="cambiadorHelp" value={local.cambiador} onChange={handleChange} />
                            <label htmlFor="InputAccessible_carrito3">accessible_carrito</label><br/>
                            <input type="radio" name="accessible_carrito" className="form-check-input" id="InputAccessible_carrito3" aria-describedby="visitaHelp" value={local.accessible_carrito} onChange={handleChange} />
                            <label htmlFor="InputEspacio_carrito3">espacio_carrito</label><br/>
                            <input type="radio" name="espacio_carrito" className="form-check-input" id="InputEspacio_carrito3" aria-describedby="espacio_carritoHelp" value={local.espacio_carrito} onChange={handleChange} />
                            <label htmlFor="InputTVisit4">ascensor</label><br/>
                            <input type="radio" name="ascensor" className="form-check-input" id="InputAscensor5" aria-describedby="ascensorHelp" value={local.ascensor} onChange={handleChange} />
                            <label htmlFor="InputProductos_higiene5">productos_higiene</label><br/>
                            <input type="radio" name="productos_higiene" className="form-check-input" id="InputProductos_higiene5" aria-describedby="productos_higieneHelp" value={local.productos_higiene} onChange={handleChange} />
						</div>
                        <br/>

						<button type="submit"  id="button">Comentar</button>
						{(mensaje != null) && <p>{mensaje}</p>}
					</form>				  
				</div>
			</div>
		  </div>
		</div>
	  );
};