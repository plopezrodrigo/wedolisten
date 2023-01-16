import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const OpinionCard = (props) => {
  const { store, actions } = useContext(Context);
  console.log(store.favorites);

  return (
    <div className="col-12 col-md-4">
      <div className="card">
        <img
          src={`https://starwars-visualguide.com/assets/img/characters/${props.uid}.jpg`}
          className="thumb reserved-ratio"
          alt="Luke Skywalker"
        />
        <div className="card-body">
          <h5 className="card-title">Nombre de la local</h5>
          <p className="card-text">XX/MM/YYYY.</p>
          <button className="btn btn-outline-success" type="submit">
            <i className="fas fa-heart" />
            <i className="far fa-comment" />
            <i className="fas fa-map-marker-alt" />
          </button>
          <a href="#" className="btn btn-primary">
            Ver más
          </a>
        </div>
      </div>
    </div>
  );
};

export default OpinionCard;
