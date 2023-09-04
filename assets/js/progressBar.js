var idBar1 = document.getElementById('bar1');   
var idBar2 = document.getElementById('bar2');
const move1 = document.getElementById('moved1');
const move2 = document.getElementById('moved2');

const dynamicStyles = document.getElementById("estilo-improvisado");

function addAnimationTeste(elementHtml){  

  dynamicStyles.innerHTML += elementHtml;
}

addAnimationTeste(`@keyframes progressAnimation${1} {
    0% {
      width: 5%;
      background-color: #ef476f;  
    }
    100% {
      width: ${idBar1.style.width};
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
      width: ${idBar2.style.width};
      background-color: #90f1aa;      
    }
  }`);

  move1.style.width = "90%";
  move1.style.backgroundColor = "#ef476f";

  idBar1.style.animation = `progressAnimation${1} 6s`; 
  idBar1.style.backgroundColor = "#f7d0d9" 
  
  
  idBar2.style.animation = `progressAnimation${2} 6s`; 
  idBar2.style.backgroundColor = "#90f1aa"

  move2.style.width = "90%";
  move2.style.backgroundColor = "#4e9c96";