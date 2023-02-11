import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import LocalCard from "../component/localCard";

export const ListLocalesSearch = () => {
  const params = useParams()
  const [locales, setLocales] = useState();
  let options = {
    method: "GET",
  };

  useEffect(() => {
    console.log("Lista de locales:", params.list);
    setLocales(params.list);
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
