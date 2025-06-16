export function render() {
  return `
    <h1 class="display-4"><i class="fas fa-cogs me-2"></i>Geradores</h1>
    <p class="lead">Ferramentas para gerar dados de teste</p>
    
    <div class="alert alert-warning alert-dismissible fade show mb-4" role="alert">
      <i class="fas fa-exclamation-triangle me-2"></i>
      Ferramenta educacional para testes de desenvolvimento. Não utilize os dados gerados para fins reais.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    
    <div class="row g-4">
      <!-- Gerador CPF/CNPJ -->
      <div class="col-md-6 col-lg-4">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body text-center">
            <i class="fas fa-id-card fa-3x mb-3 text-primary"></i>
            <h5 class="card-title">CPF/CNPJ</h5>
            <p class="card-text text-muted">Gerador de documentos para testes</p>
            <a href="#gerador-documentos" class="btn btn-outline-primary" data-page="gerador-documentos">
              <i class="fas fa-arrow-right me-1"></i>Acessar
            </a>
          </div>
        </div>
      </div>
      
      <!-- Gerador Cartão de Crédito -->
      <div class="col-md-6 col-lg-4">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body text-center">
            <i class="fas fa-credit-card fa-3x mb-3 text-primary"></i>
            <h5 class="card-title">Cartão de Crédito</h5>
            <p class="card-text text-muted">Gerador de cartões para testes</p>
            <a href="#gerador-cartao" class="btn btn-outline-primary" data-page="gerador-cartao">
              <i class="fas fa-arrow-right me-1"></i>Acessar
            </a>
          </div>
        </div>
      </div>
      
      <!-- Gerador Conta Bancária -->
      <div class="col-md-6 col-lg-4">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body text-center">
            <i class="fas fa-piggy-bank fa-3x mb-3 text-primary"></i>
            <h5 class="card-title">Conta Bancária</h5>
            <p class="card-text text-muted">Gerador de contas para testes</p>
            <a href="#gerador-conta" class="btn btn-outline-primary" data-page="gerador-conta">
              <i class="fas fa-arrow-right me-1"></i>Acessar
            </a>
          </div>
        </div>
      </div>
      
      <!-- Gerador CNH -->
      <div class="col-md-6 col-lg-4">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body text-center">
            <i class="fas fa-car fa-3x mb-3 text-primary"></i>
            <h5 class="card-title">CNH</h5>
            <p class="card-text text-muted">Gerador de carteira de motorista</p>
            <a href="#gerador-cnh" class="btn btn-outline-primary" data-page="gerador-cnh">
              <i class="fas fa-arrow-right me-1"></i>Acessar
            </a>
          </div>
        </div>
      </div>


      <!-- Gerador de Certidões -->
<div class="col-md-6 col-lg-4">
  <div class="card bg-dark border-secondary h-100">
    <div class="card-body text-center">
      <i class="fas fa-file-contract fa-3x mb-3 text-primary"></i>
      <h5 class="card-title">Certidões</h5>
      <p class="card-text text-muted">Gerador de certidões brasileiras</p>
      <a href="#gerador-certidoes" class="btn btn-outline-primary" data-page="gerador-certidoes">
        <i class="fas fa-arrow-right me-1"></i>Acessar
      </a>
    </div>
  </div>
</div>
    </div>
  `;
}