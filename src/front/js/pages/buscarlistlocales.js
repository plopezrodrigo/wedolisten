import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import LocalCard from "../component/localCard";

const BuscarlistLocales = () => {
  const { store, actions } = useContext(Context);

  let options = {
    method: "GET",
  };

  
   return (
    <div className="container fluid">
      <h3>Tu búsqueda</h3>
      <div className="row align-items-start">
        {store.locales && store.locales.map((local, index) => {
            return <div key={local.id} className="col-3">
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

export default BuscarlistLocales;
