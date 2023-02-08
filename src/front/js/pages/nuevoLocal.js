import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const NuevoLocal = () => {
	const [local, setLocal] = useState({})
	const [formData, setFormData] = useState({});

	const [mensaje, setMensaje] = useState(null); 
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
  
    useEffect (()=> {
		if (store.token && store.token != "" && store.token != undefined) {
			navigate.push("/login"); 
		}
    }, [])

	const handleChange = (evento) =>{
		setFormData({...formData, [evento.target.name]: evento.target.value});
	}

	const handleSubmit = async (evento)=>{
		evento.preventDefault(); // para evitar la recarga ya que cancela el evento
		console.log("Comercial_Place crear", formData);

		const resp = await fetch(process.env.BACKEND_URL + "/api/Comercial_Place", 
			{method: 'POST',
			headers:{"Content-Type": "application/json",
					 "Authorization": 'Bearer '+ sessionStorage.getItem("token")
					},
			body: JSON.stringify(formData),
			});

		if (resp.ok) return navigate("/misLocales");
		else         return setMensaje(await resp.json());  
	}

	return (
		<div className="vh-100 gradient-custom">
			<div className="container text-center">
				<h3>Registro</h3>
				<p className="mb-3">Da de altas tus locales y empieza a recibir opiniones de tus usuarios</p>
				<div className="row d-flex justify-content-center align-items-center h-10">
					<div className="col-12 col-md-8 col-lg-6 col-xl-5 ">
						<div className="card px-3" id="card">
							<div className="form-body"> 
							<div className="row">
							</div>
							<div className="row"> 
								<div className="row justify-content-center">
									<div className="col-4 py-3 px-0 mx-0">
										<img src={local.image_url} className="alinear-derecha" alt="" />
									</div>
								</div>

								<div className="col-md-12">
									<form className="form-outline" onSubmit={handleSubmit}>
										<div className="form-group">
											<label className="alinear-izquierda" htmlFor="InputEmail1">Nombre del local</label>
											<input type="text" name="name" defaultValue={local.name} required className="form-control" id="InputName1" aria-describedby="nameHelp" placeholder="Nombre del local" onChange={handleChange} />
										</div>
										<br/>
										<div className="form-group">
											<label className="alinear-izquierda" htmlFor="InputEmail1">Url de la imagen del local</label>
											<input className="form-control mb-2" type="text" name="image_url" defaultValue={local.image_url} required className="form-control" id="InputImage_url" aria-describedby="image_urlHelp" placeholder="Url d la imagen del local" onChange={handleChange} />
										</div>
										<br/>
										<div className="form-group">
											<label className="alinear-izquierda" htmlFor="InputEmail1">Descripción</label>
											<textarea name="description" value={local.description} required rows="3" cols="49" onChange={handleChange} ></textarea>
										</div>
										<br/>

										<div className="form-group">
											<label className="alinear-izquierda mb-2" htmlFor="Inputurl1">Información de contacto</label>
											<input type="text" name="url" className="form-control mb-1" id="Inputurl1" value={local.url} aria-describedby="urlHelp" placeholder="Página web" onChange={handleChange} />
											<input type="text" name="email" required className="form-control mb-1" id="InputEmail1" value={local.email} aria-describedby="emailHelp" placeholder="Email" onChange={handleChange} />
											<input type="text" name="telf" required className="form-control mb-1" id="InputTelf1" value={local.telf} aria-describedby="TelfHelp" placeholder="Teléfono" onChange={handleChange} />
											<input type="text" name="address" required className="form-control mb-1" id="InputAddress1" value={local.address} ria-describedby="AddressHelp" placeholder="Dirección" onChange={handleChange} />
											<input type="text" name="location" className="form-control mb-1" id="InputLocation1" value={local.location} aria-describedby="locationHelp" placeholder="Localización" onChange={handleChange} />
										</div>
										<br/>
										<div>
										<label className="alinear-izquierda" htmlFor="InputEmail1">Características</label>

										</div>
										<div className="form-group">
											<div className="row">
													<div className="col-6"><br/>
														<input type="checkbox" name="trona" className="form-check-input alinear-izquierda-checkbox" id="InputTrona1" aria-describedby="tronaHelp" onChange={handleChange} />
														<label  htmlFor="InputTrona1">trona</label><br/>

														<input type="checkbox" name="cambiador" className="form-check-input alinear-izquierda-checkbox" id="InputCambiador2" aria-describedby="cambiadorHelp" value={local.cambiador} onChange={handleChange} />
														<label className="alinear-izquierda-checkbox" htmlFor="InputCambiador2">cambiador</label><br/>

														<input type="checkbox" name="accessible_carrito" className="form-check-input alinear-izquierda-checkbox" id="InputAccessible_carrito3" aria-describedby="accessible_carritoHelp" value={local.accessible_carrito} onChange={handleChange} />
														<label className="alinear-izquierda-checkbox" htmlFor="InputAccessible_carrito3">accessible_carrito</label><br/>
													</div>
													<div className="col-6"><br/>
													<input type="checkbox" name="espacio_carrito" className="form-check-input alinear-derecha-checkbox" id="InputEspacio_carrito3" aria-describedby="espacio_carritoHelp" value={local.espacio_carrito} onChange={handleChange} />
													<label className="alinear-derecha-checkbox" htmlFor="InputEspacio_carrito3">espacio_carrito</label><br/>

													<input type="checkbox" name="ascensor" className="form-check-input alinear-derecha-checkbox" id="InputAscensor5" aria-describedby="ascensorHelp" value={local.ascensor} onChange={handleChange} />
													<label className="alinear-derecha-checkbox" htmlFor="InputAscensor5">ascensor</label><br/>

													<input type="checkbox" name="productos_higiene" className="form-check-input alinear-derecha-checkbox" id="InputProductos_higiene5" aria-describedby="productos_higieneHelp" value={local.productos_higiene} onChange={handleChange} />
													<label className="alinear-derecha-checkbox" htmlFor="InputProductos_higiene5">productos_higiene</label><br/>
													</div>
												</div>
										</div>
										<div className="py-3 px-0 mx-0 d-flex justify-content-around">
											<button type="submit" className="btn btn-primary" id="button">Guardar</button>
											<a href="/misLocales" className="btn btn-primary" id="button">Volver</a>
										</div>
										{(mensaje != null) && <p>{mensaje}</p>}
									</form>				  
								</div>
							</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	  );
};