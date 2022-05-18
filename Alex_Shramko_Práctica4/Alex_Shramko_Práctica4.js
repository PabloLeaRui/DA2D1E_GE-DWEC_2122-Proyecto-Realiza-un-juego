/* Elementos */
const board = document.getElementById("board");
const btnGrid3 = document.getElementById("btnGrid3");
const btnGrid5 = document.getElementById("btnGrid5");
const btnRegScore = document.getElementById("btnRegScore");
const scoreRegForm = document.getElementById("scoreRegForm");
const scoreSubmit = document.getElementById("btnSubmit");
const btnShowScore3 = document.getElementById("btnShowScore3");
const btnShowScore5 = document.getElementById("btnShowScore5");
const score3Div = document.getElementById("scores3Div");
const score5Div = document.getElementById("scores5Div");

/* Algunos aparecen invisibles al iniciar partida */
score3Div.style.display = "none";
score5Div.style.display = "none";
scoreRegForm.style.display = "none";
btnRegScore.style.display = "none";

/* Arrays que forman el tablero */
var size;
var mode;
var cellArray = [];
var cellNeighborArray = [];
var gridSelected = false;

/* Temporizador */
var timer = document.getElementById("timer");
var jsTimer;
var time;

/* Contador de movimientos */
var counter = document.getElementById("counter");
var movesCount;

/* Resgistro de puntuación */
var playerName = document.getElementById("playerName");
var scores3Array = [];
var scores5Array = [];

/* Listeners */
btnGrid3.addEventListener("click", function () {
    clearBoard();
    buildBoard(3);
    window.clearInterval(jsTimer);
    timer.innerHTML = "";
    counter.innerHTML = "";
    btnRegScore.style.display = "none";
    scoreRegForm.style.display = "none";
    gridSelected = true;
});
btnGrid5.addEventListener("click", function () {
    clearBoard();
    buildBoard(5);
    window.clearInterval(jsTimer);
    timer.innerHTML = "";
    counter.innerHTML = "";
    btnRegScore.style.display = "none";
    scoreRegForm.style.display = "none";
    gridSelected = true;
});
btnStart.addEventListener("click", function () {
    if (gridSelected) {
        start();
        time = -1;
        startTimer();
        window.clearInterval(jsTimer);
        jsTimer = self.setInterval(startTimer, 1000);
        movesCount = -1;
        countMovements();
        btnRegScore.style.display = "none";
        scoreRegForm.style.display = "none";
    }
    else {
        alert("Selecciona un modo de juego.");
    }
});
btnRegScore.addEventListener("click", function () {
    showScoreRegister();
});
scoreSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    registerScore();
    btnRegScore.style.display = "none";
});
btnShowScore3.addEventListener("click", function () {
    showScore3();
});
btnShowScore5.addEventListener("click", function () {
    showScore5();
});

recoverScores();


/* Elimina el tablero celda a celda */
function clearBoard() {
    let child = board.lastElementChild;
    while (child) {
        board.removeChild(child);
        child = board.lastElementChild;
    }
}

/* Construye el tablero de uno de los dos tamaños disponibles.
   Añade a un array todas las celdas y a otro array de arrays, 
   todas las posibles combinaciones de celdas contiguas. */
function buildBoard(size) {
    mode = size;
    for (let row = 0; row < size; row++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList = "row";
        for (let column = 0; column < size; column++) {
            const cellDiv = document.createElement("div");
            cellDiv.classList = "cell";
            rowDiv.appendChild(cellDiv);
        }
        board.append(rowDiv);
        cellArray = document.getElementsByClassName("cell");
    }
    for (var i = 0, j = cellArray.length; i < j; i++) {
        // Esquina superior izquierda
        if (i === 0) {
            cellNeighborArray[i] = [cellArray[i], cellArray[i + 1], cellArray[i + size]];
        // Esquina superior derecha
        } else if (i === size - 1) {
            cellNeighborArray[i] = [cellArray[i], cellArray[i - 1], cellArray[i + size]];
        // Esquina inferior derecha
        } else if (i === size * size - 1) {
            cellNeighborArray[i] = [cellArray[i], cellArray[i - 1], cellArray[i - size]];
        //  Esquina inferior izquierda
        } else if (i === size * size - size) {
            cellNeighborArray[i] = [cellArray[i], cellArray[i + 1], cellArray[i - size]];
        // Borde izquierdo
        } else if (i % size === 0) {
            cellNeighborArray[i] = [cellArray[i], cellArray[i + 1], cellArray[i - size], cellArray[i + size]];
        // Borde derecho
        } else if (i % size === size - 1) {
            cellNeighborArray[i] = [cellArray[i], cellArray[i - 1], cellArray[i - size], cellArray[i + size]];
        // Borde superior
        } else if (i < size) {
            cellNeighborArray[i] = [cellArray[i], cellArray[i - 1], cellArray[i + 1], cellArray[i + size]];
        // Borde inferior
        } else if (i >= size * size - size) {
            cellNeighborArray[i] = [cellArray[i], cellArray[i - 1], cellArray[i + 1], cellArray[i - size]];
        // El resto (cruz completa)
        } else {
            cellNeighborArray[i] = [cellArray[i], cellArray[i - 1], cellArray[i + 1], cellArray[i - size], cellArray[i + size]];
        };
    }
}

// Recorre el tablero, encendiendo celdas aleatorias.
function start() {
    for (var i = 0; i < cellArray.length; i++) {
        var onOrOff = Math.round(Math.random());
        if (onOrOff == 1) {
            cellArray[i].classList.toggle("light-on");
        }
        cellArray[i].addEventListener("click", lightClick);
    }
}

/* Encuentra a qué subgrupo pertenece la celda clickada
   y alterna el estado (encendido / apagado) de dichas celdas */
function lightClick() {
    this.classList.toggle("light-on");
    for (var i = 0; i < cellNeighborArray.length; i++) {
        if (this === cellNeighborArray[i][0]) {
            for (var x = 1; x < cellNeighborArray[i].length; x++) {
                cellNeighborArray[i][x].classList.toggle("light-on");
            }
        }
    }
    countMovements();
    if (checkWin()) {
        alert("Eres un genio!");
        window.clearInterval(jsTimer);
        btnRegScore.style.display = "inline-block";
    }
}

// Suma segundos
function startTimer() {
        time = time + 1;
        timer.innerHTML = "Tiempo: " + time + " s";
}

// Suma las veces que se hace click
function countMovements() {
    movesCount = movesCount + 1;
    counter.innerHTML = "Movimientos: " + movesCount;
}

// Comprueba si hay celdas encendidas en el tablero
function checkWin() {
    for (let i = 0; i < cellArray.length; i++) {

        if (cellArray[i].classList.contains("light-on")) {
            return false;
        }
    }
    return true;
}

// Hace visible el botón de registrar puntuación
function showScoreRegister() {
    scoreRegForm.style.display = "inline-block";
}

// Muestra y esconde el ranking de puntuaciones del modo 3x3
function showScore3() {
    if (scores3Array.length === 0) {
        alert("No hay puntuaciones registradas.");
    } else {
        if (score3Div.style.display === "none") {
            score3Div.style.display = "inline-block";
            btnShowScore3.style.color = "white";
        } else {
            score3Div.style.display = "none";
            btnShowScore3.style.color = "gold";
        }
    }
}

// Muestra y esconde el ranking de puntuaciones del modo 5x5
function showScore5() {
    if (scores5Array.length === 0) {
        alert("No hay puntuaciones registradas.");
    } else {
        if (score5Div.style.display === "none") {
            score5Div.style.display = "inline-block";
            btnShowScore5.style.color = "white";
        } else {
            score5Div.style.display = "none";
            btnShowScore5.style.color = "gold";
        }
    }
}

// Crea o añade puntuaciones en el localStorage del modo de juego pertinente
function registerScore() {

    var keyLocalStorage = obtainKeyLocalStorageByMode(mode);
    var elementScoresUl = obtainScoresULByMode(mode);

    if (playerName.value.trim().length === 0) {
        alert("¿Si quieres anonimato, pa qué registras?");
    }
    else {
        if (mode === 3) {
            if (localStorage.getItem(keyLocalStorage) == null) {
                localStorage.setItem(keyLocalStorage, "[]");
            }
            scores3Array = JSON.parse(localStorage.getItem(keyLocalStorage));
            scores3Array.push(playerName.value + ": " + time + " s " + movesCount + " m ");

            setScoresValueIntoLocalStorage(keyLocalStorage, scores3Array)
                .then(result => {
                    clearScoresUl(elementScoresUl);
                    updateScoresUl(elementScoresUl, scores3Array);
                    scoreRegForm.style.display = "none";

                    console.log(result);
                });
        }
        if (mode === 5) {
            if (localStorage.getItem(keyLocalStorage) == null) {
                localStorage.setItem(keyLocalStorage, "[]");
            }
            scores5Array = JSON.parse(localStorage.getItem(keyLocalStorage));
            scores5Array.push(playerName.value + ": " + time + " s " + movesCount + " m ");

            setScoresValueIntoLocalStorage(keyLocalStorage, scores5Array)
                .then(result => {
                    clearScoresUl(elementScoresUl);
                    updateScoresUl(elementScoresUl, scores5Array);
                    scoreRegForm.style.display = "none";

                    console.log(result);
                });
        }
    }
}

// Añade el array de puntuaciones al localStorage 
function setScoresValueIntoLocalStorage(keyLocalStorage, scoresArray) {
    let myPromise = new Promise((resolve, reject) => {
        localStorage.setItem(keyLocalStorage, JSON.stringify(scoresArray));
        resolve("Scores saved successfully into localstorage.");
    });

    return myPromise;
}

// Devuelve la clave del localStorage en función del modo de juego
function obtainKeyLocalStorageByMode(m) {
    if (m === 3) {
        return "scores3x3";
    }
    else if (m === 5) {
        return "scores5x5";
    }

    return null;
}

// Devuelve la ID de la lista de puntuaciones en función del modo de juego
function obtainScoresULByMode(m) {
    if (m === 3) {
        return document.getElementById("scores3");
    }
    else if (m === 5) {
        return document.getElementById("scores5");
    }

    return null;
}

/*  Añade a los arrays las puntuaciones del localStore.
    Se lanza al abrir la ventana, para recuperar las puntuaciones
    registradas antes de cerrarla */
function recoverScores() {
    var keyLocalStorage = obtainKeyLocalStorageByMode(3);
    var elementScoresUl = obtainScoresULByMode(3);

    if (localStorage.getItem(keyLocalStorage) != null) {
        scores3Array = JSON.parse(localStorage.getItem(keyLocalStorage));
        updateScoresUl(elementScoresUl, scores3Array);
    }

    keyLocalStorage = obtainKeyLocalStorageByMode(5);
    elementScoresUl = obtainScoresULByMode(5);

    if (localStorage.getItem(keyLocalStorage) != null) {
        scores5Array = JSON.parse(localStorage.getItem(keyLocalStorage));
        updateScoresUl(elementScoresUl, scores5Array);
    }
}

// Elimina los elementos de la lista de puntuaciones
function clearScoresUl(elementScoresUl) {
    let child = elementScoresUl.lastElementChild;
    while (child) {
        elementScoresUl.removeChild(child);
        child = elementScoresUl.lastElementChild;
    }
}

// Crea la lista con todos los registros de puntuaciones 
function updateScoresUl(elementScoresUl, scoresArray) {
    for (var i = 0; i < scoresArray.length; i++) {
        var li = document.createElement("li");
        var text = document.createTextNode(scoresArray[i]);
        li.appendChild(text);
        elementScoresUl.appendChild(li);
    }
}