import * as Restaurante from './Configuracion.js';

CorteDeCaja();

function CorteDeCaja(){
    let Direccion = Restaurante.getRestauranteURLC() + Restaurante.getRestauranteid() + "/CorteCaja"; //Completar con Cristo

    fetch(Direccion,{method:'GET'}).then(respuesta =>{
        return respuesta.json()
    }).then(data => {
            console.log("asdasd")
            document.getElementsByName("DineroCuadroCorte")[0].textContent = `${data.ventasDia}`;
            document.getElementsByName("DineroCuadroCorte")[1].textContent = `${data.ganancias}`;
            document.getElementsByName("DineroCuadroCorte")[2].textContent = `${data.pagosTarjeta}`;
            document.getElementsByName("DineroCuadroCorte")[3].textContent = `${data.pagosEfectivo}`;
            document.getElementsByName("DineroCuadroCorte")[4].textContent = `${data.gastos}`;
    }).catch(console.error);
}


document.getElementById("ImprimirVentasPagos").addEventListener('click', function()
{
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.title  + '</h1>');
    mywindow.document.write(document.getElementById('TablaImprimible').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
});

document.getElementById("closePopVentasPagos").addEventListener('click', function(){
    document.getElementById("PopVentasPagos").style.display = 'none';
})

document.getElementById("BotonCorteCaja").addEventListener('click', function(){
    let Direccion = Restaurante.getRestauranteURLC() + Restaurante.getRestauranteid() + "/cortecaja";

    fetch(Direccion,{method:'POST',headers: { 'Content-Type': 'application/json'}}).then(respuesta =>{
        return respuesta.json();
    }).then(data => {
        CorteDeCaja()
    }).catch(console.error);
})


// funciones de click en los cuadros para abrir el popup
document.getElementById('Ventas').addEventListener('click', function(){
    document.getElementById('PopVentasPagos').style.display = 'flex';
    document.getElementById('TituloVentasPagos').textContent = "Ventas del día";

    let Direccion = Restaurante.getRestauranteURL() + Restaurante.getRestauranteid() + "/operaciones"; //Completar con Cristo
    document.getElementById('TablaAnalisisOperacion').innerHTML = ""

    fetch(Direccion,{method:'GET'}).then(respuesta =>{
        return respuesta.json()
    }).then(data => {
        for(var i=0; i<data.length; i++){
            document.getElementById('TablaAnalisisOperacion').innerHTML += `<tr>
                <td>${data[i].idMovimiento}</td>
                <td>${data[i].nombreCliente}</td>
                <td>${data[i].cuenta}</td>
            </tr>`        
        }
    }).catch(console.error);
})

document.getElementById('Ganancias').addEventListener('click', function(){
    document.getElementById('PopVentasPagos').style.display = 'flex';
    document.getElementById('TituloVentasPagos').textContent = "Ganancias del día";

    let Direccion = Restaurante.getRestauranteURLC() + Restaurante.getRestauranteid() + "/operaciones"; //Completar con Cristo
    document.getElementById('TablaAnalisisOperacion').innerHTML = ""

    fetch(Direccion,{method:'GET'}).then(respuesta =>{
        return respuesta.json()
    }).then(data => {
        for(var i=0; i<data.length; i++){
            document.getElementById('TablaAnalisisOperacion').innerHTML += `<tr>
                <td>${data[i].idMovimiento}</td>
                <td>${data[i].nombreCliente}</td>
                <td>${data[i].cuenta}</td>
            </tr>`        
        }
    }).catch(console.error);
})

document.getElementById('PagosTarjeta').addEventListener('click', function(){
    document.getElementById('PopVentasPagos').style.display = 'flex';
    document.getElementById('TituloVentasPagos').textContent = "Pagos con tarjeta";

    let Direccion = Restaurante.getRestauranteURL() + Restaurante.getRestauranteid() + "/operaciones"; //Completar con Cristo
    document.getElementById('TablaAnalisisOperacion').innerHTML = ""

    fetch(Direccion,{method:'GET'}).then(respuesta =>{
        return respuesta.json()
    }).then(data => {
        if(data[i].metodoPago=="Tarjeta"){
            for(var i=0; i<data.length; i++){
                document.getElementById('TablaAnalisisOperacion').innerHTML += `<tr>
                    <td>${data[i].idMovimiento}</td>
                    <td>${data[i].nombreCliente}</td>
                    <td>${data[i].cuenta}</td>
                </tr>`        
            }
        }  
    }).catch(console.error);
})

document.getElementById('PagoEfectivo').addEventListener('click', function(){
    document.getElementById('PopVentasPagos').style.display = 'flex';
    document.getElementById('TituloVentasPagos').textContent = "Pagos en efectivo";

    let Direccion = Restaurante.getRestauranteURL() + Restaurante.getRestauranteid() + "/operaciones"; //Completar con Cristo
    document.getElementById('TablaAnalisisOperacion').innerHTML = ""

    fetch(Direccion,{method:'GET'}).then(respuesta =>{
        return respuesta.json()
    }).then(data => {
        for(var i=0; i<data.length; i++){
            if(data[i].metodoPago=="Efectivo"){
                for(var i=0; i<data.length; i++){
                    document.getElementById('TablaAnalisisOperacion').innerHTML += `<tr>
                        <td>${data[i].idMovimiento}</td>
                        <td>${data[i].nombreCliente}</td>
                        <td>${data[i].cuenta}</td>
                    </tr>`        
                }
            }        
        }
    }).catch(console.error);
})

document.getElementById('Gastos').addEventListener('click', function(){
    document.getElementById('PopVentasPagos').style.display = 'flex';
    document.getElementById('TituloVentasPagos').textContent = "Gastos del día";

    let Direccion = Restaurante.getRestauranteURL() + Restaurante.getRestauranteid() + "/gastos"; //Completar con Cristo
    document.getElementById('TablaAnalisisOperacion').innerHTML = ""

    fetch(Direccion,{method:'GET'}).then(respuesta =>{
        return respuesta.json()
    }).then(data => {
        for(var i=0; i<data.length; i++){
            document.getElementById('TablaAnalisisOperacion').innerHTML += `<tr>
                <td>${data[i].idMovimiento}</td>
                <td>${data[i].nombreProveedor}</td>
                <td>${data[i].gasto}</td>
            </tr>`        
        }
    }).catch(console.error);
})
