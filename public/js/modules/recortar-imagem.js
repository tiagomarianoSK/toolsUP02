export function render() {
  return `
    <div class="d-flex align-items-center mb-4">
      <a href="#imagem" class="btn btn-outline-secondary me-2" data-page="imagem">
        <i class="fas fa-arrow-left"></i>
      </a>
      <h1 class="mb-0"><i class="fas fa-crop me-2"></i>Recortar Imagem</h1>
    </div>

    <div class="row">
      <div class="col-lg-8">
        <div class="card bg-dark border-secondary mb-4">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-upload me-2"></i>Carregar Imagem</h5>
            <div class="mb-3">
              <input type="file" id="imagem-input" accept="image/*" class="form-control bg-dark text-light border-secondary">
            </div>
            <div class="image-container border-secondary bg-darker position-relative" id="image-container">
              <div class="instructions text-center py-5">
                <i class="fas fa-image fa-4x mb-3 text-muted"></i>
                <p class="text-muted">Selecione uma imagem e arraste para criar a área de corte</p>
              </div>
              <canvas id="image-canvas" class="d-none"></canvas>
              <div id="crop-overlay" class="crop-overlay d-none"></div>
              <div class="position-absolute bottom-0 end-0 m-3">
                <button id="btn-download" class="btn btn-success d-none">
                  <i class="fas fa-download me-1"></i>Baixar
                </button>
              </div>
            </div>
            <div class="mt-2 text-end">
              <small id="image-info" class="text-muted">Nenhuma imagem carregada</small>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-lg-4">
        <div class="card bg-dark border-secondary mb-4">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-sliders-h me-2"></i>Controles</h5>
            
            <div class="mb-3">
              <label class="form-label">Proporção</label>
              <select id="aspect-ratio" class="form-select bg-dark text-light border-secondary">
                <option value="0">Livre</option>
                <option value="1">1:1 (Quadrada)</option>
                <option value="1.777">16:9 (Widescreen)</option>
                <option value="1.333">4:3 (Tradicional)</option>
                <option value="custom">Personalizada</option>
              </select>
            </div>

            <div id="custom-ratio-group" class="row mb-3 d-none">
              <div class="col-6">
                <input type="number" id="custom-ratio-width" class="form-control bg-dark text-light border-secondary" min="1" value="1" placeholder="Largura">
              </div>
              <div class="col-6">
                <input type="number" id="custom-ratio-height" class="form-control bg-dark text-light border-secondary" min="1" value="1" placeholder="Altura">
              </div>
            </div>
            
            <div class="row">
              <div class="col-6 mb-3">
                <label class="form-label">Largura (px)</label>
                <input type="number" id="crop-width" class="form-control bg-dark text-light border-secondary" min="20">
              </div>
              <div class="col-6 mb-3">
                <label class="form-label">Altura (px)</label>
                <input type="number" id="crop-height" class="form-control bg-dark text-light border-secondary" min="20">
              </div>
            </div>
            
            <div class="row">
              <div class="col-6 mb-3">
                <label class="form-label">Posição X (px)</label>
                <input type="number" id="crop-x" class="form-control bg-dark text-light border-secondary" min="0">
              </div>
              <div class="col-6 mb-3">
                <label class="form-label">Posição Y (px)</label>
                <input type="number" id="crop-y" class="form-control bg-dark text-light border-secondary" min="0">
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Rotação</label>
              <div class="d-flex align-items-center gap-2">
                <input type="range" id="image-rotation" class="form-range" min="-180" max="180" value="0">
                <span id="rotation-value" class="badge bg-secondary">0°</span>
              </div>
            </div>
            
            <div class="d-grid gap-2">
              <button id="btn-crop" class="btn btn-primary" disabled>
                <i class="fas fa-crop me-1"></i>Recortar Imagem
              </button>
              <button id="btn-reset" class="btn btn-outline-secondary">
                <i class="fas fa-redo me-1"></i>Reiniciar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="loading-modal" class="modal fade" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark">
          <div class="modal-body text-center py-4">
            <div class="spinner-border text-primary mb-3" role="status">
              <span class="visually-hidden">Processando...</span>
            </div>
            <h5>Processando imagem...</h5>
            <p class="text-muted mb-0">Aguarde enquanto sua imagem é recortada</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function init() {
  // Elementos DOM
  const imageInput = document.getElementById('imagem-input');
  const imageContainer = document.getElementById('image-container');
  const canvas = document.getElementById('image-canvas');
  const cropOverlay = document.getElementById('crop-overlay');
  const ctx = canvas.getContext('2d');
  const btnCrop = document.getElementById('btn-crop');
  const btnReset = document.getElementById('btn-reset');
  const btnDownload = document.getElementById('btn-download');
  const aspectRatioSelect = document.getElementById('aspect-ratio');
  const customRatioGroup = document.getElementById('custom-ratio-group');
  const customRatioWidth = document.getElementById('custom-ratio-width');
  const customRatioHeight = document.getElementById('custom-ratio-height');
  const rotationSlider = document.getElementById('image-rotation');
  const rotationValue = document.getElementById('rotation-value');
  const imageInfo = document.getElementById('image-info');
  const loadingModal = new bootstrap.Modal(document.getElementById('loading-modal'));

  // Controles
  const cropXInput = document.getElementById('crop-x');
  const cropYInput = document.getElementById('crop-y');
  const cropWidthInput = document.getElementById('crop-width');
  const cropHeightInput = document.getElementById('crop-height');
  
  // Variáveis de estado
  let originalImage = null;
  let currentImage = null;
  let cropArea = { x: 0, y: 0, width: 0, height: 0 };
  let aspectRatio = 0;
  let isSelecting = false;
  let startX, startY;
  let rotation = 0;
  
  // Constantes
  const MIN_CROP_SIZE = 20;
  const GRID_SIZE = 50;

  // Inicialização
  setupEventListeners();

  function setupEventListeners() {
    // Evento para carregar imagem
    imageInput.addEventListener('change', handleImageUpload);
    
    // Eventos para seleção com mouse
    cropOverlay.addEventListener('mousedown', startSelection);
    cropOverlay.addEventListener('mousemove', updateSelection);
    cropOverlay.addEventListener('mouseup', endSelection);
    cropOverlay.addEventListener('mouseleave', endSelection);
    
    // Eventos para os controles
    aspectRatioSelect.addEventListener('change', updateAspectRatio);
    customRatioWidth.addEventListener('input', updateCustomRatio);
    customRatioHeight.addEventListener('input', updateCustomRatio);
    cropXInput.addEventListener('input', updateFromControls);
    cropYInput.addEventListener('input', updateFromControls);
    cropWidthInput.addEventListener('input', updateFromControls);
    cropHeightInput.addEventListener('input', updateFromControls);
    rotationSlider.addEventListener('input', updateRotation);
    
    // Botões
    btnCrop.addEventListener('click', processCrop);
    btnReset.addEventListener('click', resetImage);
    btnDownload.addEventListener('click', downloadImage);
  }

  function handleImageUpload(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      
      reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
          originalImage = img;
          currentImage = img;
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          // Mostra o canvas e esconde as instruções
          canvas.classList.remove('d-none');
          cropOverlay.classList.remove('d-none');
          imageContainer.querySelector('.instructions').classList.add('d-none');
          
          // Inicializa a área de recorte
          const size = Math.min(img.width, img.height) * 0.6;
          cropArea = {
            x: (img.width - size) / 2,
            y: (img.height - size) / 2,
            width: size,
            height: size
          };
          
          // Ativa controles
          btnCrop.disabled = false;
          updateImageInfo();
          updateCropControls();
          drawCropOverlay();
        };
        img.src = event.target.result;
      };
      
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function updateImageInfo() {
    if (originalImage) {
      imageInfo.textContent = `${originalImage.width} × ${originalImage.height}px`;
    }
  }

  function startSelection(e) {
    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
    
    cropArea = {
      x: startX,
      y: startY,
      width: 0,
      height: 0
    };
    
    isSelecting = true;
    drawCropOverlay();
  }

  function updateSelection(e) {
    if (!isSelecting) return;
    
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    // Calcula a área de seleção
    cropArea.width = currentX - startX;
    cropArea.height = currentY - startY;
    
    // Mantém proporção se definida
    if (aspectRatio > 0) {
      if (Math.abs(cropArea.width) > Math.abs(cropArea.height)) {
        cropArea.height = cropArea.width / aspectRatio * (cropArea.height < 0 ? -1 : 1);
      } else {
        cropArea.width = cropArea.height * aspectRatio * (cropArea.width < 0 ? -1 : 1);
      }
    }
    
    // Ajusta a posição se a seleção for para a esquerda ou para cima
    if (cropArea.width < 0) {
      cropArea.x = currentX;
      cropArea.width = -cropArea.width;
    }
    
    if (cropArea.height < 0) {
      cropArea.y = currentY;
      cropArea.height = -cropArea.height;
    }
    
    // Limita dentro da imagem
    if (cropArea.x < 0) {
      cropArea.width += cropArea.x;
      cropArea.x = 0;
    }
    
    if (cropArea.y < 0) {
      cropArea.height += cropArea.y;
      cropArea.y = 0;
    }
    
    if (cropArea.x + cropArea.width > canvas.width) {
      cropArea.width = canvas.width - cropArea.x;
    }
    
    if (cropArea.y + cropArea.height > canvas.height) {
      cropArea.height = canvas.height - cropArea.y;
    }
    
    updateCropControls();
    drawCropOverlay();
  }

  function endSelection() {
    isSelecting = false;
    
    // Garante um tamanho mínimo
    if (cropArea.width < MIN_CROP_SIZE || cropArea.height < MIN_CROP_SIZE) {
      const size = Math.max(MIN_CROP_SIZE, Math.min(cropArea.width, cropArea.height));
      cropArea.width = size;
      cropArea.height = aspectRatio > 0 ? size / aspectRatio : size;
      
      if (cropArea.x + cropArea.width > canvas.width) {
        cropArea.x = canvas.width - cropArea.width;
      }
      
      if (cropArea.y + cropArea.height > canvas.height) {
        cropArea.y = canvas.height - cropArea.height;
      }
      
      updateCropControls();
      drawCropOverlay();
    }
  }

  function updateAspectRatio() {
    const value = aspectRatioSelect.value;
    
    if (value === 'custom') {
      customRatioGroup.classList.remove('d-none');
      aspectRatio = customRatioWidth.value / customRatioHeight.value;
    } else {
      customRatioGroup.classList.add('d-none');
      aspectRatio = parseFloat(value);
    }
    
    if (aspectRatio > 0 && cropArea.width > 0) {
      if (cropArea.width > cropArea.height) {
        cropArea.height = cropArea.width / aspectRatio;
      } else {
        cropArea.width = cropArea.height * aspectRatio;
      }
      
      if (cropArea.y + cropArea.height > canvas.height) {
        cropArea.height = canvas.height - cropArea.y;
        cropArea.width = cropArea.height * aspectRatio;
      }
      
      updateCropControls();
      drawCropOverlay();
    }
  }

  function updateCustomRatio() {
    if (aspectRatioSelect.value === 'custom') {
      aspectRatio = customRatioWidth.value / customRatioHeight.value;
      updateAspectRatio();
    }
  }

  function updateRotation() {
    rotation = parseInt(rotationSlider.value);
    rotationValue.textContent = `${rotation}°`;
    drawCropOverlay();
  }

  function drawCropOverlay() {
    // Redesenha a imagem original
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Se não há rotação, desenha normalmente
    if (rotation === 0) {
      ctx.drawImage(currentImage, 0, 0);
    } else {
      // Rotaciona a imagem
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rotation * Math.PI / 180);
      ctx.drawImage(currentImage, -currentImage.width / 2, -currentImage.height / 2);
      ctx.restore();
    }
    
    // Área semi-transparente fora da seleção
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, cropArea.y);
    ctx.fillRect(0, cropArea.y, cropArea.x, cropArea.height);
    ctx.fillRect(cropArea.x + cropArea.width, cropArea.y, canvas.width - (cropArea.x + cropArea.width), cropArea.height);
    ctx.fillRect(0, cropArea.y + cropArea.height, canvas.width, canvas.height - (cropArea.y + cropArea.height));
    
    // Grade
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    
    // Linhas verticais
    for (let x = cropArea.x; x <= cropArea.x + cropArea.width; x += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, cropArea.y);
      ctx.lineTo(x, cropArea.y + cropArea.height);
      ctx.stroke();
    }
    
    // Linhas horizontais
    for (let y = cropArea.y; y <= cropArea.y + cropArea.height; y += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(cropArea.x, y);
      ctx.lineTo(cropArea.x + cropArea.width, y);
      ctx.stroke();
    }
    
    // Borda da área de recorte
    ctx.strokeStyle = '#0d6efd';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);
  }

  function updateCropControls() {
    cropXInput.value = Math.round(cropArea.x);
    cropYInput.value = Math.round(cropArea.y);
    cropWidthInput.value = Math.round(cropArea.width);
    cropHeightInput.value = Math.round(cropArea.height);
  }

  function updateFromControls() {
    cropArea.x = parseInt(cropXInput.value) || 0;
    cropArea.y = parseInt(cropYInput.value) || 0;
    cropArea.width = parseInt(cropWidthInput.value) || MIN_CROP_SIZE;
    cropArea.height = parseInt(cropHeightInput.value) || MIN_CROP_SIZE;
    
    if (aspectRatio > 0) {
      if (this === cropWidthInput) {
        cropArea.height = cropArea.width / aspectRatio;
        cropHeightInput.value = Math.round(cropArea.height);
      } else if (this === cropHeightInput) {
        cropArea.width = cropArea.height * aspectRatio;
        cropWidthInput.value = Math.round(cropArea.width);
      }
    }
    
    drawCropOverlay();
  }

  async function processCrop() {
    if (!originalImage || !imageInput.files[0]) return;
    
    loadingModal.show();
    
    try {
      const formData = new FormData();
      formData.append('image', imageInput.files[0]);
      formData.append('x', cropArea.x);
      formData.append('y', cropArea.y);
      formData.append('width', cropArea.width);
      formData.append('height', cropArea.height);
      
      const response = await fetch('/api/crop', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error('Erro no servidor');
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      // Atualiza a imagem exibida com o resultado do recorte
      const img = new Image();
      img.onload = function() {
        originalImage = img;
        currentImage = img;
        canvas.width = img.width;
        canvas.height = img.height;
        rotation = 0;
        rotationSlider.value = 0;
        rotationValue.textContent = '0°';
        ctx.drawImage(img, 0, 0);
        
        // Redefine a área de recorte para toda a imagem
        cropArea = { x: 0, y: 0, width: img.width, height: img.height };
        
        // Ativa o botão de download
        btnDownload.classList.remove('d-none');
        updateImageInfo();
        updateCropControls();
        drawCropOverlay();
      };
      img.src = url;
      
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao processar imagem: ' + error.message);
    } finally {
      loadingModal.hide();
    }
  }

  function resetImage() {
    if (originalImage) {
      currentImage = originalImage;
      canvas.width = originalImage.width;
      canvas.height = originalImage.height;
      rotation = 0;
      rotationSlider.value = 0;
      rotationValue.textContent = '0°';
      ctx.drawImage(originalImage, 0, 0);
      
      const size = Math.min(originalImage.width, originalImage.height) * 0.6;
      cropArea = {
        x: (originalImage.width - size) / 2,
        y: (originalImage.height - size) / 2,
        width: size,
        height: size
      };
      
      btnDownload.classList.add('d-none');
      updateCropControls();
      drawCropOverlay();
    }
  }

  function downloadImage() {
    const link = document.createElement('a');
    link.download = 'imagem-recortada.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
}