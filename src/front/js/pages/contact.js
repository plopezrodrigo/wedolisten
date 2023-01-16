import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Contact = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return (
    <div className="form-body">
      <div className="row">
        <div className="form-holder">
          <div className="form-content">
            <div className="form-items">
              <h3>Contacto</h3>
              <p>¿Necesitas ayuda?</p>
              <p>Ponte en contacto con nosotros</p>
              <h3>Escríbenos</h3>
              <form className="requires-validation" novalidate>
                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Nombre y Apellidos"
                    required
                  />
                  <div className="valid-feedback">
                    Campo nombre y apellidos es válido.
                  </div>
                  <div className="invalid-feedback">
                    Campo nombre y apellidos no puede estar en blanco.
                  </div>
                </div>

                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    required
                  />
                  <div className="valid-feedback">Campo Email es válido.</div>
                  <div className="invalid-feedback">
                    Campo Email no puede estar en blanco.
                  </div>
                </div>

                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="telefono"
                    name="Teléfono"
                    placeholder="Teléfono"
                    required
                  />
                  <div className="valid-feedback">Campo Teléfono es válido</div>
                  <div className="invalid-feedback">
                    Campo Teléfono no puede estar en blanco
                  </div>
                </div>

                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="text"
                    name="Asunto"
                    placeholder="Asunto"
                    required
                  />
                  <select className="form-select mt-3" required>
                    <option selected disabled value="">
                      Hacerme Gestor
                    </option>
                    <option value="jweb">
                      Información sobre Baby Friendly
                    </option>
                    <option value="sweb">Claves de acceso</option>
                    <option value="pmanager">Otras consultas</option>
                  </select>
                  <div className="valid-feedback">
                    Has seleccionado un asunto.
                  </div>
                  <div className="invalid-feedback">
                    Por favor, selecciona un asunto.
                  </div>
                </div>

                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="text"
                    name="Comentarios"
                    placeholder="Comentarios"
                    required
                  />
                  <div className="valid-feedback">
                    Campo Comentarios es válido
                  </div>
                  <div className="invalid-feedback">
                    Campo Comentarios no puede estar en blanco
                  </div>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="invalidCheck"
                    required
                  />
                  <label className="form-check-label">
                    Confirmo que he leido y acepto la Política de Privacidad y
                    Aviso Legal.
                  </label>
                  <div className="invalid-feedback">
                    Por favor, confirma que has leido y aceptas la Política de
                    Privacidad y Aviso Legal.
                  </div>
                </div>

                <div className="form-button mt-3">
                  <button id="submit" type="submit" className="btn btn-primary">
                    Enviar
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

