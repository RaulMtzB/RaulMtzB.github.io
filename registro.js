import * as Restaurante from './Configuracion.js';

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

document.getElementById("Iniciar").addEventListener('click',function(){
    document.getElementById("Nombre").style.borderColor = 'Gray';
    document.getElementById("Direccion").style.borderColor = 'Gray';
    document.getElementById("Telefono").style.borderColor = 'Gray';
    document.getElementById("Correo").style.borderColor = 'Gray';
    document.getElementById("Direccion").style.borderColor = 'Gray';
    document.getElementById("Contraseña").style.borderColor = 'Gray';
    document.getElementById("ConfirmarContraseña").style.borderColor = 'Gray';

    if  (document.getElementById("Correo").value == "" || !validateEmail(document.getElementById("Correo").value)){

        document.getElementById("Correo").style.borderColor = 'red';

    }
    else if  (document.getElementById("Nombre").value == ""){

        document.getElementById("Nombre").style.borderColor = 'red';

    }else if (document.getElementById("Contraseña").value == "" ||document.getElementById("Contraseña").value != document.getElementById("ConfirmarContraseña").value){
        
        document.getElementById("Contraseña").style.borderColor = 'red';
        document.getElementById("ConfirmarContraseña").style.borderColor = 'red';

    }else{
        const Direccion = Restaurante.getRestauranteURL() + "signup"; //Comprobar dirección

        let Registro = {
            "name" : document.getElementById("Nombre").value,
            "address" : document.getElementById("Direccion").value,
            "phoneNumber" : document.getElementById("Telefono").value,
            "emailAddress" : document.getElementById("Correo").value,
            "password" : document.getElementById("Contraseña").value 
        }

        fetch(Direccion,{method:'POST',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Registro)}).then(respuesta =>{
            return respuesta.json()
        }).then(data => {
            if (data.id!=""){

                Restaurante.setRestauranteid(data.id);
                console.log(Restaurante.getRestauranteid());
                document.getElementById("Nombre").value = '';
                document.getElementById("Direccion").value = '';
                document.getElementById("Telefono").value = '';
                document.getElementById("Correo").value = '';
                document.getElementById("Direccion").value = '';
                document.getElementById("Contraseña").value = '';
                document.getElementById("ConfirmarContraseña").value = '';   
                window.location = "Cocina.html";

            }else{

                document.getElementById("Aviso").style.visibility = "visible";

            }

        }).catch(function(){  //El correo ya existe? Se me ocurre así.

            alert("El correo que intentas registrar ya existe.");

        });
    }
});