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
    else return setMensaje(await resp.json()); 
  };

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined) {
      navigate.push("/login");
    }

    miUseEffect().then((resp) => setLocal(resp)); 

    miUseEffectFotos().then((resp) => {
      if (resp[0].location){ setLocalFotos({ ...localFotos, "image_url1": resp[0].location }); }
      if (resp[1].location){ setLocalFotos({ ...localFotos, "image_url2": resp[1].location }); }
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
    <div className="container fluid align-center">

{console.log("Datos local", localFotos)}

      <div className="form-body">
        <div className="row">
          <h1 className="text-center">Registro</h1>
          <h5 className="text-center">Da de alta tus locales y mantenlos actualizados para recibir opiniones de tus usuarios</h5>
        </div>
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={handleSubmit}>
              <div className="form-group py-3 m-0 img-responsive">
                <img src={local.image_url} className="imagenLocal" alt="" />
                <input type="text" name="image_url"  defaultValue={local.image_url} required className="form-control imagenLocal" id="Inputimage_url"  aria-describedby="image_urlHelp" placeholder="image principal" onChange={handleChange} />
                <input type="text" name="image_url1" defaultValue={localFotos.image_url1 ? localFotos.image_url1:""} className="form-control imagenLocal" id="Inputimage_url1" aria-describedby="image_urlHelp" placeholder="Otra image"      onChange={handleChange} />
                <input type="text" name="image_url2" defaultValue={localFotos.image_url2 ? localFotos.image_url2:""} className="form-control imagenLocal" id="Inputimage_url2" aria-describedby="image_urlHelp" placeholder="Otra image"      onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="InputEmail1">Nombre del local</label>
                <input type="text" name="name" defaultValue={local.name} required className="form-control" id="InputName1" aria-describedby="nameHelp" placeholder="Nombre del local" onChange={handleChange}/>
              </div>
              <br />
              <div className="form-group">
                <h5>Descripción</h5>
                <textarea name="description" defaultValue={local.description} required rows="3" cols="100" onChange={handleChange}> </textarea>
              </div>
              <br />

              <div className="form-group">
                <label htmlFor="Inputurl1">Información de contacto</label>
                <input
                  type="text"
                  name="url"
                  className="form-control"
                  id="Inputurl1"
                  defaultValue={local.url}
                  aria-describedby="urlHelp"
                  placeholder="url"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="email"
                  required
                  className="form-control"
                  id="InputEmail1"
                  defaultValue={local.email}
                  aria-describedby="emailHelp"
                  placeholder="email"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="telf"
                  required
                  className="form-control"
                  id="InputTelf1"
                  defaultValue={local.telf}
                  aria-describedby="TelfHelp"
                  placeholder="Teléfono"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="address"
                  required
                  className="form-control"
                  id="InputAddress1"
                  defaultValue={local.address}
                  ria-describedby="AddressHelp"
                  placeholder="Dirección"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  id="InputLocation1"
                  defaultValue={local.location}
                  aria-describedby="locationHelp"
                  placeholder="Localización"
                  onChange={handleChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input type="checkbox" name="trona" className="form-check-input" id="InputTrona1" checked={local.trona ? "checked" : ""} onChange={handleChangecheck}/>
                <label htmlFor="InputTrona1">trona</label>
                <br />
                <input type="checkbox" name="cambiador" checked={local.cambiador ? "checked" : ""} className="form-check-input" id="InputCambiador2" onChange={handleChangecheck}/>
                <label htmlFor="InputCambiador2">cambiador</label>
                <br />
                <input type="checkbox" name="accessible_carrito" checked={local.accessible_carrito ? "checked" : ""}
                  className="form-check-input"
                  id="InputAccessible_carrito3"
                  onChange={handleChangecheck}
                />
                <label htmlFor="InputAccessible_carrito3">accessible_carrito</label>
                <br />
                <input type="checkbox" name="espacio_carrito" checked={local.espacio_carrito ? "checked" : ""} className="form-check-input" id="InputEspacio_carrito3" onChange={handleChangecheck}/>
                <label htmlFor="InputEspacio_carrito3">espacio_carrito</label>
                <br />

                <input type="checkbox" name="ascensor" checked={local.ascensor ? "checked" : ""} className="form-check-input" id="InputAscensor5" onChange={handleChangecheck}/>
                <label htmlFor="InputAscensor5">ascensor</label>
                <br />

                <input type="checkbox" name="productos_higiene" checked={local.productos_higiene ? "checked" : ""} className="form-check-input" id="InputProductos_higiene5" onChange={handleChangecheck}/>
                <label htmlFor="InputProductos_higiene5">productos_higiene</label>
                <br />
              </div>

              <br />

              <div className="py-3 px-0 mx-0 d-flex justify-content-around">
                <button type="submit" className="btn btn-primary" id="button">
                  Guardar
                </button>
                <a href="/misLocales" className="btn btn-primary" id="button">
                  Volver
                </a>
              </div>
              {mensaje != null && <p>{mensaje}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
