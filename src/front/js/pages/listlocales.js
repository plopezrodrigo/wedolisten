import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import LocalCard from "../component/localCard";

const ListLocales = () => {

    return (
        <div className="container">
            <h3>Listado de Locales</h3>
            <div className="row">
            <h5>Locales con trona</h5>
            <div className="col-3">
                <LocalCard/>
            </div>
            <div className="col-3">
                <LocalCard/>
            </div>
            <div className="col-3">
                <LocalCard/>
            </div>
            <div className="col-3">
                <LocalCard/>
            </div>
            </div>
            <div className="row">
            <h5>Locales con cambiador</h5>
            <div className="col-3">
                <LocalCard/>
            </div>
            <div className="col-3">
                <LocalCard/>
            </div>
            <div className="col-3">
                <LocalCard/>
            </div>
            <div className="col-3">
                <LocalCard/>
            </div>
            </div>
            <div className="row">
            <h5>Locales accesibles</h5>
            <div className="col-3">
                <LocalCard/>
            </div>
            <div className="col-3">
                <LocalCard/>
            </div>
            <div className="col-3">
                <LocalCard/>
            </div>
            <div className="col-3">
                <LocalCard/>
            </div>
            </div>
        </div>
    )
}

export default ListLocales

