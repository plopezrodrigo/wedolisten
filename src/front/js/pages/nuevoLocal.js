import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const NuevoLocal = () => {
	const [formData, setFormData] = useState({});

	const [mensaje, setMensaje] = useState(null);
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);

	useEffect(() => {
		if (!(store.token && store.token != "" && store.token != undefined)) {
			navigate("/login");
		}
	}, [])

	const handleChange = (evento) => {
		setFormData({ ...formData, [evento.target.name]: evento.target.value });
	}

	const handleChangecheck = (evento) => {
		setFormData({ ...formData, [evento.target.name]: formData[evento.target.name] ? false : true })
	};

	const handleSubmit = async (evento) => {
		evento.preventDefault(); // para evitar la recarga ya que cancela el evento

		if (actions.altaLocal(formData))
			navigate("/misLocales");
		else
			return setMensaje(store.message);
	}


	return (
		<div className="vh-100 gradient-custom">
			<div className="container text-center">
				<h3>Registro</h3>
				<p className="mb-0">Da de altas tus locales y empieza a </p>
				<p className="mt-0 mb-5">recibir opiniones de tus usuarios</p>
				<div className="row d-flex justify-content-center h-100">
					<div className="col-12 col-md-8 col-lg-6 col-xl-5">
						<div className="card px-3" id="card">
							<form className="form-outline" noValidate onSubmit={handleSubmit}>
								<div className="col-md-12">
									{/* <a href="/misLocales" className="btn btn-primary" id="button">Volver</a> */}
									<label className="alinear-izquierda mt-3" htmlFor="InputEmail1">Nombre del local</label>
									<input type="text"
										name="name"
										required
										className="form-control mb-2 mt-3"
										aria-describedby="nameHelp"
										placeholder="Nombre del local"
										onChange={handleChange} />

								</div>
								<div className="row">
									<div className="col-md-12">
										<form className="form-outline" onSubmit={handleSubmit}>
											<div className="form-group">
												<p>{" "}</p>
												<label className="alinear-izquierda" htmlFor="InputEmail1">Nombre del local</label>
												<input type="text" name="name" required className="form-control" id="InputName1" aria-describedby="nameHelp" placeholder="Nombre del local" onChange={handleChange} />
											</div>
											<br />
											<div className="form-group">
												<div className="row justify-content-center">
													{/*<div className="col-4 py-3 px-0 mx-0 img-responsive">
													<img src={formData.image_url} className="alinear-derecha" alt="" />
												</div>*/}
													<label className="alinear-izquierda" htmlFor="InputEmail1">Url de la imagen del local</label>
													<input className="form-control mb-2" type="text" name="image_url" required id="InputImage_url" aria-describedby="image_urlHelp" placeholder="Url de la imagen principal del local" onChange={handleChange} />
													<input className="form-control mb-2" type="text" name="image_url1" id="InputImage_url1" aria-describedby="image_urlHelp1" placeholder="Añade otra Url del local" onChange={handleChange} />
													<input className="form-control mb-2" type="text" name="image_url2" id="InputImage_url2" aria-describedby="image_urlHelp2" placeholder="Añade otra Url del local" onChange={handleChange} />
												</div>
											</div>
											<br />
											<div className="form-group">
												<label className="alinear-izquierda" htmlFor="InputEmail1">Descripción</label>
												<textarea name="description" required rows="3" cols="49" onChange={handleChange} ></textarea>
											</div>
											<br />

											<div className="form-group">
												<label className="alinear-izquierda mb-2" htmlFor="Inputurl1">Información de contacto</label>
												<input type="text" name="url" className="form-control mb-1" id="Inputurl1" aria-describedby="urlHelp" placeholder="Página web" onChange={handleChange} />
												<input type="text" name="email" required className="form-control mb-1" id="InputEmail1" aria-describedby="emailHelp" placeholder="Email" onChange={handleChange} />
												<input type="text" name="telf" required className="form-control mb-1" id="InputTelf1" aria-describedby="TelfHelp" placeholder="Teléfono" onChange={handleChange} />
												<input type="text" name="address" required className="form-control mb-1" id="InputAddress1" ria-describedby="AddressHelp" placeholder="Dirección" onChange={handleChange} />
												<input type="text" name="location" className="form-control mb-1" id="InputLocation1" aria-describedby="locationHelp" placeholder="Localización" onChange={handleChange} />
											</div>
											<br />
											<div>
												<label className="alinear-izquierda" htmlFor="InputEmail1">Características</label><br />

											</div>
											<div className="form-group">
												<div className="row alinear-izquierda-checkbox">
													<div className="col-12">
														<input type="checkbox" name="trona" className="form-check-input mx-2" id="InputTrona1" aria-describedby="tronaHelp" onChange={handleChangecheck} />
														<label htmlFor="InputTrona1">Trona</label>
													</div>
												</div>
												<br />

												<div className="row alinear-izquierda-checkbox">
													<div className="col-12">
														<input type="checkbox" name="cambiador" className="form-check-input mx-2" id="InputCambiador2" aria-describedby="cambiadorHelp" onChange={handleChangecheck} />
														<label htmlFor="InputCambiador2">Cambiador</label><br />
													</div>
												</div>
												<br />

												<div className="row alinear-izquierda-checkbox">
													<div className="col-12">
														<input type="checkbox" name="accessible_carrito" className="form-check-input mx-2" id="InputAccessible_carrito3" aria-describedby="accessible_carritoHelp" onChange={handleChangecheck} />
														<label htmlFor="InputAccessible_carrito3">Accessible con carrito</label><br />
													</div>
												</div>
												<br />

												<div className="row alinear-izquierda-checkbox">
													<div className="col-12">
														<input type="checkbox" name="espacio_carrito" className="form-check-input mx-2" id="InputEspacio_carrito3" aria-describedby="espacio_carritoHelp" onChange={handleChangecheck} />
														<label htmlFor="InputEspacio_carrito3">Espacio para carrito</label><br />
													</div>
												</div>
												<br />

												<div className="row alinear-izquierda-checkbox">
													<div className="col-12">
														<input type="checkbox" name="ascensor" className="form-check-input mx-2" id="InputAscensor5" aria-describedby="ascensorHelp" onChange={handleChangecheck} />
														<label htmlFor="InputAscensor5">Ascensor</label><br />
													</div>
												</div>
												<br />

												<div className="row alinear-izquierda-checkbox">
													<div className="col-12">
														<input type="checkbox" name="productos_higiene" className="form-check-input mx-2" id="InputProductos_higiene5" aria-describedby="productos_higieneHelp" onChange={handleChangecheck} />
														<label htmlFor="InputProductos_higiene5">Productos de Higiene</label><br />
													</div>
												</div>
												<br />
											</div>
											<div className="col-md-12 mt-3">
												<label className="alinear-izquierda" htmlFor="InputEmail1">¿Tienes alguna foto que compartir?</label>
												<input className="form-control mb-2" type="text" name="image_url" required id="InputImage_url" aria-describedby="image_urlHelp" placeholder="Añadir url de la imagen" onChange={handleChange} />
											</div>
											<div className="py-3 px-0 mx-0 d-flex justify-content-around">
												<button type="submit" className="mb-3 col-md-12 btn-lg px-5 mb-3 mt-3" id="button">Guardar</button>
											</div>
											{(mensaje != null) && <p>{mensaje}</p>}
										</form>


									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
				);
};