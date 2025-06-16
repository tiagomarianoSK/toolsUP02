document.addEventListener('DOMContentLoaded', function() {
  // Mapeamento de páginas para módulos
  const pageModules = {
    'home': () => import('./modules/home.js'),
    //geradores
    'geradores': () => import('./modules/geradores.js'),
    'gerador-documentos': () => import('./modules/gerador-documentos.js'),
    'gerador-cartao': () => import('./modules/gerador-cartao.js'),
    'gerador-conta': () => import('./modules/gerador-conta.js'),
    'gerador-cnh': () => import('./modules/gerador-cnh.js'),
    'gerador-certidoes': () => import('./modules/gerador-certidoes.js'),
    //calculo
    'calculo': () => import('./modules/calculo.js'),
    'porcentagem-vendas': () => import('./modules/porcentagem-vendas.js'),
    'ifood-calculator': () => import('./modules/ifood-calculator.js'),
    //imagens
    'imagem': () => import('./modules/imagem.js'),
    'recortar-imagem': () => import('./modules/recortar-imagem.js'),
    'conversor-imagem': () => import('./modules/conversor-imagem.js'),
    //Textos
    'texto': () => import('./modules/texto.js'),
    'texto-contador': () => import('./modules/texto-contador.js'),
    'texto-conversor': () => import('./modules/texto-conversor.js'),
    'texto-limpeza': () => import('./modules/texto-limpeza.js'),
    'texto-lorem': () => import('./modules/texto-lorem.js'),
    'texto-extrator': () => import('./modules/texto-extrator.js'),
    //info
    'sobre': () => import('./modules/sobre.js'),
  };

  // Carrega a página inicial ou da URL
  const initialPage = window.location.hash.substring(1) || 'home';
  loadPage(initialPage);
  
  // Configura os listeners dos links
  document.addEventListener('click', function(e) {
    const link = e.target.closest('[data-page]');
    if (link) {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      navigateTo(page);
      
      // Atualiza classe ativa nos links
      updateActiveLinks(page);
    }
  });
  
  // Manipula o botão voltar/avançar
  window.addEventListener('popstate', function(e) {
    if (e.state) {
      loadPage(e.state.page);
      updateActiveLinks(e.state.page);
    }
  });

  // Função para atualizar links ativos
  function updateActiveLinks(page) {
    // Remove classe ativa de todos os links
    document.querySelectorAll('.nav-link').forEach(item => {
      item.classList.remove('active');
    });
    
    // Adiciona classe ativa aos links correspondentes
    document.querySelectorAll(`[data-page="${page}"]`).forEach(item => {
      item.classList.add('active');
    });
  }

  // Função de navegação
  function navigateTo(page) {
    loadPage(page);
    window.history.pushState({page}, '', `#${page}`);
  }

  // Funções para ferramentas recentes (mantidas como antes)
  function getRecentToolsFromCookie() {
    /* ... */
  }

  function getToolData(toolId) {
    /* ... */
  }

  function updateRecentTools(newTool) {
    /* ... */
  }

  // Função para carregar páginas
  async function loadPage(page) {
    const contentDiv = document.getElementById('page-content');
    
    try {
      contentDiv.innerHTML = `
        <div class="d-flex justify-content-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
        </div>
      `;
      
      const module = await pageModules[page]();
      contentDiv.innerHTML = module.render();
      
      if (typeof module.init === 'function') {
        module.init();
      }
      
      // Atualiza ferramentas recentes no cookie
      if (page !== 'home') {
        document.cookie = `recentTools=${encodeURIComponent(JSON.stringify(updateRecentTools(page)))}; path=/; max-age=2592000`;
      }
      
      // Rola para o topo
      window.scrollTo(0, 0);
      
    } catch (error) {
      console.error('Erro ao carregar módulo:', error);
      contentDiv.innerHTML = `
        <div class="alert alert-danger">
          <h4>Erro ao carregar a página</h4>
          <p>${error.message}</p>
          <a href="#home" class="btn btn-secondary" data-page="home">
            Voltar para Home
          </a>
        </div>
      `;
    }
  }
});