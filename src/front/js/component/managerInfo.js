import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import imagen from "../../img/manager.png";


const ManagerInfo = (props) => {
  const { store, actions } = useContext(Context);
  console.log(store.favorites);

  return (
    <>
      <div className="row mb-5 pb-md-4 align-items-center">
        <div className="col-md-5">
          <h2 className="display-5 fw-normal">Publicita tu local y recibe más clientes</h2>
          <p className="lead fw-normal">
          Añade tu local a nuetra red para aumentar tus visitas y que vean lo bien que funciona!!{" "}
          </p>
          {!(sessionStorage.getItem("token")) ?
          <Link to="/signupUser" className="btn btn-lg btn-outline-primary mb-3" id="button">
            Registro
          </Link> :
          <Link to="/misLocales" className="btn btn-lg btn-outline-primary mb-3" id="button">
          Mis locales
        </Link>        
        }
        </div>
        <div className="col-md-7 ps-md-5">
          <img
                  src={imagen}
                  className="card-img-top"
                  alt=""
                  width="300"
                  height="500"
          />
        </div>
      </div>
    </>
  );
};

export default  ManagerInfo;
