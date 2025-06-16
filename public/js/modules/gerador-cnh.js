export function render() {
  return `
    <div class="d-flex align-items-center mb-4">
      <a href="#geradores" class="btn btn-outline-secondary me-2" data-page="geradores">
        <i class="fas fa-arrow-left"></i>
      </a>
      <h1 class="mb-0"><i class="fas fa-id-card me-2"></i>Gerador de CNH</h1>
    </div>

    <div class="row">
      <!-- Visualização da CNH -->
      <div class="col-md-6 mb-4">
        <div class="card bg-dark border-primary" id="cnh-preview">
          <div class="card-body text-light">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h5 class="mb-0">CARTEIRA NACIONAL DE HABILITAÇÃO</h5>
              <div id="state-flag" style="height: 30px;"></div>
            </div>
            
            <div class="mb-4">
              <div class="mb-3">
                <small class="text-muted">Número da CNH</small>
                <div class="h4" id="cnh-number">•••••••••••</div>
              </div>
              
              <div class="mb-3">
                <small class="text-muted">Registro</small>
                <div class="h5" id="cnh-register">••••••••••</div>
              </div>
              
              <div class="mb-3">
                <small class="text-muted">Estado</small>
                <div class="h5" id="cnh-state">•••••••••</div>
              </div>
              
              <div>
                <small class="text-muted">Categoria</small>
                <div class="h5" id="cnh-category">•••••••</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Controles -->
      <div class="col-md-6 mb-4">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-cog me-2"></i>Configurações</h5>
            
            <div class="mb-3">
              <label class="form-label">Estado</label>
              <select id="state-selection" class="form-select bg-dark text-light border-secondary">
                <option value="sp">São Paulo</option>
                <option value="rj">Rio de Janeiro</option>
                <option value="mg">Minas Gerais</option>
                <option value="rs">Rio Grande do Sul</option>
                <option value="pr">Paraná</option>
                <option value="sc">Santa Catarina</option>
                <option value="ba">Bahia</option>
                <option value="pe">Pernambuco</option>
                <option value="ce">Ceará</option>
                <option value="go">Goiás</option>
                <option value="df">Distrito Federal</option>
                <!-- Adicione outros estados conforme necessário -->
              </select>
            </div>
            
            <div class="mb-3">
              <label class="form-label">Categoria</label>
              <select id="category-selection" class="form-select bg-dark text-light border-secondary">
                <option value="b">B - Veículos até 3.500kg</option>
                <option value="a">A - Motocicletas</option>
                <option value="ab">AB - Motos e Carros</option>
                <option value="c">C - Veículos > 3.500kg</option>
                <option value="d">D - Passageiros > 8</option>
                <option value="e">E - Veículos com unidades acopladas</option>
              </select>
            </div>
            
            <button id="generate-cnh" class="btn btn-primary w-100 mb-3">
              <i class="fas fa-sync-alt me-1"></i>Gerar CNH
            </button>
            
            <div class="d-grid gap-2">
              <button id="copy-cnh" class="btn btn-outline-secondary">
                <i class="far fa-copy me-1"></i>Copiar Número
              </button>
              <button id="copy-all-cnh" class="btn btn-outline-success">
                <i class="fas fa-copy me-1"></i>Copiar Todos os Dados
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="alert alert-danger mt-4">
      <i class="fas fa-exclamation-triangle me-2"></i>
      <strong>Atenção:</strong> Estes são dados fictícios gerados apenas para testes de desenvolvimento. 
      Não utilize para documentos reais ou qualquer atividade ilegal. 
      O uso indevido pode violar leis e termos de serviço.
    </div>
  `;
}

export function init() {
  // Gera uma CNH inicial
  generateCNH();
  
  // Configura eventos
  document.getElementById('generate-cnh').addEventListener('click', generateCNH);
  document.getElementById('copy-cnh').addEventListener('click', copyCNHNumber);
  document.getElementById('copy-all-cnh').addEventListener('click', copyAllCNHData);
  document.getElementById('state-selection').addEventListener('change', updateStateInfo);
  document.getElementById('category-selection').addEventListener('change', updateCategory);
}

// Funções para gerar CNH
function generateCNH() {
  const state = document.getElementById('state-selection').value;
  const category = document.getElementById('category-selection').value;
  
  // Gera número da CNH (11 dígitos)
  const cnhNumber = generateCNHNumber();
  
  // Gera número de registro (pode variar por estado)
  const registerNumber = generateRegisterNumber(state);
  
  // Atualiza a visualização
  document.getElementById('cnh-number').textContent = formatCNHNumber(cnhNumber);
  document.getElementById('cnh-register').textContent = registerNumber;
  
  // Atualiza informações do estado e categoria
  updateStateInfo();
  updateCategory();
}

function generateCNHNumber() {
  // Algoritmo para gerar CNH válida
  let numbers = [];
  let v = 0;
  
  // Gera 9 dígitos aleatórios
  for (let i = 0; i < 9; i++) {
    numbers[i] = Math.floor(Math.random() * 9);
  }
  
  // Calcula primeiro dígito verificador
  for (let i = 0, j = 9; i < 9; i++, j--) {
    v += numbers[i] * j;
  }
  
  let d1 = v % 11;
  if (d1 >= 10) {
    d1 = 0;
    v = 2;
  } else {
    v = 0;
  }
  
  // Calcula segundo dígito verificador
  for (let i = 0, j = 1; i < 9; i++, j++) {
    v += numbers[i] * j;
  }
  
  let x = v % 11;
  let d2 = (x >= 10) ? 0 : x;
  
  // Retorna número completo com dígitos verificadores
  return numbers.join('') + d1.toString() + d2.toString();
}

function generateRegisterNumber(state) {
  // Prefixos comuns por estado (exemplos)
  const prefixes = {
    sp: 'SP',
    rj: 'RJ',
    mg: 'MG',
    rs: 'RS',
    pr: 'PR',
    sc: 'SC',
    ba: 'BA',
    pe: 'PE',
    ce: 'CE',
    go: 'GO',
    df: 'DF'
  };
  
  // Gera número aleatório com prefixo estadual
  let register = prefixes[state] || 'BR';
  for (let i = 0; i < 8; i++) {
    register += Math.floor(Math.random() * 10);
  }
  
  return register;
}

function formatCNHNumber(number) {
  return number.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function updateStateInfo() {
  const state = document.getElementById('state-selection').value;
  const stateNames = {
    sp: 'SÃO PAULO',
    rj: 'RIO DE JANEIRO',
    mg: 'MINAS GERAIS',
    rs: 'RIO GRANDE DO SUL',
    pr: 'PARANÁ',
    sc: 'SANTA CATARINA',
    ba: 'BAHIA',
    pe: 'PERNAMBUCO',
    ce: 'CEARÁ',
    go: 'GOIÁS',
    df: 'DISTRITO FEDERAL'
  };
  
  document.getElementById('cnh-state').textContent = stateNames[state];
  
  // Atualiza a bandeira do estado
  const flags = {
    sp: '<img src="https://upload.wikimedia.org/wikipedia/commons/2/2b/Bandeira_do_estado_de_S%C3%A3o_Paulo.svg" style="height:100%;">',
    rj: '<img src="https://upload.wikimedia.org/wikipedia/commons/7/73/Bandeira_do_estado_do_Rio_de_Janeiro.svg" style="height:100%;">',
    mg: '<img src="https://upload.wikimedia.org/wikipedia/commons/f/f4/Bandeira_de_Minas_Gerais.svg" style="height:100%;">',
    rs: '<img src="https://upload.wikimedia.org/wikipedia/commons/6/63/Bandeira_do_Rio_Grande_do_Sul.svg" style="height:100%;">',
    pr: '<img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Bandeira_do_Paran%C3%A1.svg" style="height:100%;">',
    sc: '<img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Bandeira_de_Santa_Catarina.svg" style="height:100%;">',
    ba: '<img src="https://upload.wikimedia.org/wikipedia/commons/2/28/Bandeira_da_Bahia.svg" style="height:100%;">',
    pe: '<img src="https://upload.wikimedia.org/wikipedia/commons/5/59/Bandeira_de_Pernambuco.svg" style="height:100%;">',
    ce: '<img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Bandeira_do_Cear%C3%A1.svg" style="height:100%;">',
    go: '<img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Flag_of_Goi%C3%A1s.svg" style="height:100%;">',
    df: '<img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Bandeira_do_Distrito_Federal_%28Brasil%29.svg" style="height:100%;">'
  };
  
  document.getElementById('state-flag').innerHTML = flags[state] || '';
}

function updateCategory() {
  const category = document.getElementById('category-selection').value;
  const categories = {
    a: 'A - Motocicletas',
    b: 'B - Veículos até 3.500kg',
    ab: 'AB - Motos e Carros',
    c: 'C - Veículos > 3.500kg',
    d: 'D - Passageiros > 8',
    e: 'E - Veículos com unidades acopladas'
  };
  
  document.getElementById('cnh-category').textContent = categories[category];
}

// Funções para copiar dados
function copyCNHNumber() {
  const cnhNumber = document.getElementById('cnh-number').textContent.replace(/[.-]/g, '');
  navigator.clipboard.writeText(cnhNumber).then(() => {
    showCopyFeedback('copy-cnh', 'Número copiado!');
  });
}

function copyAllCNHData() {
  const cnhData = `CNH: ${document.getElementById('cnh-number').textContent}
Registro: ${document.getElementById('cnh-register').textContent}
Estado: ${document.getElementById('cnh-state').textContent}
Categoria: ${document.getElementById('cnh-category').textContent}`;
  
  navigator.clipboard.writeText(cnhData).then(() => {
    showCopyFeedback('copy-all-cnh', 'Todos dados copiados!');
  });
}

function showCopyFeedback(buttonId, message) {
  const button = document.getElementById(buttonId);
  const originalHtml = button.innerHTML;
  button.innerHTML = `<i class="fas fa-check me-1"></i>${message}`;
  
  setTimeout(() => {
    button.innerHTML = originalHtml;
  }, 2000);
}