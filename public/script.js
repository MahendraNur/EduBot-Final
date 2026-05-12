const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

function formatText(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
             .replace(/\*(.*?)\*/g, '<em>$1</em>')             
             .replace(/\n/g, '<br>');                        
}

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  input.value = '';

  const loadingId = 'loading-' + Date.now();
  appendMessage('bot', 'EduBot sedang mengetik...', loadingId, false);

  try {
    const response = await fetch('/generate-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: userMessage })
    });

    const data = await response.json();

    removeMessage(loadingId);
    
    if (response.ok) {
      appendMessage('bot', data.result, null, true); // true = format teks
    } else {
      appendMessage('bot', 'Error: ' + data.message);
    }

  } catch (error) {
    removeMessage(loadingId);
    appendMessage('bot', 'Gagal terhubung ke server. Pastikan backend sudah menyala!');
  }
});

function appendMessage(sender, text, id = null, isHtml = false) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  
  if (isHtml) {
    msg.innerHTML = formatText(text);
  } else {
    msg.textContent = text;
  }
  
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
    if (nextSibling && nextSibling.style.clear === 'both') {
      nextSibling.remove();
    }
    msg.remove();
  }
}