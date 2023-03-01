import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import imagen from "../../img/banner.jpg";


const Banner = (props) => {
  const { store, actions } = useContext(Context);

  return (
    <>
    {(store.usertype != "customer") &&  
        <div className="row mb-5 pb-md-4 align-items-center">
          <div className="col-md-5">
            <div className="card" id="banner">
            <h5 className="ms-3 mt-3">La guía definitiva para los más pequeños</h5>
            <p className="ms-3 me-3">La verdadera diversión empieza cuando lo disfrutas con los más pequeños{" "}</p>
                <Link to="/signupManager" className="btn btn-primary ms-3" id="buttonbanner">
                    Leer más
                </Link> 
            </div>
  
          </div>
          <div className="col-md-7 ps-md-5">
            <img  src={imagen}
                  className="imagenbanner"
                  alt=""
            />
          </div>
        </div>
    }
    </>

  );
};

export default  Banner;
