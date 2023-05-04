import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import imagen from "../../img/account.png";

export const Avisolegal = () => {

  return (
        <div className="container">
          <h6 className="">
          CONDICIONES GENERALES DE ACCESO Y USO DE LA WEB.
          </h6>
          <p id="textoslegales">El acceso, navegación y utilización del Sitio web www.babyfriendly.es, (en adelante, Sitio Web) implica la aceptación expresa y sin reservas de todos los términos de las Condiciones de Uso incluidas en el presente Aviso Legal. Su Cumplimiento es exigible respecto de cualquier persona que acceda, navegue o utilice el Sitio web. Si el Usuario no está de acuerdo con los términos expuestos, no debe acceder, navegar o utilizar el Sitio Web.</p>
          <p id="textoslegales">Baby Friendly, S.L.U., se reserva el derecho a actualizar, modificar o eliminar sin previo aviso, la presentación y configuración del Sitio Web, los contenidos e información contenidos en él, así como modificar las Condiciones de Uso que entrarán en vigor desde el momento de su publicación en el Sitio Web siendo aplicables desde esa fecha.</p>
          <h6 className="">
          TITULARIDAD Y DATOS DE CONTACTO.
          </h6>
          <p id="textoslegales">Baby Friendly, S.L.U., (en adelante Baby Friendly), con CIF nº B-82900721, con domicilio social en Camí de Can Ametller nº 16, Edificio 1, Planta 2, C.P 08195Sant Cugat del Vallès (Barcelona), debidamente inscrita en el Registro  Mercantil de Barcelona, Tomo 46334, Folio 200, Hoja B-341031, con teléfono 910602 442 y con correo electrónico info@babyfriendly.es es la titular de la página Web www.babyfriendly.es (en adelante, Sitio Web).</p>
          <h6 className="">
          OBJETO Y CONTENIDO DE LA WEB.
          </h6>
          <p id="textoslegales">Este Sitio Web tiene por objeto informar a los Usuarios sobre las ventajas de registrarse como Usuario de Baby Friendly, así como de las ventajas para los usuarios que se registren como gestores en el sitio web. El contenido del Sitio Web es únicamente para usuarios y gestores de loclaes comerciales.</p>
          <p id="textoslegales">El acceso a la información no implica ni constituye relación contractual alguna entre el Usuario y Baby Friendly. Es responsabilidad exclusiva del Usuario el uso que haga de la información contenida en el Sitio Web, así como de la toma de decisiones en la solicitud o contratación de servicios y productos en base a la información contenida en el Sitio Web.</p>
          <h6 className="">
          CONDICIONES DE USO.
          </h6>
          <p id="textoslegales">Estas condiciones generales de uso regulan el acceso y navegación en el Sitio Web, cuyo acceso y uso tiene carácter libre y gratuito, no siendo necesario el previo registro de los Usuarios. No obstante, para acceder a la condición de usuario de Baby Friendly se requerirá el previo registro de los usuarios que estén interesados en beneficiarse de las ventajas y los servicios que se ofrecen en el Sitio Web.</p>
          <p id="textoslegales">El acceso, uso o navegación en el Sitio Web atribuye la condición de Usuario e implica el conocimiento, la aceptación y sometimiento a las advertencias legales y a las condiciones de uso incluidas en el presente Aviso Legal en la versión publicada en el momento en que el Usuario accede al Sitio Web. El Usuario acepta que el uso, los servicios y los productos del Sitio Web tienen lugar bajo su única y exclusiva responsabilidad. Se recomienda al Usuario leer el presente Aviso Legal en cada ocasión en que se acceda a la Web.</p>
          <p id="textoslegales">Baby Friendly se reserva, sin necesidad de previo aviso y en cualquier momento, el derecho a interrumpir, suspender temporalmente, desactivar y/ cancelar el acceso al Sitio Web o a cualesquiera de los elementos que se integran en la misma.</p>
          <h6 className="">
          USO DE LA PÁGINA WEB Y RESPONSABILIDAD.
          </h6>
          <p id="textoslegales">El Usuario es responsable del uso que realice de la Web y de su contenido y lo hace bajo su propio riesgo. Al acceder acepta y se compromete a utilizar la Web, sus contenidos y servicios de conformidad con la Ley, el presente Aviso Legal, las buenas costumbres y el orden público, y deberán responder frente a Baby Friendly o terceros por cualquier daño que pueda producirse por el incumplimiento de estas obligaciones.</p>
          <p id="textoslegales">El Usuario se compromete expresamente a:</p>
          <ul id="textoslegales">
            <li>No destruir, alterar, inutilizar o dañar los datos o programas informáticos o documentos electrónicos del Sitio Web</li>
            <li>No obstaculizar el acceso de otros Usuarios al Sitio Web</li>
            <li>No introducir virus o cualquier otro dispositivo que cause o pueda causar una alteración en los sistemas de Baby Friendly.</li>
            <li>No copiar el Software</li>
            <li>No distribuir, compartir, sublicenciar, prestar, arrendar o poner la Web a disposición de terceros.</li>
            <li>No someter a ingeniería inversa, descompilar o desmontar el Software del Sitio Web o tratar de obtener su código fuente.</li>
            <li>No almacenar, introducir o difundir en o desde la Web información o material difamatorio, injurioso, obsceno, amenazador, xenófobo o que incite a la violencia, discriminación por razón de raza, sexo, ideología, religión, atente contra la moral, el orden público, los derechos fundamentales, las libertades públicas, el honor, la intimidad o la imagen de terceros, y en general que infrinja la normativa vigente.</li>
          </ul>
          <p id="textoslegales">El Usuario es el único y exclusivo responsable del acceso a la Web y del uso que haga de la información y datos contenidos en ella.</p>
          <p id="textoslegales">Baby Friendly no responderá de ninguna consecuencia, daño o perjuicio derivados del acceso o uso del Sitio Web y de su contenido por parte de los Usuarios. Baby Friendly, como titular del Sitio Web, queda exonerado de cualquier responsabilidad que pudiera derivarse de las acciones del Usuario. De manera que el Usuario es el único responsable frente a cualquier reclamación iniciada por terceras personas contra Baby Friendly por el acceso o uso que el Usuario haga de la Web.</p>
          <h6 className="">
          PROPIEDAD INTELECTUAL E INDUSTRIAL.
          </h6>
          <p id="textoslegales">El contenido del Sitio Web se rige por las leyes españolas y está protegido por la legislación nacional e internacional sobre Propiedad Intelectual e Industrial.</p>
          <p id="textoslegales">Los Derechos de Propiedad Intelectual e Industrial sobre toda la información contenida en esta web, entre otros, marcas, nombres comerciales, diseño gráfico, dibujos, logotipos, imágenes, índices, textos, audios, vídeos, software, diseño y signos identificativos, así como sus códigos fuente, estructura de navegación, bases de datos, y todos los elementos en ellos contenidos, son titularidad de Baby Friendly excepto aquellos contenidos que pertenecen a terceros a los que el Usuario puede acceder a través de hipervínculos.</p>
          <p id="textoslegales">En ningún caso el acceso y uso al Sitio Web por parte de los Usuarios, se podrá considerar como que se concede licencia de uso, o derecho a ningún activo de Baby Friendly o sus autores legítimos, por lo que no implicará una cesión, ni transmisión o cualquier tipo de renuncia de derechos de Propiedad Intelectual y/o Industrial.</p>
          <p id="textoslegales">Corresponde a Baby Friendly el ejercicio exclusivo de los derechos de explotación de los contenidos de este Sitio web en cualquier forma y, en especial, los derechos de reproducción, distribución, comunicación pública y transformación. </p>
          <p id="textoslegales">Queda prohibida toda reproducción, copia, distribución, modificación, supresión o transformación, publicación, comercialización, utilización de técnicas de ingeniería inversa o cualquier otro medio para obtener el código fuente y cualquier otra actividad que pueda realizarse con los datos y la información contenida en el Sitio Web, así como con su diseño y la selección y modelo de presentación, sin la autorización expresa Baby Friendly o el titular legítimo.</p>
          <p id="textoslegales">La utilización no autorizada de la información contenida en el Sitio Web, su modificación o supresión de datos, así como la lesión de los Derechos de Propiedad Intelectual o Industrial de Baby Friendly o de terceros, dando lugar a las responsabilidades legalmente establecidas, reservándose Baby Friendly la posibilidad de ejercer las acciones judiciales que procedan en derecho contra los Usuarios que violen o infrinjan los derechos de propiedad intelectual o industrial.</p>
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
