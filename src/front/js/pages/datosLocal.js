import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const DatosLocal = () => {
	const params = useParams()
	const [local, setLocal] = useState({})
	const [formData, setFormData] = useState({"image_url": local.image_url,
											  "name"            : local.name,
											  "address"         : local.address,
											  "url"             : local.url,
											  "image_url"       : local.image_url,
											  "telf"            : local.telf,
											  "email"           : local.email,
											  "location"        : local.location,
											  "description"     : local.description,
											  "cambiador"       : local.cambiador,
											  "trona"           : local.trona,
											  "accessible_carrito" : local.accessible_carrito,
											  "espacio_carrito"    : local.espacio_carrito,
											  "ascensor"           : local.ascensor,
											  "productos_higiene"  : local.productos_higiene
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

        miUseEffect().then(resp => setLocal(resp[0]))
    }, [])

	const handleChange = (evento) =>{
		setFormData({...formData, [evento.target.name]: evento.target.value});
	}

	const handleSubmit = async (evento)=>{
		evento.preventDefault(); // para evitar la recarga ya que cancela el evento
		console.log("Comercial_Place actualizar", formData);

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


	const miImput = (tipo, nombre, valor, ph, obligatorio, clase, label) => {
		const requerido = (obligatorio ? "required" : "")
		// const codigo = () => {return <label htmlFor={`Input${nombre}>${label}</label>`}}
		const codigo = () => {return <label>{label}</label>}

		/*label && {`<label htmlFor=Input${nombre}>${label}</label>`}*/
		return(	<>
					{label && codigo()}
					<input type={tipo} name={nombre} value={valor} className={clase} id={`Input${nombre}`} aria-describedby={`${nombre}Help`} placeholder={ph} onChange={handleChange} />
				</>
			  )
	}	

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
                </div>

				<div className="col-md-12">
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							{miImput("text", "name", local.name, "Nombre local", true, "form-control", "Nombre del local")}
						</div>
                        <br/>
						<div className="form-group">
							<h5>Descripción</h5>
							<textarea name="description" value={local.description} required rows="3" cols="100" onChange={handleChange} ></textarea>
						</div>
                        <br/>

						<div className="form-group">
							{miImput("text", "url", local.url, "url", false, "form-control", "Información de contacto")}
							{miImput("text", "email", local.email, "email", false, "form-control")}
							{miImput("text", "telf", local.telf, "teléfono", false, "form-control")}
							{miImput("text", "address", local.address, "Dirección postal", false, "form-control")}
							{miImput("text", "location", local.location, "location", false, "form-control")}
						</div>
                        <br/>
						<div className="form-group">
							{miImput("radio", "trona", local.trona, "trona", false, "form-check-input")}						
							<label htmlFor="Inputtrona">trona</label><br/>

							{miImput("radio", "cambiador", local.cambiador, "cambiador", false, "form-check-input", "cambiador")}<br/>
							{miImput("radio", "accessible_carrito", local.accessible_carrito, "accessible_carrito", false, "form-check-input", "accessible_carrito")}<br/>
							{miImput("radio", "espacio_carrito", local.espacio_carrito, "espacio_carrito", false, "form-check-input", "espacio_carrito")}<br/>			
							{miImput("radio", "ascensor", local.ascensor, "ascensor", false, "form-check-input", "ascensor")}<br/>
							{miImput("radio", "productos_higiene", local.productos_higiene, "productos_higiene", false, "form-check-input", "productos_higiene")}<br/>
						</div>
                        <br/>

						<button type="submit"  id="button">Guardar</button>
						{(mensaje != null) && <p>{mensaje}</p>}
					</form>				  
				</div>
			</div>
		  </div>
		</div>
	  );
};

/**
 * 							<label htmlFor="InputEmail1">Nombre del local</label>
 * 							<input type="text" name="name" value={local.name} required className="form-control" id="InputName1" aria-describedby="nameHelp" placeholder="Nombre del local" onChange={handleChange} />
							{miImput("text", "name", local.name, "Nombre del local", true)}
						</div>
                        <br/>
						<div className="form-group">
							<h5>Descripción</h5>
							<textarea name="description" value={local.description} required rows="3" cols="100" onChange={handleChange} ></textarea>
						</div>
                        <br/>

						<div className="form-group">
							<label htmlFor="Inputurl1">Información de contacto</label>
							<input type="text" name="url" className="form-control" id="Inputurl1" value={local.url} aria-describedby="urlHelp" placeholder="url" onChange={handleChange} />
							<input type="text" name="email" required className="form-control" id="InputEmail1" value={local.email} aria-describedby="emailHelp" placeholder="email" onChange={handleChange} />
							<input type="text" name="telf" required className="form-control" id="InputTelf1" value={local.telf} aria-describedby="TelfHelp" placeholder="Teléfono" onChange={handleChange} />
							<input type="text" name="address" required className="form-control" id="InputAddress1" value={local.address} ria-describedby="AddressHelp" placeholder="Dirección" onChange={handleChange} />
							<input type="text" name="location" className="form-control" id="InputLocation1" value={local.location} aria-describedby="locationHelp" placeholder="Localización" onChange={handleChange} />
						</div>
                        <br/>
						<div className="form-group">
							<input type="radio" name="trona" className="form-check-input" id="InputTrona1" aria-describedby="tronaHelp" value={local.trona} onChange={handleChange} />
							<label htmlFor="InputTrona1">trona</label><br/>

                            <input type="radio" name="cambiador" className="form-check-input" id="InputCambiador2" aria-describedby="cambiadorHelp" value={local.cambiador} onChange={handleChange} />
                            <label htmlFor="InputCambiador2">cambiador</label><br/>

                            <input type="radio" name="accessible_carrito" className="form-check-input" id="InputAccessible_carrito3" aria-describedby="accessible_carritoHelp" value={local.accessible_carrito} onChange={handleChange} />
                            <label htmlFor="InputAccessible_carrito3">accessible_carrito</label><br/>

                            <input type="radio" name="espacio_carrito" className="form-check-input" id="InputEspacio_carrito3" aria-describedby="espacio_carritoHelp" value={local.espacio_carrito} onChange={handleChange} />
                            <label htmlFor="InputEspacio_carrito3">espacio_carrito</label><br/>

                            <input type="radio" name="ascensor" className="form-check-input" id="InputAscensor5" aria-describedby="ascensorHelp" value={local.ascensor} onChange={handleChange} />
                            <label htmlFor="InputAscensor5">ascensor</label><br/>

                            <input type="radio" name="productos_higiene" className="form-check-input" id="InputProductos_higiene5" aria-describedby="productos_higieneHelp" value={local.productos_higiene} onChange={handleChange} />
                            <label htmlFor="InputProductos_higiene5">productos_higiene</label><br/>

 * 
 * 
 */