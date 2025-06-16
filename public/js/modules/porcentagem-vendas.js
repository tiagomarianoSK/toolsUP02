export function render() {
  return `
    <div class="d-flex align-items-center mb-4">
      <a href="#calculo" class="btn btn-outline-secondary me-2" data-page="calculo">
        <i class="fas fa-arrow-left"></i>
      </a>
      <h1 class="mb-0"><i class="fas fa-cash-register me-2"></i>Porcentagem de Vendas</h1>
    </div>

    <div class="row g-4">
      <!-- Cálculo de Desconto/Perda -->
      <div class="col-md-6">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-arrow-down me-2 text-danger"></i>Desconto/Perda</h5>
            <p class="text-muted">Calcule quanto perdeu em uma venda com desconto</p>
            
            <div class="mb-3">
              <label class="form-label">Valor Original (R$)</label>
              <input type="number" class="form-control bg-dark text-light border-secondary" 
                     id="valor-original-perda" placeholder="Valor sem desconto">
            </div>
            
            <div class="mb-3">
              <label class="form-label">Valor com Desconto (R$)</label>
              <input type="number" class="form-control bg-dark text-light border-secondary" 
                     id="valor-desconto-perda" placeholder="Valor com desconto">
            </div>
            
            <button id="calcular-perda" class="btn btn-danger mb-3">
              <i class="fas fa-calculator me-1"></i>Calcular Perda
            </button>
            
            <div class="alert bg-dark border-info">
              <div id="resultado-perda">Preencha os valores para calcular</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Cálculo de Acréscimo/Lucro -->
      <div class="col-md-6">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-arrow-up me-2 text-success"></i>Acréscimo/Lucro</h5>
            <p class="text-muted">Calcule quanto ganhou em uma venda com acréscimo</p>
            
            <div class="mb-3">
              <label class="form-label">Valor Original (R$)</label>
              <input type="number" class="form-control bg-dark text-light border-secondary" 
                     id="valor-original-lucro" placeholder="Valor base">
            </div>
            
            <div class="mb-3">
              <label class="form-label">Valor com Acréscimo (R$)</label>
              <input type="number" class="form-control bg-dark text-light border-secondary" 
                     id="valor-acrescimo-lucro" placeholder="Valor final">
            </div>
            
            <button id="calcular-lucro" class="btn btn-success mb-3">
              <i class="fas fa-calculator me-1"></i>Calcular Lucro
            </button>
            
            <div class="alert bg-dark border-info">
              <div id="resultado-lucro">Preencha os valores para calcular</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Cálculo de Porcentagem Básica -->
      <div class="col-md-6">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-percent me-2 text-primary"></i>Porcentagem Básica</h5>
            <p class="text-muted">Calcule X% de um valor</p>
            
            <div class="mb-3">
              <label class="form-label">Valor Total (R$)</label>
              <input type="number" class="form-control bg-dark text-light border-secondary" 
                     id="valor-total" placeholder="Valor total">
            </div>
            
            <div class="mb-3">
              <label class="form-label">Porcentagem (%)</label>
              <input type="number" class="form-control bg-dark text-light border-secondary" 
                     id="porcentagem" placeholder="% a calcular">
            </div>
            
            <button id="calcular-porcentagem" class="btn btn-primary mb-3">
              <i class="fas fa-calculator me-1"></i>Calcular Porcentagem
            </button>
            
            <div class="alert bg-dark border-info">
              <div id="resultado-porcentagem">Preencha os valores para calcular</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function init() {
  // Cálculo de Perda/Desconto
  document.getElementById('calcular-perda').addEventListener('click', () => {
    const valorOriginal = parseFloat(document.getElementById('valor-original-perda').value);
    const valorDesconto = parseFloat(document.getElementById('valor-desconto-perda').value);
    
    if (isNaN(valorOriginal)) {
      document.getElementById('resultado-perda').innerHTML = 'Digite um valor original válido';
      return;
    }
    
    if (isNaN(valorDesconto)) {
      document.getElementById('resultado-perda').innerHTML = 'Digite um valor com desconto válido';
      return;
    }
    
    const diferenca = valorOriginal - valorDesconto;
    const porcentagem = (diferenca / valorOriginal) * 100;
    
    document.getElementById('resultado-perda').innerHTML = `
      <strong>Valor perdido:</strong> R$ ${diferenca.toFixed(2)}<br>
      <strong>Porcentagem de desconto:</strong> ${porcentagem.toFixed(2)}%
    `;
  });
  
  // Cálculo de Lucro/Acréscimo
  document.getElementById('calcular-lucro').addEventListener('click', () => {
    const valorOriginal = parseFloat(document.getElementById('valor-original-lucro').value);
    const valorAcrescimo = parseFloat(document.getElementById('valor-acrescimo-lucro').value);
    
    if (isNaN(valorOriginal)) {
      document.getElementById('resultado-lucro').innerHTML = 'Digite um valor original válido';
      return;
    }
    
    if (isNaN(valorAcrescimo)) {
      document.getElementById('resultado-lucro').innerHTML = 'Digite um valor com acréscimo válido';
      return;
    }
    
    const diferenca = valorAcrescimo - valorOriginal;
    const porcentagem = (diferenca / valorOriginal) * 100;
    
    document.getElementById('resultado-lucro').innerHTML = `
      <strong>Lucro obtido:</strong> R$ ${diferenca.toFixed(2)}<br>
      <strong>Porcentagem de acréscimo:</strong> ${porcentagem.toFixed(2)}%
    `;
  });
  
  // Cálculo de Porcentagem Básica
  document.getElementById('calcular-porcentagem').addEventListener('click', () => {
    const valorTotal = parseFloat(document.getElementById('valor-total').value);
    const porcentagem = parseFloat(document.getElementById('porcentagem').value);
    
    if (isNaN(valorTotal)) {
      document.getElementById('resultado-porcentagem').innerHTML = 'Digite um valor total válido';
      return;
    }
    
    if (isNaN(porcentagem)) {
      document.getElementById('resultado-porcentagem').innerHTML = 'Digite uma porcentagem válida';
      return;
    }
    
    const resultado = (valorTotal * porcentagem) / 100;
    
    document.getElementById('resultado-porcentagem').innerHTML = `
      <strong>${porcentagem}%</strong> de <strong>R$ ${valorTotal.toFixed(2)}</strong> = 
      <span class="text-primary">R$ ${resultado.toFixed(2)}</span>
    `;
  });
}