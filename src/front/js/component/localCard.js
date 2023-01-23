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
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.date}</p>
          <button className="btn btn-outline-success" type="submit" id="iconbutton">
            <i className="fas fa-heart" />
          </button>
          <button className="btn btn-outline-success" type="submit" id="iconbutton">
          <i className="far fa-comment" />
          </button>
          <button className="btn btn-outline-success" type="submit" id="iconbutton">
          <i className="fas fa-map-marker-alt" />
          </button>
          <button id="button">
            <Link 
              to={`/localDetail/${props.id}`} 
              className="">
              Ver más
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocalCard;
