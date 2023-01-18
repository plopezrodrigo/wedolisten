import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import imagen from "../../img/user.png";


const UserInfo = (props) => {
  const { store, actions } = useContext(Context);
  console.log(store.favorites);

  return (
    <div class="row mb-5 pb-md-4 align-items-center">

      <div class="col-6">
      <img
              src={imagen}
              className="card-img-top"
              alt=""
              width="500"
              height="500"
      />
      </div>
      <div class="col-6">
        <h2 class="display-5 fw-normal">Tu opinión es muy importante</h2>
        <p class="lead fw-normal">
          Permite que otros usuarios conozcan tu opinión en la visita a nuestros
          locales y podamos mejorar su experiencia.{" "}
        </p>

        <button href="#" class="btn btn-lg btn-outline-primary mb-3" id="button">
          Registro
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
