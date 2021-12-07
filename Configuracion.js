function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

let correo = "";

//Anterior http://localhost:8080/v1/restaurantes/
//Editar getRestauranteURL en caso de que se requiera cambiar el encabezado de la url

export function getRestauranteURL(){ 
  return "https://proyectouam.herokuapp.com/v1/restaurantes";
}

export function setRestauranteid(id){ 
    document.cookie = "Restaurante=" + id;
}

export function getRestauranteid(){
    return getCookie("Restaurante");
}

export function getRestauranteCorreo(){
  return getCookie("correo");
}

export function setRestauranteCorreo(nuevo){
  document.cookie = "correo=" + nuevo;
}
