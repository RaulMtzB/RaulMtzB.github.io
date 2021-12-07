import * as Restaurante from './Configuracion.js';


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

document.getElementById("Iniciar").addEventListener('click',function(){
    document.getElementById("Correo").style.borderColor = 'Gray';
    if  (document.getElementById("Correo").value == "" || !validateEmail(document.getElementById("Correo").value)){
        document.getElementById("Correo").style.borderColor = 'red';
    }
    else{
        const Direccion =  Restaurante.getRestauranteURL() + "recover-password-request"; //Comprobar dirección

        let inicio = {
                "emailAddress" : document.getElementById("Correo").value
        }
        fetch(Direccion,{method:'PATCH',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(inicio)}).then(respuesta =>{
            return respuesta.json()
        }).then(data => {
                document.getElementById("Aviso").style.visibility = "hidden";
                alert("El correo ha sido enviado.");
                Restaurante.setRestauranteCorreo(document.getElementById("Correo").value);
                window.location = "Recuperacion.html";
        }).catch(function(){
            document.getElementById("Aviso").style.visibility = "visible";
        });
    }
});