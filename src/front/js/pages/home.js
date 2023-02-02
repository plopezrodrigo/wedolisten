import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import UserInfo from "../component/userInfo";
import ManagerInfo from "../component/managerInfo";
import OpinionCard from "../component/opinionCard";
import LocalCard from "../component/localCard";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      <UserInfo />
      <ManagerInfo />
      <h1 className="text-center" id="tituloHome">Lee lo que otros están opinando...</h1>
      <div className="container fluid">
        <div className="row align-items-start">
          <div className="col mb-3">
            <div>

              <OpinionCard />
            </div>
          </div>
          <div className="col mb-3">
            <div>
              <OpinionCard />
            </div>
          </div>
          <div className="col mb-3">
            <div>

              <OpinionCard />
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-center" id="tituloHome">Igual te interesan estos locales...</h1>
      <div className="container fluid">
        <div className="row align-items-start">
          <div className="col mb-4">
            <div>
              <LocalCard />
            </div>
          </div>
          <div className="col mb-4">
            <div>

              <LocalCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
