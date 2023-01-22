import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import imagen from "../../img/local1.jpeg";


const LocalCard = (props) => {
  const { store, actions } = useContext(Context);
  console.log(store.favorites);

  return (
    <div className="col-12">
      <div className="card" id="localcard">
          <img
              src={imagen}
              className="card-img-top"
              alt=""
           />
        <div className="card-body">
          <h5 className="card-title">Nombre del local</h5>
          <p className="card-text">XX/MM/YYYY.</p>
          <button className="btn btn-outline-success" type="submit" id="iconbutton">
            <i className="fas fa-heart" />
          </button>
          <button className="btn btn-outline-success" type="submit" id="iconbutton">
          <i className="far fa-comment" />
          </button>
          <button className="btn btn-outline-success" type="submit" id="iconbutton">
          <i className="fas fa-map-marker-alt" />
          </button>
          <a href="#" className="btn btn-primary" id="button">
            Ver más
          </a>
        </div>
      </div>
    </div>
  );
};

export default LocalCard;
