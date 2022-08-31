
//OBJETO CORTINAS
class Cortina{
    constructor(tipoCortina=" ", tipoTela=" ", color=" ", mecanismo=" ", ancho=1, alto=1){
        this.tipoCortina=tipoCortina
        this.tipoTela=tipoTela
        this.color=color
        this.mecanismo=mecanismo
        this.ancho=ancho
        this.alto=alto
        this.superficie=((this.ancho*this.alto)/10000) //pasa cm2 a m2 (ya que el costo se calcula con un valor por m2)
        this.presupuesto=((this.superficie*costoMetro)*iva)
        this.cantidad=cantidad
    }
}

//VARIABLES
let superficie, presupuesto
let cantidad = 1
let costoMetro = 17500
let costoMotor = 8000
const iva = 1.21
let cortinasTotales = 0

//ARRAY
let arrayCortinas = [];
let arrayCarrito = [];

//CONSULTO SI EXISTE EL SESSIONSTORAGE 
let arrayStorage
if(JSON.parse(sessionStorage.getItem('Cortinas'))){
    arrayStorage = JSON.parse(sessionStorage.getItem('Cortinas'))
}else{
    sessionStorage.setItem('Cortinas', JSON.stringify([]))
    arrayStorage = JSON.parse(sessionStorage.getItem('Cortinas'))
}

//CONSULTO SI EXISTE EL SESSIONSTORAGE
let carritoStorage
if(JSON.parse(localStorage.getItem('Carrito'))){
    carritoStorage = JSON.parse(localStorage.getItem('Carrito'))
}else{
    localStorage.setItem('Carrito', JSON.stringify([]))
    carritoStorage = JSON.parse(localStorage.getItem('Carrito'))
}

//CONSULTO DOM POR ID
const form = document.getElementById('idForm')
const divProductoCortina = document.getElementById("productoCortina")
const contadorCarrito = document.getElementById('contadorCarrito')
const iconoCarrito = document.getElementById('idCarrito')
const divCarrito = document.getElementById('divCarrito')
const vaciarElCarrito = document.getElementById('vaciarCarrito')
const finalizarLaCompra = document.getElementById('finalizarCompra')
const costoTotal = document.getElementById('idCostoTotal')
const cortinaPromo = document.getElementById('idCortinaPromo')
const botonPromo = document.getElementById('idBotonPromo')


//EVENTO DEL FORM
form.addEventListener('submit', (e)=>{
    e.preventDefault() //Prevengo que se recargue la pagina.

    //CONSULTO LOS INPUTS
    const tipoCortina = document.getElementById('idTipoCortina').value
    const tipoTela = document.getElementById('idTipoTela').value
    const color = document.getElementById('idColor').value
    const mecanismo = document.getElementById('idMecanismo').value
    const ancho = document.getElementById('idAncho').value
    const alto = document.getElementById('idAlto').value
    let borrar1 = document.getElementById('cortinaSeleccionada').innerHTML = ""
    let borrar2 = document.getElementById('telaSeleccionada').innerHTML = ""
    let borrar3 = document.getElementById('colorSeleccionado').innerHTML = ""
    let borrar4 = document.getElementById('mecanismoSeleccionado').innerHTML = ""

    //Creo objetos y agrego al array
    arrayCortinas=JSON.parse(sessionStorage.getItem('Cortinas'))
    const productoCortina = new Cortina(tipoCortina, tipoTela, color, mecanismo, ancho, alto)
    arrayCortinas.push(productoCortina)

    //Guardo los datos en el sessionStorage
    let auxiliar = sessionStorage.setItem('Cortinas', JSON.stringify(arrayCortinas))
        
    //limpio formulario
    form.reset() //idForm.reset()

    mostrarInfo(auxiliar)
})

//MUESTRO CORTINAS 
const mostrarInfo = (cortina) => {
    let arrayStorage = JSON.parse(sessionStorage.getItem('Cortinas'))
    divProductoCortina.innerHTML= "";
    arrayStorage.forEach((cortina, indice)=>{
        
        //IMAGENES DE LA CARD SEGUN EL TIPO DE CORTINA
        let fotoCortina = " "
        if(cortina.tipoCortina=="Roller"){
            fotoCortina = Image.innerHTML=`<img class="w-100 mb-3" src="../imagenes/CORTINA ENROLLABLE 7.jpg">`  
        }else if(cortina.tipoCortina=="Bandas Verticales"){
            fotoCortina = Image.innerHTML=`<img class="w-100 mb-3" src="../imagenes/CORTINA VERTICAL 3.jpg">` 
        }else{
            fotoCortina = Image.innerHTML=`<img class="w-100 mb-3" src= "../imagenes/CORTINA ENROLLABLE DUO 4.jpg">` 
        }
        
        //PRESUPUESTO CON COSTO MOTOR - uso de OPERADOR TERNARIO
        (cortina.mecanismo=="Motorizado") ? cortina.presupuesto = cortina.presupuesto + costoMotor : " "  
        
        divProductoCortina.innerHTML += `
        <div id="producto${indice}" class="productos row">
            <div class="col-xl-6 col-md-12">
                <img class="fotosCard">${fotoCortina}</img>
            </div>
            <div class="col-xl-6 col-md-12">
                <h3>Cortina: ${cortina.tipoCortina}</h3>
                <p class="my-0">Tipo de Tela: ${cortina.tipoTela}</p>
                <p class="my-0">Color: ${cortina.color}</p>
                <p class="my-0">Mecanismo: ${cortina.mecanismo}</p>
                <p class="my-0">Ancho: ${cortina.ancho}cm</p>
                <p class="my-0">Alto: ${cortina.alto}cm</p>
                <h4>Costo: $${cortina.presupuesto}</h4>
                <button class="btn btn-success my-1" onclick="agregarAlCarrito(${indice})">Agregar al carrito</button>
                <button class="btn btn-danger my-1"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div>    
        `
    })

    eliminarCortinaArmada()
}

//FUNCION ELIMINAR CORTINA DE LA LISTA DE CORTINAS ARMADAS
function eliminarCortinaArmada () {
    let arrayCortinas = JSON.parse(sessionStorage.getItem('Cortinas'))
    arrayCortinas.forEach((cortina, indice)=>{
    const botonEliminar = document.getElementById(`producto${indice}`).lastElementChild.lastElementChild
        botonEliminar.addEventListener('click', () => {
            document.getElementById(`producto${indice}`).remove()
            arrayCortinas.splice(indice, 1)  
            sessionStorage.setItem('Cortinas', JSON.stringify(arrayCortinas))
        })
    })
    
}

//EVENTOS CHANGE EN LOS SELECT DEL HTML
    //Evento para tipo de cortina
document.getElementById('idTipoCortina').addEventListener('change', function() {
    if(this.value=="Roller"){
        document.getElementById('cortinaSeleccionada').innerHTML = `<img class="w-100 mt-3" src="../imagenes/CORTINA ENROLLABLE 7.jpg">`
    }else if (this.value=="Bandas Verticales"){
        document.getElementById('cortinaSeleccionada').innerHTML = `<img class="w-100 mt-3" src="../imagenes/CORTINA VERTICAL 3.jpg">`
    }else if (this.value=="Enrollable Duo") {
        document.getElementById('cortinaSeleccionada').innerHTML = `<img class="w-100 mt-3" src="../imagenes/CORTINA ENROLLABLE DUO 4.jpg">`
    }else{
        document.getElementById('cortinaSeleccionada').innerHTML = ''
    }
})

    //Evento para tipo de tela - USO DE OPERADORES && Y ||
document.getElementById('idTipoTela').addEventListener('change', function() {
    if(this.value=="Screen" && idTipoCortina.value=="Roller"){
        document.getElementById('telaSeleccionada').innerHTML = `<img class="w-100 mt-3" src="../imagenes/rollerscreen.png">`
    }else if(this.value=="Screen" && idTipoCortina.value=="Bandas Verticales"){
        document.getElementById('telaSeleccionada').innerHTML = `<img class="w-100 mt-3" src="../imagenes/bandasscreen.png">`
    }else if(this.value=="BlackOut" && idTipoCortina.value=="Roller"){
        document.getElementById('telaSeleccionada').innerHTML = `<img class="w-100 mt-3" src="../imagenes/rollerbo.png">`
    }else if(this.value=="BlackOut" && idTipoCortina.value=="Bandas Verticales"){
        document.getElementById('telaSeleccionada').innerHTML = `<img class="w-100 mt-3" src="../imagenes/bandasbo.png">`
    }else if((this.value=="Screen" || this.value=="BlackOut") && idTipoCortina.value=="Enrollable Duo"){
        document.getElementById('telaSeleccionada').innerHTML = `<img class="w-100 mt-3" src="../imagenes/screenduo.png">`
    }else{
        document.getElementById('telaSeleccionada').innerHTML = ''
    }
})

    //Evento para color de cortina
document.getElementById('idColor').addEventListener('change', function() {
    if(this.value=="Blanco"){
        document.getElementById('colorSeleccionado').innerHTML = `<img class="w-100 mt-3" src="../imagenes/colorblanco.png">`
    }else if (this.value=="Negro"){
        document.getElementById('colorSeleccionado').innerHTML = `<img class="w-100 mt-3" src="../imagenes/colornegro.png">`
    }else if (this.value=="Beige"){
        document.getElementById('colorSeleccionado').innerHTML = `<img class="w-100 mt-3" src="../imagenes/colorbeige.png">`
    }else if(this.value=="Gris"){
        document.getElementById('colorSeleccionado').innerHTML = `<img class="w-100 mt-3" src="../imagenes/colorgris.png">`
    }else{
        document.getElementById('colorSeleccionado').innerHTML = ''
    }
    
})

    //Evento para mecanismo
document.getElementById('idMecanismo').addEventListener('change', function() {
    if(this.value=="Motorizado"){
        document.getElementById('mecanismoSeleccionado').innerHTML = `<p class="mt-3 fs-5 fw-bold px-1">El costo adicional es de $${costoMotor}</p>`       
    }else{
        document.getElementById('mecanismoSeleccionado').innerHTML = ''
    }    
    
})  


//CREANDO CARRITO
// FUNCION PARA VERIFICAR LA CANTIDAD DE CORTINAS EN EL CARRITO
function traerNumero(){
    let auxiliar = (localStorage.getItem('Carrito')) ? JSON.parse(localStorage.getItem('Carrito')) : [];
    cortinasTotales = auxiliar.length;
    document.getElementById('contadorCarrito').innerText=cortinasTotales
}

//FUNCION AGREGAR CORTINA AL CARRITO
function agregarAlCarrito(indice){
    arrayStorage=JSON.parse(sessionStorage.getItem('Cortinas'))
    arrayCarrito=JSON.parse(localStorage.getItem('Carrito'))
    arrayCarrito.push(arrayStorage[indice])
    localStorage.setItem('Carrito', JSON.stringify(arrayCarrito))
    traerNumero()
    Toastify({
        text: "Agregaste TU CORTINA al Carrito",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "#2AC3A2", color: "black",
        },
        onClick: function(){
        } 
    }).showToast();
}

//MUESTRO CARRITO - EVENTO CLICK EN EL BOTON CARRITO
iconoCarrito.addEventListener('click', ()=>{
    carritoStorage=JSON.parse(localStorage.getItem('Carrito'))
    if (carritoStorage.length==0){
        divCarrito.innerHTML=`<h2>Carrito Vacío</h2>`
    }else{
        mostrarCortinasCarrito(carritoStorage)
    }
})

//FUNCION MOSTRAR CORTINA - MODAL
function mostrarCortinasCarrito(){
    carritoStorage=JSON.parse(localStorage.getItem('Carrito'))
    divCarrito.innerHTML= ""
    
    carritoStorage.forEach((cortina, indice) =>{
        //IMAGENES DE LA CARD SEGUN EL TIPO DE CORTINA
        let fotoCortina = " "
        if(cortina.tipoCortina=="Roller"){
            fotoCortina = Image.innerHTML=`<img class="w-100 mb-3" src="../imagenes/CORTINA ENROLLABLE 7.jpg">`  
        }else if(cortina.tipoCortina=="Bandas Verticales"){
            fotoCortina = Image.innerHTML=`<img class="w-100 mb-3" src="../imagenes/CORTINA VERTICAL 3.jpg">` 
        }else{
            fotoCortina = Image.innerHTML=`<img class="w-100 mb-3" src= "../imagenes/CORTINA ENROLLABLE DUO 4.jpg">` 
        }
        
        divCarrito.innerHTML += `
                <div class="productos row" id="cortinaCarrito${indice}">
                    <div class="col-xl-6 col-md-12">
                        <img class="fotosCard">${fotoCortina}</img>
                    </div>
                    <div class="col-xl-6 col-md-12">
                        <h3>Cortina: ${cortina.tipoCortina}</h3>
                        <p class="my-0">Tipo de Tela: ${cortina.tipoTela}</p>
                        <p class="my-0">Ancho: ${cortina.ancho}cm</p>
                        <p class="my-0">Alto: ${cortina.alto}cm</p>
                        <p class="my-o">Cantidad: <span id="cantidad${indice}" class="ms-2">${cortina.cantidad}</span></p>
                        <h4>Costo: $<spam id="costo${indice}">${cortina.presupuesto}</spam></h4>
                        <button class="btn btn-secondary" id="sumar${indice}">+</button>
                        <button class="btn btn-secondary" id="restar${indice}">-</button>
                        <button class="btn btn-danger my-1"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>             
        `

         let total = 0
                let costoAux = document.getElementById('idCostoTotal')
                carritoStorage.forEach(cortina =>{
                    total += cortina.presupuesto
                })
                costoAux.innerHTML=total
        localStorage.setItem('Carrito', JSON.stringify(carritoStorage))

    })
    eliminarCortinaCarrito(carritoStorage)
    vaciarCarrito(carritoStorage)
    finalizarCompra(carritoStorage)
    sumarYRestarCortina(carritoStorage)
}


//FUNCION ELIMINAR LA CORTINA DEL CARRITO
function eliminarCortinaCarrito (){
    carritoStorage=JSON.parse(localStorage.getItem('Carrito'))
    carritoStorage.forEach((cortina, indice)=>{
        const botonEliminarDelCarrito = document.getElementById(`cortinaCarrito${indice}`).lastElementChild.lastElementChild
        botonEliminarDelCarrito.addEventListener('click', () => {
            document.getElementById(`cortinaCarrito${indice}`).remove()
            carritoStorage.splice(indice, 1)  
            let total = 0
                let costoAux = document.getElementById('idCostoTotal')
                carritoStorage.forEach(cortina =>{
                    total += cortina.presupuesto
                })
                costoAux.innerHTML=total

            let auxiliar = localStorage.setItem('Carrito', JSON.stringify(carritoStorage)) 
            if (carritoStorage.length==0){
                divCarrito.innerHTML=`<h2>Carrito Vacío</h2>`
            }
            traerNumero()
        })
    })
}

//FUNCION VACIAR EL CARRITO
function vaciarCarrito (){
    carritoStorage=JSON.parse(localStorage.getItem('Carrito'))
    carritoStorage.forEach((cortina, indice)=>{
        vaciarElCarrito.addEventListener('click', () => {
            document.getElementById(`cortinaCarrito${indice}`).remove()
            carritoStorage.splice(0, carritoStorage.length)
            let total = 0
                let costoAux = document.getElementById('idCostoTotal')
                carritoStorage.forEach(cortina =>{
                    total += cortina.presupuesto
                })
                costoAux.innerHTML=total

            let auxiliar=localStorage.setItem('Carrito', JSON.stringify(carritoStorage))
            if (carritoStorage.length==0){
                divCarrito.innerHTML=`<h2>Carrito Vacío</h2>`
            }
            traerNumero()
        })
    })
}


//FUNCION FINALIZAR COMPRA + VACIAR CARRITO AL FINANIZAR
function finalizarCompra (carritoStorage){
    carritoStorage=JSON.parse(localStorage.getItem('Carrito'))
    finalizarLaCompra.addEventListener('click', () => {
        if (carritoStorage.length===0){
            Swal.fire('No es posible realizar esta operación. Tu carrito esta vacío')
        }else{
            Swal.fire({
                title: '¿Desea Finalizar la compra?',
                showCancelButton: true,
                cancelButtonText: 'Seguir comprando',
                confirmButtonText: 'Finalizar compra',
            }).then((result) => {
                if (result.isConfirmed) {
                    carritoStorage.forEach((cortina, indice) =>{
                        document.getElementById(`cortinaCarrito${indice}`).remove()
                        arrayCarrito.splice(0, arrayCarrito.length)
                        localStorage.setItem('Carrito', JSON.stringify(arrayCarrito))
                        costoTotalCarrito()
                        if (arrayCarrito.length==0){
                        divCarrito.innerHTML=`<h2>Carrito Vacío</h2>`
                        }
                        traerNumero()
                    })

                    let pedido = (Math.random() * 1000).toFixed()
                    Swal.fire('Compra finalizada', 'Numero de Pedido: ' + pedido , 'success')
                }    
            })
        }
    })
}

//FUNCION COSTO TOTAL DEL CARRITO 
function costoTotalCarrito(){
    let total = 0
    carritoStorage=JSON.parse(localStorage.getItem('Carrito'))
    carritoStorage.forEach(cortina => {
        total += cortina.presupuesto 
    })
    costoTotal.innerHTML = total
}

//FUNCION SUMO Y RESTO LA MISMA CORTINA
function sumarYRestarCortina(){
    carritoStorage=JSON.parse(localStorage.getItem('Carrito'))
    carritoStorage.forEach((cortina, indice)=>{
        const botonSumarCortina = document.getElementById(`sumar${indice}`)
        botonSumarCortina.addEventListener('click', ()=>{
                let sumaCantidad = (cortina.cantidad) + 1
                cortina.cantidad=sumaCantidad
                document.getElementById(`cantidad${indice}`).innerText = sumaCantidad
                let incremPresup = cortina.presupuesto / (sumaCantidad-1)*sumaCantidad
                cortina.presupuesto=incremPresup
                document.getElementById(`costo${indice}`).innerText=incremPresup
                let total = 0
                let costoAux = document.getElementById('idCostoTotal')
                carritoStorage.forEach(cortina =>{
                    total += cortina.presupuesto
                })
                costoAux.innerHTML=total
                let aux = localStorage.setItem('Carrito', JSON.stringify(carritoStorage))
            })


        const botonRestarCortina = document.getElementById(`restar${indice}`)
        botonRestarCortina.addEventListener('click', ()=>{
            if(cortina.cantidad>1){
                let restaCantidad = (cortina.cantidad) - 1
                cortina.cantidad=restaCantidad
                document.getElementById(`cantidad${indice}`).innerText=restaCantidad
                let restaPresup = cortina.presupuesto / (restaCantidad+1)*restaCantidad
                cortina.presupuesto = restaPresup
                document.getElementById(`costo${indice}`).innerText=restaPresup
                let total = 0
                let costoAux = document.getElementById('idCostoTotal')
                carritoStorage.forEach(cortina =>{
                    total += cortina.presupuesto
                })
                costoAux.innerHTML=total
                let aux = localStorage.setItem('Carrito', JSON.stringify(carritoStorage))
            }
        })
    })
}

//INCORPORO FETCH DE MANERA LOCAL - Cree un archivo .json con productos en promoción.
async function mostrarCortinasEnPromo(){
    const promociones = await fetch('../json/productosPromo.json')
    const promocionesParseadas = await promociones.json()

        cortinaPromo.innerHTML = ' '
    promocionesParseadas.forEach((cortina, indice)=>{
        cortinaPromo.innerHTML += `
            <div class="card" style="width: 350px;" id="cortina${indice}">
                <img src="../imagenes/${cortina.img}" class="card-img-top pt-3" style="height: 350px">
                <div class="card-body">
                    <h3 class="card-title">Cortina: ${cortina.tipoCortina}</h3>
                    <p class="card-text my-0">Tipo de Tela: ${cortina.tipoTela}</p>
                    <p class="card-text my-0">Color: ${cortina.color}</p>
                    <p class="card-text my-0">Mecanismo: ${cortina.mecanismo}</p>
                    <p class="card-text my-0">Ancho: ${cortina.ancho}cm</p>
                    <p class="card-text my-0">Alto: ${cortina.alto}cm</p>
                    <h4>Costo: $${cortina.presupuesto}</h4>
                    <buton class="btn btn-success my-1" onclick="agregarPromoAlCarrito(${indice})">Agregar al Carrito</buton>
                </div>
            </div>
        `
    })
}

botonPromo.addEventListener('click', ()=>{
    mostrarCortinasEnPromo()
})

async function agregarPromoAlCarrito(indice){
    const promociones = await fetch('../json/productosPromo.json')
    const promocionesParseadas = await promociones.json()
    arrayCarrito.push(promocionesParseadas[indice])
    localStorage.setItem('Carrito', JSON.stringify(arrayCarrito))
    traerNumero()
    Toastify({
        text: "Agregaste LA CORTINA al Carrito",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "#2AC3A2", color: "black",
        },
        onClick: function(){
        } 
    }).showToast();
}

//FUNCION EN FORMLARIO DE ENVIO DE CONSULTA - EN HTML
function envioConsulta (){
    const formEnviarConsulta = document.getElementById('idFormEnviarConsulta')
    formEnviarConsulta.addEventListener('submit', (e)=>{
    e.preventDefault()
    formEnviarConsulta.reset()
        Swal.fire({
        position: 'button',
        icon: 'success',
        title: 'Su consulta ha sido enviada. Muchas Gracias',
        showConfirmButton: false,
        timer: 1750
        })
        
    })
}
