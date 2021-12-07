import * as Restaurante from './Configuracion.js';

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

document.getElementById("Iniciar").addEventListener('click',function(){
    document.getElementById("InputUsuario").style.borderColor = 'Gray';
    document.getElementById("InputContraseña").style.borderColor = 'Gray';
    if  (document.getElementById("InputUsuario").value == "" || !validateEmail(document.getElementById("InputUsuario").value)){
        document.getElementById("InputUsuario").style.borderColor = 'red';
    }
    else if  (document.getElementById("InputContraseña").value == ""){
        document.getElementById("InputContraseña").style.borderColor = 'red';
    }else{
        const Direccion = Restaurante.getRestauranteURL() + "signin"; //Esta dirección es solo de prueba | "http://localhost:8080/v1/login";

        let inicio = {
                "emailAddress" : document.getElementById("InputUsuario").value,
                "password" : document.getElementById("InputContraseña").value 
        }

        fetch(Direccion,{method:'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(inicio)}).then(respuesta =>{
            return respuesta.json()
        }).then(data => {
            console.log(data)
            if (data.id!=undefined){
                Restaurante.setRestauranteid(data.id);
                console.log(Restaurante.getRestauranteid());
                document.getElementById("Aviso").style.visibility = "hidden";
                window.location = "Cocina.html";
            }else{
                document.getElementById("Aviso").style.visibility = "visible";
            }
        }).catch(alert.error);
    }
});
