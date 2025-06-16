// gerador-certidoes.js
export function render() {
  return `
    <div class="d-flex align-items-center mb-4">
      <a href="#geradores" class="btn btn-sm btn-outline-secondary me-2" data-page="geradores">
        <i class="fas fa-arrow-left"></i>
      </a>
      <h1 class="display-6 mb-0"><i class="fas fa-file-contract me-2"></i>Gerador de Certidões</h1>
    </div>
    
    <div class="row">
      <!-- Configuração -->
      <div class="col-md-4 mb-4">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-cog me-2"></i>Configuração</h5>
            
            <div class="mb-3">
              <label class="form-label">Tipo de Certidão</label>
              <select class="form-select bg-dark text-light border-secondary" id="tipoCertidao">
                <option value="nascimento">Certidão de Nascimento</option>
                <option value="casamento">Certidão de Casamento</option>
                <option value="obito">Certidão de Óbito</option>
              </select>
            </div>
            
            <div class="mb-3">
              <label class="form-label">Estado</label>
              <select class="form-select bg-dark text-light border-secondary" id="estadoCertidao">
                ${['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
                   'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC',
                   'SP','SE','TO'].map(uf => 
                  `<option value="${uf}" ${uf === 'SP' ? 'selected' : ''}>${{
                    'AC':'Acre', 'AL':'Alagoas', 'AP':'Amapá', 'AM':'Amazonas',
                    'BA':'Bahia', 'CE':'Ceará', 'DF':'Distrito Federal', 'ES':'Espírito Santo',
                    'GO':'Goiás', 'MA':'Maranhão', 'MT':'Mato Grosso', 'MS':'Mato Grosso do Sul',
                    'MG':'Minas Gerais', 'PA':'Pará', 'PB':'Paraíba', 'PR':'Paraná',
                    'PE':'Pernambuco', 'PI':'Piauí', 'RJ':'Rio de Janeiro', 'RN':'Rio Grande do Norte',
                    'RS':'Rio Grande do Sul', 'RO':'Rondônia', 'RR':'Roraima', 'SC':'Santa Catarina',
                    'SP':'São Paulo', 'SE':'Sergipe', 'TO':'Tocantins'
                  }[uf]}</option>`).join('')}
              </select>
            </div>
            
            <button id="gerarCertidao" class="btn btn-primary w-100">
              <i class="fas fa-sync me-1"></i>Gerar Certidão
            </button>
          </div>
        </div>
      </div>
      
      <!-- Resultado -->
      <div class="col-md-8 mb-4">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="card-title mb-0"><i class="fas fa-file-alt me-2"></i>Certidão Gerada</h5>
              <button id="copiarCertidao" class="btn btn-sm btn-secondary">
                <i class="far fa-copy"></i> Copiar
              </button>
            </div>
            
            <div class="mb-3">
              <textarea class="form-control bg-dark text-light border-secondary" 
                        id="certidaoResult" rows="12" readonly
                        style="font-family: 'Courier New', monospace; white-space: pre;"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="alert alert-warning mt-4">
      <i class="fas fa-exclamation-triangle me-2"></i>
      Este gerador cria documentos fictícios para testes de desenvolvimento.
      <strong>Não possuem valor legal.</strong>
    </div>
  `;
}

// Funções utilitárias
function gerarCpf(formatado = false) {
  let cpf = Array.from({length: 9}, () => Math.floor(Math.random() * 10)).join('');
  
  // Cálculo dos dígitos verificadores
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf[i]) * (10 - i);
  }
  let digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  cpf += digito1;
  
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf[i]) * (11 - i);
  }
  let digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  cpf += digito2;

  return formatado ? 
    `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9)}` : 
    cpf;
}

function gerarNome(genero = null) {
  const nomes = {
    masculino: ['João', 'Pedro', 'Carlos', 'Lucas', 'Marcos', 'Antônio', 'Paulo', 'Fernando'],
    feminino: ['Maria', 'Ana', 'Juliana', 'Patrícia', 'Fernanda', 'Camila', 'Amanda', 'Letícia']
  };
  const sobrenomes = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Pereira', 'Costa', 'Rodrigues', 'Almeida'];
  
  const generoSelecionado = genero || (Math.random() > 0.5 ? 'masculino' : 'feminino');
  const nome = nomes[generoSelecionado][Math.floor(Math.random() * nomes[generoSelecionado].length)];
  const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
  
  return `${nome} ${sobrenome} ${sobrenomes[Math.floor(Math.random() * sobrenomes.length)]}`;
}

function gerarData(inicio, fim) {
  const ano = Math.floor(Math.random() * (fim - inicio + 1)) + inicio;
  const mes = Math.floor(Math.random() * 12);
  const dia = Math.floor(Math.random() * 28) + 1;
  return new Date(ano, mes, dia);
}

function formatarData(data) {
  return data.toLocaleDateString('pt-BR');
}

function getCidadePorEstado(uf) {
  const cidades = {
    'AC': 'Rio Branco', 'AL': 'Maceió', 'AP': 'Macapá', 'AM': 'Manaus',
    'BA': 'Salvador', 'CE': 'Fortaleza', 'DF': 'Brasília', 'ES': 'Vitória',
    'GO': 'Goiânia', 'MA': 'São Luís', 'MT': 'Cuiabá', 'MS': 'Campo Grande',
    'MG': 'Belo Horizonte', 'PA': 'Belém', 'PB': 'João Pessoa', 'PR': 'Curitiba',
    'PE': 'Recife', 'PI': 'Teresina', 'RJ': 'Rio de Janeiro', 'RN': 'Natal',
    'RS': 'Porto Alegre', 'RO': 'Porto Velho', 'RR': 'Boa Vista', 'SC': 'Florianópolis',
    'SP': 'São Paulo', 'SE': 'Aracaju', 'TO': 'Palmas'
  };
  return cidades[uf] || 'Cidade Desconhecida';
}

export function init() {
  // Gera a primeira certidão ao carregar
  gerarCertidaoExemplo();
  
  // Configura os eventos
  document.getElementById('gerarCertidao').addEventListener('click', gerarCertidaoExemplo);
  document.getElementById('copiarCertidao').addEventListener('click', copiarCertidao);
  document.getElementById('tipoCertidao').addEventListener('change', gerarCertidaoExemplo);
  document.getElementById('estadoCertidao').addEventListener('change', gerarCertidaoExemplo);
}

function gerarCertidaoExemplo() {
  const tipo = document.getElementById('tipoCertidao').value;
  const estado = document.getElementById('estadoCertidao').value;
  document.getElementById('certidaoResult').value = gerarCertidao(tipo, estado);
}

function gerarCertidao(tipo, estado) {
  const cidade = getCidadePorEstado(estado);
  const dataAtual = new Date();
  const livro = Math.floor(Math.random() * 100) + 1;
  const folha = Math.floor(Math.random() * 500) + 1;
  const termo = Math.floor(Math.random() * 10000) + 1;
  
  const modelos = {
    nascimento: `CERTIDÃO DE NASCIMENTO
Registro Civil das Pessoas Naturais
Cartório do ${Math.random() > 0.5 ? '1º' : '2º'} Ofício - ${cidade}

Livro: ${livro}
Folha: ${folha}
Termo: ${termo}

Nome: ${gerarNome()}
Sexo: ${Math.random() > 0.5 ? 'Masculino' : 'Feminino'}
Nascimento: ${formatarData(gerarData(1990, 2023))}
Naturalidade: ${cidade}/${estado}
Pai: ${gerarNome('masculino')}
Mãe: ${gerarNome('feminino')}

Declarante: ${gerarNome()}
CPF Declarante: ${gerarCpf(true)}

Data do Registro: ${formatarData(dataAtual)}
Registrada sob o nº ${Math.floor(Math.random() * 10000)}/${dataAtual.getFullYear()}`,

    casamento: `CERTIDÃO DE CASAMENTO
Registro Civil das Pessoas Naturais
${cidade}/${estado}

Livro: ${livro}
Folha: ${folha}
Termo: ${termo}

Nubente 1: ${gerarNome()}
CPF: ${gerarCpf(true)}
Nascimento: ${formatarData(gerarData(1970, 1995))}
Naturalidade: ${cidade}/${estado}

Nubente 2: ${gerarNome()}
CPF: ${gerarCpf(true)}
Nascimento: ${formatarData(gerarData(1970, 1995))}
Naturalidade: ${cidade}/${estado}

Data do Casamento: ${formatarData(gerarData(2010, 2023))}
Regime de Bens: ${['Comunhão Universal', 'Comunhão Parcial', 'Separação Total'][Math.floor(Math.random() * 3)]}

Testemunhas:
1. ${gerarNome()} - CPF: ${gerarCpf(true)}
2. ${gerarNome()} - CPF: ${gerarCpf(true)}

Data do Registro: ${formatarData(dataAtual)}`,

    obito: `CERTIDÃO DE ÓBITO
Registro Civil das Pessoas Naturais
${cidade}/${estado}

Livro: ${livro}
Folha: ${folha}
Termo: ${termo}

Falecido: ${gerarNome()}
Sexo: ${Math.random() > 0.5 ? 'Masculino' : 'Feminino'}
Nascimento: ${formatarData(gerarData(1920, 2000))}
Naturalidade: ${cidade}/${estado}
Filiação:
- Pai: ${gerarNome('masculino')}
- Mãe: ${gerarNome('feminino')}

Data do Óbito: ${formatarData(gerarData(2020, 2023))}
Local: ${['Hospital Municipal', 'Residência', 'Via Pública'][Math.floor(Math.random() * 3)]}, ${cidade}
Causa: ${['Morte Natural', 'Acidente', 'Doença'][Math.floor(Math.random() * 3)]}

Declarante: ${gerarNome()}
CPF Declarante: ${gerarCpf(true)}

Data do Registro: ${formatarData(dataAtual)}`
  };

  return modelos[tipo] || "Tipo de certidão não suportado";
}

function copiarCertidao() {
  const textarea = document.getElementById('certidaoResult');
  textarea.select();
  document.execCommand('copy');
  
  const btn = document.getElementById('copiarCertidao');
  const originalHtml = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
  
  setTimeout(() => {
    btn.innerHTML = originalHtml;
  }, 2000);
}