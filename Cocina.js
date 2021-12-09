import * as Restaurante from './Configuracion.js';
//import ActualizaParaCocina as Mesas  from './Mesas.js';

console.log(Restaurante.getRestauranteid());
var SelectedProduct = "";


ActualizaCocinaMesas();
ActualizaPedidos();


if (Restaurante.getRestauranteid() == ""){
    window.location = "login.html";
}

document.getElementById("CerrarSesion").addEventListener('click', function(){
    console.log(Restaurante.getRestauranteid());
    Restaurante.setRestauranteid("");
    window.location = "login.html";
});


let eventSource = new EventSource(Restaurante.getRestauranteURLR() + Restaurante.getRestauranteid() +'/subscribe-notification', { method: 'GET', mode: 'cors'})
      let emitterId;

      eventSource.onerror = (error) => {
         console.log("Ocurrió un error al suscibirse a las notificaciones") 
      }

      eventSource.addEventListener("CashPayment", (event) => {
        console.log("Soy un evento CashPayment")
        ActualizaCocinaMesas();
      })

      eventSource.addEventListener("NewProductsInKitchen", (event) => {
        ActualizaPedidos();  
        ActualizaCocinaMesas();   
        console.log(event.data)
      })

      eventSource.addEventListener("INIT", (event) => {
        console.log("Canal abierto")
        emitterId = parseInt(event.data)
        console.log(emitterId)
        ActualizaPedidos();
        ActualizaCocinaMesas();
      })

      window.onbeforeunload = () => {
         eventSource.close();

         fetch(Restaurante.getRestauranteURLR() + Restaurante.getRestauranteid() + "/delete-notification?emitterId=" + emitterId)
      }


function ActualizaPedidos(){
    let Direccion = Restaurante.getRestauranteURLR() + Restaurante.getRestauranteid() + "/kitchen";

    console.log("Entra a actualiza")
    fetch(Direccion,{method:'GET'}).then(respuesta =>{
        return respuesta.json()
    }).then(data => {      
        if (window.location.pathname == "/Cocina.html"){
            document.getElementsByClassName('badge')[0].style.display = 'none'
            document.getElementById('TarjetasCocina').innerHTML = ""
            console.log(data.products.length)
            for (var i=0; i<data.products.length; i++){   
                document.getElementById('TarjetasCocina').innerHTML += 
                `
                <div name="CartaPedido" class="col-auto" style="width:250px;" id="${data.products[i].id}">
                    <div class="card mb-4" style="background-color: #e0d784 ; border-color: #d8cb59; width: 200px;  height:250px; border-radius: 0px;">
                        <div class="card-body">
                            <h6 name="MesaNombreMesa" style="color: black; height: 30px; overflow: auto;">${data.products[i].tableName} | Silla:${data.products[i].seatId}</h6>
                            <hr class="sidebar-divider my-0" style="border-color: black;">
                            <i name="CerarPedido" class="material-icons" style="top: -10px; left:164px; cursor: pointer; font-size: 25px; position: absolute; color: red; padding: 10px;">cancel</i>
                            <div style="color: black; overflow: auto;  height: 50px;">-Pedido: ${data.products[i].name}</div>
                            <div style="color: black; overflow:auto; height: 130px;">-Observaciones: ${data.products[i].observations}</div>
                        </div>
                    </div>   
                </div>
                `
            }
            ActualizaSeleccionPedidos();
        }else if (data.products.length == 0) {
            document.getElementsByClassName('badge')[0].style.display = 'none';
        } else {
            document.getElementsByClassName('badge')[0].style.display = 'inline';
            document.getElementsByClassName('badge')[0].textContent = data.products.length;
        }
    }).catch(console.error);
}

function ActualizaSeleccionPedidos(){
    console.log("Pedidos" + document.getElementsByName('CartaPedido').length)
    for(var i = 0; i < document.getElementsByName('CartaPedido').length; i++) {
        (function(index) {            
            document.getElementsByName('CerarPedido')[index].addEventListener("click", function() {
                SelectedProduct = document.getElementsByName('CartaPedido')[index].id;
                let Direccion = Restaurante.getRestauranteURLR() + Restaurante.getRestauranteid() + "/kitchen/?productId=" + SelectedProduct;
                fetch(Direccion,{method:'PATCH'}).then(respuesta =>{
                    ActualizaPedidos();
                }).catch(console.error);
            })
        })(i);
    }
}

function ActualizaCocinaMesas(){
    let Direccion = Restaurante.getRestauranteURLR() + Restaurante.getRestauranteid() + "/tables";
    var num = 0;
    fetch(Direccion,{method:'GET'}).then(respuesta =>{
        return respuesta.json()
    }).then(data => {
        for(var i=0; i<data.tables.length; i++){
            if (data.tables[i].cashPaymentNotification){
                num += 1;
            }
        }
        if (window.location.pathname == "/Mesas.html"){
            document.getElementsByClassName('badge')[1].style.display = 'none'
            //Mesas.ActualizaParaCocina();
        }else if (num == 0) {
            document.getElementsByClassName('badge')[1].style.display = 'none'
        } else {  
            document.getElementsByClassName('badge')[1].style.display = 'inline'
            document.getElementsByClassName('badge')[1].textContent = num;
        }
    }).catch(console.error);  
}
