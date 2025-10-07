const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const tempoNaTela = document.querySelector('#timer');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPause = new Audio('/sons/pause.mp3');
const audioFinal = new Audio('/sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

/* ------- FOCO ---------*/
/*focoBt.addEventListener('click', () => {
    const titulo = document.querySelector('.app__title');
    titulo.innerHTML = `<h1 class="app__title">
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            </h1>`

    const imagem = document.querySelector('.app__image-figure');
    imagem.innerHTML = `<figure class="app__image-figure">
                <img class="app__image" src="/imagens/foco.png" alt="">
            </figure>`
})*/

/* ------- CURTO ---------*/
/*curtoBt.addEventListener('click', () => {
    const titulo = document.querySelector('.app__title');
    titulo.innerHTML = `<h1 class="app__title">
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            </h1>`
    const imagem = document.querySelector('.app__image-figure');
    imagem.innerHTML = `<figure class="app__image-figure">
                <img class="app__image" src="/imagens/descanso-curto.png" alt="">
            </figure>`
})*/

/* ------- LONGO ---------*/
/*longoBt.addEventListener('click', () => {
    const titulo = document.querySelector('.app__title');
    titulo.innerHTML = `<h1 class="app__title">
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            </h1>`
    const imagem = document.querySelector('.app__image-figure');
    imagem.innerHTML = `<figure class="app__image-figure">
                <img class="app__image" src="/imagens/descanso-longo.png" alt="">
            </figure>`;
})*/

// CÓDIGO DO PROFESSOR
/*------- FOCO---------*/
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco')
    focoBt.classList.add('active')
})

/* ------- CURTO ---------*/
curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')

})

/* ------- LONGO ---------*/
longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')

})

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioFinal.play();
        alert("Tempo Finalizado!");
        zerar();
        return;
    }

    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        audioPause.play(); // toca som de pausa

        startPauseBt.innerHTML = `
            <img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt=""> 
            <span>Retornar</span>`;

        zerar();
    } else {
        // Está parado → INICIAR
        audioPlay.play(); // toca som de iniciar
        startPauseBt.innerHTML = `
            <img class="app__card-primary-butto-icon" src="/imagens/pause.png" alt=""> 
            <span>Pausar</span>`;

        intervaloId = setInterval(contagemRegressiva, 1000);
    }
}


function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();