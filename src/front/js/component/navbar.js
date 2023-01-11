import React from "react";
import { Link } from "react-router-dom";
import imagen from "../../img/logo.png";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/about">
                <a className="nav-link active" aria-current="page" href="#">
                  Quienes Somos
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact">
                <a className="nav-link active" href="#">
                  Contacto
                </a>
              </Link>
            </li>
          </ul>
          <form>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar"
              aria-label="Buscar"
            />
            <button className="btn btn-outline-success" type="submit">
              <i className="far fa-search" />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
