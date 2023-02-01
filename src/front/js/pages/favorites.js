import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Favorites = () => {
  const { store, actions } = useContext(Context);

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
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Foto</th>
              <th scope="col">Local</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody className="listado">
            {!store.favorites ? <tr>no hay favoritos</tr> : ""}
            {store.favorites.map((fav, i) => (
              <tr>
                {fav}
                <button className="btn">
                  <i
                    className="far fa-trash-alt"
                    onClick={() => deleteFavourites(nombre)}
                  />
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
