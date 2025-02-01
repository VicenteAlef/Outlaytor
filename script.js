// Aguarda até que todo o conteúdo da página esteja carregado
document.addEventListener("DOMContentLoaded", function () {
    // Verifica se está na página index.html
    if (document.getElementById("calculate")) {
        configurarFormulario();
    }

    // Verifica se está na página result.html
    if (document.getElementById("resultado-final")) {
        calcularInvestimento();
    }
});

// Função para configurar os eventos no formulário
function configurarFormulario() {
    document.getElementById("calculate").addEventListener("click", function (event) {
        event.preventDefault(); // Evita que o link recarregue a página

        // Captura os valores dos inputs
        let capitalInicial = parseFloat(document.getElementById("capital-inicial").value) || 0;
        let taxaJuros = parseFloat(document.getElementById("taxa").value) || 0;
        let aporteMensal = parseFloat(document.getElementById("aporte").value) || 0;
        let prazo = parseInt(document.getElementById("prazo").value) || 0;

        // Salva os valores no localStorage para serem usados na próxima página
        localStorage.setItem("capitalInicial", capitalInicial);
        localStorage.setItem("taxaJuros", taxaJuros);
        localStorage.setItem("aporteMensal", aporteMensal);
        localStorage.setItem("prazo", prazo);

        // Redireciona para a página de resultado
        window.location.href = "result.html";
    });
}

// Função para calcular o investimento na página de resultado
function calcularInvestimento() {
    // Recupera os valores do localStorage
    let capitalInicial = parseFloat(localStorage.getItem("capitalInicial")) || 0;
    let taxaJuros = parseFloat(localStorage.getItem("taxaJuros")) || 0;
    let aporteMensal = parseFloat(localStorage.getItem("aporteMensal")) || 0;
    let prazo = parseInt(localStorage.getItem("prazo")) || 0;

    // Converte a taxa de juros anual para mensal
    let taxaMensal = taxaJuros / 100;

    // Variáveis para o cálculo
    let valorInvestido = capitalInicial; // Valor total aplicado
    let saldoFinal = capitalInicial; // Valor total com juros
    let rendimentos = 0; // Juros acumulados

    // Loop para calcular os juros compostos mês a mês
    for (let i = 1; i <= prazo; i++) {
        saldoFinal += saldoFinal * taxaMensal; // Aplica os juros ao saldo
        saldoFinal += aporteMensal; // Adiciona o aporte mensal
        valorInvestido += aporteMensal; // Soma os aportes ao valor investido
    }

    // Calcula os rendimentos
    rendimentos = saldoFinal - valorInvestido;

    // Atualiza a página com os resultados
    document.getElementById("mes").textContent = prazo;
    document.getElementById("resultado-final").textContent = saldoFinal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    document.getElementById("valor-investido").textContent = valorInvestido.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    document.querySelector(".rendimentos").textContent = rendimentos.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("back")) {
        document.getElementById("back").addEventListener("click", function () {
            window.location.href = "index.html"; // Volta para a tela inicial
        });
    }
});
