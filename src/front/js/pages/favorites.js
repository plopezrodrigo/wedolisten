import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import LocalCardfav from "../component/localCardfav";


export const Favorites = () => {
  const [favorites, setFavorites] = useState({});
  const { store, actions } = useContext(Context);
  const [locales, setLocales] = useState();


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
        {locales && locales.map((local, index) => {
        return <div key={local.id} className="col-3">
          <LocalCardfav
                  name={local.name}
                  key={local.id}
                  id={local.id}
                  index={index}
                  address={local.address}
                  description={local.description}
                  email={local.email}
                  telf={local.telf}
                  location={local.location}
                  url={local.url}
                  image_url={local.image_url}
          />
          </div>
          })}
          <tbody className="listado">
            {!favorites.length > 0 ? (
              <tr>no hay favoritos</tr>
            ) : (
              favorites.map((fav, i) => (
                <tr>
                  <td>{fav.comercial.id}</td>
                  <td>
                    <img
                      src={fav.comercial.image_url}
                      width="50px"
                      height="50px"
                    />
                  </td>
                  <td>{fav.comercial.name}</td>
                  {favorites.map((fav, i) => (
                    <td>
                      {fav.comercial.id}
                      <button className="btn">
                        <i
                          className="far fa-trash-alt"
                          onClick={() => deleteFavourites(fav.id)}
                        />
                        <a
                          href="/account"
                          className="btn btn-primary"
                          id="button"
                        >
                          Volver
                        </a>
                      </button>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </div>
      </div>
    </div>
  );
};
