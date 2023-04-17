const dadosDolar = document.querySelector('[data-dolar]');//Variavel que acessa o elemento canvas

const graficoParaDolar = new Chart(dadosDolar, { //variavel que faz a conexao com o canvas
    type: 'line',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
  });

setInterval(() => conectaAPI(), 5000)
async function conectaAPI() {
    const conecta = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
    const conectaTraduzido = await conecta.json();

    console.log(conectaTraduzido);
}

//setInterval define um intervalo para que algo possa acontecer, recebe como parâmetro o que a gente quer que aconteça e um tempo
//de intervalo

function geraHorario() { //Criando uma função que retorna pra gente o horário atual
    let data = new Date();
    let horario = data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds()

    return horario
}


//Código com o gráfico construído e dinâmico

setInterval(() => conectaAPI(), 5000)
async function conectaAPI() {
  const conecta = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
  const conectaTraduzido = await conecta.json();

  let tempo = geraHorario();
  let valor = conectaTraduzido.USDBRL.ask;

  adicionaDados(graficoParaDolar, tempo, valor)
}

function geraHorario() {
  let data = new Date();
  let horario = data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds()

  console.log(horario)
  return horario
}

function adicionaDados(grafico, legenda, dados) { //Função que recebe o gráfico construído, a legenda (ou hora da requisição) e dados
  grafico.data.labels.push(legenda);              //que é a moeda em si
  grafico.data.datasets.forEach((dataset) => {
    dataset.data.push(dados);
  })

  grafico.update();
}

//Pegamos o gráfico criado, acessamos o data e em seguida acessamos o labels, adicionando uma nova hora ao final da lista labels
//após isso, pegamos o gráfico novamente, acessamos o data e em seguida o datasets, iteramos cada um dos itens dataset e adicionamos
//um novo dado ao final da lista novamente
//Em baixo fizemos a atualização do gráfico com o grafico.update



//Código script com a funções de conectar a API, geração do horário e adicionar dados

setInterval(() => conectaAPI(), 5000);
async function conectaAPI() {
  const conecta = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
  const conectaTraduzido = await conecta.json();

  let tempo = geraHorario();
  let valor = conectaTraduzido.USDBRL.ask

  adicionaDados(graficoParaDolar, tempo, valor);

  imprimeCotacao('Dólar', valor);
}

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

workerDolar.addEventListener('message', event => {
  let tempo = geraHorario();
  let valor = event.data.ask
  
  adicionaDados(graficoParaDolar, tempo, valor)
})