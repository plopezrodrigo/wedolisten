import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import imagen from "../../img/logo.png";
import { useNavigate } from "react-router-dom";

export const OpinionUser = () => {
	const [formData, setFormData] = useState({tipo:"manager", user_id:1, comercial_place_id:1, comment_id: null});
	const [mensaje, setMensaje] = useState(null);
	const navigate = useNavigate();
  
	const handleChange = (evento) =>{
		setFormData({...formData, [evento.target.name]: evento.target.value});
	}

	const handleSubmit = (evento)=>{
		evento.preventDefault(); // para evitar la recarga ya que cancela el evento
		console.log("Opinion User", formData);

		fetch(process.env.BACKEND_URL + "/api/Comment", 
			{method: 'POST',
			headers:{"Content-Type": "application/json"},
			body: JSON.stringify(formData),
			})
		.then(response => {
			if (response.status == 200){ 
				navigate("/")
			}else{ 
				setMensaje(response["msg"])
			}
			return response.json(); 
		})
	}

	useEffect(()=>{
		/*
		if (store.token && store.token != "" && store.token != undefined){
		  navigate("/");
		}
		*/
	  },[]);

	return (
		<div className="container fluid align-center">
		  <div className="form-body">
			<div className="row">
			    <h1 className="text-center">Escriba una opinión y ayúdanos a mejorar</h1>
			    <h5 className="text-center">Historias como la suya ayudan a mejorar. Comparte tu experiencia y ayudanos</h5>
            </div>
			<div className="row">
                <div className="row justify-content-center">
                    <div className="col-4 py-3 px-0 mx-0">
                        <img src={imagen} className="alinear-derecha" alt="" />
                    </div>
                    <div className="col-4 py-5 px-0 mx-0">
                        <p className="my-0"><strong>Nombre de mi local</strong></p>
                        <p className="my-0">dirección</p>
                        <p className="my-0">Código postal - Localidad - Provincia</p>
                    </div>
                </div>
                <div className="row">
                    <h1 className="text-center">Tu experiencia es muy valiosa para nosotros.</h1>
                    <h1 className="text-center">¡Muchas gracias!</h1>
                </div>
				<div className="col-md-12">
					<form onSubmit={handleSubmit}>
                        <div className="form-group">
							<h5>Puntuación</h5>
							<input type="radio" name="puntuacion" className="form-check-input" id="InputPuntua1" aria-describedby="nameHelp" value="1" onChange={handleChange} />
							<input type="radio" name="puntuacion" className="form-check-input" id="InputPuntua2" aria-describedby="nameHelp" value="2" onChange={handleChange} />
							<input type="radio" name="puntuacion" className="form-check-input" id="InputPuntua3" aria-describedby="nameHelp" value="3" onChange={handleChange} />
							<input type="radio" name="puntuacion" className="form-check-input" id="InputPuntua4" aria-describedby="nameHelp" value="4" onChange={handleChange} />
							<input type="radio" name="puntuacion" className="form-check-input" id="InputPuntua5" aria-describedby="nameHelp" value="5" onChange={handleChange} />
						</div>	   
                        <br/>
						<div className="form-group">
							<h5>Tu opinión</h5>
							<textarea name="comment" required rows="3" cols="100" onChange={handleChange} ></textarea>
						</div>
                        <br/>
						<div className="form-group">
    						<div>
							    <h5 className="d-inline">Nos puedes contar algo mas</h5>
                                <p className="d-inline">(opcional)</p>
                            </div>
							<select name="price" id="InputPrice1" className="form-control" aria-describedby="PriceHelp" onChange={handleChange} >
								<option value="">--Elige una opción--</option>
								<option value="Barato">Barato</option>
								<option value="Normal">Normal</option>
								<option value="Caro">Caro</option>
							</select>
							<select name="a_domicilio" id="InputA_domicilio1" className="form-control" aria-describedby="A_domicilioHelp" onChange={handleChange} >
								<option value="">--Elige una opción--</option>
								<option value="Si">Si</option>
								<option value="No">No</option>
							</select>
							<select name="mesa" id="InputMesa1" className="form-control" aria-describedby="MesaHelp" onChange={handleChange} >
								<option value="">--Elige una opción--</option>
								<option value="Si">Si</option>
								<option value="No">No</option>
							</select>
							<select name="alcohol" id="InputAlcohol1" className="form-control" aria-describedby="AlcoholHelp" onChange={handleChange} >
								<option value="">--Elige una opción--</option>
								<option value="Si">Si</option>
								<option value="No">No</option>
							</select>
						</div>
                        <br/>
                        <div className="form-group">
                            <h5>¿Que tipo de visita hiciste?</h5>
                            <input type="radio" name="tipo_visita" className="form-check-input" id="InputTVisit1" aria-describedby="nameHelp" value="Pareja" onChange={handleChange} />
                            <label htmlFor="InputTVisit1">Pareja</label><br/>
                            <input type="radio" name="tipo_visita" className="form-check-input" id="InputTVisit2" aria-describedby="nameHelp" value="Familia" onChange={handleChange} />
                            <label htmlFor="InputTVisit2">Familia</label><br/>
                            <input type="radio" name="tipo_visita" className="form-check-input" id="InputTVisit3" aria-describedby="nameHelp" value="Solo" onChange={handleChange} />
                            <label htmlFor="InputTVisit3">Solo</label><br/>
                            <input type="radio" name="tipo_visita" className="form-check-input" id="InputTVisit4" aria-describedby="nameHelp" value="Amigos" onChange={handleChange} />
                            <label htmlFor="InputTVisit4">Amigos</label><br/>
                            <input type="radio" name="tipo_visita" className="form-check-input" id="InputTVisit5" aria-describedby="nameHelp" value="Negocios" onChange={handleChange} />
                            <label htmlFor="InputTVisit5">Negocios</label><br/>
                        </div>
						<br/>
						<button type="submit"  id="button">Comentar</button>
						{(mensaje != null) && <p>{mensaje}</p>}
					</form>				  
				</div>
			</div>
		  </div>
		</div>
	  );
};