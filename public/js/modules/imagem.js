export function render() {
  return `
    <h1 class="display-4"><i class="fas fa-image me-2"></i>Imagem</h1>
    <p class="lead">Ferramentas para manipulação de imagens</p>
    
    <div class="row g-4 mt-4">
      <!-- Recortar Imagem -->
      <div class="col-md-6 col-lg-4">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body text-center">
            <i class="fas fa-crop fa-3x mb-3 text-primary"></i>
            <h5 class="card-title">Recortar Imagem</h5>
            <p class="card-text text-muted">Ferramenta para cortar imagens</p>
            <a href="#recortar-imagem" class="btn btn-outline-primary" data-page="recortar-imagem">
              <i class="fas fa-arrow-right me-1"></i>Acessar
            </a>
          </div>
        </div>
      </div>
      
      <!-- Conversor de Imagens -->
      <div class="col-md-6 col-lg-4">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body text-center">
            <i class="fas fa-exchange-alt fa-3x mb-3 text-primary"></i>
            <h5 class="card-title">Conversor de Imagens</h5>
            <p class="card-text text-muted">Converta entre JPG, PNG, GIF, WebP e mais</p>
            <a href="#conversor-imagem" class="btn btn-outline-primary" data-page="conversor-imagem">
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