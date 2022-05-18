import { getInputDirection } from "./input.js"

// se mueve 10 veces por segundo:
export let SNAKE_SPEED
export let SCORE = 1

// con el sistema grid podemos representar el snake con coordenadas x e y
// posicion de inicio:
const snakeBody = [
    { x: 12, y: 12 }
]
// segmentos a añadir a nuestra snake:
let newSegments = 0

// moviendo el snake, el segmento anterior sigue al siguiente (se sigue a la cabeza):
export function update() {
    // console.log('update snake');

    // agregamos la food que hayamos comido en forma de segmentos:
    addSegments()

    const inputDirection = getInputDirection()

    // queremos loopear sobre todos los segmentos menos sobre el último porque el último desaparece
    // empezamos con el penúltimo elemento y nos movemos hacia la cabeza
    // solo empieza cuando la serpiente tiene cuerpo, cuando hay solo cabeza no
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        console.log(i)
        // la posicion [i+1] toma el valor de la posicion [i], ejemplo:
        // En una serpiente de 4 elementos (snakeBody.length = 4), i toma valores = [2, 1, 0];
        // Empezando el loop:
        // el elemento [i+1] = [(snakeBody.length - 2) + 1] = ultimo elemento = [(4-2)+1] = (3)
        // el elemento [i] = [(snakeBody.length - 2)] = elemento justo anterior al elemento seleccionado = [(4-2)] = (2) 
        
        // setteando el objeto a un nuevo objeto por si hay problemas de referencias:
        // duplica el elemento en la posicion snakeBody[i] y lo inserta en la posicion snakeBody[i+1]
        snakeBody[i+1] = { ...snakeBody[i] }
    }

    // update de la cabeza: snakeBody[0]
    // +y : se mueve abajo
    // -y : se mueve arriba
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y

    
    

}

// le pasamos el gameBoard a draw para que dibuje a nuestra serpiente en el tablero:
export function draw(gameBoard) {
    // console.log('draw snake');
    // loopeamos por cada pieza de nuestra snake
    snakeBody.forEach(segment => {
        // nuestra snake esta compuesta de divs
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
        
    })


/*AQUI SE DEBE CAMBIAR LOS ESTILOS Y VELOCIDAD PARA LA SERPIENTE*/
var velocidad = localStorage.getItem("velocidad")
switch(velocidad){
    case "lento":
        SNAKE_SPEED = 3
        break;
    case "medio":
        SNAKE_SPEED = 6
        break;
    case "rapido":
        SNAKE_SPEED = 9
        break;
    default:
        SNAKE_SPEED = 6
        break;
}


var serpiente = localStorage.getItem("serpiente")

const boxes = document.querySelectorAll('.snake');
boxes.forEach(box => {
    box.style.backgroundColor = "yellow"
    switch (serpiente) {
        case "verde":
            box.style.backgroundImage = "url('patron_verder.jpg')"
            box.style.backgroundSize = "cover"
            break;
        case "rojo":
            box.style.backgroundImage = "url('patron_rojo.jpg')"
            box.style.backgroundSize = "cover"
            break;
        case "boa":
            box.style.backgroundImage = "url('patron_boa.jpg')"
            box.style.backgroundSize = "cover"
            break;
        default:
            box.style.backgroundColor = localStorage.getItem("serpiente")
            break;
    }
});

}

// cuanto se expande nuestra serpiente:
export function expandSnake(amount) {
    newSegments += amount
    SCORE += amount
}

// comprobamos si estamos encima de la comida:
// el parametro ignoreHead es por defecto false y se pasa un objeto vacio {}, 
// excepto cuando venimos de snakeIntersection()
export function onSnake(position, { ignoreHead = false } = {}) {
    // some() comprueba si al menos un elemento del array (segment) cumple 
    // con la condición implementada por la función proporcionada.
    // Si al menos 1 div del snakeBody esta encima de la fruta:
    return snakeBody.some((segment, index) => {
        // si ignoreHead es true y nuestro index === 0, estamos en la cabeza
        // y la cabeza esta sobre la cabeza, devuelveme un false, 
        // ignora que la cabeza intersecciona con la cabeza por defecto
        if (ignoreHead && index === 0){
            return false
        } 
        
        // devuelve true si el segment (snakeBody div) y la position (food) estan en el mismo lugar
        return equalPositions(segment, position)

    })
}

export function getSnakeHead() {
    return snakeBody[0]
}

// si la cabeza del snake toca el cuerpo, excepto la cabeza, que ignoramos,
// porque la cabeza del snake siempre esta sobre la cabeza del snake, 
// por lo que es necesario ignorar este caso especial
export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}

function equalPositions(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y
}

function addSegments() {
    // loopeamos por todos los segmentos
    for (let i = 0; i < newSegments; i++) {
        // y duplicamos el ultimo elemento de nuestra snake y lo agregamos
        // snakeBody[snakeBody.length]            -> es un indice 1 vez superior al de la longitud de nuestra serpiente
        // { ...snakeBody[snakeBody.length - 1] } -> ultimo elemento de nuestra serpiente
        // snakeBody[snakeBody.length] = ({ ...snakeBody[snakeBody.length - 1] })
        // que es lo mismo que:
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
    }

    // para que no se expanda eternamente:
    newSegments = 0
}