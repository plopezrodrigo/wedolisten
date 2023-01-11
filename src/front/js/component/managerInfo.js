import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const ManagerInfo = (props) => {
  const { store, actions } = useContext(Context);
  console.log(store.favorites);

  return (
    <div class="row mb-5 pb-md-4 align-items-center">
      <div class="col-md-5">
        <h2 class="display-5 fw-normal">Tu opinión es muy importante</h2>
        <p class="lead fw-normal">
          Permite que otros usuarios conozcan tu opinión en la visita a nuestros
          locales y podamos mejorar su experiencia.{" "}
        </p>
        <a href="#" class="btn btn-lg btn-outline-primary mb-3">
          Registro
        </a>
      </div>
      <div class="col-md-7 ps-md-5">
        <img
          src={`https://starwars-visualguide.com/assets/img/characters/${props.uid}.jpg`}
          className="thumb reserved-ratio"
          alt="Luke Skywalker"
        />
      </div>
    </div>
  );
};

export default  ManagerInfo;
