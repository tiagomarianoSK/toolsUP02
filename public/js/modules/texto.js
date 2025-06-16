export function render() {
  return `
    <h1 class="display-4"><i class="fas fa-font me-2"></i>Texto</h1>
    <p class="lead">Ferramentas para manipulação e análise de texto</p>
    
    <div class="row g-4 mt-4">
      <!-- Contador de Caracteres/Palavras -->
      <div class="col-md-6 col-lg-4">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body text-center">
            <i class="fas fa-text-width fa-3x mb-3 text-primary"></i>
            <h5 class="card-title">Contador</h5>
            <p class="card-text text-muted">Conte caracteres e palavras</p>
            <a href="#texto-contador" class="btn btn-outline-primary" data-page="texto-contador">
              <i class="fas fa-arrow-right me-1"></i>Acessar
            </a>
          </div>
        </div>
      </div>
      
      <!-- Conversor Case -->
      <div class="col-md-6 col-lg-4">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body text-center">
            <i class="fas fa-font fa-3x mb-3 text-info"></i>
            <h5 class="card-title">Conversor</h5>
            <p class="card-text text-muted">Maiúsculas/minúsculas</p>
            <a href="#texto-conversor" class="btn btn-outline-info" data-page="texto-conversor">
              <i class="fas fa-arrow-right me-1"></i>Acessar
            </a>
          </div>
        </div>
      </div>
      
      <!-- Removedor de Espaços -->
      <div class="col-md-6 col-lg-4">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body text-center">
            <i class="fas fa-cut fa-3x mb-3 text-success"></i>
            <h5 class="card-title">Limpeza</h5>
            <p class="card-text text-muted">Remover espaços extras</p>
            <a href="#texto-limpeza" class="btn btn-outline-success" data-page="texto-limpeza">
              <i class="fas fa-arrow-right me-1"></i>Acessar
            </a>
          </div>
        </div>
      </div>
      
      <!-- Gerador Lorem Ipsum -->
      <div class="col-md-6 col-lg-4">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body text-center">
            <i class="fas fa-align-left fa-3x mb-3 text-warning"></i>
            <h5 class="card-title">Lorem Ipsum</h5>
            <p class="card-text text-muted">Gerar texto de exemplo</p>
            <a href="#texto-lorem" class="btn btn-outline-warning" data-page="texto-lorem">
              <i class="fas fa-arrow-right me-1"></i>Acessar
            </a>
          </div>
        </div>
      </div>
      
      <!-- Extrator de URLs/Emails -->
      <div class="col-md-6 col-lg-4">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body text-center">
            <i class="fas fa-link fa-3x mb-3 text-danger"></i>
            <h5 class="card-title">Extrator</h5>
            <p class="card-text text-muted">Extrair URLs e emails</p>
            <a href="#texto-extrator" class="btn btn-outline-danger" data-page="texto-extrator">
              <i class="fas fa-arrow-right me-1"></i>Acessar
            </a>
          </div>
        </div>
      </div>
      
      <!-- Espaço para novas ferramentas -->
      <div class="col-md-6 col-lg-4">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body text-center">
            <i class="fas fa-plus-circle fa-3x mb-3 text-muted"></i>
            <h5 class="card-title">Nova Ferramenta</h5>
            <p class="card-text text-muted">Em desenvolvimento</p>
            <button class="btn btn-outline-secondary" disabled>
              <i class="fas fa-lock me-1"></i>Em breve
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function init() {
  // Inicialização se necessária
}