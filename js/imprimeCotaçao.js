const lista = document.querySelectorAll('[data-lista]');

function selecionaCotacao(nome, valor) {
    lista.forEach((listaEscolhida) => {
        if (listaEscolhida.id == nome) {
            imprimeCotacao(listaEscolhida, nome, valor);
        }
    })
}


function imprimeCotacao(lista, nome, valor) {
    lista.innerHTML = ''
    
    const plurais = {
        'dolar':'dolares',
        'iene': 'ienes',
        'euro': 'euros',
        'yuan': 'yuans',
        'dolar': 'dolares'
    }

    for (let multiplicador = 1; multiplicador <= 1000; multiplicador *= 10) {
        const novoItem = document.createElement('li');

        novoItem.innerHTML = `${multiplicador} ${multiplicador == 1 ? nome : plurais[nome]}: R$${(valor * multiplicador).toFixed(2)}`

        lista.appendChild(novoItem)
    }
}

export default selecionaCotacao;

