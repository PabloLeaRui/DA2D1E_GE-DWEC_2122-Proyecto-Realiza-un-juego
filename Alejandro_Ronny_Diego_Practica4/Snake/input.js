// al empezar nuestra snake no se mueve:
let inputDirection = { x:0, y:0 } 
let lastInputDirection = { x:0, y:0 }


// coger el movimiento de las teclas: up, down, left, right;
// al presionar la tecla: hacer un keydown
// evitando movimientos opuestos
window.addEventListener('keydown', e => {
    switch (e.key){
        case 'ArrowUp':
            // si nos estabamos moviendo hacia arriba o hacia abajo: break
            if(lastInputDirection.y !==0) 
                break
            inputDirection = { x: 0, y: -1 } // y:-1 es hacia arriba
            break
        case 'ArrowDown':
            if(lastInputDirection.y !==0)
                break
            inputDirection = { x: 0, y: +1 }
            break
        case 'ArrowLeft':
            // si nos estabamos moviendo hacia dcha o hacia izda: break
            if(lastInputDirection.x !==0)
                break
            inputDirection = { x: -1, y: 0 } // x:-1 es hacia la izqda
            break
        case 'ArrowRight':
            if(lastInputDirection.x !==0)
                break
            inputDirection = { x: +1, y: 0 }
            break
    }
})

export function getInputDirection(){
    lastInputDirection = inputDirection
    return inputDirection
}