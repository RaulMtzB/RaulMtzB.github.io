import * as Restaurante from './Configuracion.js';

var selecMenu = "";
var CadenaPlatillosMenu = "";
var select = document.getElementById('menus');

ActualizaPlatillosMenus();
ActualizaMenus();


document.getElementById("menus").onchange = function() {FiltraMenus()};

document.getElementById('Agregar').addEventListener('click',function(){
    document.getElementById('PopMenu').style.display = 'flex';
    document.getElementById('NombreMenu').value = "";
    document.getElementById('AgregarMenu').style.display = 'inline';
    document.getElementById('AceptarMenu').style.display = 'none';
    let Platillos = document.getElementsByName('AlmacenarPlatillo');
    for (var j=0; j<Platillos.length; j++){
        Platillos[j].checked = false;
    }
});

document.querySelector('.close').addEventListener('click',function(){
    document.getElementById('PopMenu').style.display = 'none';
    document.getElementById('NombreMenu').setAttribute('value','')
});

document.getElementById('Editar').addEventListener('click',function(){
    var select = document.getElementById('menus');
    var nombre = select.options[select.selectedIndex].text;
    var value = select.options[select.selectedIndex].value;
    if (value != "ninguno"){
        let Platillos = document.getElementsByName('AlmacenarPlatillo');
        let NombresPlatillos = document.getElementsByName('DataPlatillo');
        let aux = "";
        let i = 0;
        while( i < value.length){
            aux = "";
            while(value[i] != "~"){
                aux += value[i];
                i = i+1;
            }

            for (var j=0; j<Platillos.length; j++){
                console.log(j)
                if (NombresPlatillos[j].id == aux){
                    Platillos[j].checked = true;
                }
            }           
            i = i+1;
        }
        document.getElementById('PopMenu').style.display = 'flex';
        document.getElementById('NombreMenu').value = nombre;
        document.getElementById('AgregarMenu').style.display = 'none';
        document.getElementById('AceptarMenu').style.display = 'inline';

    }else{
        alert ("Seleccione un menú");
    }    
});

document.getElementById('Borrar').addEventListener('click',function(){
    var value = select.options[select.selectedIndex].id;
    selecMenu = value;
    const Direccion = Restaurante.getRestauranteURLC() + Restaurante.getRestauranteid() +"/menu/" + selecMenu;
    fetch(Direccion,{method:'DELETE'}).then(respuesta =>{
        ActualizaMenus();
    }).catch(console.error);
});

document.getElementById('AgregarMenu').addEventListener('click',function(){
    if (document.getElementById('NombreMenu').value != ""){
        CadenaPlatillosMenu = "";
        var Cajitas = document.getElementsByName('AlmacenarPlatillo')
        var infoPlatillo = document.getElementsByName('DataPlatillo')
        for(var i=0; i<Cajitas.length; i++){
            if (Cajitas[i].checked){
                CadenaPlatillosMenu += infoPlatillo[i].id + "~";
            }
        }
        const Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/menu";
        let Categoria = 
            {
                "nombre" : document.getElementById('NombreMenu').value,
                "status" : true,
                "platillos" : CadenaPlatillosMenu
            }

            fetch(Direccion,{method:'POST',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Categoria) }).then(respuesta =>{
                ActualizaMenus();
                return respuesta.json()
            }).then(data =>{
                console.log(data);
            }).catch(console.error);
        document.getElementById('PopMenu').style.display = 'none';
    }else
        alert("Favor de colocarle un nombre al menú");
});

document.getElementById('AceptarMenu').addEventListener('click',function(){
    if (document.getElementById('NombreMenu').value != ""){
        CadenaPlatillosMenu = "";
        var Cajitas = document.getElementsByName('AlmacenarPlatillo')
        var infoPlatillo = document.getElementsByName('DataPlatillo')
        var value = select.options[select.selectedIndex].id;
        selecMenu = value;
        for(var i=0; i<Cajitas.length; i++){
            if (Cajitas[i].checked){
                CadenaPlatillosMenu += infoPlatillo[i].id + "~";
            }
        }
        const Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/menu/" + selecMenu; //Esta dirección es solo de prueba
        let Categoria = 
            {
                "nombre" : document.getElementById('NombreMenu').value,
                "status" : true,
                "platillos" : CadenaPlatillosMenu
            }

            fetch(Direccion,{method:'PATCH',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Categoria) }).then(respuesta =>{
                ActualizaMenus();
                return respuesta.json()
            }).then(data =>{
                console.log(data);
            }).catch(console.error);
    }else
        alert("Favor de colocarle un nombre al menú");
});

//funciones

function ActualizaPlatillosMenus(){
    let Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/platillos";


    fetch(Direccion,{method:'GET'}).then(respuesta =>{
        return respuesta.json()
    }).then(data => {
        const Tarjetas = document.getElementById("TarjetasMenus");
        let color = "";
        Tarjetas.innerHTML = "";

        if (data.length > 0){            
            for(var i=0; i<data.length; i++){
                if (data[i].estado == false){
                    color = 'style="border:rgb(212, 43, 43) 5px solid"';

                }else{
                    color = 'style="border:rgb(8, 190, 8) 5px solid"';
                }
                Tarjetas.innerHTML += `<div class="tarjetasM">
                                            <div class="cartaMenu" name="idPlatillo" id="${data[i].id}">
                                                <img name="imagen" src="${data[i].imagen}" width="243px" height="130px" ${color}>
                                                <div class="cuerpo-carta">
                                                    <p name="nombre">${data[i].nombre}</p>
                                                    <p class="descripcion" name="descripcion">Descripción: ${data[i].descripcion}</p>
                                                    <p name="precio">${data[i].precio}</p>
                                                    <p class="NotShow" name="disponibilidad">${data[i].estado}</p>
                                                    <p class="NotShow" name="categoria">${data[i].categoria}</p>
                                                    <p class="NotShow" name="ingredientesPlatillo">${data[i].ingredientes}</p>
                                                </div>
                                            </div>   
                                        </div>`
            }
        }

        FiltraMenus();

        const Tabla = document.getElementById('TablaPlatillosMenus');
        Tabla.innerHTML = '';
        var Disponibilidad = '';
        for(var i=0; i<data.length; i++){
            if (data[i].estado){ 
                Disponibilidad = "Activo";
            }else{
                Disponibilidad = "Inactivo";
            }
            Tabla.innerHTML += 
            `<tr>
                <td name="DataPlatillo" id="${data[i].id}">${data[i].nombre}</td>
                <td>${Disponibilidad}</td>
                <td>
                    <div class="centrado"> 
                        <input name="AlmacenarPlatillo" type="checkbox">
                    </div>
                </td>
            </tr>`
        }

    }).catch(console.error);
}

function ActualizaMenus(){
    let Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/menu";
    var activo = "";
    fetch(Direccion,{method:'GET'}).then(respuesta =>{
        return respuesta.json()
    }).then(data => {      
        const ListaMenus = document.getElementById("menus");
        ListaMenus.innerHTML = `<option value="ninguno" selected>Ninguna</option>`;            
        for(var i=0; i<data.length; i++){
            if (data[i].status){
                activo = "Activo"
            }else{
                activo = "Pausado"
            }
            ListaMenus.innerHTML += `<option id="${data[i].id}" value="${data[i].platillos}">${data[i].nombre}(${activo})</option>`
            console.log(data[i].platillos)
        }


        
        FiltraMenus();
    }).catch(console.error);
}

function FiltraMenus(){
    var select = document.getElementById('menus');
    var value = select.options[select.selectedIndex].value;
    var cadena;
    if (document.getElementById("menus").value != "ninguno"){
        for(var i = 0; i < document.getElementsByClassName("cartaMenu").length; i++){
                document.getElementsByClassName("tarjetasM")[i].style.display = 'none';
        }
        for (var j=0; j<value.length; j++){
            cadena = "";
            while (j<value.length && value[j]!="~"){
                cadena += value[j];
                j++
            }
            for(var i = 0; i < document.getElementsByName("idPlatillo").length; i++){
                if (document.getElementsByName("idPlatillo")[i].id == cadena)
                    document.getElementsByClassName("tarjetasM")[i].style.display = 'inline';
            }
        }   
    }        
    else{
        for(var i = 0; i < document.getElementsByClassName("cartaMenu").length; i++){
            document.getElementsByClassName("tarjetasM")[i].style.display = 'none';
        }
    }
}

document.getElementById('Pausar').addEventListener('click', function(){
    var value = select.options[select.selectedIndex].id;
    selecMenu = value;
    const Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/menu/" + selecMenu + "/"+false; //Esta dirección es solo de prueba
            fetch(Direccion,{method:'PATCH',headers: { 'Content-Type': 'application/json' }}).then(respuesta =>{
                ActualizaMenus();
                return respuesta.json()
            }).then(data =>{
                console.log(data);
            }).catch(console.error);
})

document.getElementById('Reanudar').addEventListener('click', function(){
    var value = select.options[select.selectedIndex].id;
    selecMenu = value;
    const Direccion = Restaurante.getRestauranteURLC()  + Restaurante.getRestauranteid() + "/menu/" + selecMenu + "/" + true; //Esta dirección es solo de prueba
            fetch(Direccion,{method:'PATCH',headers: { 'Content-Type': 'application/json' }}).then(respuesta =>{
                ActualizaMenus();
                return respuesta.json()
            }).then(data =>{
                console.log(data);
            }).catch(console.error);
})
