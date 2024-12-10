// Aguardar o carregamento completo da página antes de executar o código
document.addEventListener("DOMContentLoaded", function() {
    // Função para carregar sugestões do backend
    fetch('http://localhost:3000/api/sugestoes')
        .then(response => {
            // Verifica se a resposta foi bem sucedida
            if (!response.ok) {
                throw new Error('Falha na comunicação com o servidor');
            }
            return response.json(); // Converte a resposta em JSON
        })
        .then(data => {
            const tbody = document.querySelector('#sugestoes tbody');  // Seleciona o corpo da tabela
            data.forEach(sugestao => {
                // Cria uma nova linha para cada sugestão
                const tr = document.createElement('tr');
                tr.setAttribute('data-id', sugestao._id);  // Adicionando o ID na linha da tabela
                tr.innerHTML = `
                    <td>${sugestao.nome}</td>
                    <td>${sugestao.bairro}</td>
                    <td>${sugestao.rua}</td>
                    <td>${sugestao.residuo}</td>
                    <td>${sugestao.observacao || 'Nenhuma observação'}</td>
                    <td>
                        <button class="btn" onclick="deletarSugestao('${sugestao._id}')">Deletar</button>
                    </td>
                `;
                tbody.appendChild(tr); // Adiciona a linha na tabela
            });
        })
        .catch(error => {
            console.error('Erro ao carregar sugestões:', error);
            alert('Não foi possível carregar as sugestões. Tente novamente mais tarde.');
        });
});

document.addEventListener("DOMContentLoaded", function () {
    const loginModal = document.getElementById("loginModal");
    const loginForm = document.getElementById("loginForm");
    const loginError = document.getElementById("loginError");

    // Mostrar o modal de login
    loginModal.style.display = "flex";

    // Evento de submissão do formulário de login
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Fazer requisição ao backend para validar credenciais
        fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
            .then(response => {
                if (!response.ok) throw new Error("Credenciais inválidas");
                return response.json();
            })
            .then(() => {
                loginModal.style.display = "none"; // Esconde o modal se login for bem-sucedido
            })
            .catch(() => {
                loginError.style.display = "block"; // Mostra mensagem de erro
            });
    });
});

