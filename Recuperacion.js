import * as Restaurante from './Configuracion.js';

document.getElementById("Actualiza").addEventListener('click',function(){
    document.getElementById("Contraseña").style.borderColor = 'Gray';
    document.getElementById("ConfirmarContraseña").style.borderColor = 'Gray';
    document.getElementById("Codigo").style.borderColor = 'Gray';

    if  (document.getElementById("Contraseña").value == "" || document.getElementById("Contraseña").value != document.getElementById("ConfirmarContraseña").value){
        document.getElementById("Contraseña").style.borderColor = 'red';
        document.getElementById("ConfirmarContraseña").style.borderColor = 'red';
    }
    else if (document.getElementById("Codigo").value == ""){
            document.getElementById("Codigo").style.borderColor = 'Red';
        }
        else{
            const Direccion = Restaurante.getRestauranteURL() + "recover-password"; 

            let inicio = {
                "emailAddress" : Restaurante.getRestauranteCorreo(),
                "password" : document.getElementById("Contraseña").value, 
                "recoverToken": document.getElementById("Codigo").value  
            }
            fetch(Direccion,{method:'PATCH',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(inicio)}).then(respuesta =>{
                return respuesta.json()//Si es Patch?
            }).then(data => {
                    document.getElementById("Aviso").style.visibility = "hidden";
                    alert("La contraseña ha cambiado exitosamente.");
                    window.location = "login.html";
            }).catch(function(){
                document.getElementById("Aviso").style.visibility = "visible";
            });
        }
});