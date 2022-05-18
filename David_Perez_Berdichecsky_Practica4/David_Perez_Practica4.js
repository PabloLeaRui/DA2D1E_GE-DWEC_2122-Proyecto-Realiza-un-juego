// se crea una clase Fantasma para facilitar el movimiento de los 3 fantasmas a la vez
class Fantasma {

    constructor(color, direccion, direccionContraria, tiempo, div) {

        this.color = color
        this.direccion = direccion
        this.direccionContraria = direccionContraria
        this.tiempo = tiempo
        this.div = div
        this.pause = false
    }

    setDireccion(direccion) {
        this.direccion = direccion
    }

    setDireccionContraria(direccionContraria) {
        this.direccionContraria = direccionContraria
    }

    setDiv(div) {
        this.div = div
    }

    setPause(pause) {
        this.pause = pause
    }
}

var nombre
const ancho = 19
const alto = 21
var direccion = null
var direccionAux = null
var comenzado = false
var corriendo = false
var pause = false
var nuevaCelda
var score = 0
const maxScore = 184
const scoreDiv = document.createElement("div")
const vidasDiv = document.createElement("div")
const pacman = document.createElement("div")
var final
const fanRojo = document.createElement("div")
const fanAzul = document.createElement("div")
const fanRosa = document.createElement("div")
var fantasmaRojo = new Fantasma("rojo", null, null, 0, fanRojo)
var fantasmaAzul = new Fantasma("azul", null, null, 5, fanAzul)
var fantasmaRosa = new Fantasma("rosa", null, null, 10, fanRosa)
const pauseDiv = document.createElement("div")
var intervals = new Array()
var timeouts = new Array()
var tiempo
var timerArr = new Array()
var dificultad = "normal"
var pacmanCome = false
var timeoutComer

// función para manejar el grid creado y crear le tablero clásico de Pac-Man
function crearTablero() {

    document.querySelector("#menu").style.display = "none"

    if (!document.body.contains(document.querySelector("#principal"))) {

        var principal = document.createElement("div")
        principal.id = "principal"
        document.body.appendChild(principal)
    }

    var html = ""

    for (let row = 1; row <= alto; row++) {
    
        for (let col = 1; col <= ancho; col++) {
            
            switch (row) {
                case 1:
                    html += "<div class='celda muro row"+ row +" col"+ col +"'></div>\n"
                    break
                
                case 2:
                    if (col == 1 || col == 10 || col == ancho) {
                        html += "<div class='celda muro row"+ row +" col"+ col +"'></div>\n"
                    } else {
                        html += "<div class='celda aire row"+ row +" col"+ col +"'></div>\n" 
                    }
                    break

                case 3:
                    if (col == 1 || col == 3 || col == 4 || col == 6 || col== 7 || col == 8 || col == 10 || col == 12 || col == 13 || col == 14 || col == 16 || col == 17 || col == ancho) {
                        html += "<div class='celda muro row"+ row +" col"+ col +"'></div>\n"
                    } else {
                        html += "<div class='celda aire row"+ row +" col"+ col +"'></div>\n" 
                    }
                    break

                case 4:
                    if (col == 1 || col == ancho) {
                        html += "<div class='celda muro row"+ row +" col"+ col +"'></div>\n"
                    } else {
                        html += "<div class='celda aire row"+ row +" col"+ col +"'></div>\n"
                    }
                    break

                case 5:
                    if (col == 1 || col == ancho || col == 3 || col == 4 || col == 6 || col == 8 || col == 9 || col == 10 || col == 11 || col == 12 || col == 14 || col == 16 || col == 17) {
                        html += "<div class='celda muro row"+ row +" col"+ col +"'></div>\n"
                    } else {
                        html += "<div class='celda aire row"+ row +" col"+ col +"'></div>\n"
                    }
                    break

                case 6:
                    if (col == 1 || col == ancho || col == 6 || col == 10 || col == 14) {
                        html += "<div class='celda muro row"+ row +" col"+ col +"'></div>\n"
                    } else {
                        html += "<div class='celda aire row"+ row +" col"+ col +"'></div>\n"
                    }
                    break
                
                case 7:
                    if (col == 5 || col == 9 || col == 11 || col == 15) {
                        html += "<div class='celda aire row"+ row +" col"+ col +"'></div>\n"
                    } else {
                        html += "<div class='celda muro row"+ row +" col"+ col +"'></div>\n"
                    }
                    break

                case 8:
                    if (col == 1 || col == ancho || col == 2 || col == 3 || col == 4 || col == 6 || col == 14 || col == 16 || col == 17 || col == 18) {
                        html += "<div class='celda muro row"+ row +" col"+ col +"'></div>\n"
                    } else {
                        html += "<div class='celda aire row"+ row +" col"+ col +"'></div>\n"
                    }
                    break

                case 9:
                    if (col == 5 || col == 7 || col == 13 || col == 15) {
                        html += "<div class='celda aire row"+ row +" col"+ col +"'></div>\n"
                    } else if (col == 8 || col == 9 || col == 10 || col == 11 || col == 12) {
                        html += "<div class='celda spawnFanBorde row"+ row +" col"+ col +"'></div>\n"
                    } else {
                        html += "<div class='celda muro row"+ row +" col"+ col +"'></div>\n"
                    }
                    break

                case 10:
                    if (col == 9 || col == 10 || col == 11) {
                        html += "<div class='celda spawnFan row"+ row +" col"+ col +"'></div>\n"
                    } else if(col == 8 || col == 12) {
                        html += "<div class='celda spawnFanBorde row"+ row +" col"+ col +"'></div>\n"
                    } else {
                        html += "<div class='celda aire row"+ row +" col"+ col +"'></div>\n"
                    }
                    break

                case 11:
                    if (col == 5 || col == 7 || col == 13 || col == 15) {
                        html += "<div class='celda aire row"+ row +" col"+ col +"'></div>\n"
                    } else if (col == 8 || col == 9 || col == 10 || col == 11 || col == 12) {
                        html += "<div class='celda spawnFanBorde row"+ row +" col"+ col +"'></div>\n"
                    } else {
                        html += "<div class='celda muro row"+ row +" col"+ col +"'></div>\n"
                    }
                    break

                case 12:
                    if (col == 1 || col == ancho || col == 2 || col == 3 || col == 4 || col == 6 || col == 14 || col == 16 || col == 17 || col == 18) {
                        html += "<div class='celda muro row"+ row +" col"+ col +"'></div>\n"
                    } else {
                        html += "<div class='celda aire row"+ row +" col"+ col +"'></div>\n"
                    }
                    break

                case 13:
                    if (col == 5 || col == 7 || col == 13 || col == 15) {
                        html += "<div class='celda aire row"+ row +" col"+ col +"'></div>\n"
                    } else {
                        html += "<div class='celda muro row"+ row +" col"+ col +"'></div>\n"
                    }
                    break

                case 14:
                    if (col == 1 || col == 10 || col == ancho) {
                        html += "<div class='celda muro row"+ row +" col"+ col +"'></div>\n"
                    } else {
                        html += "<div class='celda aire row"+ row +" col"+ col +"'></div>\n"
                    }
                    break

                case 15:
                    if (col == 2 || col == 5 || col == 9 || col == 11 || col == 15 || col == 18) {
                        html += "<div class='celda aire row"+ row +" col"+ col +"'></div>\n"
                    } else {
                        html += "<div class='celda muro row"+ row +" col"+ col +"'></div>\n"
                    }
                    break

                case 16:
                    if (col == 1 || col == 4 || col == 16 || col == ancho) {
                        html += "<div class='celda muro row"+ row +" col"+ col +"'></div>\n"
                    } else {
                        html += "<div class='celda aire row"+ row +" col"+ col +"'></div>\n"
                    }
                    break

                case 17:
                    if (col == 3 || col == 5 || col == 7 || col == 13 || col == 15 || col == 17) {
                        html += "<div class='celda aire row"+ row +" col"+ col +"'></div>\n"
                    } else {
                        html += "<div class='celda muro row"+ row +" col"+ col +"'></div>\n"
                    }
                    break

                case 18:
                    if (col == 1 || col == 6 || col == 10 || col == 14 || col == ancho) {
                        html += "<div class='celda muro row"+ row +" col"+ col +"'></div>\n"
                    } else {
                        html += "<div class='celda aire row"+ row +" col"+ col +"'></div>\n"
                    }
                    break

                case 19:
                    if (col == 2 || col == 9 || col == 11 || col == 18) {
                        html += "<div class='celda aire row"+ row +" col"+ col +"'></div>\n"
                    } else {
                        html += "<div class='celda muro row"+ row +" col"+ col +"'></div>\n"
                    }
                    break

                case 20:
                    if (col == 1 || col == ancho) {
                        html += "<div class='celda muro row"+ row +" col"+ col +"'></div>\n"
                    } else {
                        html += "<div class='celda aire row"+ row +" col"+ col +"'></div>\n"
                    }
                    break

                case 21:
                    html += "<div class='celda muro row"+ row +" col"+ col +"'></div>\n"
                    break
            }
            
        }

    }

    document.getElementById("principal").innerHTML = html
}

// función para añadir puntos, cerezas o el spawn de pacman donde sea necesario
function crearPuntos() {

    document.querySelectorAll(".row3.col2, .row3.col18, .row16.col2, .row16.col18").forEach(element => {
        element.classList.remove('aire')
        element.classList.add('cereza')
    });

    document.querySelectorAll(".aire").forEach(element => {
        element.classList.remove('aire')
        element.classList.add('punto')
    });

    document.querySelectorAll(".row16.col10").forEach(element => {
        element.classList.remove('punto')
        element.classList.add('spawn')
    });

}

// función para crear los divs del pacman y fantasmas
function crearPacmanYFantasmas() {

    pacman.classList.add("pacman");

    var pacmanTop = document.createElement("div")
    pacmanTop.classList.add("pacman-top")
    var pacmanBot = document.createElement("div")
    pacmanBot.classList.add("pacman-bot")

    pacman.appendChild(pacmanTop)
    pacman.appendChild(pacmanBot)
    document.querySelector(".spawn").appendChild(pacman)


    fanRojo.classList.add("rojo", "fantasma")
    fanAzul.classList.add("azul", "fantasma")
    fanRosa.classList.add("rosa", "fantasma")

    document.querySelector(".row10.col9").appendChild(fanRojo)
    document.querySelector(".row10.col10").appendChild(fanAzul)
    document.querySelector(".row10.col11").appendChild(fanRosa)    
}

// función que se llama desde los botones de dificultad, sirve para establecer la velocidad de los fantasmas según la dificultad
function setDificultad(dificultadText) {

    let botones = document.querySelectorAll(".botones > button")
    botones.forEach(boton => {

        boton.style.color = "#0dadd1"
        boton.style.border = "1px solid #0dadd1"
    })

    switch(dificultadText) {

        case "facil":
            dificultad = 350
            break
        
        case "normal":
            dificultad = 300
            break

        case "dificil":
            dificultad = 250
            break
    }

    document.querySelector("." + dificultadText).style.color = "white"
    document.querySelector("." + dificultadText).style.border = "1px solid white"
}

// la dificultad por defecto es normal
setDificultad("normal")

// funcion con dos intervals para controlar la posicion de los fantasmas, se pasa como parámetro un objeto Fantasma
function movimientoFantasma(fantasma) {
    
    let primeraVez = true
    let random = Math.floor(Math.random() * 2) + 1
        
    switch(random) {

        case 1:
            fantasma.setDireccion("d")
            break

        case 2:
            fantasma.setDireccion("i")
            break
    }

    // interval para el movimiento de los fantasmas, el timepo establecido depende de la dificultad
    var movimientoFantasma = setInterval(() => {

        let direcciones = ["d", "ab", "i", "ar"]
        let direccionesAux = ["d", "ab", "i", "ar"]
        let index
        let celdaFan = fantasma.div.parentElement
        let nuevaCelda
        let celdaIzq
        let celdaDer
        let rowFan = celdaFan.className.match('row[0-9]{1,2}')[0].substring(3)
        let colFan = celdaFan.className.match('col[0-9]{1,2}')[0].substring(3)
        let nuevaColFan= colFan
        let nuevaRowFan= rowFan
        let nuevaRowFanAux = rowFan
        let nuevaColFanAux = colFan

        // se calcula la nueva posicion de la casilla a la que el  fantasma debería ir según su direccion
        switch (fantasma.direccion) {
            
            case "d":
                nuevaColFan++
                break

            case "ab":
                nuevaRowFan++
                break

            case "i":
                nuevaColFan--
                break

            case "ar":
                nuevaRowFan--
                break
        }

        fantasma.direccionContraria = calcularDireccionContraria(fantasma.direccion)

        nuevaCelda = document.querySelector(".col" + nuevaColFan + ".row" + nuevaRowFan)

        if (!pause && !fantasma.pause) {

            // si es el primer movimiento el fantasma se coloca en la casilla de salida de los fantasmas
            if (primeraVez) {

                fantasma.div.remove()
                document.querySelector(".row8.col10").appendChild(fantasma.div)
            } else {

                // se calculan las casillas a la izquierda y la derecha del fantasma
                index = direccionesAux.indexOf(fantasma.direccion)
                direccionesAux.splice(index, 1)
                index = direccionesAux.indexOf(fantasma.direccionContraria)
                direccionesAux.splice(index, 1)
                
                switch (direccionesAux[0]) {

                    case "d":
                    nuevaColFanAux++
                    break

                    case "ab":
                    nuevaRowFanAux++
                    break

                    case "i":
                    nuevaColFanAux--
                    break

                    case "ar":
                    nuevaRowFanAux--
                    break
                }
                celdaDer = document.querySelector(".col" + nuevaColFanAux + ".row" + nuevaRowFanAux)

                nuevaRowFanAux = rowFan
                nuevaColFanAux = colFan

                switch (direccionesAux[1]) {

                    case "d":
                    nuevaColFanAux++
                    break

                    case "ab":
                    nuevaRowFanAux++
                    break

                    case "i":
                    nuevaColFanAux--
                    break

                    case "ar":
                    nuevaRowFanAux--
                    break
                }
                celdaIzq = document.querySelector(".col" + nuevaColFanAux + ".row" + nuevaRowFanAux)

                // si ambas celdas (izquierda y derecha) son muro o borde del spawn de fantasmas coloca al fantasma en la celda a la que su dirección apunta
                if ((celdaIzq.classList.contains("muro") || celdaIzq.classList.contains("spawnFanBorde")) && (celdaDer.classList.contains("muro") || celdaDer.classList.contains("spawnFanBorde"))) {

                    // si esa casilla es la ultima casilla de alguno de los dos pasillos, coloca al fantasma en la casilla contraria
                    if (nuevaColFan == 1 && nuevaRowFan == 10) {

                        fantasma.div.remove()
                        document.querySelector(".row10.col19").appendChild(fantasma.div)
                    } else if (nuevaColFan == 19 && nuevaRowFan == 10){

                        fantasma.div.remove()
                        document.querySelector(".row10.col1").appendChild(fantasma.div)
                    } else {

                        fantasma.div.remove()
                        nuevaCelda.appendChild(fantasma.div)
                    }
                } else {

                    // si alguna de las casillas derecha o izquierda no es borde se calculan las casillas contiguas a las que se puede acceder 
                    // con ayuda de un array de direcciones
                    nuevaColFan = colFan
                    nuevaRowFan = rowFan

                    // se elimina del array las direcciones que apuntan a un borde 
                    if (nuevaCelda.classList.contains("muro") || nuevaCelda.classList.contains("spawnFanBorde")) {

                        index = direcciones.indexOf(fantasma.direccion)
                        direcciones.splice(index, 1)
                    }
                    // el sentido contrario se elimina siempre para evitar movimientos extraños
                    index = direcciones.indexOf(fantasma.direccionContraria)
                    direcciones.splice(index, 1)
                    
                    direcciones.forEach(dire => {

                        switch (dire) {
            
                            case "d":
                                nuevaColFan++
                                break
                
                            case "ab":
                                nuevaRowFan++
                                break
                
                            case "i":
                                nuevaColFan--
                                break
                
                            case "ar":
                                nuevaRowFan--
                                break
                        }

                        nuevaCelda = document.querySelector(".col" + nuevaColFan + ".row" + nuevaRowFan)
                        if (nuevaCelda.classList.contains("muro") || nuevaCelda.classList.contains("spawnFanBorde")) {
                            
                            index = direcciones.indexOf(dire)
                            direcciones.splice(index, 1)
                        }
                        nuevaColFan = colFan
                        nuevaRowFan = rowFan
                    })

                    // si solo queda una direccion disponible coloca al fantasma en la casilla a la que apunta
                    if (direcciones.length == 1) {

                        fantasma.direccion = direcciones[0]
                        fantasma.direccionContraria = calcularDireccionContraria(fantasma.direccion)

                        switch (fantasma.direccion) {
            
                            case "d":
                                colFan++
                                break
                
                            case "ab":
                                rowFan++
                                break
                
                            case "i":
                                colFan--
                                break
                
                            case "ar":
                                rowFan--
                                break
                        }
                    // si hay mas de una dirección posible se elige una aleatoriamente
                    } else if (direcciones.length == 2) {

                        index = Math.floor(Math.random() * 2)
                        fantasma.direccion = direcciones[index]
                        fantasma.direccionContraria = calcularDireccionContraria(fantasma.direccion)

                        switch (fantasma.direccion) {
            
                            case "d":
                                colFan++
                                break
                
                            case "ab":
                                rowFan++
                                break
                
                            case "i":
                                colFan--
                                break
                
                            case "ar":
                                rowFan--
                                break
                        }
                    } else {

                        index = Math.floor(Math.random() * 3 )
                        fantasma.direccion = direcciones[index]
                        fantasma.direccionContraria = calcularDireccionContraria(fantasma.direccion)

                        switch (fantasma.direccion) {
            
                            case "d":
                                colFan++
                                break
                
                            case "ab":
                                rowFan++
                                break
                
                            case "i":
                                colFan--
                                break
                
                            case "ar":
                                rowFan--
                                break
                        }
                    }

                    if (colFan == 1 && rowFan == 10) {

                        fantasma.div.remove()
                        document.querySelector(".row10.col19").appendChild(fantasma.div)
                    } else if (colFan == 19 && rowFan == 10){

                        fantasma.div.remove()
                        document.querySelector(".row10.col1").appendChild(fantasma.div)
                    } else {
                        nuevaCelda = document.querySelector(".col" + colFan + ".row" + rowFan)
                        fantasma.div.remove()
                        nuevaCelda.appendChild(fantasma.div)
                    }
                }
            }
            primeraVez = false
        }
    }, dificultad)

    // intervalo para comprobar si el pacman y el fantasma se encuentran en la misma posición y controlar lo que pasa cuando esto sucede
    let comprobarComer = setInterval(() => {

        if (fantasma.div.parentElement.isEqualNode(pacman.parentNode)) {

            // si pacman no ha comido una cereza se elimina una vida y el movimiento de todos vuelve a empezar 
            // si no quedan vidas, se llama a un función para mostrar la pantalla de derrota
            if (!pacmanCome) {

                if (document.querySelector(".vidas").childElementCount > 1) {

                    document.querySelector(".vida:last-child").remove()
                    corriendo = false
                    pacman.remove()
                    document.querySelector(".spawn").appendChild(pacman)
                    clearAllIntervals()
                    empezarMovimientoFantasma()
                } else {
    
                    document.querySelector(".vida:last-child").remove()
                    crearElementFinal("DERROTA")
                }
                // si pacman ha comido una cereza, el movimiento del fantasma que ha comido vuelve a empezar en 5 segundos
            } else {

                fantasma.div.remove()
                document.querySelector(".row8.col10").appendChild(fantasma.div)
                fantasma.pause = true
                let timeoutComido = setTimeout(() => {

                    fantasma.pause = false
                }, 5000)
                timeouts.push(timeoutComido)
            }
            
        }

    }, 25)
    // tanto intervals como timeouts se almacenan en una variable de tipo array para manejarlos mas fácilmente
    intervals.push(movimientoFantasma)
    intervals.push(comprobarComer)
}

// función para controlar en cuanto sale cada fantasma 
function empezarMovimientoFantasma () {

    document.querySelector(".row10.col9").appendChild(fanRojo)
    document.querySelector(".row10.col10").appendChild(fanAzul)
    document.querySelector(".row10.col11").appendChild(fanRosa) 

    movimientoFantasma(fantasmaRojo)
    let timeout1 = setTimeout(() => {
        movimientoFantasma(fantasmaAzul)
    }, fantasmaAzul.tiempo * 1000)
    let timeout2 = setTimeout(() => {
        movimientoFantasma(fantasmaRosa)
    }, fantasmaRosa.tiempo * 1000)

    timeouts.push(timeout1)
    timeouts.push(timeout2)
}

// función para facilitar añadir la direccion contraria a un fantasma
function calcularDireccionContraria(direccion) {

    let direccionContraria

    switch (direccion) {
        
        case "d":
            direccionContraria = "i"
            break

        case "ab":
            direccionContraria = "ar"
            break

        case "i":
            direccionContraria = "d"
            break

        case "ar":
            direccionContraria = "ab"
            break
    }

    return direccionContraria
}

// función para crear los divs de score y de vidas 
function crearScoreYVidas() {
    
    scoreDiv.classList.add("score")
    scoreDiv.innerHTML = "<p>SCORE</p><p>" + score + "</p>"

    document.body.insertBefore(scoreDiv, document.querySelector("#principal"))

    vidasDiv.classList.add("vidas")

    for (let i = 0; i < 3; i++) {
        let vida = document.createElement("div")
        vida.classList.add("vida")
        let vidaTop = document.createElement("div")
        let vidaBot = document.createElement("div")
        vidaTop.classList.add("vidaTop")
        vidaBot.classList.add("vidaBot")
        vida.appendChild(vidaTop)
        vida.appendChild(vidaBot)

        vidasDiv.appendChild(vida)
    }

    document.body.appendChild(vidasDiv)
}

// función para volver a jugar una partida sin volver a la pantalla inicial
function reset() {

    // pone el score a 0 y vuelve a establecer el tablero inicial
    score = 0
    scoreDiv.innerHTML = "<p>SCORE</p><p>" + score + "</p>"
    crearTablero()
    crearPuntos()

    // coloca al pacman en la casilla de spawn y con el estilo adecuado
    pacman.remove()
    document.querySelector(".spawn").appendChild(pacman)
    pacman.style.transform = "rotate(0deg)"
    corriendo = false
    direccion = null

    // borra todas las vidas que pudieran quedar y vuelve a crear 3
    document.querySelectorAll(".vidas > div").forEach(vida => {
        vida.remove()
    })
    for (let i = 0; i < 3; i++) {
        let vida = document.createElement("div")
        vida.classList.add("vida")
        let vidaTop = document.createElement("div")
        let vidaBot = document.createElement("div")
        vidaTop.classList.add("vidaTop")
        vidaBot.classList.add("vidaBot")
        vida.appendChild(vidaTop)
        vida.appendChild(vidaBot)

        vidasDiv.appendChild(vida)
    }

    // recoloca a los fantasmas en la casilla de incio
    document.querySelectorAll(".fantasma").forEach(fan => {
        
        fan.remove()
    })
    document.querySelector(".row10.col9").appendChild(fanRojo)
    document.querySelector(".row10.col10").appendChild(fanAzul)
    document.querySelector(".row10.col11").appendChild(fanRosa)
    
    // limpia todos los intervals y los vuelve a iniciar
    clearAllIntervals()
    empezarMovimientoFantasma()
    timerArr.forEach(timer => clearInterval(timer))
    setTimer()

    if (document.contains(pauseDiv)) {

        pauseDiv.remove()
    } else {

        final.remove()
    }

    pause = false
}

function crearElementFinal(textoFinal) {

    // limpia todos los intervals 
    clearAllIntervals()
    
    // crea el elemento div donde se muestra la pantalla de final, ya sea de victoria o derrota
    final = document.createElement("div")
    final.classList.add("final")
    pause = true

    let textoFinalDiv = document.createElement("div")
    textoFinalDiv.classList.add("textoFinal")
    textoFinalDiv.innerHTML = textoFinal
    final.appendChild(textoFinalDiv)

    let tiempoDiv = document.createElement("div")
    tiempoDiv.classList.add("tiempo")
    tiempoDiv.innerHTML = "TIEMPO:   " + tiempo + " segundos"
    final.appendChild(tiempoDiv)

    let reset = document.createElement("button")
    reset.classList.add("reset")
    reset.setAttribute("onclick", "reset()")
    reset.innerHTML = "VOLVER A JUGAR"
    final.appendChild(reset)

    let volver = document.createElement("button")
    volver.classList.add("volver")
    volver.setAttribute("onclick", "location.reload()")
    volver.innerHTML = "VOLVER A LA PANTALLA DE INICIO"
    final.appendChild(volver)

    document.body.appendChild(final)
}

// función para recoger el tiempo de todas las partidas ganadas (localstore) y mostrarlas en pantalla, se llama desde el botón scoreboard
function crearScoreboard() {

    let scoreBoard = document.querySelector("#scoreBoard")

    document.querySelectorAll("#scoreBoard > div").forEach(div => {

        div.remove()
    })

    let keys = Object.keys(localStorage)
    for (let i = 0; i < keys.length; i++) {

        let eleDiv = document.createElement("div")
        let eleNom = document.createElement("p")
        let eleTiempo = document.createElement("p")
        eleDiv.appendChild(eleNom)
        eleDiv.appendChild(eleTiempo)

        eleTiempo.innerHTML = localStorage.getItem(keys[i])
        eleNom.innerHTML = keys[i]

        scoreBoard.appendChild(eleDiv)
    }

    document.querySelector("#menu").style.display = "none"
    scoreBoard.style.display = "flex"
}

// funcións llamados desde botones que se encargan de mostrar por pantalla lo que sea necesario
function cerrarScoreboard() {

    document.querySelector("#scoreBoard").style.display = "none"
    document.querySelector("#menu").style.display = "flex"
}

function abrirInstrucciones() {

    document.querySelector("#menu").style.display = "none"
    document.querySelector("#instrucciones").style.display = "flex"
}

function cerrarInstrucciones() {

    document.querySelector("#instrucciones").style.display = "none"
    document.querySelector("#menu").style.display = "flex"
}

// funcion para empezar el contador de segundos
function setTimer() {

    tiempo = 0
    var timer = setInterval(() => {
        tiempo++
    }, 1000)

    timerArr.push(timer)
}

// función para eliminar todos los intervalos y timeouts 
function clearAllIntervals() {

    intervals.forEach(interval => {
        clearInterval(interval)
    })

    timeouts.forEach(timeout => {
        clearTimeout(timeout)
    })
}

// función que devuelve una promesa para controlar si el usuario ha introducido un nombre antes de empezar la partida
function comprobarNombre() {

    return new Promise((resolve, reject) => {
        if (document.querySelector("#nombre").value.length > 0) {

            resolve("")
        } else {
            reject("Introduzca un nombre antes de jugar.")
        }
    })
}

// función que se llama desde el botón de jugar para empezar la partida si el usuario ha introducido un nombre
function onClickJugar() {
    
    comprobarNombre().then(data => empezar()).catch(error => document.querySelector("#error").innerHTML = error)
}

// función para recoger el nombre introducido y empezar la partida
function empezar() {

    nombre = document.querySelector("input").value

    crearTablero()
    crearPuntos()
    crearPacmanYFantasmas()
    crearScoreYVidas()
    empezarMovimientoFantasma()
    setTimer()
    anadirEventos()
}

// función para añadir los eventos de teclado (movimiento del pacman y botón de pause)
function anadirEventos() {

    document.addEventListener("keyup", e => {

        let tecla = e.key
        let celdaPacman = document.querySelector(".pacman").parentElement
        let rowPacman = celdaPacman.className.match('row[0-9]{1,2}')[0].substring(3) 
        let colPacman = celdaPacman.className.match('col[0-9]{1,2}')[0].substring(3)
    
        // si la casilla a la que apunta la dirección que el usuario ha seleccionado es un muro el pacman continua en la dirección en la que iba
        // y la direccion se almacena para girar a esa dirección en cuanto se pueda
        switch (tecla) {
    
            case "ArrowRight":
                colPacman++
                nuevaCelda = document.querySelector(".row" + rowPacman + ".col" + colPacman)
                if (nuevaCelda.classList.contains("muro") || nuevaCelda.classList.contains("spawnFanBorde")) {
                    direccionAux = "d"
                } else {
                    corriendo = true
                    direccion = "d"
                    direccionAux = null
                }
                break
    
            case "ArrowDown":
                rowPacman++
                nuevaCelda = document.querySelector(".row" + rowPacman + ".col" + colPacman)
                if (nuevaCelda.classList.contains("muro") || nuevaCelda.classList.contains("spawnFanBorde")) {
                    direccionAux = "ab"
                } else {
                    corriendo = true
                    direccion = "ab"
                    direccionAux = null
                }
                break
            
            case "ArrowLeft":
                colPacman--
                nuevaCelda = document.querySelector(".row" + rowPacman + ".col" + colPacman)
                if (nuevaCelda.classList.contains("muro") || nuevaCelda.classList.contains("spawnFanBorde")) {
                    direccionAux = "i"
                } else {
                    corriendo = true
                    direccion = "i"
                    direccionAux = null
                }
                break
    
            case "ArrowUp":
                rowPacman--
                nuevaCelda = document.querySelector(".row" + rowPacman + ".col" + colPacman)
                if (nuevaCelda.classList.contains("muro") || nuevaCelda.classList.contains("spawnFanBorde")) {
                    direccionAux = "ar"
                } else {
                    corriendo = true
                    direccion = "ar"
                    direccionAux = null
                }
                break
        }
    })

    // controla cuando el usuario presiona el boton ESC y pausa el juego a la vez que crea el div del recuadro de pausa
    document.addEventListener("keyup", e => {
    
        let tecla = e.key
        pauseDiv.classList.add("pause")
        pauseDiv.innerHTML = "<p>PAUSE</p><p>Presione ESC para continuar</p>"

        let reset = document.createElement("button")
        reset.classList.add("reset")
        reset.setAttribute("onclick", "reset()")
        reset.innerHTML = "REINICIAR"
        pauseDiv.appendChild(reset)

        let volver = document.createElement("button")
        volver.classList.add("volver")
        volver.setAttribute("onclick", "location.reload()")
        volver.innerHTML = "VOLVER A LA PANTALLA DE INICIO"
        pauseDiv.appendChild(volver)
    
        if (tecla == "Escape" && !document.body.contains(final)) {
            if (!pause) {
    
                pause = true
                document.body.appendChild(pauseDiv)
            } else {
                pause = false
                pauseDiv.remove()
            }
        }
    
    })
}

// interval para controlar el movimiento del pacman
var movimiento = setInterval(() => {

    if (corriendo && !pause) {

        let celdaPacman = document.querySelector(".pacman").parentElement
        let rowPacman = celdaPacman.className.match('row[0-9]{1,2}')[0].substring(3) 
        let colPacman = celdaPacman.className.match('col[0-9]{1,2}')[0].substring(3)
        let rowPacmanAux = celdaPacman.className.match('row[0-9]{1,2}')[0].substring(3) 
        let colPacmanAux = celdaPacman.className.match('col[0-9]{1,2}')[0].substring(3)
        let transformAux

        // se calculan las casillas a las que apunta la direccion auxiliar 
        switch (direccionAux) {

            case "d":
                colPacmanAux++
                transformAux = "rotate(0deg)"
                break

            case "ab":
                rowPacmanAux++
                transformAux = "rotate(90deg)"
                break

            case "i":
                colPacmanAux--
                transformAux = "rotate(180deg)"
                break

            case "ar":
                rowPacmanAux--
                transformAux = "rotate(270deg)"
                break
        }

        // dependiendo de la direccion y de la direccion auxiliar calcula la proxima casilla
        switch (direccion) {

            case "d":
                nuevaCelda = document.querySelector(".row" + rowPacmanAux + ".col" + colPacmanAux)
                // si no hay direccion auxiliar o la celda a la que apunta la direccion auxiliar es inaccesible, sigue la ruta normal
                if (direccionAux == null || nuevaCelda.classList.contains("muro") || nuevaCelda.classList.contains("spawnFanBorde")) {
                    pacman.style.transform = "rotate(0deg)"
                    // codigo para teletransportar el pacman de un pasillo a otro
                    if (colPacman != ancho){ 
                        colPacman++ 
                    } else { 
                        colPacman = 1
                    }
                // si hay direccion auxiliar y apunta a una casilla valida coloca al pacman en la nueva casilla, la direccion pasa a ser la auxiliar
                // y la variable de direccion auxiliar se limpia
                } else {
                    pacman.style.transform = transformAux

                    if (colPacman != ancho){ 
                        colPacman = colPacmanAux
                        rowPacman = rowPacmanAux
                        direccion = direccionAux
                        direccionAux = null 
                    } else { 
                        colPacman = 1
                    }
                }
                break

            case "ab":
                nuevaCelda = document.querySelector(".row" + rowPacmanAux + ".col" + colPacmanAux)
                if (direccionAux == null || nuevaCelda.classList.contains("muro") || nuevaCelda.classList.contains("spawnFanBorde")) {
                    pacman.style.transform = "rotate(90deg)";
                    if (rowPacman != alto - 1) {
                        rowPacman++
                    } else {
                        corriendo = false
                    } 
                } else {
                    pacman.style.transform = transformAux

                    if (colPacman != alto - 1){ 
                        colPacman = colPacmanAux
                        rowPacman = rowPacmanAux 
                        direccion = direccionAux
                        direccionAux = null
                    } else { 
                        corriendo = false
                    }
                }
                break

            case "i":
                nuevaCelda = document.querySelector(".row" + rowPacmanAux + ".col" + colPacmanAux)
                if (direccionAux == null || nuevaCelda.classList.contains("muro") || nuevaCelda.classList.contains("spawnFanBorde")) {
                    pacman.style.transform = "rotate(180deg)";
                    if (colPacman != 1) {
                        colPacman--
                    } else {
                        colPacman = ancho
                    } 
                } else {
                    pacman.style.transform = transformAux

                    if (colPacman != 1){ 
                        colPacman = colPacmanAux
                        rowPacman = rowPacmanAux 
                        direccion = direccionAux
                        direccionAux = null
                    } else { 
                        colPacman = ancho
                    }
                }
                break

            case "ar":
                nuevaCelda = document.querySelector(".row" + rowPacmanAux + ".col" + colPacmanAux)
                if (direccionAux == null || nuevaCelda.classList.contains("muro") || nuevaCelda.classList.contains("spawnFanBorde")) {
                    pacman.style.transform = "rotate(270deg)";
                    if (rowPacman != 2) {
                        rowPacman--
                    } else {
                        corriendo = false
                    } 
                } else {
                    pacman.style.transform = transformAux

                    if (rowPacman != 2){ 

                        colPacman = colPacmanAux
                        rowPacman = rowPacmanAux 
                        direccion = direccionAux
                        direccionAux = null
                    } else { 
                        corriendo = false
                    }
                }
                break
        }

        // si el juego y el pacman están corriendo se calcula la nueva celda
        if (corriendo && !pause) {
            nuevaCelda = document.querySelector(".row" + rowPacman + ".col" + colPacman)

            // si la celda es un muro o un borde el pacman deja de moverse
            if (nuevaCelda.classList.contains("muro") || nuevaCelda.classList.contains("spawnFanBorde")) {
                corriendo = false

            // si la celda es accesible se mueve al pacman a dicha celda
            } else {
                pacman.remove()
                nuevaCelda.appendChild(pacman)

                // si contiene un punto o una cereza incrimenta el score en 1
                if (nuevaCelda.classList.contains("punto")) {

                    nuevaCelda.classList.remove("punto")
                    score++
                    scoreDiv.innerHTML = "<p>SCORE</p><p>" + score + "</p>"

                } else if (nuevaCelda.classList.contains("cereza")) {

                    nuevaCelda.classList.remove("cereza")
                    score++
                    scoreDiv.innerHTML = "<p>SCORE</p><p>" + score + "</p>"

                    // si cuando come la cereza, no habia comido una cereza antes de 10 segundos se empieza un timeout
                    // que despues de 10 segundos vuelve a poner los muros en azul y la variable de pacman come en false
                    if (pacmanCome == false) {

                        timeoutComer = setTimeout(() => {
                            pacmanCome = false
                            document.querySelectorAll(".muro").forEach(muro => {
    
                                muro.style.border = "1px solid blue"
                            })
                        }, 10000)

                    // si pacman ya habia comido una cereza hace menos de 10 segundos se limpia el timeout
                    // y se vuelve a ejecutar
                    } else {

                        clearTimeout(timeoutComer)
                        timeoutComer = setTimeout(() => {
                            pacmanCome = false
                            document.querySelectorAll(".muro").forEach(muro => {
    
                                muro.style.border = "1px solid blue"
                            })
                        }, 10000)
                    }

                    // se pone la variable de pacman come en true y todos los muros en verde
                    pacmanCome = true
                    document.querySelectorAll(".muro").forEach(muro => {

                        muro.style.border = "1px solid green"
                    })
                } else if (nuevaCelda.contains(fanRojo)) {
                    pacman.style.position = "absolute"
                }
            }
            // condición de victoria
            if (score == maxScore) {

                crearElementFinal("VICTORIA")
                localStorage.setItem(nombre, tiempo)
            }
        }
    }

}, 300)