import React, {useContext}  from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const OpinionCard = (props) => {
    const {store, actions} = useContext(Context)
    console.log(store.favorites)

    return (
        <div className="col-12 col-md-4">
            <div className="card">
                <img src={`https://starwars-visualguide.com/assets/img/characters/${props.uid}.jpg`} className="thumb reserved-ratio" alt="Luke Skywalker"/>
                <div className="card-body">
                <h5 className="card-title">Título de la tarjeta</h5>
                <p className="card-text">Un texto de ejemplo rápido para colocar cerca del título de la tarjeta y componer la mayor parte del contenido de la tarjeta.</p>
                <a href="#" className="btn btn-primary">Ver más</a>
                </div>
            </div>
        </div>
    )
}

export default OpinionCard