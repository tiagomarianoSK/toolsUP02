export function gerarNumerosAleatorios(tamanho) {
  let numeros = '';
  for (let i = 0; i < tamanho; i++) {
    numeros += Math.floor(Math.random() * 10);
  }
  return numeros;
}

function calcularDigitoVerificadorCPF(cpf, posicoes) {
  const digitos = cpf.substr(0, posicoes).split('');
  let soma = 0;
  
  for (let i = 0; i < digitos.length; i++) {
    soma += digitos[i] * (posicoes + 1 - i);
  }
  
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

export function gerarCpf() {
  const parteInicial = gerarNumerosAleatorios(9);
  const digito1 = calcularDigitoVerificadorCPF(parteInicial, 9);
  const digito2 = calcularDigitoVerificadorCPF(parteInicial + digito1, 10);
  return parteInicial + digito1 + digito2;
}

export function formatarCpf(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}