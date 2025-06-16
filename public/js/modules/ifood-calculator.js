export function render() {
  return `
    <div class="d-flex align-items-center mb-4">
      <a href="#calculo" class="btn btn-outline-secondary me-2" data-page="calculo">
        <i class="fas fa-arrow-left"></i>
      </a>
      <h1 class="mb-0"><i class="fas fa-utensils me-2"></i>Calculadora iFood</h1>
    </div>

    <div class="row g-4">
      <!-- Calculadora Principal -->
      <div class="col-md-6">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-calculator me-2 text-primary"></i>Precificação</h5>
            <p class="text-muted">Calcule o preço ideal para seu produto no iFood</p>
            
            <div class="mb-3">
              <label class="form-label">Custo do Produto (R$)</label>
              <input type="number" class="form-control bg-dark text-light border-secondary" 
                     id="custo-produto" placeholder="Custo para preparar" step="0.01" min="0">
            </div>
            
            <div class="mb-3">
              <label class="form-label">Taxa do iFood (%)</label>
              <div class="input-group">
                <input type="number" class="form-control bg-dark text-light border-secondary" 
                       id="taxa-ifood" placeholder="30" value="30" min="5" max="50" step="0.1">
                <span class="input-group-text bg-secondary text-light">%</span>
              </div>
              <small class="text-muted">Padrão: 30% (pode variar por categoria)</small>
            </div>
            
            <div class="mb-3">
              <label class="form-label">Margem de Lucro Desejada (%)</label>
              <div class="input-group">
                <input type="number" class="form-control bg-dark text-light border-secondary" 
                       id="margem-lucro" placeholder="40" value="40" min="0" max="200" step="1">
                <span class="input-group-text bg-secondary text-light">%</span>
              </div>
            </div>
            
            <div class="form-check form-switch mb-3">
              <input class="form-check-input" type="checkbox" id="incluir-taxa-entrega" checked>
              <label class="form-check-label" for="incluir-taxa-entrega">Considerar taxa de entrega no cálculo</label>
            </div>
            
            <button id="calcular-preco" class="btn btn-primary w-100 mb-3">
              <i class="fas fa-calculator me-1"></i>Calcular Preço de Venda
            </button>
          </div>
        </div>
      </div>
      
      <!-- Resultados -->
      <div class="col-md-6">
        <div class="card bg-dark border-success h-100">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-receipt me-2 text-success"></i>Resultado</h5>
            
            <div class="alert bg-darker border-primary mb-3">
              <div class="d-flex justify-content-between">
                <span>Preço Final no iFood:</span>
                <strong id="preco-final" class="text-primary">R$ 0,00</strong>
              </div>
            </div>
            
            <h6 class="mt-4"><i class="fas fa-info-circle me-2"></i>Detalhamento:</h6>
            <table class="table table-dark table-borderless">
              <tbody>
                <tr>
                  <td>Custo do Produto</td>
                  <td id="custo" class="text-end">R$ 0,00</td>
                </tr>
                <tr>
                  <td>Taxa iFood ({taxa}%)</td>
                  <td id="taxa-valor" class="text-end text-danger">- R$ 0,00</td>
                </tr>
                <tr>
                  <td>Taxa de Entrega</td>
                  <td id="taxa-entrega" class="text-end text-warning">+ R$ 0,00</td>
                </tr>
                <tr>
                  <td>Seu Lucro</td>
                  <td id="lucro" class="text-end text-success">R$ 0,00</td>
                </tr>
              </tbody>
            </table>
            
            <div class="alert alert-info mt-4">
              <i class="fas fa-lightbulb me-2"></i>
              <small>O preço considera: custo + sua margem + taxas. Ajuste conforme sua estratégia.</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="alert alert-warning mt-4">
      <i class="fas fa-exclamation-triangle me-2"></i>
      <strong>Observação:</strong> Esta calculadora fornece uma estimativa. Considere outros fatores como:
      concorrência, sazonalidade e despesas fixas na sua precificação final.
    </div>
  `;
}

export function init() {
  // Configurar evento de cálculo
  document.getElementById('calcular-preco').addEventListener('click', calcularPrecoIfood);
  
  // Calcular automaticamente ao mudar valores
  document.querySelectorAll('#custo-produto, #taxa-ifood, #margem-lucro').forEach(input => {
    input.addEventListener('input', calcularPrecoIfood);
  });
  
  // Função principal de cálculo
  function calcularPrecoIfood() {
    // Obter valores dos inputs
    const custo = parseFloat(document.getElementById('custo-produto').value) || 0;
    const taxaIfood = parseFloat(document.getElementById('taxa-ifood').value) || 30;
    const margemLucro = parseFloat(document.getElementById('margem-lucro').value) || 40;
    const incluirTaxaEntrega = document.getElementById('incluir-taxa-entrega').checked;
    
    // Calcular componentes
    const taxaEntrega = incluirTaxaEntrega ? 5.00 : 0; // Valor fixo exemplo
    const lucroDesejado = custo * (margemLucro / 100);
    const precoBase = custo + lucroDesejado;
    
    // Calcular preço final (ajustando para incluir a taxa do iFood)
    const precoFinal = precoBase / (1 - (taxaIfood / 100)) + taxaEntrega;
    
    // Calcular detalhes
    const valorTaxaIfood = precoFinal * (taxaIfood / 100);
    const lucroReal = precoFinal - custo - valorTaxaIfood - taxaEntrega;
    
    // Atualizar interface
    document.getElementById('preco-final').textContent = `R$ ${precoFinal.toFixed(2)}`;
    document.getElementById('custo').textContent = `R$ ${custo.toFixed(2)}`;
    document.getElementById('taxa-valor').textContent = `- R$ ${valorTaxaIfood.toFixed(2)}`;
    document.getElementById('taxa-valor').parentNode.firstElementChild.textContent = `Taxa iFood (${taxaIfood}%)`;
    document.getElementById('taxa-entrega').textContent = `+ R$ ${taxaEntrega.toFixed(2)}`;
    document.getElementById('lucro').textContent = `R$ ${lucroReal.toFixed(2)}`;
    
    // Ajustar cor do lucro conforme viabilidade
    const lucroElement = document.getElementById('lucro');
    if (lucroReal < 0) {
      lucroElement.classList.remove('text-success');
      lucroElement.classList.add('text-danger');
    } else {
      lucroElement.classList.remove('text-danger');
      lucroElement.classList.add('text-success');
    }
  }
  
  // Calcular um exemplo inicial
  calcularPrecoIfood();
}