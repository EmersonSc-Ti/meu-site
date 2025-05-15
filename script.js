async function consultarStatus() {
    const cpfInput = document.getElementById('cpf-input');
    const cpf = cpfInput.value.trim();

    if (!cpf) return;

    addMessage(`Consultando CPF: ${cpf}`, 'user');

    // ⬇️ Mostra bolhas de digitação animadas
    const typingIndicator = addTypingIndicator();

    cpfInput.value = '';

    try {
        const response = await fetch('http://127.0.0.1:5000/api/status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cpf: cpf })
        });

        if (!response.ok) throw new Error('Erro ao consultar');

        const data = await response.json();

        // ⬇️ Remove o "digitando..." e mostra a resposta com delay
        setTimeout(() => {
            typingIndicator.remove();
            addMessage(`Status: ${data.status}\nPrevisão: ${data.previsao}`, 'bot');
        }, 1000);

    } catch (error) {
        setTimeout(() => {
            typingIndicator.remove();
            addMessage('Erro ao consultar o status. Tente novamente.', 'bot');
        }, 1000);
    }
}

function addMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender;
    chatBox.appendChild(messageDiv);

    if (sender === 'bot') {
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < text.length) {
                messageDiv.textContent += text.charAt(index);
                index++;
                chatBox.scrollTop = chatBox.scrollHeight;
            } else {
                clearInterval(typingInterval);
            }
        }, 30);
    } else {
        messageDiv.textContent = text;
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}


window.onload = () => {
    showQuickReplies();
};

function showQuickReplies() {
    const chatBox = document.getElementById('chat-box');

    const options = [
        { text: 'Consultar status da sua solicitação', action: 'consultarProtocolo' },
        { text: 'Mostrar solicitações em aberto', action: 'mostrarAbertos' },
        { text: 'Falar com atendente', action: 'falarAtendente' }
    ];

    const quickRepliesDiv = document.createElement('div');
    quickRepliesDiv.className = 'quick-replies';

    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option.text;
        button.onclick = () => handleQuickReply(option.action);
        quickRepliesDiv.appendChild(button);
    });

    chatBox.appendChild(quickRepliesDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleQuickReply(action) {
    const quickRepliesDiv = document.querySelector('.quick-replies');
    if (quickRepliesDiv) quickRepliesDiv.remove();

    switch (action) {
        case 'consultarProtocolo':
            addMessage('Por favor, informe o número do protocolo da solicitação:', 'bot');
            break;
        case 'mostrarAbertos':
            addMessage('Buscando solicitações em aberto...', 'bot');
            // Aqui você depois chamaria a API real
            setTimeout(() => {
                addMessage('Solicitações em aberto:\n- Protocolo 123456\n- Protocolo 789012', 'bot');
            }, 1000);
            break;
        case 'falarAtendente':
            addMessage('Redirecionando para um atendente...', 'bot');
            break;
    }
}


// ➡️ Função para criar o "digitando..." animado com bolinhas
function addTypingIndicator() {
    const chatBox = document.getElementById('chat-box');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bot typing-indicator';

    typingDiv.innerHTML = `
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    `;

    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    return typingDiv;
}

// Botão flutuante para abrir/fechar o chat
const toggleButton = document.getElementById('toggle-chat');
const chatContainer = document.querySelector('.chat-container');

toggleButton.addEventListener('click', () => {
    chatContainer.classList.toggle('chat-hidden');
});

//limpar chat
function limparChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = '';
    showQuickReplies(); // Exibe novamente as opções rápidas
}

