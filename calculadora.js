// calculadora.js

document.addEventListener('DOMContentLoaded', () => {
    const custoIngredientesInput = document.getElementById('custo-ingredientes');
    const custoFixoInput = document.getElementById('custo-fixo');
    const margemLucroInput = document.getElementById('margem-lucro');
    const calcularBtn = document.getElementById('calcular-btn');
    
    const custoTotalDisplay = document.getElementById('custo-total-display');
    const lucroDesejadoDisplay = document.getElementById('lucro-desejado-display');
    const precoVendaDisplay = document.getElementById('preco-venda-display');

    // Função para formatar o valor como moeda brasileira
    function formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    }

    function calcularPreco() {
        // Coleta e valida os inputs, garantindo que sejam números
        const custoIngredientes = parseFloat(custoIngredientesInput.value) || 0;
        const custoFixo = parseFloat(custoFixoInput.value) || 0;
        const margemLucroPercentual = parseFloat(margemLucroInput.value) || 0;

        if (margemLucroPercentual >= 100) {
            alert("A margem de lucro deve ser menor que 100% para evitar divisão por zero.");
            return;
        }

        // 1. Cálculo do Custo Total (CMV + Despesas Fixas)
        const custoTotal = custoIngredientes + custoFixo;
        
        // 2. Converte a margem de lucro de percentual para decimal (Ex: 30% -> 0.30)
        const margemLucroDecimal = margemLucroPercentual / 100;

        // 3. Aplica a fórmula do Preço de Venda (Markup)
        // Preço de Venda = Custo Total / (1 - Margem de Lucro)
        const precoVenda = custoTotal / (1 - margemLucroDecimal);

        // 4. Calcula o valor do lucro para exibição
        const lucroEmReais = precoVenda * margemLucroDecimal;
        
        // 5. Exibe os resultados formatados
        custoTotalDisplay.textContent = formatCurrency(custoTotal);
        lucroDesejadoDisplay.textContent = `${margemLucroPercentual}% (${formatCurrency(lucroEmReais)})`;
        precoVendaDisplay.textContent = formatCurrency(precoVenda);
    }

    // Adiciona o evento de clique para o botão
    calcularBtn.addEventListener('click', calcularPreco);
    
    // Recalcula ao alterar qualquer campo (torna a ferramenta mais interativa)
    [custoIngredientesInput, custoFixoInput, margemLucroInput].forEach(input => {
        input.addEventListener('change', calcularPreco);
    });

    // Executa o cálculo inicial ao carregar a página
    calcularPreco();
});