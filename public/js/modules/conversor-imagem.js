export function render() {
  return `
    <div class="d-flex align-items-center mb-4">
      <a href="#imagem" class="btn btn-outline-secondary me-2" data-page="imagem">
        <i class="fas fa-arrow-left"></i>
      </a>
      <h1 class="mb-0"><i class="fas fa-exchange-alt me-2"></i>Conversor de Imagens</h1>
    </div>

    <div class="row g-4">
      <!-- Área de Upload -->
      <div class="col-md-6">
        <div class="card bg-dark border-secondary h-100">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-file-upload me-2"></i>Origem</h5>
            
            <div class="mb-3">
              <label class="form-label">Selecione a imagem</label>
              <input type="file" id="file-input" class="form-control bg-dark text-light border-secondary" 
                     accept=".jpg, .jpeg, .png, .gif, .webp, .bmp">
              <small class="text-muted">Formatos suportados: JPG, PNG, GIF, WebP, BMP</small>
            </div>
            
            <div class="mb-3 text-center">
              <img id="image-preview" class="img-fluid rounded border border-secondary" 
                   style="max-height: 300px; display: none;">
              <div id="no-image" class="text-muted py-4">
                <i class="fas fa-image fa-3x mb-2"></i><br>
                Nenhuma imagem selecionada
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Controles de Conversão -->
      <div class="col-md-6">
        <div class="card bg-dark border-primary h-100">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-cog me-2"></i>Configurações</h5>
            
            <div class="mb-3">
              <label class="form-label">Converter para:</label>
              <select id="target-format" class="form-select bg-dark text-light border-secondary">
                <option value="jpg">JPEG (.jpg)</option>
                <option value="png">PNG (.png)</option>
                <option value="webp">WebP (.webp)</option>
                <option value="gif">GIF (.gif)</option>
                <option value="bmp">BMP (.bmp)</option>
              </select>
            </div>
            
            <!-- Opções específicas por formato -->
            <div id="jpeg-options" class="mb-3">
              <label class="form-label">Qualidade JPEG (0-100)</label>
              <input type="range" class="form-range" id="jpeg-quality" min="1" max="100" value="80">
              <div class="d-flex justify-content-between">
                <small>Baixa</small>
                <small id="quality-value">80%</small>
                <small>Alta</small>
              </div>
            </div>
            
            <div id="png-options" class="mb-3" style="display: none;">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="png-transparency" checked>
                <label class="form-check-label" for="png-transparency">Manter transparência</label>
              </div>
            </div>
            
            <button id="convert-button" class="btn btn-primary w-100 mb-3" disabled>
              <i class="fas fa-sync-alt me-1"></i> Converter
            </button>
            
            <div class="alert alert-info">
              <i class="fas fa-info-circle me-2"></i>
              <small>Tamanho estimado: <span id="size-estimate">-</span></small>
            </div>
            
            <button id="download-button" class="btn btn-success w-100" disabled>
              <i class="fas fa-download me-1"></i> Baixar Imagem
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function init() {
  const fileInput = document.getElementById('file-input');
  const preview = document.getElementById('image-preview');
  const noImage = document.getElementById('no-image');
  const convertBtn = document.getElementById('convert-button');
  const downloadBtn = document.getElementById('download-button');
  const formatSelect = document.getElementById('target-format');
  let convertedBlob = null;

  // Mostrar pré-visualização da imagem
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      preview.src = event.target.result;
      preview.style.display = 'block';
      noImage.style.display = 'none';
      convertBtn.disabled = false;
    };
    reader.readAsDataURL(file);
  });

  // Atualizar opções conforme formato selecionado
  formatSelect.addEventListener('change', () => {
    document.getElementById('jpeg-options').style.display = 
      formatSelect.value === 'jpg' ? 'block' : 'none';
    document.getElementById('png-options').style.display = 
      formatSelect.value === 'png' ? 'block' : 'none';
  });

  // Atualizar valor da qualidade JPEG
  document.getElementById('jpeg-quality').addEventListener('input', (e) => {
    document.getElementById('quality-value').textContent = `${e.target.value}%`;
  });

  // Converter imagem
  convertBtn.addEventListener('click', async () => {
    if (!fileInput.files[0]) return;
    
    const file = fileInput.files[0];
    const format = formatSelect.value;
    const quality = format === 'jpg' ? 
      parseInt(document.getElementById('jpeg-quality').value) / 100 : 0.8;

    try {
      // Usando a API Canvas para conversão
      const img = await loadImage(URL.createObjectURL(file));
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      // Converter para o formato selecionado
      canvas.toBlob((blob) => {
        convertedBlob = blob;
        downloadBtn.disabled = false;
        document.getElementById('size-estimate').textContent = 
          `${(blob.size / 1024).toFixed(2)} KB`;
      }, `image/${format}`, quality);
      
    } catch (error) {
      alert('Erro ao converter imagem: ' + error.message);
    }
  });

  // Download da imagem convertida
  downloadBtn.addEventListener('click', () => {
    if (!convertedBlob) return;
    const url = URL.createObjectURL(convertedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted.${formatSelect.value}`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Helper para carregar imagem
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }
}