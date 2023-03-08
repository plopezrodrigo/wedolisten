import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import LocalCardfav from "../component/localCardfav";


export const Favorites = () => {
  const { store, actions } = useContext(Context);
  const [favorites, setFavorites] = useState();
  
  const list_favorites = () => {
    fetch(`${process.env.BACKEND_URL}/api/favourit/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setFavorites(response);
      });
  };

  useEffect(() => {
    list_favorites();
  }, []);

  return (
    <div className="container fluid">
      <div className="myDetails">
        <div className="headerSection">
          <div className="container">
            <div className="row">
              <h2>Favoritos</h2>
              <span>Consulta o gestiona tus locales favoritos.</span>
            </div>
          </div>
        </div>
      </div>
      <div className="contaniner fluid">
        <div className="row align-items-start">
        {favorites && favorites.map((fav, index) => {
        return <div key={fav.comercial.id} className="col-3 mt-3 ms-2">
          <LocalCardfav
                  name={fav.comercial.name}
                  key={fav.comercial.id}
                  id={fav.comercial.id}
                  index={index}
                  description={fav.comercial.description}
                  image_url={fav.comercial.image_url}
          />
          </div>
          })}
        </div>
      </div>
    </div>
  );
};
