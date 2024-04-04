const boxex = document.querySelectorAll(".cell");
const playerInfo = document.querySelector(".player-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
initGame();

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];

  boxex.forEach((box,index) => {
    box.innerText = "";
    box.style.pointerEvents = "all";
    box.classList = `cell cell${index+1}`
  });
  newGameBtn.classList.remove("active");
  playerInfo.innerText = `Current Player - ${currentPlayer}`;


}

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxex[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxex[index].style.pointerEvents = "none";
    swapPlayer();
    checkGameOver();
  }
}

function swapPlayer() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  playerInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  let winner = "";
  winningPosition.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" &&
      gameGrid[position[1]] !== "" && 
      (gameGrid[position[2]] !== "")&&
        gameGrid[position[0]] === gameGrid[position[1]] &&
        gameGrid[position[1]] === gameGrid[position[2]])
    ) {
        if(gameGrid[position[0]]==='X')
        {
            winner="X"
        }
        else{
            winner="O"
        }

        boxex.forEach(box=>box.style.pointerEvents='none ')

        boxex[position[0]].classList.add('win')
        boxex[position[1]].classList.add('win')
        boxex[position[2]].classList.add('win')

    }
});
if(winner!==''){
 playerInfo.innerText=`Winner - ${winner}`
 newGameBtn.classList.add('active')   
}

let fillCount = 0
gameGrid.forEach((box)=>{
    if(box!=='')
    {
        fillCount++
    }
})

if(fillCount===9){
    playerInfo.innerText="Game Tied!"
    newGameBtn.classList.add('active')


}
}

boxex.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", initGame);
