import React, { useContext, useState, useEffect } from "react";
import imagen from "../../img/mapa.jpeg";
import OpinionCard from "../component/opinionCard";
import { useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

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
    const resp = await fetch(`${process.env.BACKEND_URL}/api/comment_local/${params.id}`,{
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
    fetch(`${process.env.BACKEND_URL}/api/comercial-place/${params.id}`,
          options
    )
      .then((response) => { 
        return response.json();
      })
      .then((response) => {
        setLocal(response);
      });

      useEffectComments();
      console.log(local);

  }, []);

  function clase(valor){
    return ((valor) ? "tituloHome" : "footer");
  }


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
          <p>{comentarios ? (() => {return (<> {comentarios.length()}</>)}) : (() => {return (<> 0 </>)})} Opiniones</p>
        </div>
        <div className="col-6">
          <p>
            <i className="fas fa-map-marker-alt"></i> {local.address} -
            <i className="fas fa-laptop"></i> {local.url} -
            <i className="fas fa-phone"></i> {local.telf} -
            <i className="fas fa-envelope"></i> {local.email}
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
            alt={local.image_url}
          />
        </div>
        <div className="descripcion" id="descripcion">
          <p>{local.description}</p>
        </div>
      </div>
      <div className="row" id="rating">
        <div className="col-6">
          <div className="form-check">
            <input type="checkbox" checked={(local.trona) ? "checked" : "" } className="form-check-input" id="Input_trona"/>
            <label className="form-check-label" for="Input_trona">Trona</label>
          </div>
          <div className="form-check">
            <input type="checkbox" checked={(local.cambiador) ? "checked" : "" } className="form-check-input" id="Input_cambiador"/>
            <label className="form-check-label" for="Input_cambiador">Cambiador</label>
          </div>
          <div className="form-check">
            <input type="checkbox" checked={(local.accesible) ? "checked" : "" } className="form-check-input" id="Input_accesible"/>
            <label className="form-check-label" for="Input_accesible">Accesible con carrito</label>
          </div>
        </div>
        <div className="col-6">
          <div className="form-check">
            <input type="checkbox" checked={(local.espacio_carrito) ? "checked" : "" } className="form-check-input" id="Input_espacio_carrito"/>
            <label className="form-check-label" for="Input_espacio_carrito">Espacio Carrito</label>
          </div>
          <div className="form-check">
            <input type="checkbox" checked={(local.ascensor) ? "checked" : "" } className="form-check-input" id="Input_ascensor"/>
            <label className="form-check-label" for="Input_ascensor">Ascensor</label>
          </div>
          <div className="form-check">
            <input type="checkbox" checked={(local.productos_higiene) ? "checked" : "" } className="form-check-input" id="Input_productos_higiene"/>
            <label className="form-check-label" for="Input_productos_higiene">Productos higiene</label>
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
                <i className="fas fa-map-marker-alt"></i> {local.address}
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

      <div className="row" id="rating">
        <h2 id="descripcion">Lee lo que otros usuarios opinan</h2>

        {comentarios && comentarios.map((comentario, index)=>{   
            return  <> 
                <div  key={comentario.id} className="col mt-5"> 
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
            <Link to={`/OpinionUser/${params.id}/0`}>
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
