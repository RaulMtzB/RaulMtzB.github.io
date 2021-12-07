import * as Restaurante from './Configuracion.js';


document.getElementById('AgregarGastoDiario').addEventListener('click', function(){
    document.getElementById('Gasto').style.borderColor = 'white';
    document.getElementById('Proveedor').style.borderColor = 'white';
    
    if (document.getElementById('Proveedor').value == ""){
        document.getElementById('Proveedor').style.borderColor = 'red';
    }else if (document.getElementById('Gasto').value == ""){
        document.getElementById('Gasto').style.borderColor = 'red';
    }else{
        var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            var hour = today.getHours();
            var minutes = today.getMinutes();
            today = dd + '/' + mm + '/' + yyyy;
            var time = hour + ":" + minutes;
            console.log(document.getElementById('Comentarios').value)

        const Direccion = Restaurante.getRestauranteURL()  + Restaurante.getRestauranteid() + "/gastos";
            let Categoria =  
                {
                    //"idMovimiento": "Holi",
                    "nombreProveedor": document.getElementById('Proveedor').value,
                    "gasto":  parseFloat(document.getElementById('Gasto').value),
                    "fecha": today,
                    "hora": time,
                    "comentarios": document.getElementById('Comentarios').value
                }
        
            fetch(Direccion,{method:'POST',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Categoria) }).then(respuesta =>{
                //window.location = "AnalisisOperacion.html"; //Este lo dejo?
                return respuesta.json()
            }).then(data =>{
                console.log(data);
                document.getElementById('Proveedor').value = "";
                document.getElementById('Gasto').value = "";
                document.getElementById('Comentarios').value = "";
            }).catch(console.error);
    }
})