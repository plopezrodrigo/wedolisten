import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import imagen from "../../img/account.png";

export const Politicaprivacidad = () => {

  return (
        <div className="container">
          <h6 className="">
          POLITICA DE PRIVACIDAD
          </h6>
          <p id="textoslegales">Baby Friendly (en adelante, Baby Friendly) tiene el firme compromiso de cumplir con la legislación vigente en materia de protección de datos personales para garantizar la privacidad, el secreto y la seguridad de los datos personales delos Usuarios aplicando medidas técnicas y organizativas apropiadas al efecto.</p>
          <p id="textoslegales">La presente Política de Privacidad tiene por objeto informar a los Usuarios sobre el uso que Baby Friendly hace de los datos personales que el Usuario facilite al acceder, navegar y solicitar los servicios y productos de la web www.babyfriendly.es al registrarse como usuario de Baby Friendy Los datos personales sólo serán obtenidos por Baby Friendly para su tratamiento, cuando sean adecuados, pertinentes y no excesivos en relación con el ámbito y las finalidades determinadas, explícitas y legítimas para las que se hayan obtenido.</p>
          <p id="textoslegales">A continuación, cumplimiento con la normativa vigente en materia de protección de datos personales proporcionamos a los Usuarios la siguiente información:</p>
          <h6 className="">
          RESPONSABLEDEL TRATAMIENTO
          </h6>
          <p id="textoslegales">Baby Friendly THERMOESPAÑA S.L con CIF nºB-82900721, con domicilio social en Camí de Can Ametller nº 16, Edificio 1,Planta 2, C.P 08195 Sant Cugat del Vallès (Barcelona), debidamente inscrita en el Registro Mercantil de Barcelona, Tomo 46334, Folio 200, Hoja B-341031, con teléfono 910 602 442 y con correo electrónico info@babyfriednly.es  es la titular de la página Web www.babyfriendly.es (en adelante, Sitio Web).</p>
          <h6 className="">
          USUARIOS DEL SITIO WEB
          </h6>
          <p id="textoslegales">El acceso al Sitio Web tiene carácter libre y gratuito, no siendo necesario el previo registro de los Usuarios. No obstante, para acceder a la condición de socio de Baby Friendly se requerirá el previo registro -hazte socio- de los profesionales que estén interesados en beneficiarse de las ventajas y los servicios que se ofrecen en el Sitio Web. La solicitud, registro y alta de socio en Baby Friendly es gratuita.</p>
          <p id="textoslegales">Los pasosa seguir para registrarse como socio son:</p>
          <ul id="textoslegales">
            <li>Completar el formulario “Hazte Socio” del Sitio Web con los datos que se solicitan.</li>
            <li>A continuación, un agente comercial de Baby Friendly contactará con el solicitante para concertar una visita personal para informarle y darle de alta -formulario de inscripción- como socio de Myteam.</li>
            <li>A continuación, se recibirá un mail con la clave de Usuario que deberá ser introducida en www.myteam.es para entrar en el área reservada del socio y empezar a disfrutar de las ventajas y servicios de Myteam.</li>
          </ul>
          <h6 className="">
          FINALIDAD DEL TRATAMIENTO.
          </h6>
          <ul id="textoslegales">
            <li>Completar el formulario “Hazte Socio” del Sitio Web con los datos que se solicitan.</li>
            <li>A continuación, un agente comercial de Baby Friendly contactará con el solicitante para concertar una visita personal para informarle y darle de alta -formulario de inscripción- como socio de Myteam.</li>
            <li>A continuación, se recibirá un mail con la clave de Usuario que deberá ser introducida en www.myteam.es para entrar en el área reservada del socio y empezar a disfrutar de las ventajas y servicios de Myteam.</li>
          </ul>
          <h6 className="">
          EXONERACIÓN DE RESPONSABILIDAD.
          </h6>
          <p id="textoslegales">Baby Friendly realiza los máximos esfuerzos para que el uso del Sitio Web se realice en las mejores condiciones y para facilitar una información actualizada, no obstante, Baby Friendly no garantiza la inexistencia de errores u omisiones en el contenido del Sitio Web ni garantiza que el acceso al Sitio Web sea ininterrumpido, estando facultado para suspender temporalmente y sin previo aviso la accesibilidad al Sitio Web.</p>
          <p id="textoslegales">Baby Friendly no se responsabiliza de los daños y perjuicios de cualquier naturaleza que pudieran derivarse de:</p>
          <ul id="textoslegales">
            <li>La falta de disponibilidad, actualidad, mantenimiento y efectivo funcionamiento del Sitio Web y/o de sus servicios o contenidos</li>
            <li>El incumplimiento de las expectativas de los Usuarios en relación con el Sitio Web o en el servidor que lo suministra.</li>
            <li>La invulnerabilidad del Sitio Web y/o la invulnerabilidad de las medidas de seguridad que se adopten en el mismo.</li>
            <li>Los errores u omisiones que pudiera tener el contenido del Sitio Web o de los links o enlaces.</li>
            <li>La existencia de virus o programas lesivos en los contenidos que puedan producir alteraciones en el sistema informático, en los documentos electrónicos o en los ficheros almacenados de los Usuarios</li>
            <li>Averías telefónicas o de redes motivados por causas ajenas al titular del Sitio Web.</li>
            <li>Retrasos o bloqueos en el funcionamiento operativo del sistema causado por deficiencias o sobrecarga en las líneas telefónicas o en Internet.</li>
            <li>Intromisiones ilegítimas fuera de control del titular del Sitio Web.</li>
          </ul>
          <h6 className="">
          ENLACES O LINKS DE DOMINIOS DE BAY FRIENDLY
          </h6>
          <p id="textoslegales">Este Sitio Web puede contener links o enlaces a otros Sitios Web de titularidad de Baby Friendly que tienen una finalidad meramente informativa sobre actividades, servicios o productos específicos de Baby Friendly. Dichos Sitios Web disponen de sus propias Condiciones de Uso, Políticas de Privacidad y Tratamiento de Cookies que el Usuario deberá aceptar para el uso y utilización de las funcionalidades habilitadas en dichos dominios.</p>
          <h6 className="">
          REDES SOCIALES
          </h6>
          <p id="textoslegales">Este Sitio Web puede poner a disposición de los Usuarios enlaces que permiten acceder a los canales y Sitios Web que Baby Friendly mantiene en diferentes plataformas y redes sociales pertenecientes y/o gestionadas por terceros (p.ej. Facebook, Twitter, Google, YouTube). Estos enlaces en el Sitio Web tienen por único objeto facilitar a los Usuarios el acceso a dichos canales en las diferentes plataformas y redes sociales para informales de las actividades y novedades de los productos y servicios de Baby Friendly.</p>
          <p id="textoslegales">Baby Friendly no comparte con dichas plataformas o redes sociales ningún tipo de información personal y privada de sus Usuarios, siendo su única finalidad la indicada en las presentes Condiciones Generales de Uso, así como en la Política de Privacidad del Sitio Web. En este sentido, toda información que el Usuario proporcione a estas plataformas será bajo su propia y exclusiva responsabilidad.</p>
          <p id="textoslegales">La activación y uso de estas aplicaciones puede conllevar la identificación y autenticación del Usuario (login/contraseña) en las plataformas correspondientes, completamente externas al Sitio Web y fuera del control de Baby Friendly. Al acceder a dichas redes externas, el Usuario ingresa en un entorno no controlado por Baby Friendly, por lo que Baby Friendly no asumirá ninguna responsabilidad sobre la configuración de seguridad de dichos entornos.</p>
          <p id="textoslegales">Baby Friendly no tiene control sobre el contenido alojado en dichos canales, el Usuario reconoce y acepta que Baby Friendly no asume responsabilidad alguna por el contenido ni por los servicios a los que el Usuario pueda acceder en dichas páginas, ni por cualquier contenido, productos, servicios, publicidad, ni cualquier otro material disponible en los mismos no publicado por Baby Friendly. Por tal motivo, el Usuario debe extremar la prudencia en la valoración y utilización de la información, contenidos y servicios existentes en los canales enlazados, y sobre la información propia o de terceros que quiera compartir en dichos canales.</p>
          <h6 className="">
          PROTECCIÓN DE DATOS PERSONALES.
          </h6>
          <p id="textoslegales">Baby Friendly, como titular del Sitio Web, informa a los Usuarios que es el responsable de los tratamientos que se realicen de los datos personales solicitados y facilitados durante la utilización del Sitio Web.</p>
          <p id="textoslegales">De conformidad con lo establecido en la legislación aplicable en materia de protección de datos, Baby Friendly respeta la privacidad de los Usuarios y el secreto y seguridad de los datos personales, adoptando para ello las medidas técnicas y organizativas necesarias para evitar la pérdida, mal uso, alteración, acceso no autorizado y robo de los datos personales facilitados, habida cuenta el estado de la tecnología, la naturaleza de los datos y los riesgos a los que están expuestos.</p>
          <p id="textoslegales">Los datos personales de los Usuarios del Sitio Web, solo se obtendrán para ser tratados cuando sean adecuados, pertinentes y no excesivos en relación con el ámbito y las finalidades determinadas, explícitas, consentidas y/o legítimas para las que se hayan recabado. Cuando se recaben datos personales a través del Sitio Web, se informará previamente al Usuario de forma clara e inequívoca delas circunstancias relativas al tratamiento de sus datos.</p>
          <h6 className="">
          LEGISLACIÓN APLICABLE Y JURISDICCIÓN.
          </h6>
          <p id="textoslegales">Las condiciones generales del presente Aviso Legal se rigen por la ley española. En caso de conflicto sobre la interpretación, cumplimiento o aplicación del mismo, los Usuarios podrán plantear su reclamación judicial ante los tribunales competentes que correspondan a su domicilio.</p>
        </div>
  );
};
