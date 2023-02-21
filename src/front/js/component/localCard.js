import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";


const LocalCard = (props) => {
  const { store, actions } = useContext(Context);
  const [comentarios, setComentarios] = useState();
  const params = useParams();
  const [local, setLocales] = useState({}); 

    const add_favourites = (id) => {
      fetch(`${process.env.BACKEND_URL}/api/favourit/${id}`, { 
          method: "POST",
          headers: { Authorization: "Bearer " + sessionStorage.getItem("token"), "Content-Type": "application/json" },
     })    
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setLocales(response);
      });
    }

  return (
      <div className="card" id="localcard">
        <img 
        src={props.image_url} 
        className="card-img-top"
        id="imagenlocal"
        alt="" 
        />
        <div className="card-body">
          <h6>
            <Link to={`/localDetail/${props.id}`} className="card-title mb-1"><strong>{props.name}</strong>
            <button id="iconbutton" onClick={()=>{add_favourites(props.id)}}> <i className="fas fa-heart"></i></button>
            </Link>
          </h6>
            <div>
            {Array.from(Array(5).keys()).map((e,i)=>{return props.puntuacion <= i ? 
            (<i className="far fa-star" key={i} id="iconbutton"/>)
            : 
            (<i className="fas fa-star" key={i} id="iconbutton"/>)
            })
            }
            {comentarios ? comentarios.length : 0} Opiniones
            </div>
            <p className="mt-1" id="localcardtext">Española, Contemporánea €€€</p>
            <div className="mt-0">
            {/* <Link to="/opinionUser/:id_local/:id_comment">
              <button id="iconbutton"><i className="far fa-comment" /></button>
            </Link>
            <Link to="/localDetail/:id">
              <button id="iconbutton"><i className="fas fa-map-marker-alt" /></button>
            </Link> */}
            </div>
        </div>
      </div>
  );
};

export default LocalCard;
