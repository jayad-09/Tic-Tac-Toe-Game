let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container"); 
let msg = document.querySelector(".msg");

let turnO = true; // Player-X & Player-O

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

const winSound = new Audio("music/winner.mp3"); // Add the path to your winning sound file

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
}

boxes.forEach((box)=>{
  box.addEventListener("click", ()=>{
    if(turnO === true){ //PlayerO
      box.innerText ="O";
      box.style.color = "red"
      turnO = false;
    } else { //PlayerX
      box.innerText ="X"
      box.style.color = "blue"
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const disableBoxes = () => {
  for(let box of boxes) {
    box.disabled = true;
  }
}
const enableBoxes = () => {
  for(let box of boxes) {
    box.disabled = false;
    box.innerText ="";
  }
}

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  winSound.play(); // play the winning sound
}

const checkWinner = () => {
  for(pattern of winPatterns) {
       let poss1Val = boxes[pattern[0]].innerText;
       let poss2Val = boxes[pattern[1]].innerText;
       let poss3Val = boxes[pattern[2]].innerText;

       if(poss1Val != "" && poss2Val != "" && poss3Val != ""){
        if(poss1Val === poss2Val && poss2Val === poss3Val){
          showWinner(poss1Val);
        }
       }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

