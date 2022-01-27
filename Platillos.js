import * as Restaurante from './Configuracion.js';

var seleccionado;
var SelecPlatillo = document.getElementsByName('cartita');
var SelecCategoria = document.getElementsByName('selecCategoria');
var SelecIngrediente = document.getElementsByName('selecIngr');
var Catselection;
var IngrSelection;
var StrIngredientes;
var radios = document.getElementsByName('Opciones');

var Editado = false;


Actualiza(); 

document.getElementById("filtraCategorias").onchange = function() {FiltraCategoria()};

Array.prototype.forEach.call(radios, function(radio) {
    radio.onchange =  function() {FiltraCategoria()};
 });


function FiltraCategoria(){
    for(var i = 0; i < SelecPlatillo.length; i++){
        document.getElementsByClassName("tarjetas")[i].style.display = 'inline';
    }

    if (document.getElementById("filtraCategorias").value != "ninguno"){
        for(var i = 0; i < SelecPlatillo.length; i++){
            if (document.getElementsByName("categoria")[i].textContent != document.getElementById("filtraCategorias").value)
                document.getElementsByClassName("tarjetas")[i].style.display = 'none';
        }
    }
    else
        for(var i = 0; i < SelecPlatillo.length; i++){
            document.getElementsByClassName("tarjetas")[i].style.display = 'inline';
        }
    
    let marcado;
    for (var j=0; j<radios.length; j++){
        if (radios[j].checked){
            marcado = radios[j].value
        }
    }
    
    console.log(marcado);

    if (marcado != "N"){
        for(var i = 0; i < SelecPlatillo.length; i++){
            if (document.getElementsByName("Tipo")[i].textContent != marcado)
                document.getElementsByClassName("tarjetas")[i].style.display = 'none';
        }
    }

};

ActualizaSelecciónListaIngredientes();
//Funciones de actualización de datos
function ActualizaSelecciónPlatillo(){
    for(var i = 0; i < SelecPlatillo.length; i++) {
        (function(index) {
            
            SelecPlatillo[index].addEventListener("click", function() {
                console.log("Clicked index: " + SelecPlatillo[index].id);
                seleccionado = SelecPlatillo[index].id;
                document.getElementById('PopPlatillos').style.display = 'flex';
                document.getElementById('NombrePlatillo').value= document.getElementsByName("nombre")[index].textContent;
                document.getElementById('PrecioPlatillo').value=document.getElementsByName("precio")[index].textContent;
                document.getElementById('DescripcionPlatillo').value=document.getElementsByName("descripcion")[index].textContent;
                document.getElementById("platilloimg").src = document.getElementsByName("imagen")[index].src;
                if (document.getElementsByName("disponibilidad")[index].textContent == "true"){
                    document.getElementById("Disponibilidad").value = "Disponible";
                }else{
                    document.getElementById("Disponibilidad").value = "No Disponible";
                }
                if(document.getElementsByName("Tipo")[index].textContent=="D"){
                    document.getElementsByName("ElijeTipo")[0].checked = true;
                }else{
                    document.getElementsByName("ElijeTipo")[1].checked = true;
                }
                document.getElementById("ElijeCategoria").value = document.getElementsByName("categoria")[index].textContent;
                document.getElementById("AcomodaBotones").style.left = '20%';
                document.getElementById("Eliminar").style.display = 'inline';
                document.getElementById("Agregar").style.display = 'none';
                document.getElementById("Aceptar").style.display = 'inline';
                StrIngredientes = document.getElementsByName("ingredientesPlatillo")[index].textContent;
                console.log(StrIngredientes);
            })
        })(i);
    }
}

function ActualizaSelecciónListaIngredientes(){
    document.getElementById('TablaListaIngredientes').innerHTML = "";
    for(var i = 0; i < SelecIngrediente.length; i++) {
            document.getElementById('TablaListaIngredientes').innerHTML +=
            `
            <tr>
                <td class="seleccionable" name="SeleccionaIngrediente">${SelecIngrediente[i].textContent}</td>
                <td><input class="InputCuadrito" type="number" style="width: 20%" name="CantidadIngrediente"></td>
            </tr>
            `      
    }
}    

function ActualizaSelecciónCategoria (){
    console.log("Categorias:" + SelecCategoria.length);
    for(var i = 0; i < SelecCategoria.length; i++) {
        (function(index) {
            SelecCategoria[index].addEventListener("click", function() {
                console.log(index);
                console.log("Clicked index: " + SelecCategoria[index].id);
                Catselection = SelecCategoria[index].id;
            })
        })(i);
    }
}


function ActualizaSeleccionIngredientes (){
    console.log("Ingredientes: " + SelecIngrediente.length);
    for(var i = 0; i < SelecIngrediente.length; i++) {
        (function(index) {
            SelecIngrediente[index].addEventListener("click", function() {
                console.log(index);
                console.log("Clicked index: " + SelecIngrediente[index].id);
                IngrSelection = SelecIngrediente[index].id;
                document.getElementById('PopCrearIngrediente').style.display = 'flex';
                document.getElementById('NombreIngrediente').value= document.getElementsByName("selecIngr")[index].textContent;
                document.getElementById('RestanteIngrediente').value=document.getElementsByName("Restante")[index].textContent;
                document.getElementById("EliminarIngrediente").style.display = 'inline';
                document.getElementById("AgregarIngrediente").style.display = 'none';
                document.getElementById("AceptarIngrediente").style.display = 'inline';
            })
        })(i);
    }
}



function ActualizaAgregar(){
    document.getElementById('AgregarPlatillo').addEventListener('click',function(){
        document.getElementById('PopPlatillos').style.display = 'flex';
        document.getElementById('NombrePlatillo').style.backgroundColor= 'white';
        document.getElementById('DescripcionPlatillo').style.backgroundColor= 'white';
        document.getElementById('PrecioPlatillo').style.backgroundColor= 'white';
        document.getElementById('NombrePlatillo').value="";
        document.getElementById('PrecioPlatillo').value="";
        document.getElementById('DescripcionPlatillo').value="";
        document.getElementById('Disponibilidad').value = "Disponible";
        document.getElementById("platilloimg").src = "";
        document.getElementById("archivoimg").value = "";
        document.getElementById("AcomodaBotones").style.left = '30%';
        document.getElementById("Eliminar").style.display = 'none';
        document.getElementById("Agregar").style.display = 'inline';
        document.getElementById("Aceptar").style.display = 'none';
        document.getElementsByName("ElijeTipo")[0].checked = true;
        document.getElementById("CadenaIngredientes").textContent = "";
        StrIngredientes = "";
    });    
}


//Funciones de cierre y apertura de ventanas emergentes

document.getElementById('closePlatillos').addEventListener('click',function(){
    document.getElementById('PopPlatillos').style.display = 'none';
});

document.getElementById('closeListaIngredientes').addEventListener('click',function(){
    document.getElementById('PopListaIngredientes').style.display = 'none';
});

document.getElementById('closeIngredientes').addEventListener('click',function(){
    document.getElementById('PopIngredientes').style.display = 'none';
});

document.getElementById('closeCategorias').addEventListener('click',function(){
    document.getElementById('PopCategorias').style.display = 'none';
});

document.getElementById('closeCrearIngrediente').addEventListener('click',function(){
    document.getElementById('PopCrearIngrediente').style.display = 'none';
});

document.getElementById('Categorias').addEventListener('click', function(){
    document.getElementById('PopCategorias').style.display = 'flex';
});


document.getElementById('closeAgregarCategorias').addEventListener('click', function(){
    document.getElementById('PopAgregarCategoria').style.display = 'none';
    document.getElementById('InputCategoria').style.borderColor = 'white';
});


//Función de actualización de datos respecto a la base de datos.
//
//
//Importante

function Actualiza(){

    ActualizaIngredientes();
    ActualizaCategorías();
    ActualizaPlatillos();
    ActualizaAgregar();
    
}

//Actualiza Ingredientes tanto de el popup ingredientes como del popup listaingrendientes

function ActualizaIngredientes(){
    let Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/ingredientes";

    document.getElementById('TablaIngredientes').innerHTML = ""
    fetch(Direccion,{method:'GET'}).then(respuesta =>{
        return respuesta.json()
    }).then(data => {
        for(var i=0; i<data.length; i++){
            document.getElementById('TablaIngredientes').innerHTML += `
            <tr>
                <td class="seleccionable" name="selecIngr" id="${data[i].id}">${data[i].nombre}</td>
                <td name="Consumido">${data[i].consumido}</td>
                <td name="Restante">${data[i].restante}</td>
            </tr>
            `
        }
        ActualizaSeleccionIngredientes();
        ActualizaSelecciónListaIngredientes();
    }).catch(console.error)
}

function ActualizaPlatillos(){
    let Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/platillos";
    let identifier;
    let Tumbnail = "";

    fetch(Direccion,{method:'GET'}).then(respuesta =>{
        return respuesta.json()
    }).then(data => {
        const Tarjetas = document.getElementById("TarjetasPlatillos");
        let color = "";
        let tipo = "";
        Tarjetas.innerHTML = "";

        if (data.length > 0){            
            for(var i=0; i<data.length; i++){
                if (data[i].estado == false){
                    color = 'style="border:rgb(212, 43, 43) 5px solid"';

                }else{
                    color = 'style="border:rgb(8, 190, 8) 5px solid"';
                }
                if (data[i].alimento == true){
                    tipo = "D";

                }else{
                    tipo = "F";
                }
                Tarjetas.innerHTML += `<div class="tarjetas">
                                            <div class="carta" name="cartita" id="${data[i].id}">
                                                <img name="imagen" src="${data[i].imagen}" width="243px" height="130px" ${color}>
                                                <div class="cuerpo-carta">
                                                    <p name="nombre">${data[i].nombre}</p>
                                                    <div class="descripcion">Descripción: <div name="descripcion">${data[i].descripcion}</div></div>
                                                    <p name="precio">${data[i].precio}</p>
                                                    <p class="NotShow" name="disponibilidad">${data[i].estado}</p>
                                                    <p class="NotShow" name="categoria">${data[i].categoria}</p>
                                                    <p class="NotShow" name="ingredientesPlatillo">${data[i].ingredientes}</p>
                                                    <p class="NotShow" name="Tipo">${tipo}</p>
                                                </div>
                                            </div>   
                                        </div>`
            }
            ActualizaSelecciónPlatillo();
        }
    }).catch(console.error);
    ActualizaSelecciónPlatillo();
}

function ActualizaCategorías(){

    let Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/categorias"; //Esta dirección es solo de prueba | Restaurante.getRestauranteURL()  + Restaurante.getRestaurante + "/platillos";

    //Revisa Cantidad
    document.getElementById('TablaCategorias').innerHTML = ""
    fetch(Direccion,{method:'GET'}).then(respuesta =>{
        return respuesta.json()
    }).then(data => {
        for(var i=0; i<data.length; i++){  
            document.getElementById('TablaCategorias').innerHTML += 
            `
            <tr>
                <td class="seleccionable" name="selecCategoria" id="${data[i].id}">${data[i].nombre}</td>
                <td name="Cantidad" style="width: 180px;">${data[i].numeroPlatillos}</td> 
            </tr>
            `

            document.getElementById('ElijeCategoria').innerHTML = "";
            document.getElementById('ElijeCategoria').innerHTML +=`<option value="SinCategoría" selected>--Sin Categoria--</option>`
            document.getElementById('ElijeCategoria').innerHTML +=`<option value=${data[i].nombre}> ${data[i].nombre}</option>`  
        }
        ActualizaSelecciónCategoria();
      
        document.getElementById('ElijeCategoria').innerHTML =`<option value="SinCategoría" selected>--Sin Categoria--</option>`
        for(var i = 0; i < SelecCategoria.length; i++) {    
            document.getElementById('ElijeCategoria').innerHTML +=`<option value=${document.getElementsByName('selecCategoria')[i].textContent}> ${document.getElementsByName('selecCategoria')[i].textContent}</option>`  
        }

        document.getElementById('filtraCategorias').innerHTML =`<option value="ninguno" selected>Ninguna</option>`
        for(var i = 0; i < SelecCategoria.length; i++) {    
            document.getElementById('filtraCategorias').innerHTML +=`<option value=${document.getElementsByName('selecCategoria')[i].textContent}> ${document.getElementsByName('selecCategoria')[i].textContent}</option>`  
        }

    }).catch(console.error)
}



//Función para confirmar la adición de un platillo a la base de datos
document.getElementById('Aceptar').addEventListener('click',function(){
    document.getElementById('NombrePlatillo').style.backgroundColor= 'white';
    document.getElementById('DescripcionPlatillo').style.backgroundColor= 'white';
    document.getElementById('PrecioPlatillo').style.backgroundColor= 'white';
    var select = document.getElementById('Disponibilidad');
    var valor = select.options[select.selectedIndex].value;
    var disp;
    var alimento;

    if (valor == "Disponible"){
        disp = true;
    } else if (valor == "No Disponible"){
        disp = false; 
    }

    select = document.getElementById('NombrePlatillo');
    var nomPlat = select.value;

    select = document.getElementById('DescripcionPlatillo');
    var Descr = select.value;

    select = document.getElementById('PrecioPlatillo');
    var Precio = select.value;

    if  (nomPlat == ""){
        document.getElementById('NombrePlatillo').style.borderColor = 'red';
    }
    else if  (Descr == ""){
        document.getElementById('DescripcionPlatillo').style.borderColor = 'red';
    }
    else if  (Precio == ""){
        document.getElementById('PrecioPlatillo').style.borderColor = 'red';
    }
    else{

        const Direccion = Restaurante.getRestauranteURL()  + Restaurante.getRestauranteid() + "/platillos"; //Esta dirección es solo de prueba | Restaurante.getRestauranteURL()  + restaurante + "platillos";

        const imagen = document.getElementById("archivoimg");
        const formData = new FormData();
        let tipo;

        formData.append("file", imagen.files[0]);
        for (var j=0; j<document.getElementsByName('ElijeTipo').length; j++){
            if (document.getElementsByName('ElijeTipo')[j].checked){
                tipo = false;
            }else{
                tipo = true;
            }
        }

        var StringASeparar = document.getElementById("CadenaIngredientes").textContent;
        var Ingredientes = "";
        var CantidadIngredientes = "";
        var IngOCant = true;

        for(var i = 0; i<StringASeparar.length; i++){
            var cadenita = "";
            while (StringASeparar[i] != "~"){
                cadenita += StringASeparar[i];
                i++; 
            }
            i++;
            if (IngOCant){
                IngOCant = false;
                if(Ingredientes == ""){
                    Ingredientes += cadenita;
                }else{
                    Ingredientes += "~" + cadenita;
                }            
            }else{
                IngOCant = true;
                if(CantidadIngredientes == ""){
                    CantidadIngredientes += cadenita;
                }else{
                    CantidadIngredientes += "~" + cadenita;
                }    
            }
        }

        let platillo = 
            {
                "nombre" : nomPlat,
                "descripcion" : Descr,
                "ingredientes" : Ingredientes, 
                "cantidadIngrediente": CantidadIngredientes,
                "imagen" : "",
                "descuento": "",
                "precio" : Precio,
                "estado" : disp,
                "categoria": document.getElementById('ElijeCategoria').options[document.getElementById('ElijeCategoria').selectedIndex].value,
                "alimento": tipo
            }

        let identifier;
        let Tumbnail = "";
        console.log("Llega")
        

            fetch(Restaurante.getRestauranteURLC() + Restaurante.getRestauranteid() +"/platillos/" + seleccionado,{method:'PATCH',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(platillo) }).then(respuesta =>{
                ActualizaPlatillos();
                return respuesta.json();
            }).then(data => {
                if (Editado){
                    //fetch(Restaurante.getRestauranteURLC() + Restaurante.getRestauranteid() + "/platillo/" + data.id + "/imagenplatillo",{method:'POST', body: formData }).catch(console.error);
                    fetch(Restaurante.getRestauranteURLC() + Restaurante.getRestauranteid() + "/platillo/" + seleccionado + "/imagenplatillo",{method:'POST', body: formData }).catch(console.error);
                    Editado = false;
                }
            }).catch(console.error);

            document.getElementById('PopPlatillos').style.display = 'none';
           
    }    

    
})


window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            Editado = true;
            var img = document.getElementById("platilloimg");
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
            }
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
        }
    });
}); 

document.getElementById('AbreAgregarCategoria').addEventListener('click', function(){
    document.getElementById('PopAgregarCategoria').style.display = "flex"
});

document.getElementById('AgregarCategoria').addEventListener('click',function(){
    if(document.getElementById('InputCategoria').value != ""){
        const Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/categorias"; //Esta dirección es solo de prueba
        let Categoria = 
            {
                "nombre" : document.getElementById('InputCategoria').value,
                "numeroPlatillos" : 0
            }

            fetch(Direccion,{method:'POST',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Categoria) }).then(respuesta =>{
                ActualizaCategorías();
                return respuesta.json()
            }).then(data =>{
                console.log(data);
            }).catch(console.error);

        
        document.getElementById('InputCategoria').value = "";
        document.getElementById('InputCategoria').style.borderColor = 'white';
        document.getElementById('PopAgregarCategoria').style.display = "none";      
    }else{
        document.getElementById('InputCategoria').style.borderColor = 'crimson';
    }
});

document.getElementById('ListaIngredientes').addEventListener('click', function(){
    for (var j = 0; j<document.getElementsByName('SeleccionaIngrediente').length; j++){
    document.getElementsByName('CantidadIngrediente')[j].value = "";
    }
    document.getElementById('PopListaIngredientes').style.display = "flex";
    for(var i = 0; i<StrIngredientes.length; i++){
        var cadenita = "";
        var valor = "";
        while (StrIngredientes[i] != "~"){
            cadenita += StrIngredientes[i];
            i++; 
        }
        console.log(cadenita + " " + i);
        i++;
        while (StrIngredientes[i] != "~" && i < StrIngredientes.length){
            valor += StrIngredientes[i];
            i++;
            console.log(valor+ " " + i);
        }
        let lista = document.getElementsByName('SeleccionaIngrediente');
        console.log("Es: " + document.getElementsByName('SeleccionaIngrediente')[0].textContent);
        for (var j = 0; j<lista.length; j++){
            if  (cadenita == lista[j].textContent){          
                document.getElementsByName('CantidadIngrediente')[j].value = valor;
            }
        }
    }
});

document.getElementById('Ingredientes').addEventListener('click', function(){
    document.getElementById('PopIngredientes').style.display = "flex";
});

document.getElementById('AbreCrearIngrediente').addEventListener('click', function(){
    document.getElementById('PopCrearIngrediente').style.display = "flex";
    document.getElementById("EliminarIngrediente").style.display = 'none';
    document.getElementById("AgregarIngrediente").style.display = 'inline';
    document.getElementById("AceptarIngrediente").style.display = 'none';
});


document.getElementById("AbreCrearIngrediente2").addEventListener('click', function(){
    document.getElementById("PopIngredientes").style.display ="flex";
});

document.getElementById('EliminarCategoria').addEventListener('click', function(){
    const Direccion = Restaurante.getRestauranteURLC() + Restaurante.getRestauranteid() +"/categorias/" + Catselection;
    fetch(Direccion,{method:'DELETE'}).then(respuesta =>{
        ActualizaCategorías();
    }).catch(console.error);
});

document.getElementById("AgregarIngrediente").addEventListener('click', function(){
    if(document.getElementById('NombreIngrediente').value != "" && document.getElementById('RestanteIngrediente').value != ""){
        const Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/ingredientes"; //Esta dirección es solo de prueba
        let Categoria = 
            {
                "nombre" : document.getElementById('NombreIngrediente').value,
                "restante" : document.getElementById('RestanteIngrediente').value
            }

            fetch(Direccion,{method:'POST',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Categoria) }).then(respuesta =>{
                ActualizaIngredientes();
                return respuesta.json()
            }).catch(console.error);

        document.getElementById('NombreIngrediente').value = "";
        document.getElementById('RestanteIngrediente').value = "";
        document.getElementById('NombreIngrediente').style.borderColor = 'white';
        document.getElementById('PopCrearIngrediente').style.display = "none";      
    }else{
        document.getElementById('NombreIngrediente').style.borderColor = 'crimson';
    }
});

document.getElementById("AceptarIngrediente").addEventListener('click', function(){
    if(document.getElementById('NombreIngrediente').value != "" && document.getElementById('RestanteIngrediente').value != ""){
        const Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/ingredientes/" + IngrSelection; //Esta dirección es solo de prueba
        let Categoria = 
            {
                "nombre" : document.getElementById('NombreIngrediente').value,
                "restante" : parseInt(document.getElementById('RestanteIngrediente').value)
            }

            fetch(Direccion,{method:'PATCH',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Categoria) }).then(respuesta =>{
                ActualizaIngredientes();
                return respuesta.json()
            }).catch(console.error);
            
        
        document.getElementById('NombreIngrediente').value = "";
        document.getElementById('RestanteIngrediente').value = "";
        document.getElementById('NombreIngrediente').style.borderColor = 'white';
        document.getElementById('PopCrearIngrediente').style.display = "none";      
    }else{
        document.getElementById('NombreIngrediente').style.borderColor = 'crimson';
        document.getElementById('RestanteIngrediente').style.borderColor = 'crimson';
    }
});

document.getElementById("EliminarIngrediente").addEventListener('click', function(){
    const Direccion = Restaurante.getRestauranteURLC() + Restaurante.getRestauranteid() +"/ingredientes/" + IngrSelection;
    fetch(Direccion,{method:'DELETE'}).then(respuesta =>{
        ActualizaIngredientes();
    }).catch(console.error);
});

document.getElementById("Eliminar").addEventListener('click', function(){
    const Direccion = Restaurante.getRestauranteURLC() + Restaurante.getRestauranteid() +"/platillos/" + seleccionado;
    fetch(Direccion,{method:'DELETE'}).then(respuesta =>{
        ActualizaPlatillos();
    }).catch(console.error);
    document.getElementById("PopPlatillos").style.display = "none";
});

document.getElementById("AceptarCadenaIngredientes").addEventListener('click', function(){
    let lista = document.getElementsByName('SeleccionaIngrediente');
    StrIngredientes = "";
    for (var j = 0; j<lista.length; j++){
        if  (document.getElementsByName('CantidadIngrediente')[j].value != ""){          
            StrIngredientes += document.getElementsByName('SeleccionaIngrediente')[j].textContent + "~" + document.getElementsByName('CantidadIngrediente')[j].value + "~";
        }
    }
    var mide = StrIngredientes.length-1;
    var aux ="";
    for (var j = 0; j<mide; j++){
        aux += StrIngredientes[j];
    }
    StrIngredientes = aux;
    console.log(StrIngredientes);
    document.getElementById('CadenaIngredientes').textContent = StrIngredientes;
    document.getElementById('PopListaIngredientes').style.display = "none";
});

document.getElementById("Agregar").addEventListener('click', function(){
    document.getElementById('NombrePlatillo').style.backgroundColor= 'white';
    document.getElementById('DescripcionPlatillo').style.backgroundColor= 'white';
    document.getElementById('PrecioPlatillo').style.backgroundColor= 'white';
    var select = document.getElementById('Disponibilidad');
    var valor = select.options[select.selectedIndex].value;
    var disp;

    if (valor == "Disponible"){
        disp = true;
    } else if (valor == "No Disponible"){
        disp = false; 
    }

    select = document.getElementById('NombrePlatillo');
    var nomPlat = select.value;

    select = document.getElementById('DescripcionPlatillo');
    var Descr = select.value;

    select = document.getElementById('PrecioPlatillo');
    var Precio = select.value;

    if  (nomPlat == ""){
        document.getElementById('NombrePlatillo').style.borderColor = 'red';
    }
    else if  (Descr == ""){
        document.getElementById('DescripcionPlatillo').style.borderColor = 'red';
    }
    else if  (Precio == ""){
        document.getElementById('PrecioPlatillo').style.borderColor = 'red';
    }
    else{

        const Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/platillos"; 

        const imagen = document.getElementById("archivoimg");
        const formData = new FormData();

        formData.append("file", imagen.files[0]);
        console.log(imagen.files[0]);
        var numero = Number(Precio);
        let tipo;
        for (var j=0; j<document.getElementsByName('ElijeTipo').length; j++){
            if (document.getElementsByName('ElijeTipo')[j].checked){
                tipo = false;
            }else{
                tipo = true;
            }
        }
        
        
        var StringASeparar = document.getElementById("CadenaIngredientes").textContent;
        var Ingredientes = "";
        var CantidadIngredientes = "";
        var IngOCant = true;

        for(var i = 0; i<StringASeparar.length; i++){
            var cadenita = "";
            while (StringASeparar[i] != "~"){
                cadenita += StringASeparar[i];
                i++; 
            }
            i++;
            if (IngOCant){
                IngOCant = false;
                if(Ingredientes == ""){
                    Ingredientes += cadenita;
                }else{
                    Ingredientes += "~" + cadenita;
                }            
            }else{
                IngOCant = true;
                if(CantidadIngredientes == ""){
                    CantidadIngredientes += cadenita;
                }else{
                    CantidadIngredientes += "~" + cadenita;
                }    
            }
        }

        let platillo = 
            {
                "nombre" : nomPlat,
                "descripcion" : Descr,
                "ingredientes" : Ingredientes, 
                "cantidadIngrediente": CantidadIngredientes,
                "imagen" : "",
                "descuento": "",
                "precio" : Precio,
                "estado" : disp,
                "categoria": document.getElementById('ElijeCategoria').options[document.getElementById('ElijeCategoria').selectedIndex].value,
                "alimento": tipo
            }

        let identifier;
        let Tumbnail = "";

            fetch(Direccion,{method:'POST',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(platillo) }).then(respuesta =>{
                
                ActualizaPlatillos();
                return respuesta.json();
            }).then(data => {
                console.log(data.id);
                fetch(Restaurante.getRestauranteURLC() + Restaurante.getRestauranteid() + "/platillo/" + data.id + "/imagenplatillo",{method:'POST', body: formData }).catch(console.error);
            }).catch(console.error);

            document.getElementById('PopPlatillos').style.display = 'none';

            
           
    }  
});

