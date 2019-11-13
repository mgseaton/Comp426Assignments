export class Game {

    contructor(size) {
        this.size = size; 
        this.boardLength = size*size; 
        this.gameState = {
            board: new Array(this.boardLength).fill(0), 
            score: 0, 
            won: false, 
            over: false, 
        }
        this.freeSpots = []; 
        this.buildBoard(); 
    }

    onMove(callback) {
        this.move(direction); 
        this.addTile(); 
        this.updateFreeSpots(); 
    }

    buildBoard() {
        // this.gameState.board.fill(0, 0, this.boardLength); 
        let firstRandomIndex = getRandomIntInclusive(0, this.boardLength-1); 
        let secondRandomIndex = getRandomIntInclusive(0, this.boardLength-1); 
        while(firstRandomIndex == secondRandomIndex) {
            secondRandomIndex = getRandomIntInclusive(0, this.boardLength-1); 
        }
        this.board[firstRandomIndex] = choose2Or4(); 
        this.board[secondRandomIndex] = choose2Or4(); 
        this.updateFreeSpots(); 
    }

    updateFreeSpots() {
        // for (let i=0; i<this.boardLength; i++) {
        //     if (this.gameState.board[i] == 0) {
        //         this.gameState.freeSpots[i] = true; 
        //     } else {
        //         this.gameState.freeSpots[i] = false; 
        //     }
        // }
        for (entry of this.gameState.board) {
            if (entry == 0) {
                this.freeSpots[i] = true; 
            } else {
                this.freeSpots[i] = false; 
            }
        }
    }

    addTile() {
        let index = getRandomIntInclusive(0, this.boardLength-1); 
        while (!this.freeSpots[index]) {
            index = getRandomIntInclusive(0, this.boardLength-1); 
        }
        this.board[index] = choose2Or4(); 
    }

    setupNewGame() {
        this.gameState = new gameState(); 
        this.buildBoard(); 
    }

    loadGame(gameState) {
        this.gameState = gameState; 
    }

    onWin(callback) {

    }

    onLose(callback) {

    }

    getGameState() {
        return this.gameState; 
    }

    move(direction) {
        if (direction = "up") {

            for (let k=0; k<this.size; k++) {

                let j=k;
                let col = []; 
                let empties = []; 
                let cantAdd = new Array.fill(false, 0, this.size); 

                for (let i=0; i<this.size; i++) {
                    col[i] = this.gameState.board[j];
                    empties[i] = this.freeSpots[j]; 
                    j+=this.size; 
                }

                for (let i=0; i<col.length; i++) {
                    if (!empties[i]) {
                        let nextOccupied = empties.indexOf(empties.slice(0,i).lastIndexOf(false)); 
                        let nextOnBoard = this.size * nextOccupied + k;
                        let currentOnBoard = this.size * i + k; 
                        if ((col[nextOccupied] == col[i]) && !cantAdd[nextOccupied]) {
                            this.gameState.board[nextOnBoard] += this.gameState.board[currentOnBoard]; 
                            this.gameState.board[currentOnBoard] = 0; 
                            cantAdd[nextOccupied] = true; 
                        }
                    }
                }

            }
            this.updateFreeSpots(); 

        } else if (direction = "right") {

            for (let i=0; i<this.boardLength; i+=this.size) {
                let row = this.board.slice(i, i+this.size); 
                let empties = this.freeSpots.slice(i, i+this.size); 
                let cantAdd = new Array.fill(false, 0, this.size); 
                for (let j = row.length-2; j>=0; j--) {
                    if (!empties[j]) {
                        let nextOccupied = empties.indexOf(empties.find(false)); 
                        if ((row[nextOccupied] == row[j]) && !cantAdd[nextOccupied]) {
                            this.gameState.board[i+nextOccupied] += this.gameState.board[i+j]; 
                            this.gameState.board[i+j] = 0; 
                            cantAdd[nextOccupied] = true; 
                        }
                    }
                }
            }
            this.updateFreeSpots(); 

        } else if (direction = "down") {

            for (let k=0; k<this.size; k++) {

                let j=k;
                let col = []; 
                let empties = []; 
                let cantAdd = new Array.fill(false, 0, this.size); 
                for (let i=0; i<this.size; i++) {
                    col[i] = this.gameState.board[j];
                    empties[i] = this.freeSpots[j]; 
                    j+=this.size; 
                }
                for (let i=col.length-2; i>=0; i--) {
                    if (!empties[i]) {
                        let nextOccupied = empties.indexOf(empties.find(false)); 
                        let nextOnBoard = this.size * nextOccupied + k; 
                        let currOnBoard = this.size * i + k; 
                        if ((col[nextOccupied] == col[i]) && !cantAdd[nextOccupied]) {
                            this.gameState.board[nextOnBoard] += this.gameState.board[currOnBoard]; 
                            this.gameState.board[currOnBoard] = 0; 
                            cantAdd[nextOccupied] = true; 
                        }
                    }
                }

            }
            this.updateFreeSpots(); 

        } else if (direction = "left") {

            for (let i=0; i<this.boardLength; i+=this.size) {
                let row = this.board.slice(i, i+this.size); 
                let empties = this.freeSpots.slice(i, i+this.size); 
                let cantAdd = new Array.fill(false, 0, this.size); 
                for (let j = 0; j<row.length; j++) {
                    if (!empties[j]) {
                        let nextOccupied = empties.indexOf(empties.slice(0,j).lastIndexOf(false)); 
                        if ((this.gameState.board[i+nextOccupied] == this.gameState.board[i+j]) && !cantAdd[nextOccupied]) {
                            this.gameState.board[i+nextOccupied] += this.gameState.board[i+j]; 
                            this.gameState.board[i+j] = 0; 
                            cantAdd[nextOccupied] = true; 
                        }
                    }
                }
            }
            this.updateFreeSpots(); 

        } else {
            return; 
        }
    }

    getGameState() {
        return this.gameState; 
    }

    updateScore(tile1, tile2) {
        this.gameState.score += (tile1+tile2); 
        if (tile1+tile2 == 2048) {
            this.gameState.won = true; 
        }
    }

}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }

function choose2Or4() {
    let rand = Math.random();
    while (rand <= 0) {
        rand = Math.random(); 
    } 
    if (0<rand<=0.9) {
        return 2; 
    } else if (0.9<rand<=1) {
        return 4;
    } 
  }