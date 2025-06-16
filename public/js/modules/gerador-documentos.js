import { gerarCpf, formatarCpf } from '../utils/cpf.js';
import { gerarCnpj, formatarCnpj } from '../utils/cnpj.js';

export function render() {
  return `
    <div class="d-flex align-items-center mb-4">
      <a href="#geradores" class="btn btn-sm btn-outline-secondary me-2" data-page="geradores">
        <i class="fas fa-arrow-left"></i>
      </a>
      <h1 class="display-6 mb-0"><i class="fas fa-id-card me-2"></i>Gerador de CPF/CNPJ</h1>
    </div>
    
    <div class="row">
      <!-- Gerador de CPF -->
      <div class="col-md-6 mb-4">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-id-card me-2"></i>CPF</h5>
            <div class="mb-3">
              <input type="text" class="form-control bg-dark text-light border-secondary mb-2" 
                     id="cpfResult" readonly>
            </div>
            <div class="d-flex justify-content-between">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="cpfFormatado" checked>
                <label class="form-check-label" for="cpfFormatado">Formatado</label>
              </div>
              <div>
                <button id="gerarCpf" class="btn btn-primary btn-sm me-2">
                  <i class="fas fa-sync"></i>
                </button>
                <button id="copiarCpf" class="btn btn-secondary btn-sm">
                  <i class="far fa-copy"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Gerador de CNPJ -->
      <div class="col-md-6 mb-4">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-building me-2"></i>CNPJ</h5>
            <div class="mb-3">
              <input type="text" class="form-control bg-dark text-light border-secondary mb-2" 
                     id="cnpjResult" readonly>
            </div>
            <div class="d-flex justify-content-between">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="cnpjFormatado" checked>
                <label class="form-check-label" for="cnpjFormatado">Formatado</label>
              </div>
              <div>
                <button id="gerarCnpj" class="btn btn-primary btn-sm me-2">
                  <i class="fas fa-sync"></i>
                </button>
                <button id="copiarCnpj" class="btn btn-secondary btn-sm">
                  <i class="far fa-copy"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="alert alert-info mt-4">
      <i class="fas fa-info-circle me-2"></i>
      Estes geradores criam números válidos apenas para testes de software.
      <strong>Não utilize para fins reais.</strong>
    </div>
  `;
}

export function init() {
  // Configura eventos do CPF
  document.getElementById('gerarCpf').addEventListener('click', () => {
    const cpf = gerarCpf();
    const formatado = document.getElementById('cpfFormatado').checked;
    document.getElementById('cpfResult').value = formatado ? formatarCpf(cpf) : cpf;
  });

  document.getElementById('copiarCpf').addEventListener('click', copiarResultado('cpfResult', 'copiarCpf'));

  // Configura eventos do CNPJ
  document.getElementById('gerarCnpj').addEventListener('click', () => {
    const cnpj = gerarCnpj();
    const formatado = document.getElementById('cnpjFormatado').checked;
    document.getElementById('cnpjResult').value = formatado ? formatarCnpj(cnpj) : cnpj;
  });

  document.getElementById('copiarCnpj').addEventListener('click', copiarResultado('cnpjResult', 'copiarCnpj'));

  // Gera um CPF e CNPJ inicial
  document.getElementById('gerarCpf').click();
  document.getElementById('gerarCnpj').click();
}

function copiarResultado(idInput, idBotao) {
  return function() {
    const input = document.getElementById(idInput);
    input.select();
    document.execCommand('copy');
    
    const btn = document.getElementById(idBotao);
    btn.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
      btn.innerHTML = '<i class="far fa-copy"></i>';
    }, 2000);
  };
}