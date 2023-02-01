import React, { useContext, useState, useEffect } from "react";
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
    <div className="col-12">
      <div className="card" id="localcard">
          <img
              src="https://pbs.twimg.com/media/Fie7-X6WAAALgul.jpg"
              className="card-img-top"
              alt=""
           />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
                      {/*
          <button 
                    id="iconbutton"
                    onClick={()=>{add_favourites(props.id)}
                    }> a
                    </button>
                */}
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
