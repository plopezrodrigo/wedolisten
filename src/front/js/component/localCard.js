import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";


const LocalCard = (props) => {
  const { store, actions } = useContext(Context);
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
        <img src={props.image_url} className="card-img-top" width="200" height= "200" alt="" />
        <div className="card-body">
            <h5 className="card-title">{props.name}</h5>
            <button id="iconbutton" onClick={()=>{add_favourites(props.id)}}> <i className="fas fa-heart"></i></button>
            <button className="btn btn-outline-success" type="submit" id="iconbutton"><i className="far fa-comment" /></button>
            <button className="btn btn-outline-success" type="submit" id="iconbutton"><i className="fas fa-map-marker-alt" /></button>
            <Link to={`/localDetail/${props.id}`} className="btn btn-primary" id="button">Ver más</Link>
        </div>
      </div>
  );
};

export default LocalCard;
