import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'

// el grid de CSS empieza en 1 y no en 0
let food = getRandomFoodPosition()
// cuanto crece nuestra snake cuando come
const EXPANSION_RATE = 1

export function update(){
    // si nuestra snake esta encima de la comida y se la puede comer: true
    if (onSnake(food)){
        // expandete:
        expandSnake(EXPANSION_RATE)
        // y crea la nueva posicion de la food:
        food = getRandomFoodPosition()
    }
}

export function draw(gameBoard){
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement) //añadiendolo al tablero

    /*AQUI SE DEBE CAMBIAR LOS ESTILOS PARA LA SERPIENTE*/
    var fruta = localStorage.getItem("fruta")

    const boxes = document.querySelectorAll('.food');
    boxes.forEach(box => {
        switch (fruta) {
            case "fresa":
                box.style.backgroundImage = "url('fresa.png')"
                box.style.backgroundSize = "cover"
                break;
            case "manzana":
                box.style.backgroundImage = "url('manzana.png')"
                box.style.backgroundSize = "cover"
                break;
            case "hamburguesa":
                box.style.backgroundImage = "url('hamburguesa.png')"
                box.style.backgroundSize = "cover"
                break;
            default:
                box.style.backgroundColor = localStorage.getItem("fruta")
                box.style.borderRadius = "100%"
                break;
        }
    });


}


// comida random que no este en la posicion del snake
function getRandomFoodPosition(){
    let newFoodPosition

    // si la comida es null o esta donde el snake, dame otra posicion:
    while (newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition()
    }

    return newFoodPosition
}