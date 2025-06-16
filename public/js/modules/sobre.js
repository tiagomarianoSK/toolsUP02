export function render() {
  return `
    <div class="d-flex align-items-center mb-4">
      <a href="#home" class="btn btn-sm btn-outline-secondary me-2" data-page="home">
        <i class="fas fa-arrow-left"></i>
      </a>
      <h1 class="display-6 mb-0"><i class="fas fa-info-circle me-2"></i>Sobre o ToolsUP</h1>
    </div>

    <div class="row">
      <!-- Visão Geral -->
      <div class="col-lg-8 mb-4">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body">
            <h3 class="card-title mb-4"><i class="fas fa-rocket me-2 text-primary"></i>Nosso Propósito</h3>
            
            <div class="mb-4">
              <div class="d-flex align-items-start mb-3">
                <i class="fas fa-code me-3 mt-1 text-primary"></i>
                <div>
                  <h5>Auxílio para Desenvolvedores</h5>
                  <p class="text-muted">
                    O ToolsUP foi criado para acelerar o desenvolvimento de aplicações, fornecendo ferramentas úteis para:
                  </p>
                  <ul class="text-muted">
                    <li>Geração de dados de teste (CPF, CNPJ, cartões, etc.)</li>
                    <li>Manipulação rápida de textos</li>
                    <li>Edição básica de imagens</li>
                    <li>População de bancos de dados para testes</li>
                  </ul>
                </div>
              </div>
              
              <div class="d-flex align-items-start mb-3">
                <i class="fas fa-bolt me-3 mt-1 text-primary"></i>
                <div>
                  <h5>Produtividade em um só lugar</h5>
                  <p class="text-muted">
                    Todas as ferramentas que você precisa para agilizar seu workflow de desenvolvimento,
                    sem precisar sair do navegador ou instalar software adicional.
                  </p>
                </div>
              </div>
            </div>
            
            <div class="alert alert-primary">
              <i class="fas fa-lightbulb me-2"></i>
              <strong>Dica:</strong> Use nossos geradores para criar dados de teste realistas sem expor informações pessoais.
            </div>
          </div>
        </div>
      </div>
      
      <!-- Recursos -->
      <div class="col-lg-4 mb-4">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body">
            <h4 class="card-title mb-4"><i class="fas fa-tools me-2 text-primary"></i>Principais Recursos</h4>
            
            <div class="list-group list-group-flush">
              <div class="list-group-item bg-dark text-light border-secondary">
                <div class="d-flex align-items-center">
                  <i class="fas fa-id-card me-3 text-primary"></i>
                  <span>Geradores de Documentos</span>
                </div>
              </div>
              
              <div class="list-group-item bg-dark text-light border-secondary">
                <div class="d-flex align-items-center">
                  <i class="fas fa-font me-3 text-primary"></i>
                  <span>Ferramentas de Texto</span>
                </div>
              </div>
              
              <div class="list-group-item bg-dark text-light border-secondary">
                <div class="d-flex align-items-center">
                  <i class="fas fa-image me-3 text-primary"></i>
                  <span>Editores de Imagem</span>
                </div>
              </div>
              
              <div class="list-group-item bg-dark text-light border-secondary">
                <div class="d-flex align-items-center">
                  <i class="fas fa-database me-3 text-primary"></i>
                  <span>Dados para Desenvolvimento</span>
                </div>
              </div>
            </div>
            
            <hr class="border-secondary my-4">
            
            <h5 class="mb-3"><i class="fas fa-shield-alt me-2 text-primary"></i>Segurança</h5>
            <p class="small text-muted">
              Todos os dados gerados são fictícios e não representam informações reais.
              <span class="d-block mt-2 text-warning">
                <i class="fas fa-exclamation-triangle"></i> Para uso em desenvolvimento e testes apenas.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Como Usar -->
    <div class="row mt-4">
      <div class="col-12">
        <div class="card bg-dark border-secondary">
          <div class="card-body">
            <h4 class="card-title mb-4"><i class="fas fa-question-circle me-2 text-primary"></i>Como Utilizar</h4>
            
            <div class="row g-4">
              <div class="col-md-4">
                <div class="card bg-darker border-secondary h-100">
                  <div class="card-body">
                    <div class="text-center mb-3">
                      <i class="fas fa-search fa-2x text-primary"></i>
                    </div>
                    <h5 class="text-center">1. Encontre a Ferramenta</h5>
                    <p class="text-muted small text-center">
                      Navegue pelo menu lateral ou use a busca para encontrar a ferramenta que precisa.
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="col-md-4">
                <div class="card bg-darker border-secondary h-100">
                  <div class="card-body">
                    <div class="text-center mb-3">
                      <i class="fas fa-sliders-h fa-2x text-primary"></i>
                    </div>
                    <h5 class="text-center">2. Configure</h5>
                    <p class="text-muted small text-center">
                      Ajuste as opções conforme necessário para gerar os dados ou editar seu conteúdo.
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="col-md-4">
                <div class="card bg-darker border-secondary h-100">
                  <div class="card-body">
                    <div class="text-center mb-3">
                      <i class="fas fa-clipboard-check fa-2x text-primary"></i>
                    </div>
                    <h5 class="text-center">3. Copie/Exporte</h5>
                    <p class="text-muted small text-center">
                      Use os botões de copiar ou exportar para utilizar o resultado em seu projeto.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Rodapé -->
    <div class="alert alert-secondary mt-4">
      <div class="d-flex align-items-center">
        <i class="fas fa-heart me-3 text-danger"></i>
        <div>
          <h5 class="mb-1">Projeto Open Source</h5>
          <p class="mb-0 small text-muted">
            Contribua com nosso projeto no GitHub. Todas as ferramentas são gratuitas para a comunidade de desenvolvedores.
          </p>
        </div>
      </div>
    </div>
  `;
}

export function init() {
  // Inicializações específicas da página, se necessário
}