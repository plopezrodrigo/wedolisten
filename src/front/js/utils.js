/**
 * 
 * @returns:
 *      "contenido" con dos posibles valores
 *          --> tendrá un objeto con la variable "msg" que será un mensaje de error
 *          --> Los datos del usuario para meterlos en la variable de store "userConectado"
 */
export async function getMember( contenido ){
    const myToken = localStorage.getItem("token");

    contenido = {"msg": "No entramos ni en el fetch"}

    await fetch(process.env.BACKEND_URL + "/api/member", 
            {method: 'GET',
             headers:{"Content-Type": "application/json"
                    ,"Authorization": 'Bearer ' + myToken}
            }) 
    .then(response => response.json())
    .then((response)=>{	
                        if(typeof response["msg"] === 'undefined'){
                            console.log("Response a parte1", response);
                            contenido = response;
                            console.log("Response a parte1.1", contenido);
                        }else{
                            console.log("Response a parte2", response);
                            contenido = response;
                        };
            });
};
