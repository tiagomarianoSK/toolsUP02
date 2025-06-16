export function render() {
  return `
    <h1 class="display-4"><i class="fas fa-calculator me-2"></i>Cálculo</h1>
    <p class="lead">Ferramentas para cálculos matemáticos</p>
    
    <div class="row g-4 mt-4">
      <!-- Porcentagem de Vendas -->
      <div class="col-md-6 col-lg-4">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body text-center">
            <i class="fas fa-cash-register fa-3x mb-3 text-primary"></i>
            <h5 class="card-title">Porcentagem de Vendas</h5>
            <p class="card-text text-muted">Cálculos para vendedores</p>
            <a href="#porcentagem-vendas" class="btn btn-outline-primary" data-page="porcentagem-vendas">
              <i class="fas fa-arrow-right me-1"></i>Acessar
            </a>
          </div>
        </div>
      </div>
      
      <!-- Calculadora iFood -->
<div class="col-md-6 col-lg-4">
  <div class="card bg-dark border-secondary h-100">
    <div class="card-body text-center">
      <i class="fas fa-utensils fa-3x mb-3 text-primary"></i>
      <h5 class="card-title">Calculadora iFood</h5>
      <p class="card-text text-muted">Precificação para restaurantes</p>
      <a href="#ifood-calculator" class="btn btn-outline-primary" data-page="ifood-calculator">
        <i class="fas fa-arrow-right me-1"></i>Acessar
      </a>
    </div>
  </div>
</div>
    </div>
  `;
}

export function init() {
  // Inicialização se necessária
}