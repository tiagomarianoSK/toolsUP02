export function render() {
  return `
    <div class="home-page">
      <!-- Barra de Pesquisa -->
      <div class="mb-5">
        <div class="input-group">
          <input type="text" class="form-control bg-dark text-light border-secondary" 
                 id="home-search" placeholder="Pesquisar ferramentas...">
          <button class="btn btn-primary" type="button" id="home-search-btn">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>

      <!-- Carrossel de Ferramentas Mais Usadas -->
      <div class="mb-5">
        <h4 class="mb-3"><i class="fas fa-fire me-2 text-danger"></i>Ferramentas Mais Usadas</h4>
        <div id="most-used-carousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner" id="most-used-tools">
            <!-- Itens serão adicionados dinamicamente -->
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#most-used-carousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Anterior</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#most-used-carousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Próximo</span>
          </button>
        </div>
      </div>

      <!-- Carrossel de Ferramentas Visitadas Recentemente -->
      <div class="mb-5">
        <h4 class="mb-3"><i class="fas fa-history me-2 text-info"></i>Visitadas Recentemente</h4>
        <div id="recent-carousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner" id="recent-tools">
            <!-- Itens serão adicionados dinamicamente -->
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#recent-carousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Anterior</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#recent-carousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Próximo</span>
          </button>
        </div>
      </div>

      <!-- Novas Ferramentas -->
      <div class="mb-4">
        <h4 class="mb-3"><i class="fas fa-star me-2 text-warning"></i>Novas Ferramentas</h4>
        <div class="row g-4" id="new-tools">
          <!-- Itens serão adicionados dinamicamente -->
        </div>
      </div>
    </div>
  `;
}

export function init() {
  // Configuração da barra de pesquisa
  document.getElementById('home-search-btn').addEventListener('click', performSearch);
  document.getElementById('home-search').addEventListener('keyup', function(e) {
    if (e.key === 'Enter') performSearch();
  });

  // Carrega as ferramentas mais usadas (simulando dados)
  loadMostUsedTools();
  
  // Carrega o histórico de visitas (usando cookies)
  loadRecentTools();
  
  // Carrega as novas ferramentas
  loadNewTools();
}

// Funções auxiliares
function performSearch() {
  const query = document.getElementById('home-search').value.toLowerCase();
  if (query.trim() !== '') {
    window.location.hash = '#search=' + encodeURIComponent(query);
  }
}

function loadMostUsedTools() {
  // Dados simulados - na prática viria de uma API ou localStorage
  const mostUsed = [
    { id: 'gerador-documentos', title: 'Gerador CPF/CNPJ', icon: 'fa-id-card', category: 'Geradores' },
    { id: 'porcentagem-vendas', title: 'Porcentagem Vendas', icon: 'fa-percent', category: 'Cálculo' },
    { id: 'recortar-imagem', title: 'Recortar Imagem', icon: 'fa-crop', category: 'Imagem' },
    { id: 'texto-contador', title: 'Contador Texto', icon: 'fa-text-width', category: 'Texto' }
  ];

  const container = document.getElementById('most-used-tools');
  container.innerHTML = '';
  
  mostUsed.forEach((tool, index) => {
    const activeClass = index === 0 ? 'active' : '';
    container.innerHTML += `
      <div class="carousel-item ${activeClass}">
        <div class="row g-4">
          <div class="col-md-3">
            <div class="card bg-dark border-secondary h-100">
              <div class="card-body text-center">
                <i class="fas ${tool.icon} fa-3x mb-3 text-primary"></i>
                <h5 class="card-title">${tool.title}</h5>
                <p class="card-text text-muted">${tool.category}</p>
                <a href="#${tool.id}" class="btn btn-outline-primary" data-page="${tool.id}">
                  <i class="fas fa-arrow-right me-1"></i>Acessar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

function loadRecentTools() {
  // Obtém do cookie ou localStorage
  const recentTools = getRecentToolsFromCookie();
  
  const container = document.getElementById('recent-tools');
  container.innerHTML = '';
  
  if (recentTools.length === 0) {
    container.innerHTML = `
      <div class="carousel-item active">
        <div class="alert alert-dark text-center">
          Nenhuma ferramenta visitada recentemente
        </div>
      </div>
    `;
    return;
  }
  
  recentTools.forEach((tool, index) => {
    const activeClass = index === 0 ? 'active' : '';
    container.innerHTML += `
      <div class="carousel-item ${activeClass}">
        <div class="row g-4">
          <div class="col-md-3">
            <div class="card bg-dark border-secondary h-100">
              <div class="card-body text-center">
                <i class="fas ${tool.icon} fa-3x mb-3 text-primary"></i>
                <h5 class="card-title">${tool.title}</h5>
                <p class="card-text text-muted">${tool.category}</p>
                <a href="#${tool.id}" class="btn btn-outline-primary" data-page="${tool.id}">
                  <i class="fas fa-arrow-right me-1"></i>Acessar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

function loadNewTools() {
  // Lista de todas as ferramentas disponíveis
  const allTools = [
    { id: 'gerador-documentos', title: 'Gerador CPF/CNPJ', icon: 'fa-id-card', category: 'Geradores', isNew: false },
    { id: 'porcentagem-vendas', title: 'Porcentagem Vendas', icon: 'fa-percent', category: 'Cálculo', isNew: true },
    { id: 'recortar-imagem', title: 'Recortar Imagem', icon: 'fa-crop', category: 'Imagem', isNew: true },
    { id: 'texto-contador', title: 'Contador Texto', icon: 'fa-text-width', category: 'Texto', isNew: true }
  ];

  const container = document.getElementById('new-tools');
  container.innerHTML = '';
  
  const newTools = allTools.filter(tool => tool.isNew);
  
  newTools.forEach(tool => {
    container.innerHTML += `
      <div class="col-md-4 col-lg-3">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body text-center">
            <span class="badge bg-success position-absolute top-0 start-0 m-2">NOVO</span>
            <i class="fas ${tool.icon} fa-3x mb-3 text-primary"></i>
            <h5 class="card-title">${tool.title}</h5>
            <p class="card-text text-muted">${tool.category}</p>
            <a href="#${tool.id}" class="btn btn-outline-primary" data-page="${tool.id}">
              <i class="fas fa-arrow-right me-1"></i>Acessar
            </a>
          </div>
        </div>
      </div>
    `;
  });
}

// Função para obter ferramentas recentes do cookie
function getRecentToolsFromCookie() {
  try {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('recentTools='))
      ?.split('=')[1];
    
    if (cookieValue) {
      return JSON.parse(decodeURIComponent(cookieValue));
    }
  } catch (e) {
    console.error('Erro ao ler cookie de ferramentas recentes', e);
  }
  return [];
}