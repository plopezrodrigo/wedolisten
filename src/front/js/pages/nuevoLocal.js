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
  }, []);

  const handleChange = (evento) => {
    setFormData({ ...formData, [evento.target.name]: evento.target.value });
  };

  const handleChangecheck = (evento) => {
    setFormData({
      ...formData,
      [evento.target.name]: formData[evento.target.name] ? false : true,
    });
  };

  const handleSubmit = async (evento) => {
    evento.preventDefault(); // para evitar la recarga ya que cancela el evento

    if (actions.altaLocal(formData)) navigate("/misLocales");
    else return setMensaje(store.message);
  };

  return (
    <div className="vh-100 gradient-custom">
      <div className="container text-center">
      <div className="form-body">
        <h3 className="mt-3" id="iconbutton">
          Registro
        </h3>
        <p className="mb-0">Da de altas tus locales y empieza a </p>
        <p className="mt-0">recibir opiniones de tus usuarios</p>
        <div className="card px-3" id="card">
          <form className="form-outline" noValidate onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-center align-items-center h-10">
              <div className="col-10">
                <div className="col-12">
                  <p> </p>
                  <label htmlFor="InputEmail1" className="alinear-izquierda">
                    Nombre del local
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="form-control"
                    id="InputName1"
                    aria-describedby="nameHelp"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12">
                  {/*<div className="col-4 py-3 px-0 mx-0 img-responsive">
                                        <img src={formData.image_url} className="alinear-derecha" alt="" />
                                        </div>*/}
                  <label className="alinear-izquierda" htmlFor="InputEmail1">
                    Url de la imagen del local
                  </label>
                  <input
                    className="form-control"
                    type="url"
                    name="image_url"
                    required
                    id="InputImage_url"
                    aria-describedby="image_urlHelp"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12">
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
                    row="3"
                    cols="109"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-md-12">
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
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="email"
                    required
                    className="form-control mb-1"
                    id="InputEmail1"
                    aria-describedby="emailHelp"
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
                    <input
                      className="form-control"
                      type="url"
                      name="image_url1"
                      id="InputImage_url1"
                      aria-describedby="image_urlHelp1"
                      placeholder="Añade Url de la imagen del local"
                      onChange={handleChange}
                    />
                    <input
                      className="form-control"
                      type="url"
                      name="image_url2"
                      id="InputImage_url2"
                      aria-describedby="image_urlHelp2"
                      placeholder="Añade Url de la imagen del local"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-12 mt-2">
                    <label className="alinear-izquierda" htmlFor="InputEmail1">
                      Características
                    </label>
                    <div className="col-12">
                      <input
                        type="checkbox"
                        name="trona"
                        className="form-check-input ms-2"
                        id="InputTrona1"
                        aria-describedby="tronaHelp"
                        onChange={handleChangecheck}
                      />
                      <label htmlFor="InputTrona1">Trona</label>
                      <input
                        type="checkbox"
                        name="cambiador"
                        className="form-check-input ms-2"
                        id="InputCambiador2"
                        aria-describedby="cambiadorHelp"
                        onChange={handleChangecheck}
                      />
                      <label htmlFor="InputCambiador2">Cambiador</label>
                      <input
                        type="checkbox"
                        name="accessible_carrito"
                        className="form-check-input ms-2"
                        id="InputAccessible_carrito3"
                        aria-describedby="accessible_carritoHelp"
                        onChange={handleChangecheck}
                      />
                      <label htmlFor="InputAccessible_carrito3">
                        Accessible con carrito
                      </label>
                      <input
                        type="checkbox"
                        name="espacio_carrito"
                        className="form-check-input ms-2"
                        id="InputEspacio_carrito3"
                        aria-describedby="espacio_carritoHelp"
                        onChange={handleChangecheck}
                      />
                      <label htmlFor="InputEspacio_carrito3">
                        Espacio para carrito
                      </label>
                      <input
                        type="checkbox"
                        name="ascensor"
                        className="form-check-input ms-2"
                        id="InputAscensor5"
                        aria-describedby="ascensorHelp"
                        onChange={handleChangecheck}
                      />
                      <label htmlFor="InputAscensor5">Ascensor</label>
                      <input
                        type="checkbox"
                        name="productos_higiene"
                        className="form-check-input ms-2"
                        id="InputProductos_higiene5"
                        aria-describedby="productos_higieneHelp"
                        onChange={handleChangecheck}
                      />
                      <label htmlFor="InputProductos_higiene5">
                        Productos de Higiene
                      </label>
                    </div>
                  </div>
                </form>
              </div>

              <div className="col-12">
                <div className="py-3 px-0 mx-0 d-flex justify-content-around">
                  <button
                    type="submit"
                    className="btn btn-primary px-5 mb-3 mt-3"
                    id="button"
                  >
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
    </div>
  );
};
