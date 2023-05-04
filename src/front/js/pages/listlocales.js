import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import LocalCard from "../component/localCard";
import MilocalCard from "../component/milocalCard";


const ListLocales = () => {
  const { store, actions } = useContext(Context);
  const [locales, setLocales] = useState();
  const [localesrandom, setLocalesrandom] = useState();
  const [lastlocales, setLastlocales] = useState();
  const [localeshome, setLocaleshome] = useState();
  let options = {
    method: "GET",
  };

  const useEffectLocalesRandom = async () => {
    if (sessionStorage.getItem("token") != null) {
      options.headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      };
    }
    await fetch(process.env.BACKEND_URL + "/api/random-comercial-place", options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setLocalesrandom(response);
      });
  };

  const useEffectLastLocales = async () => {
    if (sessionStorage.getItem("token") != null) {
      options.headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      };
    }
    await fetch(process.env.BACKEND_URL + "/api/last-comercial-place", options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setLastlocales(response);
      });
  };

  const useEffectLocalesHome = async () => {
    if (sessionStorage.getItem("token") != null) {
      options.headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      };
    }
    await fetch(process.env.BACKEND_URL + "/api/comercial-place-home", options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setLocaleshome(response);
      });
  };

  useEffect(() => {
    useEffectLastLocales();
    useEffectLocalesRandom();
    useEffectLocalesHome();
    if (sessionStorage.getItem("token") != null) {
      options.headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      };
    }

    if (store.locales && store.locales.length > 0) {
      setLocales(store.locales);
    } else {
      fetch(process.env.BACKEND_URL + "/api/comercial-place-home", options)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          setLocales(response);
        });
    }
  }, []);

  return (
    <div className="container fluid">
      <div>
      <h3>Al aire libre en familia</h3>
      <div className="row align-items-start">
        {localeshome &&
          localeshome.map((local, index) => {
            return (
              <div key={local.id} className="col-3">
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
                  raking={local.raking}
                  comments={local.comments}
                  favorite={local.favorite}
                />
              </div>
            );
          })}
      </div>
      </div>
 


      <div>
      <h3>Locales de la Guía #FoodieKids</h3>
      <div className="row align-items-start">
        {lastlocales &&
          lastlocales.map((local, index) => {
            return (
              <div key={local.id} className="col-3">
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
                  raking={local.raking}
                  comments={local.comments}
                  favorite={local.favorite}
                />
              </div>
            );
          })}
      </div>
      </div>

      <div>
      <h3>Terrazas family friendly</h3>
      <div className="row align-items-start">
        {locales &&
          locales.map((local, index) => {
            return (
              <div key={local.id} className="col-3">
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
                  puntuacion={local.puntuacion}
                  raking={local.raking}
                  comments={local.comments}
                  favorite={local.favorite}
                />
              </div>
            );
          })}
      </div>
      </div>

      <div>
      <h3>Jardines secretos para tu familia</h3>
      <div className="row align-items-start">
        {localesrandom &&
          localesrandom.map((local, index) => {
            return (
              <div key={local.id} className="col-3">
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
                  raking={local.raking}
                  comments={local.comments}
                  favorite={local.favorite}
                />
              </div>
            );
          })}
      </div>
      </div>

    </div>
  );
};

export default ListLocales;
