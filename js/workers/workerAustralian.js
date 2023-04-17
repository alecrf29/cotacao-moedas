async function conectaAPI() {
    const conecta = await fetch('https://economia.awesomeapi.com.br/json/last/AUD-BRL');
    const conectaTraduzido = await conecta.json();

    postMessage(conectaTraduzido.AUDBRL);
}

addEventListener('message', () => {
    conectaAPI();
    setInterval(() => conectaAPI(), 5000)
})


