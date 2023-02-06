import React, { Component } from "react";
import { Link } from "react-router-dom";
import imagen from "../../img/logo.png";

export const Footer = () => (
  <footer className="text-center text-lg-start text-muted" id="footer">
    <div className="container fluid">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Conéctate con nosotros en redes sociales:</span>
        </div>
        <div>
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
    <section>
      <div class="container text-center text-md-start mt-5">
        <div class="row mt-3">
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
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
            <p className="mt-0">
            Baby Friendly te ayuda a dar tu opinión sobre tus locales favoritos y que éstas puedan ser consultadas por otros usuarios.
            </p>
          </div>
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 class="text-uppercase fw-bold mb-4">
            Secciones
          </h6>
          <p>
            <a href="#!" class="text-reset">Home</a>
          </p>
          <p>
            <a href="/about" class="text-reset">Quienes somos</a>
          </p>
          <p>
            <a href="/contact" class="text-reset">Contacto</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Gestores</a>
          </p>
          </div>
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 class="text-uppercase fw-bold mb-4">
            Links útiles
          </h6>
          <p>
            <a href="#!" class="text-reset">FAQs</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Aviso Legal</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Política de privacidad</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Términos de uso</a>
          </p>
          </div>
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          </div>
        </div>
      </div>
    </section>
    <div class="text-center p-4">
    © 2023 Copyright: <a class="text-reset fw-bold" href="">  BabyFriendly.com</a>
    </div>
  </footer>
);
