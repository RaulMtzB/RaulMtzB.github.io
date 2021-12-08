import * as Restaurante from './Configuracion.js';

var SelecCuenta = document.getElementsByName('VerCC');
var SelecMov = document.getElementsByName('PagarMovimiento');
var SelectedClient = "";


Actualiza();

function Actualiza(){
    ActualizaCuentas();
}



//Funciones de actualización de datos
function ActualizaSeleccionCuentas (){
    for(var i = 0; i < SelecCuenta.length; i++) {
        (function(index) {
            SelecCuenta[index].addEventListener("click", function() {
                console.log("Clicked index: " + SelecCuenta[index]);
                document.getElementById('NombreCliente').textContent = document.getElementsByName("TablaNombreCliente")[index].textContent;
                document.getElementById('PopVerCliente').style.display = 'flex';
                SelectedClient = document.getElementsByName("TablaIDCliente")[index].textContent;
                ActualizaMovimientos();
            })
        })(i);
    }
}

function ActualizaMovimientos(){
    let Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/clientesPremium/cuentas/" + SelectedClient;
    document.getElementById('ContenidoTablaCuentas').innerHTML = '';
    fetch(Direccion,{method:'GET'}).then(respuesta =>{
        return respuesta.json()
    }).then(data => {
        document.getElementById('NombreCliente').textContent = data[i].nombre;
        document.getElementById('ContenidoTablaCuentas').innerHTML = '';
        for (var i=0; i<data.length; i++){
            document.getElementById('ContenidoTablaCuentas').innerHTML +=`
            <td name="idMovimiento">${data[i].idMovimiento}</td>
            <td>${data[i].fecha}</td>
            <td>${data[i].hora}</td>
            <td>${data[i].numeroMesa}</td>
            <td>${data[i].cuenta}</td>
            <td>${data[i].metodoPago}</td>
            <td><button class="button botonObscuro" name="PagarMovimiento">Pagar</button></td>
            `
        }        
        ActualizaSeleccionMovimientos();
    })
}

document.getElementById('BotonVerClientesVIP').addEventListener('click', function(){
    ActualizaClientesVIP();
    document.getElementById('PopVerClientesVIP').style.display = 'flex';
})

document.getElementById('closeVerClientesVIP').addEventListener('click', function(){
    document.getElementById('PopVerClientesVIP').style.display = 'none';
})

function ActualizaClientesVIP(){
    let Direccion = Restaurante.getRestauranteURL()  + Restaurante.getRestauranteid() + "/clientesPremium";
    fetch(Direccion,{method:'GET'}).then(respuesta =>{
        return respuesta.json()
    }).then(data => {
        document.getElementById('ContenidoTablaCuentasVIP').innerHTML = '';
        for (var i=0; i<data.length; i++){
            document.getElementById('ContenidoTablaCuentasVIP').innerHTML +=`
            <td>${data[i].id}</td>
            <td>${data[i].nombre}</td>
            `
        }        
    })
}


function ActualizaSeleccionMovimientos(){
    for(var i = 0; i < SelecMov.length; i++) {
        (function(index) {
            SelecMov[index].addEventListener("click", function() {
                let Direccion = Restaurante.getRestauranteURL()  + Restaurante.getRestauranteid() + "/ActualizaSeleccionMovimientos()/" + SelectedClient + document.getElementsByName('idMovimiento')[index].value; //Cambiar direccion
                fetch(Direccion,{method:'POST',headers: { 'Content-Type': 'application/json' }}).then(respuesta =>{
                    return respuesta.json()
                }).then(data =>{
                    ActualizaMovimientos();
                }).catch(console.error);
            })
        })(i);
    }
}


document.getElementById('closeVerCliente').addEventListener('click',function(){
    document.getElementById('PopVerCliente').style.display = 'none';
})

document.getElementById('closePopCrearClienteVIP').addEventListener('click',function(){
    document.getElementById('PopCrearClienteVIP').style.display = 'none';
})

document.getElementById('AbrePopCrearClienteVIP').addEventListener('click',function(){
    document.getElementById('InputIDCliente').value = "";
    document.getElementById('PopCrearClienteVIP').style.display = 'flex';
})


/*document.getElementById('CuentaPagar').addEventListener('click',function(){
    const Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/";
    let Categoria = 
        {
            "id" : SelectedClient
        }

        fetch(Direccion,{method:'POST',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Categoria) }).then(respuesta =>{
            ActualizaCuentas();
            return respuesta.json()
        }).then(data =>{
            console.log(data);
        }).catch(console.error);
})*/

document.getElementById('AgregarClienteVIP').addEventListener('click',function(){
    const Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/clientesPremium";
    let Categoria = 
        {
            "id" : document.getElementById('InputIDCliente').value
        }

        fetch(Direccion,{method:'POST',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Categoria) }).then(respuesta =>{
            ActualizaCuentas();
            return respuesta.json()
        }).then(data =>{
            console.log(data);
        }).catch(console.error);
        document.getElementById('PopCrearClienteVIP').style.display = 'none';
})


document.getElementById('EliminarClienteVIP').addEventListener('click', function(){
    const Direccion = Restaurante.getRestauranteURLC() + Restaurante.getRestauranteid() + "/clientesPremium/" + document.getElementById('InputIDCliente').value; 
    fetch(Direccion,{method:'DELETE'}).then(respuesta =>{
        document.getElementById('PopCrearClienteVIP').style.display = 'none';
    }).catch(console.error);
})

function ActualizaCuentas(){
    let Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/clientesPremium/adeudos";
    document.getElementById('ContenidoTablaCuentas').innerHTML = '';
    fetch(Direccion,{method:'GET'}).then(respuesta =>{
        return respuesta.json()
    }).then(data => {
        console.log(data);
        for (var i=0; i<data.length; i++){
            document.getElementById('ContenidoTablaCuentas').innerHTML +=`
            <tr>
                <td name="TablaIDCliente">${data[i].id}</td>
                <td name="TablaNombreCliente">${data[i].nombre}</td>
                <td><button class="button botonObscuro" name="VerCC">Ver</div></td>
            </tr>
            `
        }        
        ActualizaSeleccionCuentas ();
    }).catch(console.error);
}
