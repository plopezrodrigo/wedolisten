import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import imagen from "../../img/managerlog.png";
import {tokenValid} from "../utils"


const ManagerlogInfo = (props) => {
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
        <h2 className="display-5 fw-normal">La opinión de tus clientes es muy importante</h2>
        <p className="lead fw-normal">Una vez tengas añadido tu local, podrás gestionar las opiniones sobre el mismo desde el área Mi Cuenta.{" "}</p>
        {!(sessionStorage.getItem("token")) ?
                <Link to="/signupManager" className="btn btn-primary mb-3" id="button">
                    Registro
                </Link> 
              :
                <Link to="/comentarios" className="btn btn-primary mb-3" id="button">
                    Mis Comentarios
                </Link>        
        }
      </div>
    </div>
  }
 </div> 
  );
};

export default ManagerlogInfo;
