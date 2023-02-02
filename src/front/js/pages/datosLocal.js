import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const DatosLocal = () => {
	const params = useParams()
	const [local, setLocal] = useState({})
	const [formData, setFormData] = useState({"name"            : local.name,
											  "address"         : local.address,
											  "url"             : local.url,
											  "image_url"       : local.image_url,
											  "telf"            : local.telf,
											  "email"           : local.email,
											  "location"        : local.location,
											  "description"     : local.description,
											  "cambiador"       : (local.cambiador ? true : false),
											  "trona"           : (local.trona ? true : false),
											  "accessible_carrito" : (local.accessible_carrito ? true : false),
											  "espacio_carrito"    : (local.espacio_carrito ? true : false),
											  "ascensor"           : (local.ascensor ? true : false),
											  "productos_higiene"  : (local.productos_higiene ? true : false)
									});
	const [mensaje, setMensaje] = useState(null); 
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
  
    const miUseEffect = async () => {
        const resp = await fetch(`${process.env.BACKEND_URL}/api/comercial-place/${params.local_id}`)

        if (resp.ok) return await resp.json();
        else         return setMensaje(await resp.json());  
    }

    useEffect (()=> {
		if (store.token && store.token != "" && store.token != undefined) {
			navigate.push("/login");  
		}

        miUseEffect().then(resp => setLocal(resp));
    }, [])

	const handleChange = (evento) =>{
		setFormData({...formData, [evento.target.name]: evento.target.value});
	}

	const handleSubmit = async (evento)=>{
		evento.preventDefault(); // para evitar la recarga ya que cancela el evento
		console.log("Comercial_Place actualizar", formData);

		const resp = await fetch(process.env.BACKEND_URL +"/api/Comercial_Place/"+ params.local_id, 
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
		<div className="container fluid align-center">
		  <div className="form-body"> 
			<div className="row">
			    <h1 className="text-center">Registro</h1>
			    <h5 className="text-center">Da de alta tus locales y mantenlos actualizados para recibir opiniones de tus usuarios</h5>
            </div>
			<div className="row"> 
				<div className="col-md-12">
					<form onSubmit={handleSubmit}>
						<div className="row justify-content-center">
							<div className="col py-3 m-0"> 
								<img src={local.image_url} className="imagenLocal" alt="" />
	  							<input type="text" name="image_url" defaultValue={local.image_url} required className="form-control imagenLocal" id="Inputimage_url" aria-describedby="image_urlHelp" placeholder="image url" onChange={handleChange} />
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="InputEmail1">Nombre del local</label>
  							<input type="text" name="name" defaultValue={local.name} required className="form-control" id="InputName1" aria-describedby="nameHelp" placeholder="Nombre del local" onChange={handleChange} />
						</div>
                        <br/>
						<div className="form-group">
							<h5>Descripción</h5>
							<textarea name="description" defaultValue={local.description} required rows="3" cols="100" onChange={handleChange} ></textarea>
						</div>
                        <br/>

						<div className="form-group">
							<label htmlFor="Inputurl1">Información de contacto</label>
							<input type="text" name="url" className="form-control" id="Inputurl1" defaultValue={local.url} aria-describedby="urlHelp" placeholder="url" onChange={handleChange} />
							<input type="text" name="email" required className="form-control" id="InputEmail1" defaultValue={local.email} aria-describedby="emailHelp" placeholder="email" onChange={handleChange} />
							<input type="text" name="telf" required className="form-control" id="InputTelf1" defaultValue={local.telf} aria-describedby="TelfHelp" placeholder="Teléfono" onChange={handleChange} />
							<input type="text" name="address" required className="form-control" id="InputAddress1" defaultValue={local.address} ria-describedby="AddressHelp" placeholder="Dirección" onChange={handleChange} />
							<input type="text" name="location" className="form-control" id="InputLocation1" defaultValue={local.location} aria-describedby="locationHelp" placeholder="Localización" onChange={handleChange} />
						</div>
                        <br/>
						<div className="form-group">
							<input type="checkbox" name="trona" className="form-check-input" id="InputTrona1" aria-describedby="tronaHelp" onChange={handleChange} />
							<label htmlFor="InputTrona1">trona</label><br/>

                            <input type="checkbox" name="cambiador" className="form-check-input" id="InputCambiador2" aria-describedby="cambiadorHelp" onChange={handleChange} />
                            <label htmlFor="InputCambiador2">cambiador</label><br/>

                            <input type="checkbox" name="accessible_carrito" className="form-check-input" id="InputAccessible_carrito3" aria-describedby="accessible_carritoHelp" onChange={handleChange} />
                            <label htmlFor="InputAccessible_carrito3">accessible_carrito</label><br/>

                            <input type="checkbox" name="espacio_carrito" className="form-check-input" id="InputEspacio_carrito3" aria-describedby="espacio_carritoHelp" onChange={handleChange} />
                            <label htmlFor="InputEspacio_carrito3">espacio_carrito</label><br/>

                            <input type="checkbox" name="ascensor" className="form-check-input" id="InputAscensor5" aria-describedby="ascensorHelp"  onChange={handleChange} />
                            <label htmlFor="InputAscensor5">ascensor</label><br/>

                            <input type="checkbox" name="productos_higiene" className="form-check-input" id="InputProductos_higiene5" aria-describedby="productos_higieneHelp" onChange={handleChange} />
                            <label htmlFor="InputProductos_higiene5">productos_higiene</label><br/>
						</div>
 
                        <br/>
						{console.log("FormData antes ", formData)}
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
	  );
};