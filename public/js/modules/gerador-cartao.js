export function render() {
  return `
    <div class="d-flex align-items-center mb-4">
      <a href="#geradores" class="btn btn-outline-secondary me-2" data-page="geradores">
        <i class="fas fa-arrow-left"></i>
      </a>
      <h1 class="mb-0"><i class="fas fa-credit-card me-2"></i>Gerador de Cartão de Crédito</h1>
    </div>

    <div class="row">
      <!-- Visualização do Cartão -->
      <div class="col-md-6 mb-4">
        <div class="card bg-dark border-primary" id="credit-card-preview">
          <div class="card-body text-light">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h5 class="mb-0" id="card-brand">BANDEIRA</h5>
              <div id="card-logo" style="height: 30px;"></div>
            </div>
            
            <div class="mb-4">
              <div class="chip mb-2" style="width: 50px; height: 30px; background: linear-gradient(to right, #c9c9c9, #e0e0e0); border-radius: 5px;"></div>
              <div class="card-number h4 mb-3" id="card-number">•••• •••• •••• ••••</div>
              <div class="d-flex justify-content-between">
                <div>
                  <small class="text-muted">Titular</small>
                  <div id="card-holder">FULANO DA SILVA</div>
                </div>
                <div>
                  <small class="text-muted">Validade</small>
                  <div id="card-expiry">••/••</div>
                </div>
                <div>
                  <small class="text-muted">CVV</small>
                  <div id="card-cvv">•••</div>
                </div>
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
              <label class="form-label">Bandeira</label>
              <select id="card-type" class="form-select bg-dark text-light border-secondary">
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="amex">American Express</option>
                <option value="discover">Discover</option>
                <option value="diners">Diners Club</option>
                <option value="jcb">JCB</option>
                <option value="elo">Elo</option>
              </select>
            </div>
            
            <div class="mb-3">
              <label class="form-label">Nome do Titular (opcional)</label>
              <input type="text" id="card-name" class="form-control bg-dark text-light border-secondary" 
                     placeholder="Nome que aparecerá no cartão">
            </div>
            
            <button id="generate-card" class="btn btn-primary w-100 mb-3">
              <i class="fas fa-sync-alt me-1"></i>Gerar Cartão
            </button>
            
            <div class="d-grid gap-2">
              <button id="copy-number" class="btn btn-outline-secondary">
                <i class="far fa-copy me-1"></i>Copiar Número
              </button>
              <button id="copy-all" class="btn btn-outline-success">
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
      Não utilize para transações reais ou qualquer atividade ilegal. 
      O uso indevido pode violar leis e termos de serviço.
    </div>
  `;
}

export function init() {
  // Gera um cartão inicial
  generateCreditCard();
  
  // Configura eventos
  document.getElementById('generate-card').addEventListener('click', generateCreditCard);
  document.getElementById('copy-number').addEventListener('click', copyCardNumber);
  document.getElementById('copy-all').addEventListener('click', copyAllData);
  document.getElementById('card-type').addEventListener('change', updateCardBrand);
}

// Funções para gerar cartões
function generateCreditCard() {
  const cardType = document.getElementById('card-type').value;
  const cardName = document.getElementById('card-name').value || 'FULANO DA SILVA';
  
  // Gera número do cartão de acordo com a bandeira
  const cardNumber = generateCardNumber(cardType);
  const expiryDate = generateExpiryDate();
  const cvv = generateCVV(cardType);
  
  // Atualiza a visualização
  document.getElementById('card-number').textContent = formatCardNumber(cardNumber, cardType);
  document.getElementById('card-holder').textContent = cardName.toUpperCase();
  document.getElementById('card-expiry').textContent = expiryDate;
  document.getElementById('card-cvv').textContent = cvv;
  
  // Atualiza a bandeira
  updateCardBrand();
}

function generateCardNumber(cardType) {
  const prefixes = {
    visa: ['4'],
    mastercard: ['51', '52', '53', '54', '55', '2221', '2222', '2223', '2224', '2225', '2226', '2227', '2228', '2229', '223', '224', '225', '226', '227', '228', '229', '23', '24', '25', '26', '270', '271', '2720'],
    amex: ['34', '37'],
    discover: ['6011', '644', '645', '646', '647', '648', '649', '65'],
    diners: ['300', '301', '302', '303', '304', '305', '36', '38', '39'],
    jcb: ['3528', '3529', '353', '354', '355', '356', '357', '358'],
    elo: ['401178', '401179', '431274', '438935', '451416', '457393', '457631', '457632', '504175', '506699', '5067', '509', '627780', '636297', '636368', '650', '6516', '6550']
  };
  
  const prefix = prefixes[cardType][Math.floor(Math.random() * prefixes[cardType].length)];
  let number = prefix;
  
  // Completa o número até ter 15 dígitos (14 para AMEX)
  const length = (cardType === 'amex') ? 15 : 16;
  while (number.length < length - 1) {
    number += Math.floor(Math.random() * 10);
  }
  
  // Calcula o dígito verificador (Luhn algorithm)
  number += calculateLuhnCheckDigit(number);
  
  return number;
}

function calculateLuhnCheckDigit(number) {
  let sum = 0;
  let alternate = false;
  
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number.charAt(i));
    if (alternate) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    alternate = !alternate;
  }
  
  return ((10 - (sum % 10)) % 10).toString();
}

function generateExpiryDate() {
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const year = new Date().getFullYear() + Math.floor(Math.random() * 5) + 1;
  return `${month}/${year.toString().slice(-2)}`;
}

function generateCVV(cardType) {
  const length = (cardType === 'amex') ? 4 : 3;
  let cvv = '';
  for (let i = 0; i < length; i++) {
    cvv += Math.floor(Math.random() * 10);
  }
  return cvv;
}

function formatCardNumber(number, cardType) {
  if (cardType === 'amex') {
    return number.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
  }
  return number.replace(/(\d{4})/g, '$1 ').trim();
}

function updateCardBrand() {
  const cardType = document.getElementById('card-type').value;
  const brandNames = {
    visa: 'VISA',
    mastercard: 'MASTERCARD',
    amex: 'AMERICAN EXPRESS',
    discover: 'DISCOVER',
    diners: 'DINERS CLUB',
    jcb: 'JCB',
    elo: 'ELO'
  };
  
  document.getElementById('card-brand').textContent = brandNames[cardType];
  
  // Atualiza o logo
  const logos = {
    visa: '<img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" style="height:100%;">',
    mastercard: '<img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" style="height:100%;">',
    amex: '<img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" style="height:100%;">',
    discover: '<img src="https://upload.wikimedia.org/wikipedia/commons/5/57/Discover_Card_logo.svg" style="height:100%;">',
    diners: '<img src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Diners_Club_Logo3.svg" style="height:100%;">',
    jcb: '<img src="https://upload.wikimedia.org/wikipedia/commons/4/40/JCB_logo.svg" style="height:100%;">',
    elo: '<img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Elo_Logo.svg" style="height:100%;">'
  };
  
  document.getElementById('card-logo').innerHTML = logos[cardType];
  
  // Atualiza a cor do cartão
  const colors = {
    visa: 'linear-gradient(135deg, #1a1f71, #f79a1e)',
    mastercard: 'linear-gradient(135deg, #eb001b, #f79e1b)',
    amex: 'linear-gradient(135deg, #016fd0, #9ccdff)',
    discover: 'linear-gradient(135deg, #ff6000, #ff9e00)',
    diners: 'linear-gradient(135deg, #0079be, #222)',
    jcb: 'linear-gradient(135deg, #0f4b9c, #d91a25)',
    elo: 'linear-gradient(135deg, #45145d, #ff6319)'
  };
  
  document.getElementById('credit-card-preview').style.background = colors[cardType];
}

// Funções para copiar dados
function copyCardNumber() {
  const cardNumber = document.getElementById('card-number').textContent.replace(/\s/g, '');
  navigator.clipboard.writeText(cardNumber).then(() => {
    showCopyFeedback('copy-number', 'Copiado!');
  });
}

function copyAllData() {
  const cardData = `Número: ${document.getElementById('card-number').textContent.replace(/\s/g, '')}
Titular: ${document.getElementById('card-holder').textContent}
Validade: ${document.getElementById('card-expiry').textContent}
CVV: ${document.getElementById('card-cvv').textContent}
Bandeira: ${document.getElementById('card-brand').textContent}`;
  
  navigator.clipboard.writeText(cardData).then(() => {
    showCopyFeedback('copy-all', 'Todos dados copiados!');
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