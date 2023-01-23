import React, { useState, useEffect } from "react";
import imagen from "../../img/local1.jpeg";
import OpinionComments from "../component/opinionComments";
import { useParams } from "react-router-dom";


const LocalDetail = () => {
  const params = useParams()
  const [local, setLocales] = useState({})

  useEffect (()=> {
    fetch(`${process.env.BACKEND_URL}/api/comercial-place/${params.id}`)
    .then(response => {
        return response.json()
    }).then(response => {
        setLocales(response)        
    })
}, [])

  return (
    <div className="container fluid">
      <div className="row">
        <div className="col-10">
          {
            local ?
          <h1>{local.name}</h1>
          : ""}
        </div>
        <div className="col-1">
          <a href="">
            <i className="fas fa-heart" id="iconbutton"></i>
          </a>
        </div>
        <div className="col-1">
          <a href="">
            <i className="fas fa-share-alt" id="iconbutton"></i>
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <i className="fas fa-circle"></i>
          <i className="fas fa-circle"></i>
          <i className="fas fa-circle"></i>
          <i className="fas fa-circle"></i>
          <i className="far fa-circle"></i>
        </div>
        <div className="col-6">
          <p>297 Opiniones</p>
        </div>
        <div className="col-6">
          <p>{local.address} - {local.url} - {local.telf} - {local.email}</p>
        </div>
      </div>
      <div className="row">
        <div className="mobile_flex_container  full_width">
          <img src={imagen} className="card-img-top" alt="" />
          <div className="see_all_count_wrap" onclick="">
            <span className="see_all_count">
              <span className="ui_icon camera"></span>
              <span className="details">Ver todo ($)</span>
            </span>
          </div>
        </div>
        <div className="descripcion" id="descripcion">
          <p>
          {local.description}
          </p>
        </div>
      </div>
      <div className="row" id="rating">
        <div className="col-6">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label className="form-check-label" for="flexRadioDefault1">
            {local.trona}
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label className="form-check-label" for="flexRadioDefault1">
            {local.cambiador}
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label className="form-check-label" for="flexRadioDefault1">
            {local.accessible} con carrito
            </label>
          </div>
        </div>
        <div className="col-6">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label className="form-check-label" for="flexRadioDefault1">
            {local.espacio_carrito} 
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value={local.ascensor}
            />
            <label className="form-check-label" for="flexRadioDefault1">
            ascensor
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label className="form-check-label" for="flexRadioDefault1">
            {local.productos_higiene} 
            </label>
          </div>
        </div>
      </div>
      <div className="row" id="ubicacion">
        <h2>Ubicación y contacto</h2>
        <div>
          <img src={imagen} className="card-img-top" alt="" />
        </div>
        <div className="">
          <span className=""></span>
          <span>
            <a href="https://maps.google.com/maps?saddr=&amp;daddr=Calle+Bah%C3%ADa+de+Palma%2C+4B%2C+28042+Madrid+Espa%C3%B1a@40.46229,-3.591468">
              <span className="">
              {local.location} 
              </span>
              <span className=""></span>
            </a>
          </span>
        </div>
        <div className="">
          <span className="">
            <div>{local.location} </div>
          </span>
        </div>
      </div>
      <div className="row" id="rating">
        <h2>Lee lo que otros usuarios opinan</h2>
        <OpinionComments />
        <OpinionComments />
      </div>
      <div className="col-4">
        <button className="btn btn-primary" id="button">
          Escribe tu opinión
        </button>
      </div>
      
    </div>
  );
};

export default LocalDetail;
