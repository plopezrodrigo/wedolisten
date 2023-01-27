import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Data = () => {
  const { store, actions } = useContext(Context);
  return (
    <form>
      <div className="myDetails">
        <div className="headerSection">
          <div className="container">
            <div className="row">
              <h2>Datos personales</h2>
              <span>Consulta o edita los datos de tu cuenta</span>  
            </div>
          </div>
          <div className="container fluid">
            <div className="row">
              <div class="titulo">
						   		<span class="text-title-xl">Datos personales</span>
							</div>
            </div>
          </div>
          <div className="container fluid">
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
                  <div className="selectContent">
                    <div className="row">
                      <div className="col-md-4 birthdayDay">
                      <select id="fecha">
                        <option value="" selected="selected">Día</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                      </select>
                      </div>
                      <div className="col-md-4 birthdayMonth">
                      <select id="fecha">
                        <option value="" selected="selected">Mes</option>
                        <option value="1">Enero</option>
                        <option value="2">Febrero</option>
                        <option value="3">Marzo</option>
                        <option value="4">Abril</option>
                        <option value="5">Mayo</option>
                        <option value="6">Junio</option>
                        <option value="7">Julio</option>
                        <option value="8">Agosto</option>
                        <option value="9">Septiembre</option>
                        <option value="10">Octubre</option>
                        <option value="11">Noviembre</option>
                        <option value="12">Diciembre</option>
                      </select>
                      </div>
                      <div className="col-md-4 birthdayYear">
                      <select id="fecha">
                        <option value="" selected="selected">Año</option>
                        <option value="1">2008</option>
                        <option value="2">2007</option>
                        <option value="3">2006</option>
                        <option value="4">2005</option>
                        <option value="5">2004</option>
                        <option value="6">2003</option>
                        <option value="7">2002</option>
                        <option value="8">2001</option>
                        <option value="9">2000</option>
                        <option value="10">1999</option>
                        <option value="11">1998</option>
                        <option value="12">1997</option>
                        <option value="13">1996</option>
                        <option value="14">1995</option>
                        <option value="15">1994</option>
                        <option value="16">1993</option>
                        <option value="17">1992</option>
                        <option value="18">1991</option>
                        <option value="19">1990</option>
                        <option value="20">1989</option>
                        <option value="21">1988</option>
                        <option value="22">1987</option>
                        <option value="23">1986</option>
                        <option value="24">1985</option>
                        <option value="25">1984</option>
                        <option value="26">1983</option>
                        <option value="27">1982</option>
                        <option value="28">1981</option>
                        <option value="29">1980</option>
                        <option value="30">1979</option>
                        <option value="31">1978</option>
                      </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <input
                      className="form-control"
                      type="text"
                      name="Género"
                      placeholder="Género"
                      required
                    />
                    <select className="form-select mt-3" required>
                      <option selected disabled value="">
                        Hombre
                      </option>
                      <option value="jweb">
                        Mujer
                      </option>
                      <option value="sweb">Otro</option>
                    </select>
                    <div className="valid-feedback">
                    Has seleccionado tu género.
                    </div>
                    <div className="invalid-feedback">
                    Por favor, selecciona tu género.
                    </div>
                  </div>
                  <div className="col-md-12">
                    <input
                      className="form-control"
                      type="text"
                      name="Contraseña"
                      placeholder="Contraseña"
                      required
                    />
                    <div className="valid-feedback">
                      Campo Contraseña es válido
                    </div>
                    <div className="invalid-feedback">
                      Campo Contraseña no puede estar en blanco
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
                    <button id="button" type="submit" className="btn btn-primary">
                      Guardar cambios
                    </button>
                  </div>
            </form>
          </div>
        </div>
      </div>
    </form>
  );
};
