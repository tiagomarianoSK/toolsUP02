export function render() {
  return `
    <div class="card bg-dark border-secondary mt-4">
      <div class="card-body">
        <h5 class="card-title"><i class="fas fa-align-left me-2"></i>Gerador de Texto</h5>
        <div class="mb-3">
          <label class="form-label">Quantidade de parágrafos</label>
          <input type="number" id="paragraphs" class="form-control bg-dark text-light border-secondary" 
                value="3" min="1" max="20">
        </div>
        <button class="btn btn-outline-info w-100 mb-3" id="generate-text">
          <i class="fas fa-random me-1"></i>Gerar Lorem Ipsum
        </button>
        <textarea id="lorem-output" class="form-control bg-dark text-light border-secondary" 
                 rows="5" readonly></textarea>
      </div>
    </div>
  `;
}

export function init() {
  document.getElementById('generate-text').addEventListener('click', () => {
    const paragraphs = document.getElementById('paragraphs').value;
    const lorem = generateLoremIpsum(paragraphs);
    document.getElementById('lorem-output').value = lorem;
  });

  function generateLoremIpsum(paragraphs) {
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(10).split('. ');
    let result = [];
    for (let i = 0; i < paragraphs; i++) {
      const sentences = Math.floor(Math.random() * 3) + 2;
      const paragraph = [];
      for (let j = 0; j < sentences; j++) {
        paragraph.push(lorem[Math.floor(Math.random() * lorem.length)]);
      }
      result.push(paragraph.join('. ') + ".");
    }
    return result.join('\n\n');
  }
}