import React, { Component } from "react";
import { Link } from "react-router-dom";
import imagen from "../../img/logo.png";

export const Footer = () => (
  <footer className="text-center text-lg-start text-muted" id="footer">
    <section>
      <div className="container text-center text-md-start">
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
          <div className="col-md-3 col-lg-2 col-xl-2 " id="textosfooter">
          <h6 className="text-uppercase fw-bold">
          
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
            <Link className="linkfooter" to="/">             <p id="textosfooter">Home</p>           </Link>
            <Link className="linkfooter" to="/about">        <p id="textosfooter">Quienes somos</p>  </Link>
            <Link className="linkfooter" to="/contact">      <p id="textosfooter">Contact</p>        </Link>
            <Link className="linkfooter" to="/signupManager"><p id="textosfooter">Gestores</p>       </Link>
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 mb-4">
          <h6 className="text-uppercase fw-bold mb-4" id="textosfooter">
            Links útiles
          </h6>
          <Link className="linkfooter" to="/faqs">
            <p id="textosfooter">FAQS</p>
          </Link>
          <Link className="linkfooter" to="/avisolegal">
            <p id="textosfooter">Aviso Legal</p>
          </Link>
          <Link className="linkfooter" to="/politicaprivacidad">
            <p id="textosfooter">Política de Privacidad</p>
          </Link>
          <Link className="linkfooter" to="/terminosdeuso">
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
          <a href="https://www.facebook.com/babyfriendly/?locale=es_LA" className="me-4 tex t-reset" >
            <i className="fab fa-facebook-f" id="iconsocial"></i>
          </a>
          <a href="https://twitter.com/babyfriendly?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" className="me-4 text-reset">
            <i className="fab fa-twitter" id="iconsocial"></i>
          </a>
          <a href="https://twitter.com/babyfriendly?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" className="me-4 text-reset" >
          <i className="fab fa-instagram" id="iconsocial"></i>
          </a>
        </div>
      </section>
    </div>
  </footer>
);
