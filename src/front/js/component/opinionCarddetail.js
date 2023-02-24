import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import imagen from "../../img/opinion.png";

const OpinionCarddetail = (props) => {
  const { store, actions } = useContext(Context);
  const [respuesta, setRespuesta] = useState();
  const [tieneRespuesta, setTieneRespuesta] = useState(false);
  
  async function miUseEffect (){
		await fetch(`${process.env.BACKEND_URL}/api/respuesta/${props.id_comment}`)
		.then(response => {
        if (response.status == 200)       setTieneRespuesta(true);
        else if (response.status == 201)  setTieneRespuesta(false);
              else console.log("Error gordo, a ver que hacemos", response.status);

        return response.json()
		})
    .then(response => { setRespuesta(response.comment); })
  }

  useEffect (()=> {
    miUseEffect();
	}, [])


  const paraManager = () => {
    if (store.usertype == "manager"){
        if (tieneRespuesta){
              return  (<div className="text ma-home-section">  
                          <p><strong>BabyFriendly: </strong>{respuesta}</p> 
                      </div>
                      )
        }else{ 
              return  (<div className="text ma-home-section">  
                          <Link to={`/OpinionManager/${props.local_id}/${props.id_comment}`}>
                            <i className="fas fa-star" id="iconaccount" />
                            <strong className="strong">Responde</strong>
                          </Link>
                      </div>
                      )
        }
    }
  };

  return (
    <div>
      <div className="card" id="opinioncarddetail">
        <div className="row">
        <div className="col-2">
          <div className="card-img-top" id="imagenopinion">
              <img src={imagen} className="card-img-top mt-5 ms-5" alt=""/>
          </div>
        </div>
        <div className="col-10">
        <div className="card-body text-left">
          <h6 className="card-title">{props.nombre}</h6>
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
            <p id="textofecha">Fecha de la visita: {props.fecha}</p> 
          </div>

          {paraManager()}
          
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default OpinionCarddetail;