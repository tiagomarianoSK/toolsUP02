export function render() {
  return `
    <div class="card bg-dark border-secondary mt-4">
      <div class="card-body">
        <h5 class="card-title"><i class="fas fa-cut me-2"></i>Limpeza de Texto</h5>
        <textarea id="clean-input" class="form-control bg-dark text-light border-secondary" 
                 rows="5" placeholder="Texto com espaços extras..."></textarea>
        <button class="btn btn-outline-success mt-3 w-100" id="clean-text">
          <i class="fas fa-broom me-1"></i>Remover Espaços Extras
        </button>
      </div>
    </div>
  `;
}

export function init() {
  document.getElementById('clean-text').addEventListener('click', () => {
    const textarea = document.getElementById('clean-input');
    textarea.value = textarea.value.replace(/\s+/g, ' ').trim();
  });
}