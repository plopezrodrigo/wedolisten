import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { About } from "./pages/about";
import { Contact } from "./pages/contact";
import { Data } from "./pages/data";
import { Favorites } from "./pages/favorites";
import { Comments } from "./pages/comments";
import LocalDetail from "./pages/localDetail";
import ListLocales from "./pages/listlocales";
import BuscarlistLocales from "./pages/buscarlistlocales";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { SignupManager} from "./pages/signupManager";
import { SignupUser} from "./pages/signupUser";
import Login  from "./pages/login";
import { OpinionUser } from "./pages/opinionUser";
import { OpinionManager } from "./pages/opinionManager";
import { MisLocales } from "./pages/misLocales";
import { DatosLocal } from "./pages/datosLocal";
import { NuevoLocal } from "./pages/nuevoLocal";
import { Comentarios } from "./pages/comentarios";
import { Avisolegal } from "./pages/avisolegal";
import { Politicaprivacidad } from "./pages/politicaprivacidad";
import { Faqs} from "./pages/faqs";
import { Terminosdeuso } from "./pages/terminosdeuso";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return ( 
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />

                        <Route element={<SignupManager />} path="/signupManager" />
                        <Route element={<SignupUser />} path="/signupUser" />

                        <Route element={<About />} path="/about" />
                        <Route element={<Contact />} path="/contact" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Data />} path="/data" />
                        <Route element={<Favorites/>} path="/favorites" />
                        <Route element={<Comments/>} path="/comments" />
                        <Route element={<ListLocales/>} path="/listlocales" />
                        <Route element={<BuscarlistLocales/>} path="/buscarlistlocales/:busqueda" />
                        <Route element={<LocalDetail/>} path="/localDetail/:id"/>
                        <Route element={<OpinionUser/>} path="/opinionUser/:id_local/:id_comment" />
                        <Route element={<OpinionManager/>} path="/opinionManager/:id_local/:id_comment" />
                        <Route element={<MisLocales />} path="/misLocales" />
                        <Route element={<NuevoLocal />} path="/nuevoLocal" />
                        <Route element={<DatosLocal />} path="/datosLocal/:local_id" />
                        <Route element={<Comentarios />} path="/comentarios" />
                        <Route element={<Avisolegal />} path="/avisolegal" />
                        <Route element={<Politicaprivacidad />} path="/politicaprivacidad" />
                        <Route element={<Terminosdeuso />} path="/terminosdeuso" />
                        <Route element={<Faqs />} path="/faqs" />
                        <Route path="*" element={<div>Página no encontrada</div> } />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
