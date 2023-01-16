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
    <div className="container fluid align-center">
      <div className="form-body">
        <div className="row">
          <h1>Hola de nuevo!</h1>
          <h5>Bienvenido de nuevo a tu app.</h5>
          {store.token && store.token != "" && store.token != undefined ? (
            "You are logged in with this token" + store.token
          ) : (
            <div className="col-md-12">
              <input
                type="text"
                placeholder="email"
                name= "email"
                onChange={handleChange}
              />

              <input
                type="password"
                placeholder="password"
                name= "password"
                onChange={handleChange}
              />
              <button onClick={handleClick} id="button">
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login
