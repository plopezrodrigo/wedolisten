import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import imagen from "../../img/user.png";
import {tokenValid} from "../utils"


const UserInfo = (props) => {
  const { store, actions } = useContext(Context);

  return (
    <>
    {(store.usertype != "manager") &&  
    <div className="row mb-5 pb-md-4 align-items-center">

      <div className="col-6">
      <img  src={imagen}
            className="card-img-top"
            alt=""
            width="500"
            height="500"
      />
      </div>
      <div className="col-6">
        <h2 className="display-5 fw-normal">Tu opinión es muy importante</h2>
        <p className="lead fw-normal">Permite que otros usuarios conozcan tu opinión en la visita a nuestros locales y podamos mejorar su experiencia.{" "}</p>
        {!(sessionStorage.getItem("token")) ?
          <Link to="/signupUser" className="btn btn-lg btn-outline-primary mb-3" id="button">
            Registro
          </Link> :
          <Link to="/listlocales" className="btn btn-lg btn-outline-primary mb-3" id="button">
          Escribe tu opinión
        </Link>        
        }
      </div>
    </div>
  }
 </> 
  );
};

export default UserInfo;
