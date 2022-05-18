const tabla = document.querySelector("#tabla");
const card = document.getElementsByClassName(".card"); 
let vidas = 0;
const contVidas = document.querySelector(".contVidas");
contVidas.textContent = vidas;
let cartasSelecionadas = []
const nivel1 = 16;
const nivel2 = 24;
const nivel3 = 36;
let nivel;
let contVictorias = 0;
var nickName;

const getCartas = () => [ //cargo todos los iconos

    //4x4
    '<i class="fas fa-heart"></i>',
    '<i class="fas fa-heart"></i>',
    '<i class="fas fa-fish"></i>',
    '<i class="fas fa-fish"></i>',
    '<i class="fas fa-cat"></i>',
    '<i class="fas fa-cat"></i>',
    '<i class="fas fa-code"></i>',
    '<i class="fas fa-code"></i>',
    '<i class="fas fa-laptop-code"></i>',
    '<i class="fas fa-laptop-code"></i>',
    '<i class="fas fa-pizza-slice"></i>',
    '<i class="fas fa-pizza-slice"></i>',
    '<i class="fas fa-mug-hot"></i>',
    '<i class="fas fa-mug-hot"></i>',
    '<i class="fas fa-moon"></i>',
    '<i class="fas fa-moon"></i>',
    //6x4
    '<i class="fas fa-bomb"></i>',
    '<i class="fas fa-bomb"></i>',
    '<i class="fas fa-ice-cream"></i>',
    '<i class="fas fa-ice-cream"></i>',
    '<i class="fas fa-skull-crossbones"></i>',
    '<i class="fas fa-skull-crossbones"></i>',
    '<i class="fas fa-virus"></i>',
    '<i class="fas fa-virus"></i>',
    //9x4
    '<i class="fas fa-ghost"></i>',
    '<i class="fas fa-ghost"></i>',
    '<i class="fas fa-hand-spock"></i>',
    '<i class="fas fa-hand-spock"></i>',
    '<i class="fas fa-poo"></i>',
    '<i class="fas fa-poo"></i>',
    '<i class="fas fa-music"></i>',
    '<i class="fas fa-music"></i>',
    '<i class="fas fa-gamepad"></i>',
    '<i class="fas fa-gamepad"></i>',
    '<i class="fas fa-truck-monster"></i>',
    '<i class="fas fa-truck-monster"></i>',

]

function cargarJuego() {

    let cartas = []
    cartasSelecionadas = []

    if (contVictorias == 2) {
        nivel = nivel3;
        vidas = 25;
        contVidas.textContent = vidas;
        tabla.style.width = "90%";
    } else if (contVictorias == 1) {
        nivel = nivel2;
        vidas = 15;
        contVidas.textContent = vidas;
        tabla.style.width = "55%";
    } else {
        nivel = nivel1;
        vidas = 10
        contVidas.textContent = vidas;
        tabla.style.width = "40%";
    }

    for (let i = 0; i < nivel; i++) { //Crear cartas en HTML
        cartas.push(`
            
            <div class="cardArea" >
                <div class="card" id="idCard${i}" onclick="clickCarta(${i})">
                    <div class="cara oculta" id="oculta${i}">
                        ${getCartas()[i]}
                    </div>
                    <div class="cara visible">
                        <i class="fas fa-star"></i>
                    </div>
                </div>
            </div> `
        )

    }
    cartas.sort(() => Math.random() - 0.5); //cambiar de posicion las cartas en el array
    tabla.innerHTML = cartas.join(" ");

}

function clickCarta(i) {
    let carta = document.getElementById("idCard" + i);

    if (carta.style.transform != "rotateY(180deg)") { // voltea una carta
        carta.style.transform = "rotateY(180deg)"
        cartasSelecionadas.push(i)
    }

    if (cartasSelecionadas.length == 2) {  // si has volteado 2 cartas comprueba si hay relación
        voltear(cartasSelecionadas)
        cartasSelecionadas = []
    }
}

function voltear(seleccion) { //Comprueba si las cartas son iguales, en caso contrario las voltea
    setTimeout(() => {
        let oculta1 = document.getElementById("oculta" + seleccion[0])
        let oculta2 = document.getElementById("oculta" + seleccion[1])
        if (oculta1.innerHTML != oculta2.innerHTML) {
            let c1 = document.getElementById("idCard" + seleccion[0])
            let c2 = document.getElementById("idCard" + seleccion[1])
            c1.style.transform = "rotateY(0deg)"
            c2.style.transform = "rotateY(0deg)"
            //Quitar vidas:
            vidas--;
            contVidas.textContent = vidas;
            if (vidas <= 0) {  //Si el contador de vidas llega a 0 te alerta de que has perdido

                swal.fire({
                    title: `¡Mala suerte!`,
                    text: `No te quedan más vidas`,
                    color: '#716add',
                    backdrop: `
                      rgba(0,0,123,0.4)  
                    `,
                    imageUrl: '/img/catSad.gif',
                    imageWidth: 300,
                    imageHeight: 200,
                    imageAlt: 'sad cat',
                    confirmButtonText: 'Volver al inicio',
                }).then((result) => {
                    if (result.isConfirmed) {
                        contVictorias = 0;
                        location.href = "Oriana_Gil_Practica4.html";
                    }
                })
            }

        } else { //si son iguales se les pone un borde blanco para diferenciarlas
            oculta1.style.border = "2px solid white"
            oculta2.style.border = "2px solid white"

        }
        if (ganaste() && contVictorias <= 2) {
            var x = sessionStorage.getItem('nickName');
            swal.fire({
                title: `¡Lo has resuelto ${x}!`,
                text: `Victoria número: ${contVictorias}`,
                icon: `success`,
                color: '#716add',
                confirmButtonText: '¡Siguiente Nivel!',
                reverseButtons: true,
                backdrop: `
                rgba(0,0,123,0.4)
                url("/img/jake1.gif")
                left center
                no-repeat
              `
            }).then((result) => {
                if (result.isConfirmed) {
                    cargarJuego();
                }
            })
        } else if (ganaste() && contVictorias > 2) {
            contVictorias--;

            swal.fire({
                title: `¡Has ganado ${x}!`,
                text: `Victoria número: ${contVictorias}`,
                icon: `success`,
                color: '#716add',
                confirmButtonText: 'Reiniciar el juego',
                showCancelButton: true,
                cancelButtonText: 'Volver al inicio',
                reverseButtons: true,
                backdrop: `
                rgba(0,0,123,0.4)
                url("/img/BMO.gif")
                left center
                no-repeat
              `

            }).then((result) => {
                if (result.isConfirmed) {
                    cargarJuego();
                } else {
                    contVictorias = 0;
                    location.href = "Oriana_Gil_Practica4.html";
                }
            })

            contVictorias = 0;
        }
    }, 1000)
}

function ganaste() { //comprueba si has ganado
    for (let i = 0; i < nivel; i++) {
        let oculta = document.getElementById("oculta" + i)
        if (oculta.style.border != "2px solid white") {
            return false
        }
    }
    contVictorias++;
    return true
}

function cargar() {
    Swal.fire({
        title: 'Escribe tu nombre',
        html: `<input type="text" id="login" class="swal2-input" placeholder="Nombre">`,
        confirmButtonText: '¡Juguemos!',
        focusConfirm: false,
        preConfirm: () => {
            const login = Swal.getPopup().querySelector('#login').value
            if (!login) {
                Swal.showValidationMessage(`Escribe tu nombre`)
            }
            return { login: login }
        }
    }).then((result) => {
        nickName = `${result.value.login}`;
        sessionStorage.setItem('nickName', nickName)
        barraProgreso();

    })
}

function barraProgreso() { //Barra de progreso con promesa

    return new Promise((resolve, reject) => {

        let barProgress = document.getElementById("barraProgreso");
        barProgress.setAttribute("style", "visibility:visible");

        let elem = document.getElementById("barra");
        let width = 0;
        let id = setInterval(frame, 15);
        function frame() {
            if (width == 100) {
                clearInterval(id);
                resolve('Completo', location.href = "tabla.html");
            } else {
                width++;
                elem.style.width = width + "%";
                elem.innerHTML = width + "%";
            }
        }
        reject('No se pudo cargar el juego')
    });
}

function volverInicio() {
    location.href = "Oriana_Gil_Practica4.html";
}

function jugar() {
    location.href = "tabla.html";
    cargarJuego();
}

cargarJuego();

//Listeners

var btnVolverInicio = document.getElementById("btnVolverInicio");
btnVolverInicio.addEventListener("click", volverInicio);

var btnCargarJuego = document.getElementById("btnCargarJuego");
btnCargarJuego.addEventListener("click", cargarJuego);