import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import imagen from "../../img/opinion.png";

const OpinionCard = (props) => {
  const { store, actions } = useContext(Context);
  console.log(store.favorites);

  return (
    <div className="col-12">
      <div className="card" id="opinioncard">
        <div className="card-img-top" id="imagenopinion">
            <img 
              src={imagen}
              className="card-img-top"
              alt=""
            />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{props.nombre}</h5>
          <button id="opinionbutton">
            {props.puntuacion}<i className="fas fa-star" id="iconbutton"/>
            <i className="fas fa-star" id="iconbutton"/>
            <i className="fas fa-star" id="iconbutton"/>
            <i className="fas fa-star" id="iconbutton"/>
            <i className="far fa-star" id="iconbutton"/>
          </button>
          <p className="card-text">
            {props.comment}
          </p>
          <a href="#" className="btn btn-primary" id="button">
            Ver más
          </a>
        </div>
      </div>
    </div>
  );
};

export default OpinionCard;