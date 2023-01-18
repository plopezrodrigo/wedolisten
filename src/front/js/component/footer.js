import React, { Component } from "react";
import { Link } from "react-router-dom";
import imagen from "../../img/logo.png";

export const Footer = () => (
  <footer>
    <div className="container fluid">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
        <div className="col mb-3">
          <Link to="/">
            <span className="navbar-brand mb-0 h1">
              {" "}
              <img
                src={imagen}
                className="card-img-top"
                alt=""
                width="120"
                height="120"
              />
            </span>
          </Link>
          <p className="text-muted">
            Baby Friendly© te ayuda a dar tu opinión sobre tus locales favoritos
            y que éstas puedan ser consultadas por otros usuarios
          </p>
        </div>
        <div className="col mb-3"></div>
        <div className="col mb-3">
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-muted">
                Home
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-muted">
                About
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-muted">
                Contact
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-muted">
                FAQs
              </a>
            </li>
          </ul>
        </div>
        <div className="col mb-3">
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-muted">
                Política de privacidad
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-muted">
                Aviso Legal
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-muted">
                Gestores
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">

          <p>© 2023 Company, Inc. Reservados todos los derechos.</p>
          <ul className="list-unstyled d-flex">
            <li className="ms-3">
              <a className="link-dark" href="#">
                <svg className="bi" width="24" height="24">
                  <use xlinkHref="#twitter"></use>
                </svg>
              </a>
            </li>
            <li className="ms-3">
              <a className="link-dark" href="#">
                <svg className="bi" width="24" height="24">
                  <use xlinkHref="#instagram"></use>
                </svg>
              </a>
            </li>
            <li className="ms-3">
              <a className="link-dark" href="#">
                <svg className="bi" width="24" height="24">
                  <use xlinkHref="#facebook"></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
  </footer>
);
