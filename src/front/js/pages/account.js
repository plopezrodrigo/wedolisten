import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import imagen from "../../img/account.png";

export const Account = () => {
  const navigate = useNavigate()
  const { store, actions } = useContext(Context);
  return (
    <form>
      <div className="vh-100 gradient-custom">
        <div className="container">
          <h4 className="my-account-section-title ma-title text-center" id="iconbutton">
            Mi cuenta 
          </h4>
          <p className="my-account-section-description mb-0 text-center">¡Hola, {store.usuario?.name}!</p>
          <p className="my-account-section-description mt-0 mb-4 text-center">Aquí puedes ver tus locales favoritos, editar tus datos o realizar cualquier gestión</p>
          <div className="row d-flex justify-content-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card d-flex flex-column justify-content-start" id="card">
                <div className="ma-home-sections">
                    <p className="text ma-home-section mb-3">
                    <Link to="/data">
                      <i className="fas fa-user-edit ms-4 mt-3 " id="iconaccount" />
                      <strong className="strong ms-2 mt-3 "> Mis datos</strong>
                    </Link>
                    </p>
                    <p className="description ms-4 mt-0">Edita tus datos personales.</p>
                    {store.usertype == "customer" ? 
                      <>
                        <p className="text ma-home-section">
                          <Link to="/favorites">
                            <i className="fas fa-star ms-4" id="iconaccount" />
                            <strong className="strong ms-2"> Mis Favoritos</strong>
                          </Link>
                        </p>
                        <p className="description ms-4">Consulta tus locales añadidos a favoritos.</p>
                      </>
                      :
                      <>
                        <p className="text ma-home-section">
                          <Link to="/comentarios">
                              <i className="fas fa-star ms-4" id="iconaccount" />
                              <strong className="strong ms-2"> Mis Comentarios</strong>
                          </Link>
                        </p>
                        <p className="description ms-4">Consulta los comentarios de tus clientes.</p>
                      </>
                    }
                      {store.usertype == "manager" ? 
                      <>
                        <p className="text ma-home-section">
                          <Link to="/misLocales">
                            <i className="fas fa-star ms-4" id="iconaccount" />
                            <strong className="strong ms-2"> Mis Locales</strong>
                          </Link>
                        </p>
                        <p className="description ms-4">Consulta tus locales.</p>
                      </>
                      :
                      ""
                      }
                    <p className="text ma-home-section">
                      <a onClick={() => {actions.logout();
                                        navigate("/")}}>
                        <i className="fas fa-sign-out-alt ms-4" id="iconaccount"></i>
                        <strong className="strong ms-2"> Cerrar sesión </strong>
                      </a>
                    </p>
                    <p className="description ms-4 mt-1">Cierra tu sesión.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
