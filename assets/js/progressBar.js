var item = document.getElementById('bar1');   
var item2 = document.getElementById('bar2');
const move1 = document.getElementById('moved1');
const move2 = document.getElementById('moved2');

const dynamicStyles = document.getElementById("estilo-improvisado");

function addAnimationTeste(elementHtml){
  //debugger

  dynamicStyles.innerHTML += elementHtml;
}

addAnimationTeste(`@keyframes progressAnimation${1} {
    0% {
      width: 5%;
      background-color: #ef476f;  
    }
    100% {
      width: 45%;
      background-color: ##f7d0d9;
    }
  }`);
  //${item.style.width}

  addAnimationTeste(`@keyframes progressAnimation${2} {
    0% {
      width: 5%;
      background-color: #4e9c96;
    }
    100% {
      width: 60%;
      background-color: #90f1aa;      
    }
  }`);

  move1.style.width = "90%";
  move1.style.backgroundColor = "#ef476f";

  item.style.animation = `progressAnimation${1} 6s`; 
  item.style.backgroundColor = "#f7d0d9" 
  
  
  item2.style.animation = `progressAnimation${2} 6s`; 
  item2.style.backgroundColor = "#90f1aa"

  move2.style.width = "90%";
  move2.style.backgroundColor = "#4e9c96";