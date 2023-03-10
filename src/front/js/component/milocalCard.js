import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import CustomModal from "./customModal";
import { useModal } from "../hooks/UseModal";

const MilocalCard = (props) => {
  const { store, actions } = useContext(Context);
  const [comentarios, setComentarios] = useState();
  const [message, setMessage] = useState();
  const params = useParams();
  const [local, setLocales] = useState({});
  const [isModalOpened, setIsModalOpened, toggleModal] = useModal(false);


    const add_favourites = (id) => {
      if (sessionStorage.getItem("token")){
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
      } else {
        setMessage(true)
      }
    }

  return (
      <div className="card" id="localcard">
        {message ? 
        <CustomModal  show={isModalOpened}
        titulo="Guardado en favoritos"
        handleClose={() => setIsModalOpened(false)}>
        <div>{message}</div>
        </CustomModal> : ""
        }
        <a href = {`/localDetail/${props.id}`}>
        <img 
        src={props.image_url} 
        className="card-img-top"
        id="imagenlocal"
        alt=""
        />
        </a>
        <div className="card-body">
          <h6>
            <Link to={`/localDetail/${props.id}`} className="card-title mb-1 linkfooter" id="cardtitle"><strong>{props.name}</strong></Link>
            <a href={`/datosLocal/${props.id}`}>
            <button id="iconbutton"> <i className="fas fa-pencil-alt"></i></button>
            </a>
            <a href={`/localDetail/${props.id}`} id="iconbutton">
            <button id="iconbutton"> <i className="fas fa-eye"></i></button>        
            </a>            
          </h6>
            <div id="textoslegales">
            {Array.from(Array(5).keys()).map((e,i)=>{return props.puntuacion <= i ? 
            (<i className="far fa-star" key={i} id="iconbutton"/>)
            : 
            (<i className="fas fa-star" key={i} id="iconbutton"/>)
            })
            }
            {comentarios ? comentarios.length : 0} Opiniones
            </div>
            <p className="mt-1" id="localcardtext">{props.description.substring(0,60)}...</p>
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

export default MilocalCard;
