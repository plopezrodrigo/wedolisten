import React, { Component } from "react";
import { Link } from "react-router-dom";
import imagen from "../../img/logo.png";

export const Footer = () => (
  <footer>
    <div className="container fluid py-3 mt-3">
      <div className="row py-5 my-5 border-top">
        <div className="col-lg-3 mb-3">
          <div className="col-lg-6 mb-6">
            <Link to="/">
              {" "}
              <img
                src={imagen}
                className="card-img-top"
                alt=""
                width="120"
                height="120"
              />
            </Link>
          </div>
          <p className="list-unstyled small text-muted">
            Baby Friendly© te ayuda a dar tu opinión sobre tus locales favoritos
            y que éstas puedan ser consultadas por otros usuarios
          </p>
        </div>
        <div className="col-6 col-lg-2 offset-lg-1 mb-3">
          <h5>Enlaces</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-muted">
                Home
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-muted">
                Quienes somos
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-muted">
                Contacto
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-muted">
                Gestores
              </a>
            </li>
          </ul>
        </div>
        <div className="col-6 col-lg-2 offset-lg-1 mb-3">
          <h5>Legal</h5>
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
                FAQs
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
        <p>© 2023 Company, Inc. Reservados todos los derechos.</p>
        <ul className="list-unstyled d-flex">
          <li className="ms-3">
            <a className="link-dark" href="#" id="iconbutton">
              <i className="fab fa-facebook"></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="link-dark" href="#" id="iconbutton">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="link-dark" href="#" id="iconbutton">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);
