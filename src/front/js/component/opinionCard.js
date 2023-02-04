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
            {() => {for (let i = 0; i<props.puntuacion; i++){return <i className="fas fa-star" id="iconbutton"/>}}}
            {() => {for (let i = props.puntuacion; i<5; i++){return <i className="far fa-star" id="iconbutton"/>}}}
            <i className="fas fa-star" id="iconbutton"/>
          </button>
          <p className="card-text">
            {props.comment}
          </p>
          <div className="col-10">
            <p><strong>Fecha de la visita:</strong> {props.fecha}</p>
          </div>
          {store.usertype != "customer" &&
              <p className="text ma-home-section">  
                <Link to="/Comentarios">
                <a>
                  <i className="fas fa-star" id="iconaccount" />
                  <strong className="strong">Responde</strong>
                </a>
                </Link>
              </p>
          }
        </div>
      </div>
    </div>
  );
};

export default OpinionCard;


/*

r una .text-truncateclase para truncar el texto con puntos suspensivos. Requiere display: inline-blocko display: block.
<!-- Block level -->
<div class="row">
  <div class="col-2 text-truncate">
    Praeterea iter est quasdam res quas ex communi.
  </div>
</div>

<!-- Inline level -->
<span class="d-inline-block text-truncate" style="max-width: 150px;">
  Praeterea iter est quasdam res quas ex communi.
</span>

*/