export function render() {
  return `
    <div class="card bg-dark border-secondary mt-4">
      <div class="card-body">
        <h5 class="card-title"><i class="fas fa-link me-2"></i>Extrator de URLs/Emails</h5>
        <textarea id="extract-input" class="form-control bg-dark text-light border-secondary" 
                 rows="5" placeholder="Cole texto contendo URLs ou emails aqui"></textarea>
        <div class="btn-group mt-3 w-100">
          <button class="btn btn-outline-warning" id="extract-urls">
            <i class="fas fa-link me-1"></i>Extrair URLs
          </button>
          <button class="btn btn-outline-warning" id="extract-emails">
            <i class="fas fa-envelope me-1"></i>Extrair Emails
          </button>
        </div>
        <textarea id="extract-result" class="form-control bg-dark text-light border-secondary mt-3" 
                 rows="3" readonly></textarea>
      </div>
    </div>
  `;
}

export function init() {
  document.getElementById('extract-urls').addEventListener('click', () => {
    const text = document.getElementById('extract-input').value;
    const urls = text.match(/(https?:\/\/[^\s]+)/g) || [];
    document.getElementById('extract-result').value = urls.join('\n');
  });

  document.getElementById('extract-emails').addEventListener('click', () => {
    const text = document.getElementById('extract-input').value;
    const emails = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi) || [];
    document.getElementById('extract-result').value = emails.join('\n');
  });
}