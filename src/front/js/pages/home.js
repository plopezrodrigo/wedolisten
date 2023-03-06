import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import UserInfo from "../component/userInfo";
import ManagerInfo from "../component/managerInfo";
import OpinionCard from "../component/opinionCard";
import LocalCard from "../component/localCard";
import Buscador from "../component/buscador";

export const Home = () => {
  const [comentarios, setComentarios] = useState();
  const [locales, setLocales] = useState();
  const { store, actions } = useContext(Context);

  const useEffectComentarios = async () => {
      const resp = await fetch( process.env.BACKEND_URL + "/api/comment",{
          method: 'GET',
          headers: {"Content-Type": "application/json",
                    "Authorization": 'Bearer '+ sessionStorage.getItem("token") // hará falta?
          } 
        })
      if (resp.ok) return setComentarios(await resp.json());
      else         return setMensaje(await resp.json());  
  } 

  const useEffectLocales = async () => {
    await fetch(process.env.BACKEND_URL + "/api/comercial-place-home")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setLocales(response);
      });
  }

  useEffect (()=> {
      useEffectComentarios(); 
      useEffectLocales();
  }, [])

  return (
    <div className="container">
      <div><Buscador /></div>
      <div><UserInfo /></div>
      <div><ManagerInfo /></div>
      <h1 className="text-center mb-5" id="tituloHome">Lee lo que otros están opinando...</h1>
      <div key="DIVComentarios" className="container fluid">
        <div className="row align-items-start"> 
            {comentarios && comentarios.map((comentario, index)=>{    
              return  <div key={`Co${index}`} className="col"> 
                        <OpinionCard  comment ={comentario.comment}
                                      puntuacion={comentario.puntuacion}
                                      fecha={comentario.date}
                                      local_id={comentario.comercial_place_id}
                                      id_comment={comentario.id}
                                      nombre={comentario.user_name}
                        />
                      </div> 
             })
            }          
        </div>
      </div>
      <div className="mt-0">
      <h3 className="text-left mt-4" id="tituloHome">Los locales más populares</h3>
      <p id="subtituloHome">Recomendación según tu actividad</p>
      <div className="container fluid">
        <div className="row align-items-start">
          {locales && locales.map((local, index) => {
              return  <div key={`A${index}`} className="col-3">
                        <LocalCard  //id="localcard"
                                    name={local.name}
                                    key={local.id}
                                    id={local.id}
                                    index={index}
                                    address={local.address}
                                    description={local.description}
                                    email={local.email}
                                    telf={local.telf}
                                    location={local.location}
                                    url={local.url}
                                    image_url={local.image_url}
                        />
                      </div>
            })}
        </div>
      </div>
      </div>
      <div className="mt-0">
      <h3 className="text-left mt-0" id="tituloHome">Adónde ir, ahora mismo</h3>
      <p id="subtituloHome">Reserva en estos locales para conocer Madrid en profundidad.</p>
      <div className="container fluid">
        <div className="row align-items-start">
          {locales && locales.map((local, index) => {
              return  <div key={`B${index}`} className="col-3">
                        <LocalCard  //id="localcard"
                                    name={local.name}
                                    key={local.id}
                                    id={local.id}
                                    index={index}
                                    address={local.address}
                                    description={local.description}
                                    email={local.email}
                                    telf={local.telf}
                                    location={local.location}
                                    url={local.url}
                                    image_url={local.image_url}
                        />
                      </div>
            })}
        </div>
      </div>
      </div>
      <div >
        <h3 className="text-left mt-0" id="tituloHome">Más por descubrir</h3>
        <p id="subtituloHome">Descubre lo que tienes cerca</p>
        <div className="container fluid">
          <div className="row align-items-start">
            {locales && locales.map((local, index) => {
                return  <div key={`C${index}`} className="col-3">
                          <LocalCard  //id="localcard"
                                      name={local.name}
                                      key={local.id}
                                      id={local.id}
                                      index={index}
                                      address={local.address}
                                      description={local.description}
                                      email={local.email}
                                      telf={local.telf}
                                      location={local.location}
                                      url={local.url}
                                      image_url={local.image_url}
                          />
                        </div>
              })}
          </div>
        </div>
      </div>
      </div>
  );
};
