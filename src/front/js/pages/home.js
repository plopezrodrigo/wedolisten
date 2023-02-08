import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import UserInfo from "../component/userInfo";
import ManagerInfo from "../component/managerInfo";
import OpinionCard from "../component/opinionCard";
import LocalCard from "../component/localCard";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [comentarios, setComentarios] = useState();
  const [locales, setLocales] = useState();

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
    await fetch(process.env.BACKEND_URL + "/api/comercial-place")
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
      <UserInfo />
      <ManagerInfo />
      <h1 className="text-center" id="tituloHome">Lee lo que otros están opinando...</h1>
      <div className="container fluid">
        <div className="row align-items-start"> 
            {comentarios && comentarios.map((comentario, index)=>{    
              return  <> 
                <div className="col"> 
                  <OpinionCard 
                  comment ={comentario.comment}
                  puntuacion={comentario.puntuacion}
                  fecha={comentario.date}
                  local_id={comentario.comercial_place_id}
                  id_comment={comentario.id}
                  nombre={comentario.user_name}

                  />
                 </div> 
              </>
             })
            }          
        </div>
      </div> 
      <h1 className="text-center" id="tituloHome">Igual te interesan estos locales...</h1>
      <div className="container fluid">
        <div className="row align-items-start">
          {locales && locales.map((local, index) => {
              return  <div key={local.id} className="col-4">
                        <LocalCard
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
  );
};
