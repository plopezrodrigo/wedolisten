import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import imagen from "../../img/opinion.png";

const OpinionCard = (props) => {
  const { store, actions } = useContext(Context);
  const {respuesta, setRespuesta} = useState();
  

  useEffect (()=> {
		fetch(`${process.env.BACKEND_URL}/api/respuesta/${props.id_comment}`)
		.then(response => {
        if (response.status == 200) return response.json()
        else if (response.status != 400) console.log("Error gordo, a ver que hacemos")
		})
    .then(response => {setRespuesta(response);})
	}, [])

  const mensajeManager = () => {
    return (<div className="text ma-home-section">  
              <p className="strong">{respuesta}</p>
            </div>
           )
  };

  const botonRespuesta = () => {
      return (<div className="text ma-home-section">  
                <Link to={`/OpinionManager/${props.local_id}/${props.id_comment}`}>
                  <i className="fas fa-star" id="iconaccount" />
                  <strong className="strong">Responde</strong>
                </Link>
              </div>
             )
  };

  return (
    <div className="col-12">
      <div className="card" id="opinioncard">
        <div className="card-img-top" id="imagenopinion">
            <img 
              src={imagen}
              className="card-img-top"
              alt=""
            />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{props.nombre}</h5>
          <button id="opinionbutton">
            {/*Array.from(Array(props.puntuacion).keys()).map(()=>{return (<i className="fas fa-star" id="iconbutton"/>)})}
            {props.puntuacion <5 ? Array.from(Array(5-props.puntuacion).keys()).map(()=>{return (<i className="far fa-star" id="iconbutton"/>)}):""*/}
            {Array.from(Array(5).keys()).map((e,i)=>{return props.puntuacion <= i ? (<i className="far fa-star" key={i} id="iconbutton"/>)
                                                                                  : (<i className="fas fa-star" key={i} id="iconbutton"/>)
                                            })
            }
          </button>
          <p className="card-text"> 
            {props.comment}
          </p>
          <div className="col-12">
            <p><strong>Fecha de la visita: </strong>{props.fecha}</p> 
          </div>
          {respuesta ? mensajeManager() : botonRespuesta()}
        </div>
      </div>
    </div>
  );
};

export default OpinionCard;

{/*
{store.usertype == "manager" &&
    <div className="text ma-home-section">  
      <Link to={`/OpinionManager/${props.local_id}/${props.id_comment}`}>
        <i className="fas fa-star" id="iconaccount" />
        <strong className="strong">Responde</strong>
      </Link>
    </div>
}
*/}