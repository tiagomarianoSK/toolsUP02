export function render() {
  return `
    <div class="card bg-dark border-secondary">
      <div class="card-body">
        <h5 class="card-title"><i class="fas fa-text-width me-2"></i>Contador de Texto</h5>
        <textarea id="texto-input" class="form-control bg-dark text-light border-secondary" 
                  rows="5" placeholder="Digite ou cole seu texto aqui"></textarea>
        <div class="mt-3 row">
          <div class="col-md-6">
            <div class="alert bg-darker">
              <span class="fw-bold">Caracteres:</span> 
              <span id="char-count">0</span>
            </div>
          </div>
          <div class="col-md-6">
            <div class="alert bg-darker">
              <span class="fw-bold">Palavras:</span> 
              <span id="word-count">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function init() {
  const textarea = document.getElementById('texto-input');
  
  textarea.addEventListener('input', () => {
    const text = textarea.value;
    document.getElementById('char-count').textContent = text.length;
    document.getElementById('word-count').textContent = 
      text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  });
}