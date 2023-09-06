
const dynamicStyles = document.getElementById("estilo-improvisado");

function addAnimationToStyle(cssAnimation){  
  dynamicStyles.innerHTML += cssAnimation;
}

function createAnimationStyle(num, colorZero, colorCem, widthParam){
  return `@keyframes progressAnimation${num} {
    0% {
      width: 5%;
      background-color: ${colorZero};  
    }
    100% {
      width: ${widthParam};
      background-color: ${colorCem};
    }
  }
  
  `;
}

function createStat(tituloStats, numeroStats, index){
  let statHtml = `
                    <div class="containerProg" >
                      <div class="bloco-stats">                               
                        <span class="titulo-stats" >${tituloStats}</span>  
                        <span class="titulo-stats-numero" >${numeroStats}</span>  
                        <div class="progressConteiner" > 
                          <div class="progress2 progress-moved" id="moved${index}" >                  
                            <div class="progress-bar2" style="width: ${numeroStats}%;" id="bar${index}" ></div>                       
                          </div>
                        </div> 
                      </div>                 
                    </div>
                  `;                  

  let colorZeroLoc = "#ef476f";
  let colorCemLoc = "#f7d0d9";
  if(index % 2 != 0){
    colorZeroLoc = "#4e9c96";
    colorCemLoc = "#90f1aa";
  }

  addAnimationToStyle(createAnimationStyle(index,colorZeroLoc,colorCemLoc, `${numeroStats}%`)); 
  return statHtml;
}

async function preencheAbaBaseStats(){
  let baseStats = document.getElementById("base-stats");//base-stats 

  const lista = about.stats.map((obj, index)=>{
    //debugger
    var num = obj.base_stat;
    var titulo = obj.stat.name;
    return createStat(titulo,num, index + 1);
  });

  baseStats.innerHTML = lista.join("");
}

function chargeAnimations(){
  //debugger
  let quant = about.stats.length;

  for (var i = 0; i < quant; i++) {
    let index = i + 1;
    let colorZeroLoc = "#ef476f";
    let colorCemLoc = "#f7d0d9";
    if(index % 2 != 0){
      colorZeroLoc = "#4e9c96";
      colorCemLoc = "#90f1aa";
    }
    addAnimationOnHtml(index, colorZeroLoc, colorCemLoc);
  }
}

function addAnimationOnHtml(index, colorZeroLoc, colorCemLoc){
  let moveLocal = document.getElementById(`moved${index}`);
  let idBarLocal = document.getElementById(`bar${index}`);

  moveLocal.style.width = "90%";
  moveLocal.style.backgroundColor = colorZeroLoc;

  idBarLocal.style.animation = `progressAnimation${index} 6s`; 
  idBarLocal.style.backgroundColor = colorCemLoc; 

}