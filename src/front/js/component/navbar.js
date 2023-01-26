import React from "react";
import { Link } from "react-router-dom";
import imagen from "../../img/logo.png";

export const Navbar = () => {
  return (
    <div className="container fluid">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <Link to="/">
              <span className="navbar-brand">
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
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto ms-5 mb-2 mb-lg-3">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="#"
                    id="secciones"
                  >
                    Quienes somos
                  </a>
                </li>
                <li className="nav-item ms-4">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="https://3000-adolfobg-babyfriendlyne-vy04xvlq5ff.ws-eu84.gitpod.io/contact"
                    id="secciones"
                  >
                    Contacto
                  </a>
                </li>
                <li>
                  <div class="input-group rounded ms-4">
                    <input
                      type="search"
                      className="form-control rounded"
                      placeholder="Buscar"
                      aria-label="Search"
                      aria-describedby="search-addon"
                    />
                    <button
                      type="button"
                      className="btn btn-warning"
                      id="iconbuttonnegativo"
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </li>
              </ul>
              <button class="btn mb-2 mb-lg-3" id="button">
                <Link to="/login">
                  <a
                    className="nav-link active"
                    href="#"
                    id="navbarSupportedContent"
                  >
                    Login
                  </a>
                </Link>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
