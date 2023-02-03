import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import LocalCard from "../component/localCard";

const ListLocales = () => {
  const [locales, setLocales] = useState();
  let options = {
    method: "GET",
  };

  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      options.headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      };
    }

    fetch(process.env.BACKEND_URL + "/api/comercial-place", options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setLocales(response);
      });
  }, []);

  return (
    <div className="container">
      <h3>Listado de Locales</h3>
      <div className="row">
          {locales && locales.map((local, index) => {
            return <div className="col-3">
                <LocalCard
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
      </div>
    </div>
  );
};

export default ListLocales;
