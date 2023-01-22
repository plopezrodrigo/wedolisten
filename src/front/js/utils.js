/**
 * 
 * @returns:
 *      Si un token es válido o no
 */
export function tokenValid( miToken ){
    // const myToken = localStorage.getItem("token");

    return !(miToken && miToken != "" && miToken != undefined)
    
};
