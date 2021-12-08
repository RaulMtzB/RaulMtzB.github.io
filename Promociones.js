import * as Restaurante from './Configuracion.js';

var SelecPromocion = "";
var CadenaPlatillos = '';

ActualizaPromociones();
ActualizaListaPlatillos();

document.getElementById("CrearPromo").addEventListener('click', function(){
    document.getElementById("PopPromos").style.display = "flex";
    document.getElementById("PlatillosSelecP").innerHTML= "";
    document.getElementById("NombrePromo").value = "";
    document.getElementById("PorcentajePromo").value = "";
    document.getElementById("DescripcionPromo").value = "";
    document.getElementById("EliminarPromo").style.display = 'none';
    document.getElementById("AgregarPromo").style.display = 'inline';
    document.getElementById("AceptarP").style.display = 'none';
})

document.getElementById("EliminarPromo").addEventListener('click', function(){
    const Direccion = Restaurante.getRestauranteURLC() + Restaurante.getRestauranteid() + "/promociones/" + SelecPromocion;
    fetch(Direccion,{method:'DELETE'}).then(respuesta =>{
        ActualizaPromociones();
        document.getElementById("PopPromos").style.display = "none";
    }).catch(console.error);
})


document.getElementById("closePopPromos").addEventListener('click', function(){
    document.getElementById("PopPromos").style.display = "none";
})

function ActualizaSeleccionPromociones(){
    console.log("Promociones:" + document.getElementsByName('NombrePromocion').length);
    for(var i = 0; i < document.getElementsByName('NombrePromocion').length; i++) {
        (function(index) {
            document.getElementsByName('NombrePromocion')[index].addEventListener("click", function() {
                console.log(index);
                console.log("Clicked index: " + document.getElementsByName('NombrePromocion')[index].id);
                SelecPromocion = document.getElementsByName('NombrePromocion')[index].id;
                document.getElementById("PopPromos").style.display = "flex";
                document.getElementById("PlatillosSelecP").innerHTML= ""; //pendiente*
                document.getElementById("NombrePromo").value = document.getElementsByName('NombrePromocion')[index].textContent;
                document.getElementById("PorcentajePromo").value = parseInt(document.getElementsByName('PorcentajePromocion')[index].textContent);
                document.getElementById("DescripcionPromo").value = document.getElementsByName('DescripcionPromocion')[index].textContent;                
                document.getElementById("PlatillosSelecP").innerHTML = '';
                document.getElementById("EliminarPromo").style.display = 'inline';
                document.getElementById("AgregarPromo").style.display = 'none';
                document.getElementById("AceptarP").style.display = 'inline';
                CadenaPlatillos = document.getElementsByName('ListaPlatillosPromocion')[index].textContent;
                var aux;
                let Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/platillos";  
                
                fetch(Direccion,{method:'GET'}).then(respuesta =>{
                    return respuesta.json()
                }).then(data => {

                    for (var j=0; j<CadenaPlatillos.length; j++){
                        aux = ""
                        while (CadenaPlatillos[j] != "~" && j<CadenaPlatillos.length){
                            aux += CadenaPlatillos[j];
                            j++;
                        }
                        for (var k=0; k<data.length; k++){
                            console.log(data[k].id + "==" + aux)
                            if (data[k].id == aux){
                                document.getElementById("PlatillosSelecP").innerHTML += 
                                `
                                    <li class="seleccionable" id=${aux}>${data[k].nombre}</li>
                                `
                                k=data.length;
                            }
                        }
                    }
                }).catch(console.error)
            })
        })(i);
    }
}

//Pedir platillos
function ActualizaListaPlatillos(){
    let Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/platillos";
    document.getElementById('SelecPlatillo').innerHTML = '<option value="Ninguno" selected>-Seleccione platillo-</option>'
    fetch(Direccion,{method:'GET'}).then(respuesta =>{
        return respuesta.json()
    }).then(data => {
        for(var i=0; i<data.length; i++){
            document.getElementById('SelecPlatillo').innerHTML += 
            `
                <option id="${data[i].id}" value="${data[i].id}">${data[i].nombre}</option>
            `
        }
    }).catch(console.error)
}

function ActualizaPromociones(){
    let Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/promociones"; //pendiente dirección y json
    document.getElementById('TablaPromociones').innerHTML = '';
    fetch(Direccion,{method:'GET'}).then(respuesta =>{
        return respuesta.json()
    }).then(data => {
        for(var i=0; i<data.length; i++){
            document.getElementById('TablaPromociones').innerHTML += 
            `
            <tr>
                <td class="seleccionable" name="NombrePromocion" id="${data[i].id}">${data[i].nombre}</td>
                <td name="PorcentajePromocion">${data[i].descuento}</td>
                <p class="NotShow" name="DescripcionPromocion">${data[i].descripcion}</p>
                <p class="NotShow" name="ListaPlatillosPromocion">${data[i].platillos}</p>
            </tr>
            `
        }
        console.log(document.getElementsByName("ListaPlatillosPromocion").length)
        console.log(document.getElementsByName("ListaPlatillosPromocion")[0].textContent)
        ActualizaSeleccionPromociones();
    }).catch(console.error)
}

document.getElementById('AgregarP').addEventListener('click', function(){
    var valor = document.getElementById('SelecPlatillo').options[document.getElementById('SelecPlatillo').selectedIndex].value;
    var text = document.getElementById('SelecPlatillo').options[document.getElementById('SelecPlatillo').selectedIndex].text;
    if (valor != "Ninguno"){
        document.getElementById("PlatillosSelecP").innerHTML += 
            `
                <li class="seleccionable" id=${valor}>${text}</li>
            `
        CadenaPlatillos += "~" + valor;
    }
})

document.getElementById('AceptarP').addEventListener('click', function(){
    if (document.getElementById("PorcentajePromo").value != "" && document.getElementById("NombrePromo").value != "" && CadenaPlatillos != ""){
        const Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/" + SelecPromocion; //Esta dirección es solo de prueba
        let Categoria = 
            {
                "nombre" : document.getElementById("NombrePromo").value,
                "descuento" : parseInt(document.getElementById("PorcentajePromo").value), //Confirmamos que es int?
                "descripcion": document.getElementById("DescripcionPromo").textContent,
                "platillos": CadenaPlatillos
            }

            fetch(Direccion,{method:'PUT',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Categoria) }).then(respuesta =>{
                ActualizaPromociones();
                return respuesta.json()
            }).then(data =>{
                console.log(data);
            }).catch(console.error)
    }else{
        alert("Se requiere contenido en los campos de nombre, descuento y lista de platillos");
    }  
})

document.getElementById('AgregarPromo').addEventListener('click', function(){
    if (document.getElementById("PorcentajePromo").value != "" && document.getElementById("NombrePromo").value != "" && CadenaPlatillos != ""){
        const Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/promociones"; //Esta dirección es solo de prueba
        CadenaPlatillos = CadenaPlatillos.replace('~',"");
        console.log(CadenaPlatillos);
        let Categoria = 
            {
                "nombre" : document.getElementById("NombrePromo").value,
                "descuento" : parseInt(document.getElementById("PorcentajePromo").value), //Confirmamos que es int?
                "descripcion": document.getElementById("DescripcionPromo").value,
                "platillos": CadenaPlatillos
            }

            
            console.log(Categoria)

            fetch(Direccion,{method:'POST',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Categoria) }).then(respuesta =>{
                ActualizaPromociones();
                return respuesta.json()
            }).then(data =>{
                console.log(data);
            }).catch(console.error)

        document.getElementById("PopPromos").style.display = 'none'
    }else{
        alert("Se requiere contenido en los campos de nombre, descuento y lista de platillos");
    }  
})


