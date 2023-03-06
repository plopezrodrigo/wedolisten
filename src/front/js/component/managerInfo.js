import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import imagen from "../../img/manager2.png";


const ManagerInfo = (props) => {
  const { store, actions } = useContext(Context);

  return (
    <>
    {(store.usertype != "customer") &&  
        <div className="row mb-5 pb-md-4 align-items-center">
          <div className="col-md-5">
            <h2 className="display-5 fw-normal ms-2">Publicita tu local y recibe más clientes</h2>
            <p className="lead fw-normal ms-2">Añade tu local a nuetra red para aumentar tus visitas y que vean lo bien que funciona!!{" "}</p>
            {!(sessionStorage.getItem("token")) ?
                <Link to="/signupManager" className="btn btn-primary mb-3" id="button">
                    Registro
                </Link> 
              :
                <Link to="/misLocales" className="btn btn-primary mb-3" id="button">
                    Mis locales
                </Link>        
            }
          </div>
          <div className="col-md-7 ps-md-5">
            <img  src={imagen}
                  className="card-img-top"
                  alt=""
            />
          </div>
        </div>
    }
    </>

  );
};

export default  ManagerInfo;
