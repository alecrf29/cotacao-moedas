import selecionaCotacao from "./imprimeCotaçao.js";

const dadosDolar = document.querySelector('[data-dolar]');

const graficoParaDolar = new Chart(dadosDolar, { //variavel que faz a conexao com o canvas
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Dólar',
      data: [],
      borderWidth: 1
    }]
  },
});

function geraHorario() {
  let data = new Date();
  let horario = data.getHours() + 'h' + data.getMinutes() + ':' + data.getSeconds()

  return horario
}

function adicionaDados(grafico, tempo, dados) {
  grafico.data.labels.push(tempo);
  grafico.data.datasets.forEach((dataset) => {
    dataset.data.push(dados);
  })

  grafico.update();
}

let workerDolar = new Worker('./js/workers/workerDolar.js');
workerDolar.postMessage('usd');

workerDolar.addEventListener('message', evento => {
  let tempo = geraHorario();
  let valor = evento.data.ask;

  adicionaDados(graficoParaDolar, tempo, valor);

  selecionaCotacao('dolar', valor);
})

//Iene ------------------------------------------------------------------------------------

const dadosIene = document.querySelector('[data-iene]');

const graficoParaIene = new Chart(dadosIene, {
  type:'line',
  data: {
    labels: [],
    datasets: [{
      label:'Iene',
      data: [],
      borderWidth: 1
    }]
  }
})

let workerIene = new Worker('./js/workers/workerIene.js');
workerIene.postMessage('iene');

workerIene.addEventListener('message', evento => {
  let tempo = geraHorario();
  let valor = evento.data.ask

  adicionaDados(graficoParaIene, tempo, valor)

  selecionaCotacao('iene', valor);
})

//Euro -------------------------------------------------------------------------------------

const dadosEuro = document.querySelector('[data-euro]');

const graficoEuro = new Chart(dadosEuro, {
  type: 'line',
  data:{
    label: [],
    datasets: [{
      label: 'Euro',
      data: [],
      borderWidth: 1
    }]
  }
})

let workerEuro = new Worker('./js/workers/workerEuro.js');
workerEuro.postMessage('euro');

workerEuro.addEventListener('message', evento => {
  let tempo = geraHorario();
  let valor = evento.data.ask;

  adicionaDados(graficoEuro, tempo, valor)

  selecionaCotacao('euro', valor);
})

//Yuan ----------------------------------------------------------------------

const dadosYuan = document.querySelector('[data-yuan]');

const graficoYuan = new Chart(dadosYuan, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Yuan',
      data: [],
      borderWidth: 1
    }]
  }
})

let workerYuan = new Worker('./js/workers/workerYuan.js');
workerYuan.postMessage('yuan');

workerYuan.addEventListener('message', evento => {
  let tempo = geraHorario();
  let valor = evento.data.ask;

  adicionaDados(graficoYuan, tempo, valor);

  selecionaCotacao('yuan', valor)
})

//Dolar Australiano -----------------------------------------------------------------------------

const dadosDolarAustraliano = document.querySelector('[data-australiano]');

const graficoAustraliano = new Chart(dadosDolarAustraliano, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Dolar Australiano',
      data: [],
      borderWidth: 1
    }]
  }
})

let workerAustraliano = new Worker('./js/workers/workerAustralian.js');
workerAustraliano.postMessage('dolar australiano');

workerAustraliano.addEventListener('message', evento => {
  let tempo = geraHorario();
  let valor = evento.data.ask;

  adicionaDados(graficoAustraliano, tempo, valor);

  selecionaCotacao('dolar', valor);
})