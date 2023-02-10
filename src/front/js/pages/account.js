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
        <div className="container text-center">
          <h4 className="my-account-section-title ma-title" id="iconbutton">
            Mi cuenta 
          </h4>
          <p className="my-account-section-description mb-0">¡Hola, Patricia López!</p>
          <p className="my-account-section-description mt-0 mb-4">Aquí puedes ver tus locales favoritos, editar tus datos o realizar cualquier gestión</p>
          <div className="row d-flex justify-content-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card" id="card">
                <div className="ma-home-sections">
                    <p className="text ma-home-section mt-3 mb-3">
                    <Link to="/data">
                      <i className="fas fa-user-edit" id="iconaccount" />
                      <strong className="strong"> Mis datos</strong>
                    </Link>
                    <p className="description">Edita tus datos personales.</p>
                    </p>
                    {store.usertype == "customer" ? 
                      <p className="text ma-home-section">
                        <Link to="/favorites">
                          <i className="fas fa-star" id="iconaccount" />
                          <strong className="strong"> Mis Favoritos</strong>
                        </Link>
                        <p className="description">
                          Consulta tus locales añadidos a favoritos.
                        </p>
                      </p>
                      :
                      <p className="text ma-home-section">
                        <Link to="/comentarios">
                            <i className="fas fa-star" id="iconaccount" />
                            <strong className="strong"> Mis Comentarios</strong>
                        </Link>
                        <p className="description">
                          Consulta los comentarios de tus clientes.
                        </p>
                      </p>
                      }
                      {store.usertype == "manager" ? 
                      <p className="text ma-home-section">
                        <Link to="/misLocales">
                          <i className="fas fa-star" id="iconaccount" />
                          <strong className="strong"> Mis Locales</strong>
                        </Link>
                        <p className="description">
                          Consulta tus locales.
                        </p>
                      </p>
                      :
                      ""
                      }
                    <p className="text ma-home-section">
                    <a
                    onClick={() => {actions.logout()
                    navigate("/")}}
                    >
                    <i class="fas fa-sign-out-alt" id="iconaccount"></i>
                    <strong className="strong"> Cerrar sesión </strong>
                    </a>
                    <p className="description">Cierra tu sesión.</p>
                    </p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
