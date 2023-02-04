import React, { useContext, useState, useEffect } from "react";
import imagen from "../../img/mapa.jpeg";
import OpinionCard from "../component/opinionCard";
import { useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";

const LocalDetail = (props) => {
  const params = useParams();
  const [comentarios, setComentarios] = useState();
  const [local, setLocal] = useState({});
  const [favoritos, setFavoritos] = useState({});
  const { store, actions } = useContext(Context);
  let options = {
    method: "GET",
  };

  const useEffectComments = async () => {
    const resp = await fetch( process.env.BACKEND_URL + "/api/Comment",{
        method: 'GET',
        headers: {"Content-Type": "application/json",
                  "Authorization": 'Bearer '+ sessionStorage.getItem("token") // hará falta?
        } 
      })
    if (resp.ok) return setComentarios(await resp.json());
    else         return setMensaje(await resp.json());  
  }



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
      });

      useEffectComments();

  }, []);

  const add_favourites = (id) => {
    fetch(`${process.env.BACKEND_URL}/api/favourit/${id}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setLocal(response);
      });
  };

  return (
    <div className="container fluid">
      <div className="row">
        <div className="col-10">{local ? <h1>{local.name}</h1> : ""}</div>
        <div className="col-1">
          {sessionStorage.getItem("token") ? (
            <button
              id="iconbutton"
              onClick={() => {
                add_favourites(local.id);
              }}
            >
              <i className={local.favorite ? "fas fa-heart" : ""}></i>
            </button>
          ) : (
            <Link to="/signupUser"><i className="fas fa-heart"></i></Link>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <i className="fas fa-circle"></i>
          <i className="fas fa-circle"></i>
          <i className="fas fa-circle"></i>
          <i className="fas fa-circle"></i>
          <i className="far fa-circle"></i>
        </div>
        <div className="col-6">
          <p>297 Opiniones</p>
        </div>
        <div className="col-6">
          <p>
            <i class="fas fa-map-marker-alt"></i> {local.address} -
            <i class="fas fa-laptop"></i> {local.url} -
            <i class="fas fa-phone"></i> {local.telf} -
            <i class="fas fa-envelope"></i> {local.email}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="mobile_flex_container full_width">
          <img
            src={local.image_url}
            className="imagenDetalle"
            width="1100px"
            height="800px"
            alt=""
          />
          <div className="see_all_count_wrap" onclick="">
            <span className="see_all_count">
              <span className="ui_icon camera"></span>
              <span className="details">Ver todo ($)</span>
            </span>
          </div>
        </div>
        <div className="descripcion" id="descripcion">
          <p>{local.description}</p>
        </div>
      </div>
      <div className="row" id="rating">
        <div className="col-6">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value={local.trona}
            />
            <label className="form-check-label" for="flexRadioDefault1">
              Trona
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value={local.cambiador}
            />
            <label className="form-check-label" for="flexRadioDefault1">
              Cambiador
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value={local.accesible}
            />
            <label className="form-check-label" for="flexRadioDefault1">
              Accesible con carrito
            </label>
          </div>
        </div>
        <div className="col-6">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value={local.espacio_carrito}
            />
            <label className="form-check-label" for="flexRadioDefault1">
              Espacio Carrito
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value={local.ascensor}
            />
            <label className="form-check-label" for="flexRadioDefault1">
              Ascensor
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value={local.productos_higiene}
            />
            <label className="form-check-label" for="flexRadioDefault1">
              Productos higiene
            </label>
          </div>
        </div>
      </div>
      <div className="row" id="ubicacion">
        <h2>Ubicación y contacto</h2>
        <div>
          <img
            src={imagen}
            className="imagenmapa"
            alt=""
            width="1100px"
            height="900px"
          />
        </div>
        <div className="" id="ubicacionelements">
          <span>
            <a href="https://maps.google.com/maps?saddr=&amp;daddr=Calle+Bah%C3%ADa+de+Palma%2C+4B%2C+28042+Madrid+Espa%C3%B1a@40.46229,-3.591468">
              <span className="">
                <i class="fas fa-map-marker-alt"></i> {local.address}
              </span>
              <span className=""></span>
            </a>
          </span>
        </div>
        <div className="" id="ubicacionelements">
          <span className="">
            <i class="fas fa-laptop"></i> {local.url}
          </span>
        </div>
        <div className="" id="ubicacionelements">
          <span className="">
            <i class="fas fa-phone"></i> {local.telf}
          </span>
        </div>
        <div className="" id="ubicacionelements">
          <span className="">
            <i class="fas fa-envelope"></i> {local.email}
          </span>
        </div>
      </div>

      <div className="row" id="rating">
        <h2 id="descripcion">Lee lo que otros usuarios opinan</h2>

        {comentarios && comentarios.map((comentario, index)=>{   
            return  <> 
                <div className="col mb-3"> 
                  <OpinionCard  comment={comentario.comment}
                                fecha={comentario.date}
                                nombre={comentario.user_name}
                                puntuacion={comentario.puntuacion}
                  />
                </div>
                </>
            })
        }
      </div>

      {store.usertype == "customer" &&
          <p className="text ma-home-section">  
            <Link to="/Comentarios">
            <a>
              <i className="fas fa-star" id="iconaccount" />
              <strong className="strong"> Escribe tu opinión</strong>
            </a>
            </Link>
          </p>
      }


    </div>
  );
};

export default LocalDetail;
