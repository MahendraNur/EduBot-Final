const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const fileInput = document.getElementById('file-input');
const fileBtn = document.getElementById('file-btn');
const fileNameDisplay = document.getElementById('file-name');

fileBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = `📁 File terpilih: ${fileInput.files[0].name}`;
    } else {
        fileNameDisplay.textContent = '';
    }
});

function formatText(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
             .replace(/\*(.*?)\*/g, '<em>$1</em>')             
             .replace(/\n/g, '<br>');                        
}

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  const file = fileInput.files[0];

  if (!userMessage && !file) return;

  let displayMessage = userMessage;
  if (file) displayMessage += ` <br><small><i>(Melampirkan file: ${file.name})</i></small>`;
  appendMessage('user', displayMessage || `<i>Mengirim file: ${file.name}...</i>`, null, true);
  
  // Reset input
  input.value = '';
  fileInput.value = '';
  fileNameDisplay.textContent = '';

  const loadingId = 'loading-' + Date.now();
  appendMessage('bot', 'EduBot sedang menganalisis...', loadingId, false);

  try {
    let response;

    if (file) {
        const formData = new FormData();
        formData.append('prompt', userMessage || "Tolong analisis file ini dari sudut pandang konsultan pendidikan.");

        if (file.type.startsWith('image/')) {
            formData.append('image', file);
            response = await fetch('/generate-from-image', { method: 'POST', body: formData });
        } else if (file.type.startsWith('audio/')) {
            formData.append('audio', file);
            response = await fetch('/generate-from-audio', { method: 'POST', body: formData });
        } else {
            formData.append('document', file);
            response = await fetch('/generate-from-document', { method: 'POST', body: formData });
        }
    } else {
        // --- JIKA HANYA TEKS ---
        response = await fetch('/generate-text', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: userMessage })
        });
    }

    const data = await response.json();
    removeMessage(loadingId);
    
    if (response.ok) {
      appendMessage('bot', data.result, null, true); 
    } else {
      appendMessage('bot', 'Error: ' + data.message);
    }

  } catch (error) {
    removeMessage(loadingId);
    appendMessage('bot', 'Gagal terhubung ke server.');
  }
});

function appendMessage(sender, text, id = null, isHtml = false) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  
  if (isHtml) msg.innerHTML = formatText(text);
  else msg.textContent = text;
  
  if (id) msg.id = id;
  
  const clearFix = document.createElement('div');
  clearFix.style.clear = 'both';

  chatBox.appendChild(msg);
  chatBox.appendChild(clearFix);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeMessage(id) {
  const msg = document.getElementById(id);
  if (msg) {
    const nextSibling = msg.nextElementSibling;
    if (nextSibling && nextSibling.style.clear === 'both') nextSibling.remove();
    msg.remove();
  }
}