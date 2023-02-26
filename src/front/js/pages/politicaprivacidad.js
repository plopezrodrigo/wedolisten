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
          <p id="textoslegales">El acceso al Sitio Web tiene carácter libre y gratuito, no siendo necesario el previo registro de los Usuarios. No obstante, para acceder a la condición de usuario de Baby Friendly se requerirá el previo registro -hazte usuario- de los clientes que estén interesados en beneficiarse de las ventajas y los servicios que se ofrecen en el Sitio Web. La solicitud, registro y alta de usuario en Baby Friendly es gratuita.</p>
          <p id="textoslegales">Los pasosa seguir para registrarse como usuario son:</p>
          <ul id="textoslegales">
            <li>Completar el formulario “Hazte usuario” del Sitio Web con los datos que se solicitan.</li>
            <li>A continuación, un agente comercial de Baby Friendly contactará con el solicitante para concertar una visita personal para informarle y darle de alta -formulario de inscripción- como usuario de Baby Friendly.</li>
            <li>A continuación, se recibirá un mail con la clave de Usuario que deberá ser introducida en www.babyfriendly.es para entrar en el área reservada del usuario y empezar a disfrutar de las ventajas y servicios de Baby Friendly.</li>
          </ul>
          <h6 className="">
          FINALIDAD DEL TRATAMIENTO.
          </h6>
          <ul id="textoslegales">
            <li>Gestionar las solicitudes de usuario de Baby Friendly -hazte usuario- realizadas por los clientes.</li>
            <li>Gestionar la relación comercial con los usuarios de Baby Friendly que incluye comunicaciones sobre promociones y campañas exclusivas deservicios y productos de interés para los usuarios, y el proceso de canje de puntos acumulados por regalos, premios y otras ventajas de Baby Friendly.</li>
            <li>Realizar estudios estadísticos sobre los servicios productos utilizados por los usuarios.</li>
            <li>Dar respuesta a las solicitudes de información realizadas por los Usuarios a través de las formas de contacto habilitadas en el Sitio Web.</li>
            <li>El envío de información comercial, publicidad y promoción de productos, servicios y actividades de Baby Friendly por cualquier medio incluido el electrónico (correo electrónico o medios equivalentes, como sms, teléfonos móviles, etc.)</li>
            <li>Remitir el boletín de noticias del Sitio Web.</li>
            <li>Cumplir con las obligaciones legales aplicables a Baby Friendly.</li>
          </ul>
          <h6 className="">
          CATEGORÍA DE DATOS PERSONALES.
          </h6>
          <p id="textoslegales">La categoría de datos que trata Baby Friendly en el Sitio Web son:</p>
          <ul id="textoslegales">
            <li>Datos identificativos: nombre, apellidos, número del documento de identidad, fecha de nacimiento, dirección postal, dirección de correo electrónico, código postal, teléfono.</li>
            <li>Datos de la cuenta bancaria del socio registrado para gestionar el canje de los puntos acumulados por euros mediante transferencia bancaria.</li>
            <p>Todos los datos personales que se soliciten como obligatorios, marcados con un asterisco (*) en los formularios son necesarios para que Baby Friendly gestione y tramite la solicitud haz tesocio y gestione el alta del socio en Baby Friendly. De manera que la falta de cualquiera de estos datos o la negativa a suministrarlos comportará la imposibilidad de que Baby Friendly tramite la solicitud de información o de registrarse como socio realizada por el Usuario.</p>
            <p>En todo caso, el Usuario garantiza que los datos facilitados son verdaderos, exactos, completos y actualizados, y se compromete a comunicar a Baby Friendly los cambios que se produzcan de los mismos. El Usuario es el único responsable de cualquier daño o perjuicio, directo o indirecto, que pudiera ocasionarse como consecuencia del incumplimiento de esta obligación. Baby Friendly se reserva el derecho a rechazar las solicitudes que se hayan solicitado con datos falsos o inexactos.</p>
            <p>En el caso que el Usuario facilite datos personales de terceros, manifiesta contar el consentimiento de aquellos y se compromete a trasladarles la información contenida en este punto, eximiendo a Baby Friendly de cualquier responsabilidad.</p>
          </ul>
          <h6 className="">
          BASE DE LEGITIMACIÓN
          </h6>
          <p id="textoslegales">La base de legitimación de Baby Friendly para el tratamiento de los datos personales de los Usuarios es:</p>
          <ul id="textoslegales">
            <li> El consentimiento expreso del interesado-Usuario, respecto a las solicitudes de información sobre productos y/o servicios de Baby Friendly y el envío de información publicitaria.</li>
            <li>La gestión y ejecución de la relación comercial con los socios de Baby Friendly.</li>
            <li>El interés legítimo respecto a estudios estadísticos, acciones comerciales y envío de información comercial y de promociones.</li>
            <li>El cumplimiento de obligaciones legales aplicables a Baby Friendly.</li>
            <p>En aquellos tratamientos en los que la base legítima sea el consentimiento el Usuario podrá revocar el consentimiento en cualquier momento. No obstante, el tratamiento sobre los datos personales realizado con anterioridad a la revocación del consentimiento será lícito.</p>
          </ul>
          <h6 className="">
          CONSERVACIÓNDE LOS DATOS
          </h6>
          <p id="textoslegales">Este Sitio Web puede poner a disposición de los Usuarios enlaces que permiten acceder a los canales y Sitios Web que Baby Friendly mantiene en diferentes plataformas y redes sociales pertenecientes y/o gestionadas por terceros (p.ej. Facebook, Twitter, Google, YouTube). Estos enlaces en el Sitio Web tienen por único objeto facilitar a los Usuarios el acceso a dichos canales en las diferentes plataformas y redes sociales para informales de las actividades y novedades de los productos y servicios de Baby Friendly.</p>
          <p id="textoslegales">Baby Friendly no comparte con dichas plataformas o redes sociales ningún tipo de información personal y privada de sus Usuarios, siendo su única finalidad la indicada en las presentes Condiciones Generales de Uso, así como en la Política de Privacidad del Sitio Web. En este sentido, toda información que el Usuario proporcione a estas plataformas será bajo su propia y exclusiva responsabilidad.</p>
          <p id="textoslegales">La activación y uso de estas aplicaciones puede conllevar la identificación y autenticación del Usuario (login/contraseña) en las plataformas correspondientes, completamente externas al Sitio Web y fuera del control de Baby Friendly. Al acceder a dichas redes externas, el Usuario ingresa en un entorno no controlado por Baby Friendly, por lo que Baby Friendly no asumirá ninguna responsabilidad sobre la configuración de seguridad de dichos entornos.</p>
          <p id="textoslegales">Baby Friendly no tiene control sobre el contenido alojado en dichos canales, el Usuario reconoce y acepta que Baby Friendly no asume responsabilidad alguna por el contenido ni por los servicios a los que el Usuario pueda acceder en dichas páginas, ni por cualquier contenido, productos, servicios, publicidad, ni cualquier otro material disponible en los mismos no publicado por Baby Friendly. Por tal motivo, el Usuario debe extremar la prudencia en la valoración y utilización de la información, contenidos y servicios existentes en los canales enlazados, y sobre la información propia o de terceros que quiera compartir en dichos canales.</p>
          <h6 className="">
          PROTECCIÓN DE DATOS PERSONALES.
          </h6>
          <p id="textoslegales">Los datos se conservarán durante el plazo estrictamente necesario para dar cumplimiento a la finalidad para la que fueron recabados, mientras el Usuario no revoque su consentimiento cuando éste sea la base legítima del tratamiento. No obstante, Baby Friendly podrá conservar los datos para su puesta a disposición de las autoridades competentes o para hacer frente a posibles reclamaciones, en cuyo caso los datos se conservarán bloqueados hasta la finalización de los plazos de prescripción, momento en que serán eliminados con las medidas de seguridad adecuadas.</p>
          <h6 className="">
          COMUNICACIÓNDE DATOS.
          </h6>
          <p id="textoslegales">Baby Friendly no cederá a terceros los datos facilitados por los Usuarios del Sitio Web, salvo consentimiento previo y expreso de éstos o sea necesario por imperativo legal(Administraciones públicas, Fuerzas y Cuerpos de Seguridad del Estado, Ministerio Fiscal, Agencia Española de Protección de Datos, etc).</p>
          <p id="textoslegales">Baby Friendly informa a los Usuarios que los datos personales podrán comunicarse a entidades del Grupo Baby Friendly, así como a proveedores de Baby Friendly para poder atender y gestionarlas solicitudes de información y la relación comercial con los socios de Baby Friendly, en cuyo caso, se formalizará un contrato en el que los proveedores tendrán la condición de encargados del tratamiento y deberán tratar los datos personales en nombre y por cuenta de Baby Friendly para las finalidades a atender.</p>
          <h6 className="">
          DERECHOS DE LOS USUARIOS.
          </h6>
          <p id="textoslegales">Baby Friendly informa a los Usuarios que en referencia al tratamiento de sus datos personales pueden ejercer los siguientes derechos:</p>
          <h6 className="">
          ENLACES DE DOMINIO DE BABY FRIENDLY.
          </h6>
          <p id="textoslegales">Este Sitio Web contiene un enlace al dominio de titularidad de Baby Friendly (www.babyfriednly.com)en el que se informa y ofrecen distintos productos y servicios de Baby Friendly. Dicho dominio dispone de sus propias Condiciones de Uso, Política de Privacidad y Política de Cookies que deberán ser aceptadas por el Usuario cuando acceda a dicho dominio o utilice las distintas funcionalidades de información, solicitud de productos o prestación de servicios ofertados en dicho dominio.</p>
          <h6 className="">
          REDES SOCIALES.
          </h6>
          <p id="textoslegales">Este Sitio Web puede poner a disposición de los Usuarios enlaces que permiten acceder a los canales y Sitios Web que Baby Friendly mantiene en diferentes plataformas y redes sociales pertenecientes y/o gestionadas por terceros (p.ej. Facebook, Instagram, YouTube). Estos enlaces en el Sitio Web tienen por único objeto facilitar a los Usuarios el acceso a dichos canales en las diferentes plataformas y redes sociales para informales de las actividades y novedades de los productos y servicios de Baby Friendly. Para obtener más información acceda a nuestro Aviso Legal</p>
          <h6 className="">
          COOKIES.
          </h6>
          <p id="textoslegales">Este Sitio Web utiliza cookies propias y terceros, por ello y en cumplimiento del artículo 22 de la Ley de Sociedad de la Información vigente, se solita al Usuario su consentimiento informado para el tratamiento de Cookies, informándole de la posibilidad de rechazarlas o configurar sus preferencias de tratamiento. Para una información más detallada acceda a la Política de Cookies.</p>
          <h6 className="">
          CONFIDENCIALIDAD Y SEGURIDAD DEL TRATAMIENTO.
          </h6>
          <p id="textoslegales">Los datos personales son tratados por Baby Friendly con la máxima reserva, confidencialidad y seguridad, estableciendo los medios técnicos y organizativos a su alcance para evitar la pérdida, mal uso, alteración, acceso no autorizado o copia de los datos facilitados en el Sitio Web.</p>
          <h6 className="">
          COODIFICACIONES DE LA POLÍTICA DE PRIVACIDAD.
          </h6>
          <p id="textoslegales">Baby Friendly se reserva el derecho a modificar esta Política de privacidad en función de exigencias legislativas, reglamentarias o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos, por ello se aconseja a los Usuarios que la visiten periódicamente. Cuando se produzcan cambios significativos en esta Política, éstos se publicarán en el Sitio Web.</p>
        </div>
  );
};
