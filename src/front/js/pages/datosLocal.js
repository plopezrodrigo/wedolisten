import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const DatosLocal = () => {
  const params = useParams();
  const [local, setLocal] = useState({});
  const [localFotos, setLocalFotos] = useState({});
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  const miUseEffect = async () => {
    const resp = await fetch(`${process.env.BACKEND_URL}/api/comercial-place/${params.local_id}`
    );

    if (resp.ok) return await resp.json();
    else return setMensaje(await resp.json()); 
  };

  const miUseEffectFotos = async () => {
    const resp = await fetch(`${process.env.BACKEND_URL}/api/Photo_Comercial_Place/${params.local_id}`
    );

    if (resp.ok) return await resp.json();
    else         return setMensaje(await resp.json()); 
  };

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined) {
      navigate.push("/login");
    }

    miUseEffect().then((resp) => setLocal(resp));  

    console.log("Para Fotos:", local);

    miUseEffectFotos().then((resp) => {
      console.log("Fotos:", resp);
      if (resp[0].location){ setLocalFotos({ ...localFotos, "image_url1": resp[0].location }); }
      if (resp[1].location){ setLocalFotos({ ...localFotos, "image_url2": resp[1].location }); }
      console.log("Fotos1:", localFotos);
    }); 

  }, []);

  const handleChange = (evento) => {
    setLocal({ ...local, [evento.target.name]: evento.target.value });
  };

  const handleChangecheck = (evento) => { 
	setLocal({...local, [evento.target.name]: local[evento.target.name] ? false : true})
  };

  const handleSubmit = async (evento) => {
    evento.preventDefault(); // para evitar la recarga ya que cancela el evento

    const resp = await fetch(
      process.env.BACKEND_URL + "/api/Comercial_Place/" + params.local_id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify(local), 
      }
    );

    if (resp.ok) return navigate("/misLocales");
    else return setMensaje(await resp.json());
  };

  return (
      <div className="vh-100 gradient-custom">
        <div className="container text-center">
        <h3 className="mt-3" id="iconbutton">Registro</h3>
        <p className="mb-0">Edita tus locales y mantén </p>
        <p className="mt-0">actualizadas las opiniones de los mismos</p>
        {console.log("Datos local", localFotos)}
        <div className="card px-3" id="card">
            <form className="form-outline" noValidate  onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-center align-items-center h-10">
              <div className="col-10">
                <div className="col-12">
                  <p></p>
                  <label htmlFor="InputEmail1" className="alinear-izquierda" defaultValue={local.name}>
                    Nombre del local
                  </label>
                  <input type="text" name="name" defaultValue={local.name} required className="form-control" id="textarea" aria-describedby="nameHelp" onChange={handleChange}/>
                </div>
                <div className="col-md-12 mt-2">
                  {/*<div className="col-4 py-3 px-0 mx-0 img-responsive">
                                        <img src={formData.image_url} className="alinear-derecha" alt="" />
                                        </div>*/}
                  <label className="alinear-izquierda" htmlFor="InputEmail1">
                    Url de la imagen del local
                  </label>
                  <input type="url" name="image_url"  defaultValue={local.image_url} required                       className="form-control imagenLocal" id="Inputimage_url"  aria-describedby="image_urlHelp" placeholder="Url de la imagen principal" onChange={handleChange}  />

                </div>
                <div className="col-md-12 mt-2">
                <label className="alinear-izquierda" htmlFor="InputEmail1">
                    Descripción
                  </label>
                  <textarea
                    required
                    className="form-control"
                    type="description"
                    name="description"
                    id="textarea"
                    aria-describedby="Descripción"
                    row="5"
                    cols="109"
                    defaultValue={local.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-md-12 mt-2">
                  <label className="alinear-izquierda" htmlFor="Inputurl1">
                    Información de contacto
                  </label>
                  <input
                    type="text"
                    name="url"
                    className="form-control mb-1"
                    id="Inputurl1"
                    aria-describedby="urlHelp"
                    placeholder="Página web"
                    defaultValue={local.url}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="email"
                    required
                    className="form-control mb-1"
                    id="InputEmail1"
                    aria-describedby="emailHelp"
                    defaultValue={local.email}
                    placeholder="Email"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="telf"
                    required
                    className="form-control mb-1"
                    id="InputTelf1"
                    aria-describedby="TelfHelp"
                    defaultValue={local.telf}
                    placeholder="Teléfono"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="address"
                    required
                    className="form-control mb-1"
                    id="InputAddress1"
                    ria-describedby="AddressHelp"
                    defaultValue={local.address}
                    placeholder="Dirección"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="location"
                    className="form-control mb-1"
                    id="InputLocation1"
                    aria-describedby="locationHelp"
                    placeholder="Localización"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-10 mt-1">
                <form
                  className="form-outline"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="col-md-12">
                    <label className="alinear-izquierda" htmlFor="InputEmail1">
                      ¿Tienes alguna foto que compartir?
                    </label>
                    <img src={local.image_url} className="imagenLocal" alt="" width="0px" height="10x" />
                    <input type="url" name="image_url1" defaultValue={localFotos.image_url1 && localFotos.image_url1} className="form-control imagenLocal" id="Inputimage_url1" aria-describedby="image_urlHelp" placeholder="Url de otra imagen" onChange={handleChange} />
                    <input type="url" name="image_url2" defaultValue={localFotos.image_url2 && localFotos.image_url2} className="form-control imagenLocal" id="Inputimage_url2" aria-describedby="image_urlHelp" placeholder="Url de otra imagen" onChange={handleChange} />
                  </div>
                  <div className="col-md-12 mt-2">
                    <label className="alinear-izquierda" htmlFor="InputEmail1">
                      Características
                    </label>
                    <div className="col-12">
                      <input type="checkbox" name="trona" className="form-check-input ms-2" id="InputTrona1" checked={local.trona ? "checked" : ""} onChange={handleChangecheck}/>
                      <label htmlFor="InputTrona1">Trona</label>
                      <input type="checkbox" name="cambiador" checked={local.cambiador ? "checked" : ""} className="form-check-input ms-2" id="InputCambiador2" onChange={handleChangecheck}/>
                      <label htmlFor="InputCambiador2">Cambiador</label>
                      <input type="checkbox" name="accessible_carrito" checked={local.accessible_carrito ? "checked" : ""}
                      className="form-check-input ms-2"
                      id="InputAccessible_carrito3"
                      onChange={handleChangecheck}
                      />
                      <label htmlFor="InputAccessible_carrito3">Accessible con carrito</label>
                      <input type="checkbox" name="espacio_carrito" checked={local.espacio_carrito ? "checked" : ""} className="form-check-input ms-2" id="InputEspacio_carrito3" onChange={handleChangecheck}/>
                      <label htmlFor="InputEspacio_carrito3">Espacio para carrito</label>                    
                      <input type="checkbox" name="ascensor" checked={local.ascensor ? "checked" : ""} className="form-check-input ms-2" id="InputAscensor5" onChange={handleChangecheck}/>
                      <label htmlFor="InputAscensor5">Ascensor</label>
                      <input type="checkbox" name="productos_higiene" checked={local.productos_higiene ? "checked" : ""} className="form-check-input ms-2" id="InputProductos_higiene5" onChange={handleChangecheck}/>
                      <label htmlFor="InputProductos_higiene5"> Productos de Higiene</label>
                                     </div>
                  </div>
                </form>
              </div>

              <div className="col-12">
                <div className="py-3 px-0 mx-0 d-flex justify-content-around">
                    <button type="submit" className="btn btn-primary px-5 mb-3 mt-3" id="button">
                      Guardar
                    </button>
                  </div>
                  {mensaje != null && <p>{mensaje}</p>}
              </div>
            </div>            
            </form>  
            </div>
        </div>
      </div>
  );
};
