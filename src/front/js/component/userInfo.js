import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import imagen from "../../img/user.png";


const UserInfo = (props) => {
  const { store, actions } = useContext(Context);
  console.log(store.favorites);

  return (
    <div className="row mb-5 pb-md-4 align-items-center">

      <div className="col-6">
      <img
              src={imagen}
              className="card-img-top"
              alt=""
              width="500"
              height="500"
      />
      </div>
      <div className="col-6">
        <h2 className="display-5 fw-normal">Tu opinión es muy importante</h2>
        <p className="lead fw-normal">
          Permite que otros usuarios conozcan tu opinión en la visita a nuestros
          locales y podamos mejorar su experiencia.{" "}
        </p>

        <button href="#" className="btn btn-lg btn-outline-primary mb-3" id="button">
          Registro
        </button>
        <Link to="/signupUser" className="btn btn-lg btn-outline-primary mb-3" id="registro">
          Registro User
        </Link>        
      </div>
    </div>
  );
};

export default UserInfo;
