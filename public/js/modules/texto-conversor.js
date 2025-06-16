export function render() {
  return `
    <div class="card bg-dark border-secondary mt-4">
      <div class="card-body">
        <h5 class="card-title"><i class="fas fa-font me-2"></i>Conversor de Texto</h5>
        <textarea id="case-input" class="form-control bg-dark text-light border-secondary" 
                 rows="5" placeholder="Digite seu texto"></textarea>
        <div class="btn-group mt-3 w-100">
          <button class="btn btn-outline-primary" id="to-upper">
            <i class="fas fa-allcaps me-1"></i>MAIÚSCULAS
          </button>
          <button class="btn btn-outline-primary" id="to-lower">
            <i class="fas fa-text-height me-1"></i>minúsculas
          </button>
          <button class="btn btn-outline-primary" id="to-title">
            <i class="fas fa-heading me-1"></i>Título Case
          </button>
        </div>
      </div>
    </div>
  `;
}

export function init() {
  const textarea = document.getElementById('case-input');
  
  document.getElementById('to-upper').addEventListener('click', () => {
    textarea.value = textarea.value.toUpperCase();
  });
  
  document.getElementById('to-lower').addEventListener('click', () => {
    textarea.value = textarea.value.toLowerCase();
  });
  
  document.getElementById('to-title').addEventListener('click', () => {
    textarea.value = textarea.value.toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  });
}