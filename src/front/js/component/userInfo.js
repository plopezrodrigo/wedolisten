import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import imagen from "../../img/user2.png";
import {tokenValid} from "../utils"


const UserInfo = (props) => {
  const { store, actions } = useContext(Context);

  return (
    <div className="containe-fluid">
    {(store.usertype != "manager") &&  
    <div className="row mb-5 pb-md-4 align-items-center">

      <div className="col-6">
      <img  src={imagen}
            className="card-img-top2"
            alt=""
      />
      </div>
      <div className="col-6">
        <h2 className="display-5 fw-normal">Tu opinión es muy importante</h2>
        <p className="lead fw-normal">Permite que otros usuarios conozcan tu opinión en la visita a nuestros locales y podamos mejorar su experiencia.{" "}</p>
        {!(sessionStorage.getItem("token")) ?
          <Link to="/signupUser" className="btn btn-primary mb-3" id="button">
            Registro
          </Link> :
          <Link to="/listlocales" className="btn btn-primary mb-3" id="button">
          Escribe tu opinión
        </Link>        
        }
      </div>
    </div>
  }
 </div> 
  );
};

export default UserInfo;
