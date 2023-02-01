import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import imagen from "../../img/opinion.png";

const OpinionComments = (props) => {
  const { store, actions } = useContext(Context);
  console.log(store.favorites);

  return (
    <div className="row">
      <div className="col-2">
            <img id="avatar"
              src={imagen}
              className="card-img-top"
              alt="80"
              width="20"
              height="80"
            />
            <p>nombre_usuario</p>
      </div>
      <div className="row">
        <div className="col-12">
          <i className="fas fa-circle"></i>
          <i className="fas fa-circle"></i>
          <i className="fas fa-circle"></i>
          <i className="fas fa-circle"></i>
          <i className="far fa-circle"></i>
          <p>Opinion escrita ayer</p>
        </div>
      </div>
      <div className="col-10">
          <h5>De 10</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehend...</p>
      </div>
      <div className="col-10">
          <p><strong>Fecha de la visita:</strong> diciembre de 2022</p>
      </div>
      </div>
  );
};

export default OpinionComments;