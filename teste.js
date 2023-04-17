import imprimeCotacao from "./imprimeCotaçao.js";

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
  let horario = data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds()

  console.log(horario);
  return horario
}

function adicionaDados(grafico, legenda, dados) {
  grafico.data.labels.push(legenda);
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
  imprimeCotacao('Dólar', valor);
})


const lista = document.querySelector('[data-lista]');

function imprimeCotacao(nome, valor) {
    lista.innerHTML = ''

    for (let multiplicador = 1; multiplicador <= 1000; multiplicador *= 10) {
        const novoItem = document.createElement('li');

        novoItem.innerHTML = `${multiplicador} ${nome}: R$${(valor * multiplicador).toFixed(2)}`

        lista.appendChild(novoItem);
    }
}

export default imprimeCotacao;


async function conectaAPI() {
  const conecta = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
  const conectaTraduzido = await conecta.json();

  postMessage(conectaTraduzido.USDBRL);
}

addEventListener('message', () => {
  conectaAPI();
  setInterval(() => conectaAPI(), 10000);
})