import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, SCORE, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

// game loop function: main(currentTime) funcion que actualiza el juego una y otra vez
// main(currentTime) coge el timestamp exacto del momento en que la funcion esta corriendo
// (currentTime es una variable que cronometra desde que se carga la funcion)

function main(currentTime){

    if(gameOver){
    
        // si pierdes, paramos aqui:
        if (confirm('Ooooh, has perdido... presiona enter para continuar')) {
            window.location = 'game.html'
        }
        let promesa1 = new Promise((resolve, reject) => {
       
            setTimeout(function(){
              resolve("Ehem..!"); // ¡Todo salió bien!
            }, 5000);
          });
          
          promesa1.then((successMessage) => {
            if (confirm(successMessage + 'No entiendo porque dudas... juega otra partida mejor que seguro que sacaas mas puntos')) {
                window.location = 'game.html'
            }
          });
    
        // si no presionas ok no reinicies el juego:
        return
      
    }

    // dime cuando y a que hora puedo animar mi siguiente frame:
    // (continuamos el loop una vez que ha sido empezado por 1era vez abajo)
    window.requestAnimationFrame(main)
    // console.log(currentTime)

    const secondsSinceLastRender = (currentTime-lastRenderTime) / 1000

    // Mostrar el HighScore en el juego
    document.getElementById('score').innerHTML = SCORE


    // paramos el renderizado del snake si el tiempo es <1/SNAKE_SPEED
    // si se mueve a una SNAKE_SPEED de 2bloques/segundo = 1bloque/0.5s, 
    // no actualizamos si no han pasado 0.5s
    if (secondsSinceLastRender < 1/SNAKE_SPEED){
        return
    }
    

    // Renderizamos:
    // hacemos el render a la velocidad de SNAKE_SPEED = X veces que se mueve / segundo
    // se renderiza a X renders / segundo
    console.log('Render')
    console.log(secondsSinceLastRender)
    lastRenderTime = currentTime
    

    // mas loops: 
    // actualizamos la logica del juego
    update()
    // dibujamos la logica actualizada
    draw()
}

function update(){
    updateSnake()
    updateFood()
    checkDeath()
}

function draw(){
    // borrar las piezas anteriores del snake:
    gameBoard.innerHTML = ''

    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection() 
    // outsideGrid(getSnakeHead()) -> si la cabeza del snake esta fuera del grid
    // snakeIntersection()         -> si la snake se cruza consigo misma
    // Q: mirar bien de como hace el snakeIntersection() y la comparacion que haces para saber que la cabeza se salde del grid
}

// empezar el loop la 1era vez:
window.requestAnimationFrame(main)