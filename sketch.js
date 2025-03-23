window.alert('Atenção, a musica de fundo é alta, certifique-se de que o volume esteja baixo')

window.onload = function () {
  const audio = new Audio("fundo.mp3");
  audio.loop = true;
  audio.play().catch(() => {
    let mAudio = window.confirm('O navegador não aceita a reprodução automática da música, deseja habilitar o display de audio no final da página?')

    if(mAudio) {
      document.getElementsByTagName('audio')[0].style.display = 'block'
    }
  });
};

var botMostra = document.getElementById("botao1")
botMostra.addEventListener("click", abriu)

var botFecha = document.getElementById("botao2")
botFecha.addEventListener("click", fechou)

var cont = document.getElementById("conteudo")

var canvas = document.getElementById("Mcanvas")

function abriu() {
  cont.style.display = "block"
}

function fechou() {
  cont.style.display = "none"
  canvas.style.display = "block"
  windowResized()
}

var Mcanvas;
const minW = 533;
const minH = 300;
const minSize = 50; // Tamanho mínimo dos personagens

let pos1 = 0;
let pos2 = 0;
let gameOver = false;

function setup() {
  const canvasW = Math.max(windowWidth - 500, minW);
  const canvasH = Math.max(canvasW * (9 / 16), minH);

  let container = document.getElementById("jogo");

  Mcanvas = createCanvas(canvasW, canvasH);
  Mcanvas.parent(container);

  updateContainerSize(canvasW, canvasH);
}

function windowResized() {
  const newW = Math.max(windowWidth - 500, minW);
  const newH = Math.max(newW * (9 / 16), minH);

  resizeCanvas(newW, newH);
  updateContainerSize(newW, newH);
}

let container = document.getElementById("jogo");
let img = document.getElementById("inicial");
let per1 = document.getElementById("futaba");
let per2 = document.getElementById("joker");

function updateContainerSize(w, h) {
  if (container) {
    container.style.width = w + "px";
    container.style.height = h + "px";
  }

  if (img) {
    img.style.width = w + "px";
    img.style.height = h + "px";
  }

  // Ajusta o tamanho e a posição dos personagens com base no tamanho do canvas
  if (per1 && per2) {
    let charSize = Math.max(minSize, h * 0.1); // Tamanho do personagem, mínimo 50px e 10% da altura do canvas
    per1.style.height = charSize + "px";
    per1.style.width = charSize + "px";
    per1.style.top = (h * 0.2) + "px"; // Futaba a 20% do topo
    per1.style.left = "0px"; // Futaba começa na borda esquerda

    per2.style.height = charSize + "px";
    per2.style.width = charSize + "px";
    per2.style.bottom = (h * 0.2) + "px"; // Joker a 20% do fundo
    per2.style.left = "0px"; // Joker começa na borda esquerda
  }
}

img.addEventListener("click", function() {
  img.style.display = "none";
});

function draw() {
  background(255);
}

function movePer(per, dis) {
  if (gameOver) return;

  let nPosi = parseInt(per.style.left) + dis;
  nPosi = Math.min(nPosi, Mcanvas.width - parseInt(per.style.width)); // Não deixa o personagem sair da tela
  per.style.left = nPosi + "px";

  if (nPosi >= Mcanvas.width - parseInt(per.style.width)) {
    gameOver = true;
    let vencedor = per === per1 ? "A ganhadora é a Futaba" : "O ganhador é o Joker";
    setTimeout(() => {
      alert(vencedor);
      // Exibe a confirmação se o usuário quer jogar de novo
      let jogarNovamente = window.confirm("Gostaria de jogar novamente?");
      if (jogarNovamente) {
        resetGame(); // Reinicia o jogo se o usuário escolher "OK"
      }
    }, 100);
  }
}

function resetGame() {
  // Reinicia o estado do jogo
  gameOver = false;
  pos1 = 0;
  pos2 = 0;

  // Reseta as posições dos personagens
  let container = document.getElementById("jogo");
  let canvasW = Mcanvas.width;
  let canvasH = Mcanvas.height;

  updateContainerSize(canvasW, canvasH);
  per1.style.left = "0px";
  per2.style.left = "0px";
}

document.addEventListener("keydown", function(event) {
  if (event.key === "p" || event.key === "P") {
    movePer(per1, Math.floor(Math.random() * 21) + 20); // Move Futaba
  }

  if (event.key === "q" || event.key === "Q") {
    movePer(per2, Math.floor(Math.random() * 21) + 20); // Move Joker
  }
});
