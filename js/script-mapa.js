// Inicializando o mapa Leaflet
// Configura o mapa centralizado em Cachoeira do Sul, RS, com um nível de zoom inicial de 13
var map = L.map('map').setView([-30.030573802795658, -52.89049383544385], 13);

// Adicionando camada de tiles ao mapa
// Define a base visual do mapa usando o OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors' // Atribuição para respeitar os termos do OpenStreetMap
}).addTo(map);

// Função para criar um popup com informações específicas
// Facilita a reutilização ao criar o conteúdo de popups
function criarPopup(nome, empresa, tipoResiduo, diasDescarte, link) {
    return `
        <div>
            <h3>${nome}</h3>
            <p><strong>Empresa Responsável:</strong> ${empresa}</p>
            <p><strong>Tipo de Resíduo:</strong> ${tipoResiduo}</p>
            <p><strong>Dias de Descarte:</strong> ${diasDescarte}</p>
            <a href="${link}" target="_blank">Mais informações</a>
        </div>
    `;
}

// Dados dos pontos de coleta
// Centraliza as informações em um array para facilitar adições e manutenções
const pontosDeColeta = [
    {
        coordenadas: [-30.010008809525285, -52.93962664962294],
        nome: 'UFSM',
        empresa: 'Universidade Federal de Santa Maria',
        tipoResiduo: 'Eletrônico',
        diasDescarte: 'Dias Úteis',
        link: 'https://www.ufsm.br/unidades-universitarias/cachoeira-do-sul'
    },
    {
        coordenadas: [-30.041729549417536, -52.896775561811694],
        nome: 'Droga Raia',
        empresa: 'SINIR',
        tipoResiduo: 'Pilhas',
        diasDescarte: 'Todos os dias',
        link: 'https://sinir.gov.br/'
    },
    {
        coordenadas: [-30.008524877782246, -52.89925600291824],
        nome: 'Wall-e Reciclagem',
        empresa: 'Wall-e',
        tipoResiduo: 'Tudo que vai na tomada',
        diasDescarte: 'Segunda à Sexta',
        link: 'https://www.facebook.com/walleresiduoseletronicos/'
    },
    {
        coordenadas: [-30.03835846902623, -52.898996329980875],
        nome: 'Lojas Certel',
        empresa: 'Reciclus',
        tipoResiduo: 'Lâmpadas fluorescentes',
        diasDescarte: 'Dias Úteis',
        link: 'http://www.lojascertel.com.br/'
    },
    {
        coordenadas: [-30.04119124815254, -52.897687531752936],
        nome: 'Imec Supermercados',
        empresa: 'Reciclus',
        tipoResiduo: 'Lâmpadas Fluorescentes e Pilhas',
        diasDescarte: 'Dias Úteis',
        link: 'https://www.superimec.com.br/'
    },
    {
        coordenadas: [-30.043275602973896, -52.895866547097896],
        nome: 'SINDILOJAS',
        empresa: 'Reciclus',
        tipoResiduo: 'Lâmpadas Fluorescentes',
        diasDescarte: 'Dias Úteis',
        link: 'http://www.sindilojas.com.br/'
    },
    {
        coordenadas: [-30.024262393426852, -52.90856846109955],
        nome: 'Desco Super&Atacado',
        empresa: 'Reciclus',
        tipoResiduo: 'Lâmpadas Fluorescentes',
        diasDescarte: 'Dias Úteis',
        link: 'https://www.desco.com.br/'
    },
    {
        coordenadas: [-30.037322903967507, -52.89850320477071],
        nome: 'Semana do descarte',
        empresa: 'Walle-e',
        tipoResiduo: 'Tudo que vai na tomada',
        diasDescarte: 'A definir pela prefeitura',
        link: 'https://www.cachoeiradosul.rs.gov.br/'
    }
];

// Adicionando marcadores com base nos dados
// Itera sobre os pontos de coleta e cria marcadores dinamicamente
pontosDeColeta.forEach(ponto => {
    L.marker(ponto.coordenadas).addTo(map)
        .bindPopup(criarPopup(
            ponto.nome,
            ponto.empresa,
            ponto.tipoResiduo,
            ponto.diasDescarte,
            ponto.link
        ));

});

// Referência ao elemento da lista de pontos
const listaPontos = document.getElementById('pontos-lista');

// Adicionando pontos à lista na aba lateral
pontosDeColeta.forEach((ponto, index) => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.textContent = ponto.nome;
    link.href = "#";
    link.addEventListener('click', () => {
        // Centraliza o mapa e abre o popup
        map.setView(ponto.coordenadas, 20); 
        const marcador = L.marker(ponto.coordenadas)
            .bindPopup(criarPopup(
                ponto.nome,
                ponto.empresa,
                ponto.tipoResiduo,
                ponto.diasDescarte,
                ponto.link
            )).addTo(map);
        marcador.openPopup(); // Abre o popup automaticamente
    });
    item.appendChild(link);
    listaPontos.appendChild(item);
});

document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.querySelector(".sidebar");
    const map = document.getElementById("map");
    const sidebarToggle = document.querySelector(".sidebar-toggle");

    // Alterna a visibilidade da barra lateral ao clicar no botão
    sidebarToggle.addEventListener("click", function() {
        const isSidebarOpen = sidebar.style.right === "0px";

        if (isSidebarOpen) {
            sidebar.style.right = "-25rem"; // Esconde a barra lateral
            sidebarToggle.classList.remove("open");
        } else {
            sidebar.style.right = "0"; // Exibe a barra lateral
            sidebarToggle.classList.add("open");
        }
    });
});
