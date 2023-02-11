import React, { useContext, useState, useEffect } from "react";
import OpinionCard from "../component/opinionCard";
import { useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import trona             from "../../img/trona.jpg";
import cambiador         from "../../img/cambiador.jpg";
import accesible         from "../../img/accesible.jpg";
import espacio_carrito   from "../../img/espacio_carrito.jpg";
import ascensor          from "../../img/ascensor.jpg";
import productos_higiene from "../../img/productos_higiene.jpg";

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
        <div className="col-10">{local ? <h1>{local.name}</h1> : ""}</div>
        <div className="col-1">
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
      <div className="row">
        <div className="col-6">
          <p>{comentarios ? comentarios.length : 0} Opiniones</p>
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
      <div className="row">
          {(local.trona)             && <div className="col-1"><img src={trona} alt="Trona" width="40" height="40" /></div> }
          {(local.cambiador)         && <div className="col-1"><img src={cambiador} alt="cambiador" width="40" height="40" /></div> }
          {(local.accesible)         && <div className="col-1"><img src={accesible} alt="accesible" width="40" height="40" /></div> }
          {(local.espacio_carrito)   && <div className="col-1"><img src={espacio_carrito} alt="espacio_carrito" width="40" height="40" /></div> }
          {(local.ascensor)          && <div className="col-1"><img src={ascensor} alt="ascensor" width="40" height="40" /></div> }
          {(local.productos_higiene) && <div className="col-1"><img src={productos_higiene} alt="productos_higiene" width="40" height="40" /></div> }
      </div>
      <div className="row" id="ubicacion">
        <h2>Ubicación y contacto</h2>
        <div>
          <iframe
            width="450"
            height="250"
            frameborder="0" 
            referrerpolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/MAP_MODE?key=AIzaSyAv5ZYraM9a5QF6hOcon0IFnHIiuox66Cw&q=${local.google_address}`}
            allowfullscreen>
          </iframe>
        </div>
        <div className="" id="ubicacionelements">
          <span>
            <a href="https://maps.google.com/maps?saddr=&amp;daddr=Calle+Bah%C3%ADa+de+Palma%2C+4B%2C+28042+Madrid+Espa%C3%B1a@40.46229,-3.591468">
              <span className=""><i className="fas fa-map-marker-alt"></i> {local.address}</span>
            </a>
          </span>
        </div>
        {local.url && <div className="" id="ubicacionelements">
                          <span className=""><i className="fas fa-laptop"></i> {local.url}</span>
                      </div>
        }
        {local.telf &&  <div className="" id="ubicacionelements">
                          <span className=""><i className="fas fa-phone"></i> {local.telf}</span>
                        </div>
        }
        {local.email && <div className="" id="ubicacionelements">
                          <span className=""><i className="fas fa-envelope"></i> {local.email}</span>
                        </div>
        }
      </div>
      <div className="row" id="rating">
        <h2 id="descripcion">Lee lo que otros usuarios opinan</h2>

        {comentarios && comentarios.map((comentario, index)=>  
          {return comentario.puntuacion != 0  ? (<>
                                                  <div  key={comentario.id} className="col mt-5"> 
                                                    <OpinionCard  comment={comentario.comment}
                                                                  fecha={comentario.date}
                                                                  nombre={comentario.user_name}
                                                                  puntuacion={comentario.puntuacion}
                                                                  local_id={comentario.comercial_place_id}
                                                                  id_comment={comentario.id}
                                                    />
                                                  </div>
                                                </>)
                                              : (<></>)

          }
        )}
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