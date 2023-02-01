import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Comments = () => {
  const { store, actions } = useContext(Context);
  return (
    <div className="container fluid">
      <div className="myDetails">
        <div className="headerSection">
          <div className="container">
            <div className="row">
              <h2>Comentarios</h2>
              <span>Consulta o gestiona los comentarios de tus clientes.</span>
              <div className="contaniner fluid">
                <table className="table">
                <div class="table-filter">
                  <div class="row">
                    <div class="col-sm-9">
                      <button type="button" class="btn btn-primary"><i class="fa fa-search" onclick=""></i></button>
                      <div class="col-4 filter-group">
                        <label>Nombre</label>
                        <input type="text" class="form-control" id="name"/>
                      </div>
                      <div class="col-4 filter-group">
                        <label>Ubicación</label>
                        <select class="form-control" id="location" onchange="load(1);"> 
                          <option value="">Todos</option>
                          <option value="Berlin">Berlin</option>
                          <option value="London">London</option>
                          <option value="Madrid">Madrid</option>
                          <option value="New York">New York</option>
                          <option value="Paris">Paris</option>								
                        </select>
                      </div>
                      <div class="col-4 filter-group">
                        <label>Estado</label>
                        <select class="form-control" id="status" onchange="load(1);">
                          <option value="">Todos</option>
                          <option value="Entregado">Entregado</option>
                          <option value="Enviada">Enviada</option>
                          <option value="Pendiente">Pendiente</option>
                          <option value="Cancelado">Cancelado</option>
                        </select>
                      </div>
                      <span class="filter-icon"><i class="fa fa-filter"></i></span>
                      <div class="col-4 text-right">
                      <div class="show-entries">
                        <span>Mostrar</span>
                        <select class="form-control" id="per_page" onchange="">
                          <option>5</option>
                          <option>10</option>
                          <option selected="">15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Foto</th>
              <th scope="col">Local</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          {/* <tbody className="listado">
            {!store.favorites ? <tr>no hay favoritos</tr> : ""}
            {store.favorites.map((fav, i) => (
              <tr>
                {fav}
                <button className="btn">
                  <i
                    className="far fa-trash-alt"
                    onClick={() => deleteFavourites(nombre)}
                  />
                </button>
              </tr>
            ))}
          </tbody> */}
        </table>
    </div>
  );
};
