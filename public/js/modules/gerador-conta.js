export function render() {
  return `
    <div class="d-flex align-items-center mb-4">
      <a href="#geradores" class="btn btn-outline-secondary me-2" data-page="geradores">
        <i class="fas fa-arrow-left"></i>
      </a>
      <h1 class="mb-0"><i class="fas fa-piggy-bank me-2"></i>Gerador de Conta Bancária</h1>
    </div>

    <div class="row">
      <!-- Visualização da Conta -->
      <div class="col-md-6 mb-4">
        <div class="card bg-dark border-primary" id="bank-account-preview">
          <div class="card-body text-light">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h5 class="mb-0" id="bank-name">BANCO</h5>
              <div id="bank-logo" style="height: 30px;"></div>
            </div>
            
            <div class="mb-4">
              <div class="d-flex justify-content-between mb-3">
                <div>
                  <small class="text-muted">Agência</small>
                  <div class="h5" id="bank-agency">••••</div>
                </div>
                <div>
                  <small class="text-muted">Dígito</small>
                  <div class="h5" id="agency-digit">•</div>
                </div>
              </div>
              
              <div class="mb-3">
                <small class="text-muted">Conta</small>
                <div class="h4" id="account-number">•••••••</div>
              </div>
              
              <div class="mb-3">
                <small class="text-muted">Dígito</small>
                <div class="h4" id="account-digit">•</div>
              </div>
              
              <div>
                <small class="text-muted">Tipo de Conta</small>
                <div class="h5" id="account-type">Corrente/Poupança</div>
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
              <label class="form-label">Banco</label>
              <select id="bank-selection" class="form-select bg-dark text-light border-secondary">
                <option value="itau">Itaú</option>
                <option value="bradesco">Bradesco</option>
                <option value="santander">Santander</option>
                <option value="bb">Banco do Brasil</option>
                <option value="caixa">Caixa Econômica</option>
                <option value="nubank">Nubank</option>
                <option value="inter">Banco Inter</option>
              </select>
            </div>
            
            <div class="mb-3">
              <label class="form-label">Tipo de Conta</label>
              <select id="account-type-selection" class="form-select bg-dark text-light border-secondary">
                <option value="corrente">Conta Corrente</option>
                <option value="poupanca">Conta Poupança</option>
                <option value="salario">Conta Salário</option>
                <option value="universitaria">Conta Universitária</option>
              </select>
            </div>
            
            <button id="generate-account" class="btn btn-primary w-100 mb-3">
              <i class="fas fa-sync-alt me-1"></i>Gerar Conta
            </button>
            
            <div class="d-grid gap-2">
              <button id="copy-agency" class="btn btn-outline-secondary">
                <i class="far fa-copy me-1"></i>Copiar Agência
              </button>
              <button id="copy-account" class="btn btn-outline-secondary">
                <i class="far fa-copy me-1"></i>Copiar Conta
              </button>
              <button id="copy-all-bank" class="btn btn-outline-success">
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
      Não utilize para abrir contas reais ou qualquer atividade ilegal. 
      O uso indevido pode violar leis e termos de serviço.
    </div>
  `;
}

export function init() {
  // Gera uma conta inicial
  generateBankAccount();
  
  // Configura eventos
  document.getElementById('generate-account').addEventListener('click', generateBankAccount);
  document.getElementById('copy-agency').addEventListener('click', copyAgency);
  document.getElementById('copy-account').addEventListener('click', copyAccount);
  document.getElementById('copy-all-bank').addEventListener('click', copyAllBankData);
  document.getElementById('bank-selection').addEventListener('change', updateBankInfo);
  document.getElementById('account-type-selection').addEventListener('change', updateAccountType);
}

// Funções para gerar contas bancárias
function generateBankAccount() {
  const bank = document.getElementById('bank-selection').value;
  const accountType = document.getElementById('account-type-selection').value;
  
  // Gera dados da conta
  const agency = generateAgency(bank);
  const agencyDigit = generateDigit();
  const accountNumber = generateAccountNumber(bank);
  const accountDigit = generateDigit();
  
  // Atualiza a visualização
  document.getElementById('bank-agency').textContent = agency;
  document.getElementById('agency-digit').textContent = agencyDigit;
  document.getElementById('account-number').textContent = accountNumber;
  document.getElementById('account-digit').textContent = accountDigit;
  
  // Atualiza informações do banco
  updateBankInfo();
  updateAccountType();
}

function generateAgency(bank) {
  // Formatos de agência por banco
  const formats = {
    itau: '####',
    bradesco: '####',
    santander: '####',
    bb: '####-#',
    caixa: '####',
    nubank: '0001',
    inter: '0001'
  };
  
  let agency = formats[bank];
  
  // Substitui # por dígitos aleatórios
  agency = agency.replace(/#/g, () => Math.floor(Math.random() * 10));
  
  return agency;
}

function generateAccountNumber(bank) {
  // Formatos de conta por banco
  const lengths = {
    itau: 5,
    bradesco: 7,
    santander: 7,
    bb: 6,
    caixa: 6,
    nubank: 7,
    inter: 7
  };
  
  let account = '';
  const length = lengths[bank];
  
  for (let i = 0; i < length; i++) {
    account += Math.floor(Math.random() * 10);
  }
  
  return account;
}

function generateDigit() {
  return Math.floor(Math.random() * 10);
}

function updateBankInfo() {
  const bank = document.getElementById('bank-selection').value;
  const bankNames = {
    itau: 'ITAU UNIBANCO',
    bradesco: 'BRADESCO',
    santander: 'SANTANDER',
    bb: 'BANCO DO BRASIL',
    caixa: 'CAIXA ECONÔMICA',
    nubank: 'NUBANK',
    inter: 'BANCO INTER'
  };
  
  document.getElementById('bank-name').textContent = bankNames[bank];
  
  // Atualiza o logo
  const icons = {
    itau: '<i class="fas fa-university fa-2x"></i>',
    bradesco: '<i class="fas fa-landmark fa-2x"></i>',
    santander: '<i class="fas fa-piggy-bank fa-2x"></i>',
    bb: '<i class="fas fa-money-bill-wave fa-2x"></i>',
    caixa: '<i class="fas fa-warehouse fa-2x"></i>',
    nubank: '<i class="fas fa-credit-card fa-2x"></i>',
    inter: '<i class="fas fa-mobile-alt fa-2x"></i>'
  };
  document.getElementById('bank-logo').innerHTML = icons[bank];
  
  // Atualiza a cor do cartão
  const colors = {
    itau: 'linear-gradient(135deg, #EC7000, #EC7000)',
    bradesco: 'linear-gradient(135deg, #CC092F, #A60726)',
    santander: 'linear-gradient(135deg, #EC0000, #C00000)',
    bb: 'linear-gradient(135deg, #FBAB18, #D79400)',
    caixa: 'linear-gradient(135deg, #0070B1, #004B82)',
    nubank: 'linear-gradient(135deg, #820AD1, #5C00A3)',
    inter: 'linear-gradient(135deg, #FF7A00, #FF5C00)'
  };
  
  document.getElementById('bank-account-preview').style.background = colors[bank];
}

function updateAccountType() {
  const accountType = document.getElementById('account-type-selection').value;
  const typeNames = {
    corrente: 'CONTA CORRENTE',
    poupanca: 'CONTA POUPANÇA',
    salario: 'CONTA SALÁRIO',
    universitaria: 'CONTA UNIVERSITÁRIA'
  };
  
  document.getElementById('account-type').textContent = typeNames[accountType];
}

// Funções para copiar dados
function copyAgency() {
  const agency = document.getElementById('bank-agency').textContent;
  const digit = document.getElementById('agency-digit').textContent;
  navigator.clipboard.writeText(`${agency}-${digit}`).then(() => {
    showCopyFeedback('copy-agency', 'Agência copiada!');
  });
}

function copyAccount() {
  const account = document.getElementById('account-number').textContent;
  const digit = document.getElementById('account-digit').textContent;
  navigator.clipboard.writeText(`${account}-${digit}`).then(() => {
    showCopyFeedback('copy-account', 'Conta copiada!');
  });
}

function copyAllBankData() {
  const bankData = `Banco: ${document.getElementById('bank-name').textContent}
Agência: ${document.getElementById('bank-agency').textContent}-${document.getElementById('agency-digit').textContent}
Conta: ${document.getElementById('account-number').textContent}-${document.getElementById('account-digit').textContent}
Tipo: ${document.getElementById('account-type').textContent}`;
  
  navigator.clipboard.writeText(bankData).then(() => {
    showCopyFeedback('copy-all-bank', 'Todos dados copiados!');
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