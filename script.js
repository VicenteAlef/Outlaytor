document.getElementById('calculate').addEventListener('click', function(event) {
    event.preventDefault();

    const capitalInicial = parseFloat(document.getElementById('capital-inicial').value) || 0;
    const taxaAnual = parseFloat(document.getElementById('taxa').value) || 0;
    const aporteMensal = parseFloat(document.getElementById('aporte').value) || 0;
    const prazoMeses = parseInt(document.getElementById('prazo').value) || 0;

    const taxaMensal = (taxaAnual / 12) / 100;

    let montanteFinal = capitalInicial * Math.pow(1 + taxaMensal, prazoMeses);
    montanteFinal += aporteMensal * ((Math.pow(1 + taxaMensal, prazoMeses) - 1) / taxaMensal);

    const valorInvestido = capitalInicial + (aporteMensal * prazoMeses);
    const rendimentos = montanteFinal - valorInvestido;

    const montanteFinalFormatado = formatarMoeda(montanteFinal);
    const valorInvestidoFormatado = formatarMoeda(valorInvestido);
    const rendimentosFormatados = formatarMoeda(rendimentos);

    sessionStorage.setItem('mes', prazoMeses);
    sessionStorage.setItem('resultadoFinal', montanteFinalFormatado);
    sessionStorage.setItem('valorInvestido', valorInvestidoFormatado);
    sessionStorage.setItem('rendimentos', rendimentosFormatado);

    window.location.href = 'result.html';
});

function formatarMoeda(valor) {
    if (isNaN(valor)) {
        return 'R$ 0,00';
    }
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

window.addEventListener('DOMContentLoaded', function() {
    const mes = sessionStorage.getItem('mes');
    const resultadoFinal = sessionStorage.getItem('resultadoFinal');
    const valorInvestido = sessionStorage.getItem('valorInvestido');
    const rendimentos = sessionStorage.getItem('rendimentos');

    document.getElementById('mes').textContent = mes;
    document.getElementById('resultado-final').textContent = resultadoFinal;
    document.getElementById('valor-investido').textContent = valorInvestido;
    document.querySelector('.rendimentos').textContent = rendimentos;
});

document.getElementById('back').addEventListener('click', function() {
    window.location.href = 'index.html';
});