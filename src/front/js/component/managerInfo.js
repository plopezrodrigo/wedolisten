import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import imagen from "../../img/manager.png";


const ManagerInfo = (props) => {
  const { store, actions } = useContext(Context);
  console.log(store.favorites);

  return (
    <div class="row mb-5 pb-md-4 align-items-center">
      <div class="col-md-5">
        <h2 class="display-5 fw-normal">Publicita tu local y recibe más clientes</h2>
        <p class="lead fw-normal">
        Añade tu local a nuetra red para aumentar tus visitas y que vean lo bien que funciona!!{" "}
        </p>
        <button href="#" class="btn btn-lg btn-outline-primary mb-3" id="button">
          <Link to="/login">
            Registro
          </Link>
        </button>
      </div>
      <div class="col-md-7 ps-md-5">
      <img
              src={imagen}
              className="card-img-top"
              alt=""
              width="300"
              height="500"
      />
      </div>
    </div>
  );
};

export default  ManagerInfo;
