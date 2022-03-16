//bolinha
let xBolinha = 100;
let yBolinha = 200;
let diametro = 15;

//velocidade
let velocidadeX = 6;
let velocidadeY = 6;
let raio = diametro / 2; //pra que a bolinha bata as pontas na borda e n o meio.

//raquete usuário
let xRaquete = 5;
let yRaquete = 150;
let compRaquete = 7;
let altRaquete = 80;
let colidiu = false;

//raquete oponente
let xRaqueteDois = 588;
let yRaqueteDois = 150;
let velocidadeYOponente;

//pontuação
let meusPontos=0; 
let pontosOponente=0;
let chanceDeErrar = 0;

//sons do jogo
let ponto;
let raquetada;
let trilha;

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostrarBolinha();
  velocidadeBolinha();
  limiteBolinha();
  mostrarRaquete(xRaquete, yRaquete);
  mostrarRaquete(xRaqueteDois, yRaqueteDois);
  moverRaquete();
  moverRaqueteOponente();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteDois, yRaqueteDois);
  incluirPlacar();
  marcarPonto();
  
}

function mostrarBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function velocidadeBolinha() {
  xBolinha += velocidadeX;
  yBolinha += velocidadeY;
}

//a velocidade oposta das margens é sempre negativa (-1)
function limiteBolinha() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeX *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeY *= -1;
  }
}

function mostrarRaquete(x, y) {
  rect(x, y, compRaquete, altRaquete);
}

function moverRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}
function moverRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteDois - compRaquete / 2 - 30;
  yRaqueteDois += velocidadeYOponente + chanceDeErrar;
  
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
  
}

function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, compRaquete, altRaquete, xBolinha, yBolinha, raio);
    if (colidiu){
        velocidadeX *= -1;
        raquetada.play();
    }
}

function incluirPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosOponente, 470, 26);
}


function marcarPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}

function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

