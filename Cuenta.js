import * as Restaurante from './Configuracion.js';

var Editado = false;

Actualiza();

window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            Editado = true;
            var img = document.getElementById("Imagen_Restaurante");
            img.onload = () => {
                URL.revokeObjectURL(img.src);
            }
            img.src = URL.createObjectURL(this.files[0]);
        }
    });
}); 

function Actualiza(){
    fetch(Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/info",{method:'GET'}).then(respuesta =>{  
        return respuesta.json();
    }).then(data => { 
        document.getElementById('Imagen_Restaurante').src = data.imagen;
        document.getElementById('NombreRestaurante').value = data.name;
        document.getElementById('NumeroTelefono').value = data.phoneNumber; // Quiza haga falta un parse
        document.getElementById('Direccion').value = data.address;
    }).catch(console.error)
}

document.getElementById('Guardar_datos').addEventListener('click', function(){
        const imagen = document.getElementById("archivoimg");
        const formData = new FormData();
        formData.append("file", imagen.files[0]);

        let datos = 
            {
                "name" : document.getElementById('NombreRestaurante').value,
                "phoneNumber" : document.getElementById('NumeroTelefono').value, //Hacer un parse como texto?
                "address": document.getElementById('Direccion').value
                //"imagen" : "" //Vamos a ver si jala sin esto
            }

            fetch(Restaurante.getRestauranteURLC() + Restaurante.getRestauranteid() + "/info",{method:'PATCH',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos) }).then(respuesta =>{
                return respuesta.json();
            }).then(data => {
                if (Editado){
                    fetch(Restaurante.getRestauranteURLC() + Restaurante.getRestauranteid() + "/imagen",{method:'POST', body: formData }).catch(console.error);
                    Editado = false;
                }
                Actualiza();
            }).catch(console.error);
})

