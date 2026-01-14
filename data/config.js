// data/config.js
const configSistema = {
    nome: "SismEd - Sistema de Prescrição Médica",
    versao: "1.0.0",
    desenvolvedor: "Equipe SismEd",
    ano: new Date().getFullYear(),
    
    // Configurações da API (se houver)
    api: {
        url: "https://api.sismed.example.com",
        timeout: 30000
    },
    
    // Configurações de segurança
    seguranca: {
        tempoSessao: 3600, // 1 hora em segundos
        tentativasLogin: 3,
        bloqueioTemporario: 300 // 5 minutos em segundos
    },
    
    // Configurações de exportação
    exportacao: {
        formatos: ["pdf", "csv", "txt"],
        nomeArquivoPadrao: "rotina-medica"
    }
};

// Configurações específicas da rotina
const configRotina = {
    camposObrigatorios: ["paciente", "medicacao"],
    limiteCaracteres: {
        paciente: 100,
        medicacao: 1000,
        observacoes: 500
    },
    notificacoes: {
        sucesso: true,
        erro: true,
        lembrete: true
    }
};