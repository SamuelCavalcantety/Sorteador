document.addEventListener('DOMContentLoaded', () => {
    const sortearBtn = document.getElementById('sortearBtn');
    const listaInicial = document.getElementById('listaInicial');
    const listaFinal = document.getElementById('listaFinal');
    const resultadoInicialDiv = document.getElementById('resultadoInicial');
    const resultadoFinalDiv = document.getElementById('resultadoFinal');

    // Define os 25 números para o primeiro sorteio
    const conjuntoInicial = Array.from({ length: 25 }, (_, i) => i + 1); // Números de 1 a 25

    sortearBtn.addEventListener('click', () => {
        // Limpar resultados anteriores
        listaInicial.innerHTML = '';
        listaFinal.innerHTML = '';
        resultadoInicialDiv.style.display = 'none';
        resultadoFinalDiv.style.display = 'none';

        // Sortear os 20 primeiros números do conjunto inicial
        const primeirosNumeros = sortearUnicos(20, conjuntoInicial);

        // Exibir os 20 primeiros números
        primeirosNumeros.forEach(numero => {
            const li = document.createElement('li');
            li.textContent = numero;
            listaInicial.appendChild(li);
        });
        resultadoInicialDiv.style.display = 'block';

        // Gerar 30 combinações de 15 números a partir dos 20 sorteados
        const combinacoes = gerarCombinacoes(primeirosNumeros, 15, 30);

        // Exibir as 30 combinações de 15 números
        if (combinacoes.length > 0) {
            resultadoFinalDiv.innerHTML = '<h2>30 Combinações de 15 Números:</h2><ul id="listaFinal"></ul>';
            const listaFinal = document.getElementById('listaFinal');
            combinacoes.forEach(combinacao => {
                const li = document.createElement('li');
                li.textContent = combinacao.sort((a, b) => a - b).join(', ');
                listaFinal.appendChild(li);
            });
            resultadoFinalDiv.style.display = 'block';
        } else {
            resultadoFinalDiv.innerHTML = '<p>Não foi possível gerar 30 combinações únicas.</p>';
            resultadoFinalDiv.style.display = 'block';
        }
    });

    // Função para sortear números únicos de um array fornecido
    function sortearUnicos(quantidade, arrayDeNumeros) {
        if (quantidade > arrayDeNumeros.length) {
            console.error("Quantidade a ser sorteada é maior que o número de opções disponíveis.");
            return [];
        }

        const pool = [...arrayDeNumeros];
        const numerosSorteados = [];

        while (numerosSorteados.length < quantidade) {
            const indiceAleatorio = Math.floor(Math.random() * pool.length);
            const numeroSorteado = pool.splice(indiceAleatorio, 1)[0];
            numerosSorteados.push(numeroSorteado);
        }

        return numerosSorteados.sort((a, b) => a - b); // Ordena os números
    }

    // Função para gerar combinações únicas de k elementos de um array, limitado a um máximo
    function gerarCombinacoes(array, k, maxCombinacoes) {
        const combinacoes = new Set();
        const n = array.length;

        function combinar(index, currentCombination) {
            if (currentCombination.length === k) {
                combinacoes.add([...currentCombination].sort((a, b) => a - b).join(','));
                return;
            }
            if (index === n || combinacoes.size >= maxCombinacoes) {
                return;
            }

            // Inclui o elemento atual
            currentCombination.push(array[index]);
            combinar(index + 1, currentCombination);
            currentCombination.pop(); // Backtrack

            // Exclui o elemento atual
            combinar(index + 1, currentCombination);
        }

        combinar(0, []);
        return Array.from(combinacoes).slice(0, maxCombinacoes).map(comboStr => comboStr.split(',').map(Number));
    }
});