import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Data = () => {
  const { store, actions } = useContext(Context);
  return (
    <>
      <div className="myDetails">
        <div className="headerSection">
          <div className="container text-center">
            <div className="row">
              <h4 className="mt-0 mb-3">Datos personales</h4>
              <span className="mt-0 mb-5">Consulta o edita los datos de tu cuenta</span>  
            </div>
          </div>

          </div>
          <div className="vh-100 gradient-custom">
            <div className="container text-center">
              <div className="row d-flex justify-content-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div className="card" id="card">
                    <a href="/account"><i className="fas fa-chevron-square-left" id="iconbutton"></i></a>
                    <h6 className="mt-3">Datos personales</h6>
                  <form className="requires-validation" noValidate>
                    <div className="d-flex justify-content-center ms-3 me-3">
                      <input  className="form-control p-2"
                              type="text"
                              name="name"
                              placeholder="Nombre y Apellidos"
                              required
                              defaultValue={store.usuario?.name}
                      />
                      <div className="valid-feedback">Campo nombre y apellidos es válido.</div>
                      <div className="invalid-feedback">Campo nombre y apellidos no puede estar en blanco.</div>
                    </div>
                    <div className="d-flex justify-content-center ms-3 me-3 mt-2">
                      <input  className="form-control p-2"
                              type="email"
                              name="email"
                              placeholder="Correo electónico"
                              required
                              defaultValue={store.user?.email}
                      />
                      <div className="valid-feedback">Campo Email es válido.</div>
                      <div className="invalid-feedback">Campo Email no puede estar en blanco.</div>
                    </div>
                    <div className="d-flex justify-content-center ms-3 me-3 mt-2">
                      <input  className="form-control p-2"
                              type="telefono"
                              name="Teléfono"
                              placeholder="Teléfono"
                              required
                              defaultValue={store.user?.telefono}
                      />
                      <div className="valid-feedback">Campo Teléfono es válido</div>
                      <div className="invalid-feedback">Campo Teléfono no puede estar en blanco</div>
                    </div>
                    <div className="d-flex justify-content-center ms-3 me-3 mt-2">
                      <input
                        className="form-control"
                        type="text"
                        name="Contraseña"
                        placeholder="Contraseña"
                        required
                        defaultValue={store.usuario?.password}
                      />
                      <div className="valid-feedback">
                        Campo Contraseña es válido
                      </div>
                      <div className="invalid-feedback">
                        Campo Contraseña no puede estar en blanco
                      </div>
                    </div>
                    <div className="form-check d-flex justify-content-start ms-3 mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="invalidCheck"
                        required
                      />
                      <label className="form-check-label">
                        Confirmo que he leido y acepto la Política de Privacidad y
                        Aviso Legal.
                      </label>
                      <div className="invalid-feedback">
                        Por favor, confirma que has leido y aceptas la Política de
                        Privacidad y Aviso Legal.
                      </div>
                    </div>
                    <div className="py-3 px-0 mx-0 d-flex justify-content-around">
                      <button id="button" type="submit" className="mb-3 col-md-10 btn-lg px-5 mb-3 mt-3">
                        Guardar cambios
                      </button>
                    </div>
                  </form>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};
