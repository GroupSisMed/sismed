// data/rotina-data.js
const rotinaData = {
    rotinas: [],
    unidades: [
        { id: 1, nome: "UPA Centro" },
        { id: 2, nome: "UPA Zona Norte" },
        { id: 3, nome: "Hospital Municipal" },
        { id: 4, nome: "Clínica da Família" }
    ],
    usuarioAtual: null,
    config: {
        tema: "claro",
        notificacoes: true,
        autoSalvar: true
    }
};

// Inicializar com dados salvos
function inicializarDados() {
    const dadosSalvos = localStorage.getItem('sismedRotinaData');
    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);
        rotinaData.rotinas = dados.rotinas || [];
        rotinaData.unidades = dados.unidades || rotinaData.unidades;
        rotinaData.config = dados.config || rotinaData.config;
    }
}

// Salvar dados
function salvarDados() {
    localStorage.setItem('sismedRotinaData', JSON.stringify(rotinaData));
}

// Inicializar ao carregar
document.addEventListener('DOMContentLoaded', inicializarDados);