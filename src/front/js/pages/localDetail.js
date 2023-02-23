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
  const [active, setActive] = useState(false);
  let options = {
    method: "GET",
  };

  const useEffectComments = async () => {
    await fetch(`${process.env.BACKEND_URL}/api/comment_local/${params.id}`,{
        method: 'GET',
        headers: {"Content-Type": "application/json",
                  "Authorization": 'Bearer '+ sessionStorage.getItem("token") // hará falta? 
        }
      })
    .then(res=>{return res.json()})
    .then(data=>{setComentarios(data);
    })
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
        setActive(response.favorite)
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
  };

  return (
    <div className="container fluid">
      <div className="row">
        <div className="col-10 ms-1">{local ? <h1>{local.name}</h1> : ""}</div>
        <div className="col-12 ms-2">
          {sessionStorage.getItem("token") ? (
            <button className={`heart-button ${active?"active":""}`}
              onClick={() => {
                add_favourites(local.id);
                setActive(!active)
              }}
            >
              <i className={`heart-button${active?"-active":""} fas fa-heart `}></i>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="row ms-1">
      <div>
            {Array.from(Array(5).keys()).map((e,i)=>{return props.puntuacion <= i ? 
            (<i className="far fa-star" key={i} id="iconbutton"/>)
            : 
            (<i className="fas fa-star" key={i} id="iconbutton"/>)
            })
            }
            {comentarios ? comentarios.length : 0} Opiniones
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
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card" id="card2">
              <div className="card-body">
              <h5 className="card-title">Características a destacar</h5>
          <ul className="list-group list-group-flush" >
            <li className="list-group-item">
              <input type="checkbox" checked={(local.trona) ? "checked" : "" } className="form-check-input" id="Input_trona"/>
              <label className="form-check-label" for="Input_trona">Trona</label>
            </li>
            <li className="list-group-item">
              <input type="checkbox" checked={(local.cambiador) ? "checked" : "" } className="form-check-input" id="Input_cambiador"/>
              <label className="form-check-label" for="Input_cambiador">Cambiador</label>
            </li>
            <li className="list-group-item">
              <input type="checkbox" checked={(local.accesible) ? "checked" : "" } className="form-check-input" id="Input_accesible"/>
              <label className="form-check-label" for="Input_accesible">Accesible con carrito</label>
            </li>
            <li className="list-group-item">
              <input type="checkbox" checked={(local.espacio_carrito) ? "checked" : "" } className="form-check-input" id="Input_espacio_carrito"/>
              <label className="form-check-label" for="Input_espacio_carrito">Espacio Carrito</label>
            </li>
            <li className="list-group-item">
              <input type="checkbox" checked={(local.ascensor) ? "checked" : "" } className="form-check-input" id="Input_ascensor"/>
              <label className="form-check-label" for="Input_ascensor">Ascensor</label>
            </li>
            <li className="list-group-item">
              <input type="checkbox" checked={(local.productos_higiene) ? "checked" : "" } className="form-check-input" id="Input_productos_higiene"/>
              <label className="form-check-label" for="Input_productos_higiene">Productos higiene</label>
            </li>
          </ul>
            </div>
          </div>
          </div>
          <div className="col">
          <img 
            src={local.image_url}
            className="imagenDetalle"
            width="600px"
            height="342px"
            alt={local.image_url}
          />
          </div>
          <div className="col">
          <div className="row">
          <img
            src={local.image_url}
            className="imagenDetalle"
            width="212px"
            height="171px"
            alt={local.image_url}
          />
          <img
            src={local.image_url}
            width="212px"
            height="169px"
            alt={local.image_url}
          />
          </div>  
          </div>
        </div>
      </div>
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <div className="card" id="card2">
              <div className="card-body">
              <h5 className="card-title">Descripción</h5>
                <div className="descripcion" id="descripcion">
                  <p>{local.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card" id="card3">
            <h2>Ubicación y contacto</h2>
            <div>
            <iframe
              width="450"
              height="250"
              frameBorder="0"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAv5ZYraM9a5QF6hOcon0IFnHIiuox66Cw&q=${local.google_address}`}
              allowFullScreen>
            </iframe>
            </div>
          </div>
          <div className="col">
          <div className="row">
          </div>  
          </div>
        </div>
      </div>
      <div className="row">
        <div className="mobile_flex_container full_width">
          
        </div>

      </div>
      <div className="row" id="ubicacion">
        
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
                                local_id={comentario.comercial_place_id}
                                id_comment={comentario.id}
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
              <i className="fas fa-star" id="button" />
              <strong className="strong"> Escribe tu opinión</strong>
            </a>
            </Link>
          </p>
      }
    </div>
  );
};

export default LocalDetail;