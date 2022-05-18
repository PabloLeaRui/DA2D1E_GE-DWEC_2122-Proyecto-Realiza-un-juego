const GRID_SIZE = 24

export function randomGridPosition(){
    return{
        // numero mayor mas grande o igual al numero dado [0,23]+1 -> [1,24]
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
}

export function outsideGrid(position){
    return (
        // el grid empieza en 1
        position.x < 1 || position.x > GRID_SIZE ||
        position.y < 1 || position.y > GRID_SIZE
    )
}