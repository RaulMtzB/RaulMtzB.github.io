import * as Restaurante from './Configuracion.js';

var SelecMesa = document.getElementsByName('CartaMesa');
var SelecMesero = document.getElementsByName('Meseros');
var SelecAsiento = document.getElementsByName('AsientoQR');
var SelecCliente = document.getElementsByClassName('cliente');
var ClienteSeleccionado = "";
var SelecProdCliente = "";
var Tableselection;
var SeatSelection = "";
var billSelection = "";
var indiceCliente = ""
var TablaSelectionName = ""
var total = "";

Actualiza();


export function ActualizaParaCocina(){
    
    console.log('se ve');
}

function Actualiza (){
    ActualizaMeseros();
    ActualizaMesas();
}

function ActualizaMesas(){
    const Tarjetas = document.getElementById("TarjetasMesas");
    let Direccion = Restaurants.getRestauranteURLR() + Restaurante.getRestauranteid() + "/tables"; //Esta dirección es solo de prueba | Restaurante.getRestauranteURL()  + Restaurante.getRestaurante + "/platillos";
    var colorM;
    var Pedido;
    var mesero = "Sin asignar";
    //Revisa Cantidad
    Tarjetas.innerHTML = ""
    fetch(Direccion,{method:'GET'}).then(respuesta =>{
        return respuesta.json()
    }).then(data => {
        for(var i=0; i<data.tables.length; i++){ 
            mesero = "Sin asignar";
            if (data.tables[i].status){ 
                colorM = "red";
            }else{
                colorM = "rgb(8, 214, 8)";
            }
            if (data.tables[i].waiterName != ""){
                mesero = data.tables[i].waiterName;
            }
            if (data.tables[i].cashPaymentNotification){
                Pedido = "visible";
            }else{
                Pedido = "hidden";
            }
            Tarjetas.innerHTML += `<div name="CartaMesa" class="col-auto" style="width:200px;" id=${data.tables[i].id} >
                <div class="card mb-4" style="background-color: #253340; border-color: #253340">
                    <div class="card-body">
                        <h6 name="MesaNombreMesa">${data.tables[i].name}</h6>
                        <hr class="sidebar-divider my-0" style="border-color: ${colorM};">
                        <p></p>
                        <div class="button roundbutton" name="VerMesa">Ver</div>
                        <p></p>
                        <div class="etiqueta" style="visibility: ${Pedido};"></div>
                        <div name="ElMesero" style="color: white; text-align: center; height: 50px; overflow: hidden;">${mesero}</div>
                    </div>
                </div>   
            </div>`
        }
        ActualizaSelecciónMesa();
    }).catch(console.error)
}

function ActualizaSelecciónMesa(){
    console.log("Mesas:" + SelecMesa.length);
    for(var i = 0; i < SelecMesa.length; i++) {
        (function(index) {
            document.getElementsByName("VerMesa")[index].addEventListener("click", function() {
                console.log(index);
                console.log("Clicked index: " + SelecMesa[index].id);
                Tableselection = SelecMesa[index].id;
                TablaSelectionName = document.getElementsByName("MesaNombreMesa")[index].textContent;
                console.log("mesa: " + document.getElementsByName("MesaNombreMesa")[index].textContent)
                console.log("var" + TablaSelectionName)
                ActualizaContenidoMesa();
                for(var k=0; k<document.getElementById('ElijeMesero').getElementsByTagName('option').length; k++){
                    if(document.getElementsByName("ElMesero")[index].textContent == document.getElementById('ElijeMesero').getElementsByTagName('option')[k].value){
                        document.getElementById('ElijeMesero').selectedIndex = k;
                    }
                }             
                document.getElementById("PopVerMesa").style.display = "flex";
                document.getElementById("VerMesa_Nombre").textContent = document.getElementsByName("MesaNombreMesa")[index].textContent;
                
            })
        })(i);
    }
}

function ActualizaContenidoMesa(){
    let Direccion = Restaurants.getRestauranteURLR() + Restaurante.getRestauranteid() + "/tables/" + Tableselection;
    console.log("ID: " + Tableselection);
    fetch(Direccion,{method:'GET'}).then(respuesta =>{
        return respuesta.json()
    }).then(data => {
        var pagado = "";
        var pagadoboton = "";

        document.getElementById("ContenedorClientes").innerHTML = "";
        document.getElementById('hora').textContent = "Hora: " + data.hour;
        for(var i=0; i<data.clients.length; i++){ //Comprobar variables
            if(data.clients[i].cashPaymentNotification){ //Cómo guardas la variable para saber si ya pago o no? //Eliminar cliente al concluir
                pagado = "Pagado";
                pagadoboton = "Deshabilitado";
            }else{
                pagado = "Confirmar Pago";
            }
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;
            document.getElementById('fecha').textContent = "Fecha: " + today;
            document.getElementById("ContenedorClientes").innerHTML += 
            `
            <div id="${data.clients[i].billId}" name="IDBill" class="cliente" style="position: relative;">
                <p style="position: absolute;  left: 20px; top: 10px; color: white;" name="NombreDelCliente">(${data.clients[i].seatId})${data.clients[i].clientName}</p>
                <p style="position: absolute;  left: 480px; top: 10px; color: white;" name="TotalCuenta">$${data.clients[i].total}</p>
                <button name="ConfirmarPagoCliente" id="${i}" class="button botonObscuro" style="position: absolute; top: 10px; left: 570px; width: 120px">Pagar</button>
            </div>
            <p></p>
            `
        }

        ActualizaVerInfoCliente();

        /*
        for(var i=0; i<document.getElementsByName('ConfirmarPagoCliente').length; i++){
            document.getElementsByName('ConfirmarPagoCliente')[i].addEventListener('click', function(){
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                var hour = today.getHours();
                var minutes = today.getMinutes();
                today = dd + '/' + mm + '/' + yyyy;
                var time = hour + ":" + minutes;
                console.log('Fecha:' + today + ' Hora:' + time);
        
                document.getElementById('Fecha').textContent = today;
                document.getElementById('Hora').textContent = time;
                
                document.getElementById('NombreCliente').value = document.getElementsByName('NombreDelCliente')[i].textContent;
                document.getElementById('NoMesa').value = Tableselection;
                document.getElementById('MeseroAsignado').value = document.getElementById('ElijeMesero').value;
                document.getElementById('Cuenta').value = document.getElementsByName('TotalCuenta')[i].textContent;
                document.getElementById('PopEgresosIngresos').style.display = 'flex';
            })
        }*/

    }).catch(console.error)
}

function ActualizaMeseros(){

    document.getElementById('ElijeMesero').innerHTML = `<option value="SinMesero">--Sin Mesero--</option>`;
    document.getElementById('TarjetasMeseros').innerHTML = `<div class="col-auto" style="width:200px;">
        <div class="TarjetaMesero" id="AgregarMesero">
            <div class="card-body">
                <i class="fas fa-user-plus agregarMesero"></i>
                <p></p>
                <div class="NombreMesero">Agregar mesero</div>
            </div>
        </div>
    </div> `;
    let Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/meseros"; //Esta dirección es solo de prueba | Restaurante.getRestauranteURL()  + Restaurante.getRestaurante + "/platillos";
    //Revisa Valores de data
    //Fetch meseros
    fetch(Direccion,{method:'GET'}).then(respuesta =>{
        return respuesta.json()
    }).then(data => {
        for(var i=0; i<data.length; i++){  
            
            document.getElementById('ElijeMesero').innerHTML += 
            `
                <option value="${data[i].nombre}">${data[i].nombre}</option>
            `
            
            

            document.getElementById('TarjetasMeseros').innerHTML += 
            `<div class="col-auto" style="width:200px;">
                <div name="Meseros" class="TarjetaMesero" id="${data[i].id}">
                    <div class="card-body">
                        <i class="far fa-user mesero"></i>
                        <p></p>
                        <div class="NombreMesero">${data[i].nombre}</div>
                    </div>
                </div>
                <div name="EliminarMesero" class="eliminar"><i class="fas fa-trash trash"></i></div>   
            </div>`
        }
        ActualizaSeleccionMeseros();
    }).catch(console.error)
}

function ActualizaSeleccionMeseros(){
    console.log("Meseros:" + SelecMesero.length);
    document.getElementById('AgregarMesero').addEventListener('click',function(){
        document.getElementById('PopCrearMesero').style.display = 'flex';
        document.getElementById("NombreMesero").style.borderColor = 'white';
        document.getElementById("NombreMesero").value = "";
    });
    for(var i = 0; i < SelecMesero.length; i++) {
        console.log("entra");
        (function(index) {
            document.getElementsByName("Meseros")[index].addEventListener("click", function() {
                console.log(index);
                console.log("Clicked index: " + SelecMesero[index].id);
            })
            document.getElementsByName('EliminarMesero')[index].addEventListener("click", function(){
                const Direccion = Restaurante.getRestauranteURLC() + Restaurante.getRestauranteid() +"/meseros/" + document.getElementsByName("Meseros")[index].id;
                fetch(Direccion,{method:'DELETE'}).then(respuesta =>{
                    ActualizaMeseros();
                }).catch(console.error);
            })
        })(i);
    }
}

function ActualizaSeleccionAsientos(){
    console.log("Asientos:" + SelecAsiento.length);
    for(var i = 0; i < SelecAsiento.length; i++) {
        console.log("entra");
        (function(index) {
            document.getElementsByName("AsientoQR")[index].addEventListener("click", function() {
                document.getElementById('PopVerAsiento').style.display = 'flex';
                console.log(index);
                console.log("Clicked index: " + SelecAsiento[index].id);
                SeatSelection = SelecAsiento[index].id;
                document.getElementById("QrImprimible").src = document.getElementsByName('URLQR').textContent; 
                document.getElementById("QrImprimible").src = document.getElementsByName('URLQR').id; 
            })
            document.getElementsByName("EliminarAsiento")[index].addEventListener("click", function() {

                console.log(index);
                console.log("Clicked index: " + SelecAsiento[index].id);
                const Direccion = Restaurants.getRestauranteURLR() + Restaurante.getRestauranteid() + "/tables/"+ Tableselection +"/seats/" + document.getElementsByName("AsientoQR")[index].id; //pendiente la dirección.
                fetch(Direccion,{method:'DELETE'}).then(respuesta =>{
                    ActualizaSeleccionAsientos();
                }).catch(console.error);
            })
        })(i);
    }
}

//Funciones para cerrar los pop ups{

    document.getElementById("closeAgregarProductoCliente").addEventListener('click', function(){
        document.getElementById("AgregarProductoCliente").style.display = 'none';
    })

    document.getElementById("closeCrearMesa").addEventListener('click',function(){
        document.getElementById('PopCrearMesa').style.display = 'none';
        document.getElementById('NombreMesa').value = "";
    });

    document.getElementById("closeCrearMesero").addEventListener('click',function(){
        document.getElementById('PopCrearMesero').style.display = 'none';
        document.getElementById('NombreMesero').value = "";
    });

    document.getElementById("closeVerMesa").addEventListener('click',function(){
        document.getElementById('PopVerMesa').style.display = 'none';
    });

    document.getElementById("closeCliente").addEventListener('click',function(){
        document.getElementById('PopVerInfoCliente').style.display = 'none';
        SelecProdCliente = "";
    });

    document.getElementById("closeContraseña").addEventListener('click',function(){
        document.getElementById('PopContraseña').style.display = 'none';
    });

    document.getElementById("closeAsientos").addEventListener('click',function(){
        document.getElementById('PopAsientos').style.display = 'none';
    });

    document.getElementById("closeVerAsiento").addEventListener('click',function(){
        document.getElementById('PopVerAsiento').style.display = 'none';
    });

    document.getElementById("closeEgresosIngresos").addEventListener('click',function(){
        document.getElementById('PopEgresosIngresos').style.display = 'none';
    });

    document.getElementById('closeRecibo').addEventListener('click', function(){
        document.getElementById('PopRecibo').style.display = 'none';
    });

//}

//funciones para Abrir los pop ups{
    document.getElementById('BotonAgregarProductoCliente').addEventListener('click',function(){
        document.getElementById('AgregarProductoCliente').style.display = 'flex';
        document.getElementById('TablaAgregarProductos').innerHTML = ''
        const Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/platillos";
        fetch(Direccion,{method:'GET'}).then(respuesta =>{
            return respuesta.json()
        }).then(data => {
            for(var i=0; i<data.length; i++){
            document.getElementById("TablaAgregarProductos").innerHTML += 
            `
            <tr>
                <td id="${data[i].id}" name="ProductoParaAgregar">${data[i].nombre}</td>
                <td name="ProductoPrecio">${data[i].precio}</td>
                <td>
                    <div class="centrado"> 
                        <input type="checkbox" name="ProductorSeleccionado">
                        <label></label>
                    </div>
                </td>
            </tr>
            `
            }
        }).catch(console.error)
    });

    document.getElementById('AgregarMesa').addEventListener('click',function(){
        document.getElementById('PopCrearMesa').style.display = 'flex';
    });

    document.getElementById('AbreVerAsientos').addEventListener('click', function(){
        document.getElementById('PopAsientos').style.display = 'flex';
        ActualizaVerAsientos();
    })

    function ActualizaVerAsientos(){
        let Direccion = Restaurants.getRestauranteURLR() + Restaurante.getRestauranteid() + "/tables/" + Tableselection + "/seats";
        document.getElementById('ContenedorQRS').innerHTML = ""
        fetch(Direccion,{method:'GET'}).then(respuesta =>{
            return respuesta.json()
        }).then(data => {
            for(var i=0; i<data.seats.length; i++){ //qrCodeURL
                document.getElementById('ContenedorQRS').innerHTML += `
            <i class="seleccionable fas fa-qrcode" style="font-size: 100px; position: relative; color: black; padding: 10px;">
            <i name="EliminarAsiento" class="material-icons" style="top: 0px; left:-12px; cursor: pointer; font-size: 25px; position: absolute; color: red; padding: 10px;">remove_circle</i>
                <i name="AsientoQR" id="${data.seats[i].id}" style="font-size: 15px; color: white; background-color: #224abe; padding: 5px; border-radius: 50%; position: absolute; left:85px; top: 0px; cursor: pointer; height: 25px; height: 25px;">
                    ${data.seats[i].id}
                </i>
                <div name="URLQR" class="NotShow">${data.seats[i].qrCodeURL}</div>
            </i>`
            }
            ActualizaSeleccionAsientos();
        }).catch(console.error) 
    }

    /*document.getElementById('PagarMesa').addEventListener('click', function(){
        document.getElementById('PopEgresosIngresos').style.display = 'flex';
    })*/

    //ver info de cliente actualizable
    function ActualizaVerInfoCliente(){
        console.log("Asientos:" + SelecCliente.length);
        for(var i = 0; i < SelecCliente.length; i++) {            
            (function(index) {
                SelecCliente[index].addEventListener("click", function() {
                    console.log(index);
                    indiceCliente = index;
                    console.log("Clicked index: " + SelecCliente[index].id);
                    ClienteSeleccionado = SelecCliente[index].id;
                    billSelection = document.getElementsByName('IDBill')[index].id;
                    console.log(billSelection)
                    const Direccion = Restaurants.getRestauranteURLR() + Restaurante.getRestauranteid() +"/tables/" + Tableselection + "/bills/" + SelecCliente[index].id; //pendiente la dirección.
                    fetch(Direccion,{method:'GET'}).then(respuesta =>{
                        return respuesta.json()
                    }).then(data => {
                        console.log(data)
                        document.getElementById('VerNombreCliente').textContent = document.getElementsByName('NombreDelCliente')[index].textContent 
                        document.getElementById('PopVerInfoCliente').style.display = 'flex';
                        if (document.getElementById(index).getAttribute("name") == "Pagado"){
                            document.getElementById('BotonPagarCliente').style.display = 'none';
                            document.getElementById('BotonAgregarProductoCliente').style.display = 'none';
                        }else{
                            document.getElementById('BotonPagarCliente').style.display = 'inline';
                            document.getElementById('BotonAgregarProductoCliente').style.display = 'inline';
                        }
                        document.getElementById("TablaProductosCliente").innerHTML = "";
                        for(var j=0; j<data.products.length; j++){  
                            document.getElementById("TablaProductosCliente").innerHTML +=
                            `
                            <tr>
                                <td class="seleccionable" id="${data.products[j].id}" name="SeleccionaProductoCliente">${data.products[j].name}</td>
                                <td>${data.products[j].price}</td>
                            </tr>
                            `  
                        }

                        for(var k = 0; k <document.getElementsByName('SeleccionaProductoCliente').length; k++) {            
                            (function(indice) {
                                document.getElementsByName('SeleccionaProductoCliente')[indice].addEventListener("click", function() {
                                    SelecProdCliente = document.getElementsByName('SeleccionaProductoCliente')[indice].id;
                                    console.log(SelecProdCliente);
                                })
                            })(k);
                        }
                            
                        
                    }).catch(console.error)
                })
            })(i);
        }
    }

    document.getElementById('BotonPagarCliente').addEventListener('click', function(){
        var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            var hour = today.getHours();
            var minutes = today.getMinutes();
            today = dd + '/' + mm + '/' + yyyy;
            var time = hour + ":" + minutes;
            console.log('Fecha:' + today + ' Hora:' + time);
    
            document.getElementById('Fecha').textContent = today;
            document.getElementById('Hora').textContent = time;
            
            document.getElementById('NombreCliente').value = document.getElementsByName('NombreDelCliente')[indiceCliente].textContent;
            document.getElementById('NoMesa').value = TablaSelectionName;
            document.getElementById('MeseroAsignado').value = document.getElementById('ElijeMesero').value;
            document.getElementById('Cuenta').value = document.getElementsByName('TotalCuenta')[indiceCliente].textContent;
        document.getElementById('PopEgresosIngresos').style.display = 'flex';
    })

   

    //contraseña, actualizable, pendiente
//}

//funciones Fetch-POST/PUT{

    document.getElementById('AsignarMesero').addEventListener('click', function(){
        if (document.getElementById('ElijeMesero').options[document.getElementById('ElijeMesero').selectedIndex].value != "SinMesero"){
            const Direccion = Restaurants.getRestauranteURLR() + Restaurante.getRestauranteid() + "/tables/" + Tableselection; //Esta dirección es solo de prueba
            let Categoria =  
                {
                    "waiterName": document.getElementById('ElijeMesero').options[document.getElementById('ElijeMesero').selectedIndex].value
                }
        
            fetch(Direccion,{method:'PATCH',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Categoria) }).then(respuesta =>{
                ActualizaMesas();
                return respuesta.json()
            }).then(data =>{
                console.log(data);
            }).catch(console.error);
        }
    })

    document.getElementById("AgregarAsiento").addEventListener('click', function(){
        const Direccion = Restaurants.getRestauranteURLR() + Restaurante.getRestauranteid() + "/tables/" + Tableselection + "/seats"; //Esta dirección es solo de prueba

        fetch(Direccion,{method:'POST',headers: { 'Content-Type': 'application/json' }}).then(respuesta =>{
            ActualizaVerAsientos();
            return respuesta.json()
        }).catch(console.error);
    })

    
    document.getElementById('AceptarProductosNuevos').addEventListener('click',function(){

        var check = document.getElementsByName('ProductorSeleccionado');
        var j=0;
        const Direccion = Restaurants.getRestauranteURLR() + Restaurante.getRestauranteid() + "/tables/" + Tableselection + "/bills/" + billSelection;
        if(check.length > 0){
            let Products = []
            for (var i=0; i<check.length; i++){
                if (check[i].checked){
                    
                    Products.push ({
                        "price": document.getElementsByName('ProductoPrecio')[i].textContent,
                        "name" : document.getElementsByName('ProductoParaAgregar')[i].textContent,
                        "observations" : ""
                    })
                }
            }
            
            fetch(Direccion,{method:'POST',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Products) }).then(respuesta =>{
                ActualizaVerInfoCliente();
                return respuesta.json()
            }).then(data =>{
                console.log(data);
            }).catch(console.error);
            
        }
  
        document.getElementById('AgregarProductoCliente').style.display = 'none';

    })

    document.getElementById('Crear').addEventListener('click', function(){
        const NombreMesa = document.getElementById("NombreMesa").value; 
    
        const Direccion = Restaurants.getRestauranteURLR() + Restaurante.getRestauranteid() + "/tables"; //Esta dirección es solo de prueba
        let Categoria = 
            {
                "name" : NombreMesa
            }
    
        fetch(Direccion,{method:'POST',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Categoria) }).then(respuesta =>{
            ActualizaMesas();
            return respuesta.json()
        }).then(data =>{
            console.log(data);
        }).catch(console.error);
    
        document.getElementById('PopCrearMesa').style.display = 'none';
        document.getElementById('NombreMesa').value = "";
    });


    document.getElementById('CrearMesero').addEventListener('click', function(){
        if (document.getElementById("NombreMesero").value != ""){
            document.getElementById('PopCrearMesero').style.display = 'none';

            let Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/meseros";

            let Categoria = 
            {
                "nombre" : document.getElementById("NombreMesero").value
            }

            fetch(Direccion,{method:'POST',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Categoria) }).then(respuesta =>{
                ActualizaMeseros();
                return respuesta.json()
            }).then(data =>{
                console.log(data);
            }).catch(console.error);
            
        }else{
            document.getElementById("NombreMesero").style.borderColor = 'red';
        }
    })

    document.getElementById('SiguientePagoMesa').addEventListener('click', function(){
        total = document.getElementById('Cuenta').value
        total = total.replace('$', "")
        document.getElementById('PopRecibo').style.display = 'flex';
        document.getElementById('InutilCambio').value = 0.0;
        document.getElementById('InutilRecibido').value = 0.0;
        document.getElementById('InutilTotal').value = parseFloat(total);
    })

    document.getElementById('InutilRecibido').addEventListener('change', (event) => {
        document.getElementById('InutilCambio').value = parseFloat(document.getElementById('InutilRecibido').value) - parseFloat(document.getElementById('InutilTotal').value);
      });
    
    document.getElementById('ConfirmarPagoMesa').addEventListener('click', function(){
        const Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/operaciones/" + Tableselection + "/" + billSelection; //Esta dirección es solo de prueba
            let Categoria =  //Cómo confirmo un pago de un cliente? qué reciben (aparte de esta) 
                {
                    "nombreCliente" : document.getElementById('NombreCliente').value,
                    "mesa" : document.getElementById('NoMesa').value,
                    "mesero" : document.getElementById('MeseroAsignado').value,
                    "cuenta" :  total,
                    "metodoPago" :  document.getElementById('PagoMetodo').value,
                    "fecha" :  document.getElementById('Fecha').textContent,
                    "hora" :  document.getElementById('Hora').textContent
                }
        
            fetch(Direccion,{method:'POST',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Categoria) }).then(respuesta =>{         
                return respuesta.json()
            }).then(data =>{
                console.log(data);
                ActualizaContenidoMesa();
                document.getElementById('PopEgresosIngresos').style.display = 'none';
                document.getElementById('PopRecibo').style.display = 'none';
                document.getElementById('PopVerInfoCliente').style.display = 'none';
            }).catch(console.error);

    })

//}

//función imprimir qr{ 
document.getElementById("ImprimirQR").addEventListener('click', function()
{
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>' +  document.title + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.getElementsByName('QrImprimible')[0].id  + '</h1>');
    mywindow.document.write(`<img src="${document.getElementsByName('QrImprimible')[0].src}" width="756px" height="756px">`);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
});
//}

//funciones 'PATCH'{

    document.getElementById('BotonEliminarCliente').addEventListener("click", function(){
        if (SelecProdCliente != ""){
            document.getElementById('PopContraseña').style.display = 'flex'
        }else{
            alert("Selecciona un producto para eliminarlo")
        }
    })

    document.getElementById('AceptarContraseña').addEventListener('click', function(){
        const Direccion = Restaurants.getRestauranteURLR() + Restaurante.getRestauranteid() + "/tables/" + Tableselection + "/bills/" + billSelection;
        console.log("ProductID:" + SelecProdCliente)
        console.log(Direccion)
        let Categoria = 
            {
                "productId" : SelecProdCliente,
                "password": document.getElementById('Contraseña').value
            }

        fetch(Direccion,{method:'PATCH',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Categoria) }).then(respuesta =>{
            console.log(respuesta)
            document.getElementById('PopContraseña').style.display = "none";
        }).then(data =>{
            console.log(data)
            ActualizaVerInfoCliente();
        }).catch(console.error);
    })


//}
