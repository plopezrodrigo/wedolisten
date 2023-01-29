import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import imagen from "../../img/account.png";

export const Account = () => {
  const { store, actions } = useContext(Context);
  return (
    <form>
      <div className="container fluid">
        <div className="row mb-5 pb-md-4 align-items-center">
          <h6 className="my-account-section-title ma-title" id="iconbutton">
            Mi cuenta {store.usertype == "customer" ? "Eres un customer" : "Eres manager"}
          </h6>
          {store.usertype == "customer" ? 
          <button>kduhfufi</button> : ""}
          <p className="my-account-section-description" id="iconbutton">
            ¡Hola, Carlos Ortega! Aquí puedes ver tus locales favoritos, editar
            tus datos o realizar cualquier gestión
          </p>
        </div>
        <div className="col-6">
          <div className="ma-home-sections">
            <p className="text ma-home-section">
              <a className="link" href="">
                <i className="fas fa-user-edit" id="iconaccount" />
                <strong className="strong">Mis datos</strong>
              </a>
              <span className="description">Edita tus datos personales.</span>
            </p>
            <p className="text ma-home-section">
              <a className="link" href="">
                <i className="fas fa-star" id="iconaccount" />
                <strong className="strong">Mis Favoritos</strong>
              </a>
              <span className="description">
                Consulta tus locales añadidos a favoritos.
              </span>
               
            </p>
            <p className="text ma-home-section">
              <a className="link" href="">
                <i className="fas fa-sign-out-alt" id="iconaccount" />
                <strong className="strong">Cerrar sesión</strong>
              </a>
              <span className="description">Cierra tu sesión.</span>
            </p>
          </div>
        </div>
        <div className="col-6">
          <div className="imagen">
            <img
              src={imagen}
              className="card-img-top"
              alt=""
              width="500"
              height="500"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
