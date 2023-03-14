import React, { useContext, useState, useEffect } from "react";
import OpinionCarddetail from "../component/opinionCarddetail";
import Banner from "../component/banner";
import { useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const LocalDetail = (props) => {
  const params = useParams();
  const [comentarios, setComentarios] = useState();
  const [local, setLocal] = useState({});
  const [localFotos, setLocalFotos] = useState({
    image_url1: "",
    image_url2: "",
  });
  const { store, actions } = useContext(Context);
  const [formData, setFormData] = useState({});
  const [rates, setRates] = useState();
  const [active, setActive] = useState(false);
  let options = {
    method: "GET",
  };

  const useEffectComments = async () => {
    await fetch(`${process.env.BACKEND_URL}/api/comment_local/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"), // hará falta?
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setComentarios(data);
      });
  };

  const rating = async () => {
    await fetch(
      `${process.env.BACKEND_URL}/api/comercial-place-2/${params.id}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setRates(response);
      });
  };

  const miUseEffectFotos = async () => {
    const resp = await fetch(
      `${process.env.BACKEND_URL}/api/Photo_Comercial_Place/${params.id}`
    );

    if (resp.ok) return await resp.json();
    else return setMensaje(await resp.json());
  };

  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      options.headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      };
    }
    fetch(
      `${process.env.BACKEND_URL}/api/comercial-place/${params.id}`,
      options
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setLocal(response);
        setActive(response.favorite);
      });

    miUseEffectFotos().then((resp) => {
      console.log("Fotos:", resp);
      if (resp[0].location) {
        setLocalFotos({ ...localFotos, image_url1: resp[0].location });
      }
      if (resp[1].location) {
        setLocalFotos({ ...localFotos, image_url2: resp[1].location });
      }
      console.log("Fotos1:", localFotos);
    });

    useEffectComments();
    rating();
  }, []);

  const add_favourites = (id) => {
    fetch(`${process.env.BACKEND_URL}/api/favourit/${id}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response.json();
    });
  };

  const getStarts = () => {
    return [...Array(local.raking).keys()].map((rate, index) => {
      return local.raking <= rate ? (
        <i className="far fa-star" key={index} id="iconbutton" />
      ) : (
        <i className="fas fa-star" key={index} id="iconbutton" />
      );
    });
  };

  const handleSubmit = (evento) => {
    evento.preventDefault(); // para evitar la recarga ya que cancela el evento

    if (formData.buscar.length > 0) {
      actions.cargaComentarios(formData.buscar).then((response) => {
        if (response) {
          navigate("/comentarios");
        } else {
          setMensaje(store.message);
          toggleModal();
        }
      });
    }
  };

  const handleChange = (evento) => {
    setFormData({ ...formData, [evento.target.name]: evento.target.value });
  };

  return (
    <div className="container fluid">
      <div className="row">
        <div className="col-10 ms-2">{local ? <h3>{local.name}</h3> : ""}</div>
        <div className="col-12 ms-2">
          {sessionStorage.getItem("token") ? (
            <button
              className={`heart-button ${active ? "active" : ""}`}
              onClick={() => {
                add_favourites(local.id);
                setActive(!active);
              }}
            >
              <i
                className={`heart-button${
                  active ? "-active" : ""
                } fas fa-heart `}
              ></i>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="row ms-1 mb-2">
        <div>
          {getStarts()} {local.comments ? local.comments : 0} Opiniones
        </div>
        <div className="col-12 mt-2">
          {/* <p id="infolocal">
            <i className="fas fa-map-marker-alt"></i> {local.address} -
            <i className="fas fa-laptop"></i> {local.url} -
            <i className="fas fa-phone"></i> {local.telf} -
            <i className="fas fa-envelope"></i> {local.email}
          </p> */}
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div className="card" id="card2">
              <div className="card-body">
                <h5 className="card-title ms-3">Características a destacar</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <label
                      className={`form-check-label ${
                        local.trona ? "" : "tachado"
                      }`}
                      for="Input_trona"
                    >
                      Trona
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label
                      className={`form-check-label ${
                        local.cambiador ? "" : "tachado"
                      }`}
                      for="Input_cambiador"
                    >
                      Cambiador
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label
                      className={`form-check-label ${
                        local.accesible_carrito ? "" : "tachado"
                      }`}
                      for="Input_productos_higiene"
                    >
                      Accesible con carrito
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label
                      className={`form-check-label ${
                        local.espacio_carrito ? "" : "tachado"
                      }`}
                      for="Input_espacio_carrito"
                    >
                      Espacio para carrito
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label
                      className={`form-check-label ${
                        local.ascensor ? "" : "tachado"
                      }`}
                      for="Input_ascensor"
                    >
                      Ascensor
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label
                      className={`form-check-label ${
                        local.productos_higiene ? "" : "tachado"
                      }`}
                      for="Input_productos_higiene"
                    >
                      Productos higiene
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-6">
            <img
              src={local.image_url}
              className="imagenDetalle"
              alt={local.image_url}
            />
          </div>
          <div className="col-3">
            <div className="row" id="card2">
              {local.imagenes
                ? local.imagenes.map((imagen, index) => {
                    return (
                      <img
                        key={index}
                        src={imagen}
                        className="imagenDetallePeq"
                        alt={imagen}
                      />
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-3">
            <div className="card" id="card2">
              <div className="card-body">
                <h5 className="card-title">Notas importantes</h5>
                <div className="descripcion" id="descripcion">
                  <p>{local.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card" id="card3">
              <h5 className="mt-3 ms-3">Ubicación</h5>
              <div className="ms-3">
                <iframe
                  width="520"
                  height="250"
                  frameBorder="0"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAv5ZYraM9a5QF6hOcon0IFnHIiuox66Cw&q=${local.google_address}`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card" id="card4">
              <div className="card-body">
                <h5 className="card-title">Información de contacto</h5>
                <div className="" id="ubicacionelements">
                  <span>
                    <a href="https://maps.google.com/maps?saddr=&amp;daddr=Calle+Bah%C3%ADa+de+Palma%2C+4B%2C+28042+Madrid+Espa%C3%B1a@40.46229,-3.591468">
                      <span className="">
                        <i className="fas fa-map-marker-alt"></i>{" "}
                        {local.address}
                      </span>
                      <span className=""></span>
                    </a>
                  </span>
                </div>
                <div className="" id="ubicacionelements">
                  <span className="">
                    <i className="fas fa-laptop"></i> {local.url}
                  </span>
                </div>
                <div className="" id="ubicacionelements">
                  <span className="">
                    <i className="fas fa-phone"></i> {local.telf}
                  </span>
                </div>
                <div className="" id="ubicacionelements">
                  <span className="">
                    <i className="fas fa-envelope"></i> {local.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row" id="ubicacion"></div>
      <div className="mb-0">
        <Banner />
      </div>
      <div className="row ms-2" id="rating">
        <div className="col-6">
          <h4 className="mb-3 mt-0" id="descripcion">
            Lee lo que otros usuarios opinan:
          </h4>
        </div>
        <div className="col-6 alinear-derecha">
          {store.usertype == "customer" && (
            <button className="btn btn-primary px-5 mb-3 mt-3" id="button">
              <Link to={`/OpinionUser/${params.id}/0`}>Escribe tu opinión</Link>
            </button>
          )}
        </div>
        {/* <form onSubmit={handleSubmit}>
          <input name="buscar" id="inputbuscar" className="form-control mt-4 mr-2" type="search" placeholder="Buscar" aria-label="Buscar"onChange={handleChange}/>
          <button className="" type="submit" id="iconbutton"></button>
        </form> */}
        {comentarios &&
          comentarios.map((comentario, index) => {
            return (
              <>
                <div key={comentario.id}>
                  <OpinionCarddetail
                    comment={comentario.comment}
                    fecha={comentario.date}
                    nombre={comentario.user_name}
                    puntuacion={comentario.puntuacion}
                    local_id={comentario.comercial_place_id}
                    id_comment={comentario.id}
                  />
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default LocalDetail;
