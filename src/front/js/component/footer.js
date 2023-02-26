import React, { Component } from "react";
import { Link } from "react-router-dom";
import imagen from "../../img/logo.png";

export const Footer = () => (
  <footer className="text-center text-lg-start text-muted" id="footer">
    <section>
      <div className="container text-center text-md-start mt-5">
        <div className="row mt-3">
          <div className="col-md-4 col-lg-6 col-xl-4 ms-4">
            <Link to="/">
              <span id="logofooter">
                {" "}
                <img
                  src={imagen}
                  className="card-img-top"
                  alt=""
                />
              </span>
            </Link>
            <p className="mt-0" id="textosfooter">
            Baby Friendly te ayuda a dar tu opinión sobre tus locales favoritos y que éstas puedan ser consultadas por otros usuarios.
            </p>
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 mb-4" id="textosfooter">
          <h6 className="text-uppercase fw-bold mb-4">
          
          </h6>
            <p id="textosfooter"></p>
            <p id="textosfooter"></p>
            <p id="textosfooter"></p>
            <p id="textosfooter"></p>
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 mb-4" id="textosfooter">
          <h6 className="text-uppercase fw-bold mb-4">
            Secciones
          </h6>
            <Link to="/">             <p id="textosfooter">Home</p>           </Link>
            <Link to="/about">        <p id="textosfooter">Quienes somos</p>  </Link>
            <Link to="/contact">      <p id="textosfooter">Contact</p>        </Link>
            <Link to="/signupmanager"><p id="textosfooter">Gestores</p>       </Link>
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 mb-4">
          <h6 className="text-uppercase fw-bold mb-4" id="textosfooter">
            Links útiles
          </h6>
          <Link to="/">
            <p id="textosfooter">FAQS</p>
          </Link>
          <Link to="/avisolegal">
            <p id="textosfooter">Aviso Legal</p>
          </Link>
          <Link to="/politicaprivacidad">
            <p id="textosfooter">Política de Privacidad</p>
          </Link>
          <Link to="/">
            <p id="textosfooter">Términos de uso</p>
          </Link>
          </div>
        </div>
      </div>
    </section>
    <div className="container fluid">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom" id="textosfooter2">
        <div className="me-5 d-none d-lg-block">
          <span className="me-3" id="textosfooter2">Conéctate con nosotros en redes sociales:</span>
          <a href="" className="me-4 tex t-reset" >
            <i className="fab fa-facebook-f" id="iconbutton"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-twitter" id="iconbutton"></i>
          </a>
          <a href="" className="me-4 text-reset" >
          <i className="fab fa-instagram" id="iconbutton"></i>
          </a>
        </div>
      </section>
    </div>
  </footer>
);
