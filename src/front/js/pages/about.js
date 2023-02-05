import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const About = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<section className="show">
				<div className="flex-dave-layout-main_inner">
					<div className="row mb-5 pb-md-4 align-items-center">
						<div className="col-6">
							<img src="https://images.ctfassets.net/rkv150f3eozw/K22RhvLquF2AUtxZ4Dilp/d8c85ac59e2560b3ab215852c91ea689/waving-dave.svg" 
							width="400px"
							heigh="300px"/>
						</div>
						<div className="col-6">
							<div className="text-inner-wrapper-main">
								<h4 className="header-title-right">Misión</h4>
								<div className="description-paragraph">
								<p className="paragraph-wrapper">Baby Friendly es una plataforma de contenidos y acción para transformar las ciudades en espacios más amables e inclusivos para las familias.
								</p>
								<p className="paragraph-wrapper">
								Para ello, nuestros usuarios valoran locales basados en su propia experiencia y ayudan a los negocios a mejorar sus servicios para las familias.
								</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="show">
				<div className="flex-dave-layout-main_inner">
					<div className="row mb-5 pb-md-4 align-items-center">
						<div className="col-6">
							<div className="text-inner-wrapper-main">
								<h4 className="header-title-right">Nuestra Historia</h4>
								<div className="description-paragraph">
								<p className="paragraph-wrapper">Baby Friendly nació en 2020 de la necesidad y de las ganas de seguir disfrutando del entorno después de la maternidad y rápidamente se convirtió en un proyecto abierto y colaborativo con el que queremos mejorar nuestras ciudades.
								</p>
								<p className="paragraph-wrapper">Unos años después, desde baby Friendly compartimos los mejores lugares de la ciudad para disfrutar con la tribu al mismo tiempo que promovemos una ciudad más amable con las familias.
								</p>
								</div>
							</div>
						</div>
						<div className="col-6">
							<img src="https://images.ctfassets.net/rkv150f3eozw/MDFx7AIEY93Fh2fiN7YOg/29b34c931cfea608bbbab9ef7cec5689/dave-artwork-make-money.svg"
							width="400px"
							heigh="300px"/>
						</div>
					</div>
				</div>
			</section>
			<div className="divider center-divider"></div>
			<section>
				<div className="container-main-wrapper-holder-outsmart">
					<div className="outsmart-overdrafts-wrapper-main-center">
						<h4 className="title-container-text header--title-outsmart">Nuestros Valores </h4>
						<div className="description-wrapper-paragraph">
							<p className="description-wrapper-paragraph_inner">
								<p><div>
								<p className="paragraph-wrapper">Para dar apoyo a cada una de nuestros usuarios, desde Baby Friendly hemos creado la red de Ciudades Family Welcome desde la que queremos contribuir a la transformación de las ciudades.</p>
								</div></p>
								</p>
						</div>
					</div>
				</div>
			</section>
			<section>
				<div className="container fluid">
					<div className="row">
						<div className="col-3">
							<div className="card-main-item">
								<div className="top-card-holder-wrapper">
									<img className="icon" 
									alt="icon" 
									src="//images.ctfassets.net/rkv150f3eozw/4LmueSORj5v1iJBBwIAUkL/4e5db4d901e22ef6c6ee500fbd00b479/member-centric.png"
									width="250px"
									heigh="250px"
									/>
								</div>
								<div className="bottom-card-holder-wrapper">
									<h4 className="title-wrapper">Nos preocupamos profundamente por nuestras miembros.</h4>
									<p className="description-wrapper">Buscamos abordar los deseos y necesidades de las usuarios a las que servimos teniendo empatía, reuniendo sus perspectivas y anticipando sus reacciones a las decisiones que tomamos. Al poner a nuestros usuarios en primer lugar, creamos un servicio de calidad que nuestros usuarios merecen y que respaldamos con orgullo.</p>
								</div>
							</div>
						</div>
						<div className="col-3">
							<div className="card-main-item">
								<div className="top-card-holder-wrapper">
									<img className="icon" 
									alt="icon" 
									src="https://images.ctfassets.net/rkv150f3eozw/7xbWWq7NcVk4Ptc0KzA0uz/15dd5dfe964c449168bfc993537f101f/transparent.png"
									width="250px"
									heigh="250px"
									/>
								</div>
								<div className="bottom-card-holder-wrapper">
									<h4 className="title-wrapper">Nosotros somos abiertos, honestos y directos.</h4>
									<p className="description-wrapper">Compartimos información de manera proactiva de una manera que proporciona contexto, crea alineación y permite que el equipo haga su mejor trabajo donde sea que esté. Ser reflexivo e intencional es clave para desarrollar el equipo de alto rendimiento que somos y nos esforzamos por ser.</p>
								</div>
							</div>
						</div>
						<div className="col-3">
							<div className="card-main-item">
								<div className="top-card-holder-wrapper">
								<img 
								className="icon" 
								alt="icon" 
								src="//images.ctfassets.net/rkv150f3eozw/7DkJL9yCoc5UU22AXyex3q/d4e325c66194a435a642fea792f10778/helpful.png"
								width="250px"
								heigh="250px"/>
								</div>
								<div className="bottom-card-holder-wrapper">
									<h4 className="title-wrapper">Ser útil es parte de nuestro ADN.</h4>
									<p className="description-wrapper">Somos rápidos para ofrecer apoyo y animarnos unos a otros al mismo tiempo que brindamos una perspectiva que es constructiva cuando la situación lo requiere. La ayuda se extiende más allá de nuestras cuatro paredes porque creemos que si uno de nosotros tiene éxito, todos lo hacemos.</p>
								</div>
							</div>
						</div>
						<div className="col-3">
							<div className="card-main-item">
								<div className="top-card-holder-wrapper">
								<img 
								className="icon" 
								alt="icon" 
								src="https://images.ctfassets.net/rkv150f3eozw/4Xf8PIoq64FhxonfWv1qed/b6155ea3f7cbc76c63837bb062fcc05c/better-together.png"
								width="250px"
								heigh="250px"/>
								</div>
								<div className="bottom-card-holder-wrapper">
									<h4 className="title-wrapper">La oportunidad existe para todos en Baby Friendly.</h4>
									<p className="description-wrapper">Estamos comprometidos a crear un entorno en el que todos se sientan valorados, escuchados y empoderados para hacer su mejor trabajo. Esto impulsa la innovación, profundiza las relaciones y ayuda a construir un producto inclusivo que cumple con nuestra visión.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className="divider center-divider"></div>
			<section className="mt-5">
				<div className="container-main-wrapper-holder-outsmart">
					<div className="outsmart-overdrafts-wrapper-main-center">
						<h4 className="title-container-text header--title-outsmart">Nuestros Equipo </h4>
						<div className="description-wrapper-paragraph">
							<p className="description-wrapper-paragraph_inner">
								<p><div>
								<p className="paragraph-wrapper">Ayude a marcar la diferencia para mejorar la relación de nuestros miembros con el dinero y únase a nuestro equipo en crecimiento.</p>
								</div></p>
							</p>
							<button data-testid="jobOpeningsButton" id="button">Ver ofertas de trabajo</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
