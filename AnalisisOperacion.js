import * as Restaurante from './Configuracion.js';

ActualizaTablaAnalisisOperacion();

function ActualizaTablaAnalisisOperacion(){
    let Direccion = Restaurante.getRestauranteURLC() + Restaurante.getRestauranteid() + "/operaciones"; //Completar con Cristo

    document.getElementById('TablaAnalisisOperacion').innerHTML = ""
    fetch(Direccion,{method:'GET'}).then(respuesta =>{
        return respuesta.json()
    }).then(data => {
        for(var i=0; i<data.length; i++){ 
            document.getElementById('TablaAnalisisOperacion').innerHTML += `
            <tr>
                <td>${data[i].idMovimiento}</td>
                <td>${data[i].fecha}</td>
                <td>${data[i].hora}</td>
                <td>${data[i].nombreCliente}</td>
                <td>${data[i].mesa}</td>
                <td>${data[i].mesero}</td>
                <td>${data[i].cuenta}</td>
                <td>${data[i].metodoPago}</td>
            </tr>
            `
        }
    }).catch(console.error)

    //Gastos diarios

    Direccion = Restaurante.getRestauranteURLC() + Restaurante.getRestauranteid() + "/gastos"; 

    document.getElementById('TablaGastosDiarios').innerHTML = ""
    fetch(Direccion,{method:'GET'}).then(respuesta =>{
        return respuesta.json()
    }).then(data => {
        for(var i=0; i<data.length; i++){ //Comprobar variables
            document.getElementById('TablaGastosDiarios').innerHTML += `
            <tr>
                <td>${data[i].idMovimiento}</td>
                <td>${data[i].fecha}</td>
                <td>${data[i].hora}</td>
                <td>${data[i].nombreProveedor}</td>
                <td>${data[i].gasto}</td>
                <td style="overflow: auto; height: 50px;">${data[i].comentarios}</td>
            </tr>
            `
        }
    }).catch(console.error)
}
