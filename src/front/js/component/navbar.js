import React, { useContext } from "react";
import { Link } from "react-router-dom";
import imagen from "../../img/logo.png";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <Link to="/">
              <span className="navbar-brand mb-0 h1">
                {" "}
                <img src={imagen} className="card-img-top" alt="" width="120" height="120" />
              </span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-lg-0">
                <form>
                  <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar" />
                  <button className="btn btn-outline-success" type="submit" id="iconbutton">
                    <i className="far fa-search" />
                  </button>
                </form>
              </ul>

              <div className="ml-auto">
                {!store.token ? (
                  <Link to="/login">
                    <button className="btn btn-primary" id="button">Log in</button>
                  </Link>
                ) : (
                  <>
                  {store.nameUser}{"   "}
                  <Link to="/account">
                    <button className="btn btn-primary" id="button"><i className="fas fa-user-circle"></i> Mi cuenta</button>
                  </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );

};


{/**

    <div className="container-fluid">
      <div className="container-fluid">
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
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/about">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="#"
                      id="navbarSupportedContent"
                    >
                      Quienes Somos
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/listlocales">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="#"
                      id="navbarSupportedContent"
                    >
                      Locales
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact">
                    <a
                      className="nav-link active"
                      href="#"
                      id="navbarSupportedContent"
                    >
                      Contacto
                    </a>
                  </Link>
                </li>
                <form>
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Buscar"
                    aria-label="Buscar"
                  />
                  <button
                    className="btn btn-outline-success"
                    type="submit"
                    id="iconbutton"
                  >
                    <i className="far fa-search" />
                  </button>
                </form>
              </ul>
              <div className="ml-auto">
                {!store.token ? (
                  <Link to="/login">
                    <button className="btn btn-primary" id="button">
                      Log in
                    </button>
                  </Link>
                ) : (
                  <Link to="/account">
                    <button className="btn btn-primary" id="button">
                    <i className="fas fa-user-circle"></i> Mi cuenta
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>


*/}