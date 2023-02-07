import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import imagen from "../../img/opinion.png";

const OpinionComments = (props) => {
  const { store, actions } = useContext(Context);
  console.log(store.favorites);

  function estrellas(){
    let puntuaciones = "";

    for (let i = 0; i<props.puntuacion; i++){
      puntuaciones = `${puntuaciones}<i className="fas fa-circle"></i>`
    }
    return puntuaciones;
  }



  return (
    <div className="row">
      <div className="col-2">
            <img id="avatar"
              src={imagen}
              className="card-img-top"
              alt="80"
              width="20"
              height="80"
            />
            <p>{props.nombre}</p>
      </div>
      <div className="row">
        <div className="col-12">
          {() => {for (let i = 0; i<props.puntuacion; i++){return <i className="fas fa-circle"></i>}}}
          {() => {for (let i = props.puntuacion; i<5; i++){return <i className="far fa-circle"></i>}}}
        </div>
      </div>
      <div className="col-10">
          <h5>De 10</h5>
          <p>{props.comment}</p> 
      </div>
      <div className="col-10">
          <p><strong>Fecha de la visita:</strong> {props.fecha}</p>
      </div>
      </div>
  );
};
