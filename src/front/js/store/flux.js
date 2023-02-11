const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      usertype: null,
      user: null,
      usuario: null,
      token: null,
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

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

      logout: () => {
        sessionStorage.removeItem("token");
        console.log("Login out");
        setStore({ token: null });
      },

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
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/token",
            opts
          );
          if (resp.status !== 200) {
            // alert("There has been some error");
            return false;
          }

          const data = await resp.json();

          sessionStorage.setItem("token", data.token);
          setStore({ token: data.token });

          sessionStorage.setItem("usertype", data.usertype);
          setStore({ usertype: data.usertype });

          sessionStorage.setItem("nameUser", data.name);
          setStore({ nameUser: data.name });
          setStore({ user: data.user});
          setStore({ usuario: data.usuario});

          return true;
        } catch (error) {
            console.error("There has been an error login in");
            return false;
        }
      },

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
    },
  };
};

export default getState;
