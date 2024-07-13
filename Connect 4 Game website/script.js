var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;
var currColumns;

var rows = 6;
var cols = 7;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5,5,5,5,5,5,5];

    for(let r=0;r<rows;r++) {
        let row = [];
        for(let c=0;c<cols;c++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click",setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece(){
    if(gameOver) {
        return;
    }

    let coord = this.id.split("-");
    let r = parseInt(coord[0]);
    let c = parseInt(coord[1]);

    r = currColumns[c];
    if(r<0){
        return;
    }

    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString()+"-"+c.toString());
    if(currPlayer == playerRed) {
        tile.classList.add('red-piece');
        currPlayer = playerYellow;
    } else {
        tile.classList.add('yellow-piece');
        currPlayer = playerRed;
    }

    r-=1;
    currColumns[c] = r;

    checkWinner();
}

function checkWinner(){
    //horizontally
    for(let r=0;r<rows;r++){
        for(let c=0;c<cols-3;c++){
            if(board[r][c]!=' '){
                if(board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    //vertically
    for(let c=0;c<cols;c++){
        for(let r=0;r<rows-3;r++){
            if(board[r][c]!=' '){
                if(board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    //anti diagonally
    for(let r=0;r<rows-3;r++){
        for(let c=0;c<cols-3;c++){
            if(board[r][c]!=' '){
                if(board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    //diagonally
    for(let r=3;r<rows;r++){
        for(let c=0;c<cols-3;c++){
            if(board[r][c]!=' '){
                if(board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
}

function setWinner(r,c){
    let winner = document.getElementById("winner");
    if(board[r][c] == playerRed) {
        winner.innerText = "Red Wins!";
    } else {
        winner.innerText = "Yellow Wins!";
    }

    gameOver = true;
}