const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			userConectado: {} //{user: "",
							  // nombre: "", 
							  // is_active: true
						      //......}	
		}, 
		actions: {
			//--------------------------------------------------------------------
			// Guardamos datos de usuario en el signup 
			//--------------------------------------------------------------------
			setUserConectado: (usuario, miNombre, activo=true) => {
				const misDatos = {user: usuario
								 ,nombre: miNombre
								 ,is_active: activo}

				try{
					// Validamos datos de entrada
					// ------------
					// Buscamos si existe el usuario
					
					setStore({ userConectado: misDatos });
					// console.log("Estos son mis datos: ", userConectado);
				}catch(error){
					console.log("Error en la validación de datos", error)
				}
			},
			delUserConectado: () => {
				setStore({ userConectado: {} });
			},
			//--------------------------------------------------------------------
			// retornamos datos de usuario en el signup
			//--------------------------------------------------------------------
			getUserConectado: () => {
				return getStore().userConectado;
			},



			
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
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

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
