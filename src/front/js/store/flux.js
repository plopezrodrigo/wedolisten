const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      usertype: null,
      user: null,
      usuario: null,
      token: null,
      message: null,
      locales: null,
      comentario: null,
      comentarioFotos: null,
      comentarioRespuesta: null,
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      // -------------------------------------------------------------------
      // Carga lista de locales con un string de búsqueda para el nombre
      // -------------------------------------------------------------------
      cargaLocales: async (buscar) => {
        try{
            const resp = await fetch(`${process.env.BACKEND_URL}/api/comercial-place-search/${buscar}`);

            if (resp.status !== 200){ 
                setStore({message: `No se han encontrado resultados para: "${buscar}"` });
                return false;
            }
            const data = await resp.json();

            if (data.length == 0){ 
                  setStore({message: `No se han encontrado resultados para: "${buscar}"` });
                  return false;
            };

          setStore({ locales: data});
          return true;

        }catch (error) {
            console.error("No se han podido cargar datos", error);
            return false;
          }
      },

      // -------------------------------------------------------------------
      // Carga lista de comentarios con un string de búsqueda para el nombre
      // -------------------------------------------------------------------
      cargaComentarios: async (buscar) => {
        try{
            const resp = await fetch(`${process.env.BACKEND_URL}/api/comment`);

            if (resp.status !== 200){ 
                setStore({message: `No se han encontrado resultados para: "${buscar}"` });
                return false;
            }
            const data = await resp.json();

            if (data.length == 0){ 
                  setStore({message: `No se han encontrado resultados para: "${buscar}"` });
                  return false;
            };

          setStore({ comentario: data});
          return true;

        }catch (error) {
            console.error("No se han podido cargar datos", error);
            return false;
          }
      },

      // -------------------------------------------------------------------
      // Sincronización del token
      // -------------------------------------------------------------------
      syncTokenFromSessionStore: () => {
        const token = sessionStorage.getItem("token");
        const usertype = sessionStorage.getItem("usertype");
        console.log(
          "Application just loaded, synching the session storage token"
        );
        if (token && token != "" && token != undefined)
          setStore({ token: token });
          setStore({ usertype: usertype });
      },

      // -------------------------------------------------------------------
      // Logout
      // -------------------------------------------------------------------
      logout: () => {
        sessionStorage.removeItem("token");
        setStore({ token: null });

        sessionStorage.removeItem("usertype");
        setStore({ usertype: null });

        sessionStorage.removeItem("name");
        setStore({ nameUser: null });

        sessionStorage.removeItem("email");
        setStore({ email: null });

        setStore({ user: null });
        setStore({ usuario: null });
      },

      // -------------------------------------------------------------------
      // Login
      // -------------------------------------------------------------------
      login: async (email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };

        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/token",
                                   opts
          );
          if (resp.status !== 200) { return false; }
          const data = await resp.json();

          sessionStorage.setItem("token", data.token);
          setStore({ token: data.token });

          sessionStorage.setItem("usertype", data.usertype);
          setStore({ usertype: data.usertype });

          sessionStorage.setItem("nameUser", data.usuario.name);
          setStore({ nameUser: data.usuario.name });

          sessionStorage.setItem("email", data.user.email);
          setStore({ email: data.user.email });

          setStore({ user: data.user});
          setStore({ usuario: data.usuario});

          return true;
        } catch (error) {
            console.error("There has been an error login in");
            return false;
        }
      },

      // -------------------------------------------------------------------
      // Alta de un local
      // -------------------------------------------------------------------
      altaLocal: async (formData) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/Comercial_Place", 
                                    {method: 'POST',
                                     headers:{"Content-Type": "application/json",
                                              "Authorization": 'Bearer '+ sessionStorage.getItem("token")
                                             },
                                     body: JSON.stringify(formData),
                                    });


                                    
          if (resp.ok){
              setStore({ message: "Local creado correctamente" });
              return true;
          }else{
            setStore({ message: "Error creando el local" });
            return false
          }

        } catch (error) {
            console.error("Error al crear el local");
            setStore({ message: error.message });
            return false;
        }
      },

      // -------------------------------------------------------------------
      // Almancena mensaje genérico
      // -------------------------------------------------------------------
      getComment: async (id) => {
        try {
          //---------- comentario ------------------------------------------------------
          const resp = await fetch(process.env.BACKEND_URL + "/api/comment/"+ id,{
            method: 'GET',
            headers: {"Content-Type": "application/json",
                  "Authorization": 'Bearer '+ sessionStorage.getItem("token") // hará falta?
            } 
          });
          if (!(resp.ok)){
              setStore({ message: await resp.json() });
              return false;
          }
          setStore({ comentario: await resp.json()}); 

          //---------- FOTOS comentario ------------------------------------------------------
          const resp2 = await fetch(process.env.BACKEND_URL + "/api/photos_comment/" + id,{
            method: 'GET',
            headers: {"Content-Type": "application/json",
                  "Authorization": 'Bearer '+ sessionStorage.getItem("token") // hará falta?
            } 
            })
          if (!(resp2.ok)){
            setStore({ message: await resp2.json() });
            return false;
          }
          setStore({ comentarioFotos: await resp2.json()}); 

        } catch (error) {
          console.log("Error loading message from backend: ", error);
          setStore({ message: "Error loading message from backend: "+ error });
          return false;
    }
      },
      // -------------------------------------------------------------------
      // Datos de un comentario
      // -------------------------------------------------------------------
      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      /*
      // -------------------------------------------------------------------
      // CAmbiando el color. DEMO
      // ------------------------------------------------------------------- 
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });
        //we have to loop the entire demo array to look for the respective index
        //and change its color

        //reset the global store

        //reset the global store
        setStore({ demo: demo });
      },
      */
    },
  };
};

export default getState;
