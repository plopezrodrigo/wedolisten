import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

const Login = () => {
  const { store, actions } = useContext(Context);
  const [data, setData] = useState({});
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  console.log("This is your token", store.token);
  const handleClick = () => {
    actions.login(data.email, data.password);
  };

  useEffect(()=>{
    if (store.token && store.token != "" && store.token != undefined){
      navigate.push("/");
    }
  },[])

  const handleChange = (e) => {
    setData({...data, [e.target.name]:e.target.value})
  };
    
  return (
    <div className="vh-100 gradient-custom">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card">
            <div class="card-body text-center">
              <h1>Hola de nuevo!</h1>
              <h5>Bienvenido de nuevo a tu app.</h5>
            </div>
            <div className="form-outline">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  {store.token && store.token != "" && store.token != undefined ? (
                    "You are logged in with this token" + store.token
                  ) : (
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                      <label class="form-label" for="typeEmailX">Email</label>
                      <input
                        type="text"
                        id="typeEmailX-2"
                        class="form-control mb-2"
                        name= "email"
                        onChange={handleChange}
                      />
                      <label class="form-label" for="typeEmailX">Contraseña</label>
                      <input
                        type="password"
                        id="typePasswordX-2"
                        name= "password"
                        class="form-control mb-2"
                        onChange={handleChange}
                      />
                      <p class="small mt-2">
                        <a href="#!">¿Has olvidado tu contraseña?</a>
                      </p>
                      <button 
                        className="btn-lg px-5 mb-3 mt-3"
                        onClick={handleClick} id="button">
                        Login
                      </button>
                    </div>
                  )}
                  <div>
                  <p class="ms-3 me-3 mb-3 text-center">¿No tienes una cuenta? 
                    <a href="#!" class="fw-bold">Registrate</a>
                  </p>
                </div>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login
