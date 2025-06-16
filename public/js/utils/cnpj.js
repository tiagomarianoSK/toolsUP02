import { gerarNumerosAleatorios } from './cpf.js';

function calcularDigitoVerificadorCNPJ(cnpj, posicoes) {
  const sequencia = posicoes === 12 ? [5,4,3,2,9,8,7,6,5,4,3,2] : [6,5,4,3,2,9,8,7,6,5,4,3,2];
  let soma = 0;
  
  for (let i = 0; i < posicoes; i++) {
    soma += cnpj[i] * sequencia[i];
  }
  
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

export function gerarCnpj() {
  const parteInicial = gerarNumerosAleatorios(8) + '0001';
  const digito1 = calcularDigitoVerificadorCNPJ(parteInicial, 12);
  const digito2 = calcularDigitoVerificadorCNPJ(parteInicial + digito1, 13);
  return parteInicial + digito1 + digito2;
}

export function formatarCnpj(cnpj) {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}