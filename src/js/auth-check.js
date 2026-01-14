// src/js/auth-check.js
// Sistema de verificação de autenticação

/**
 * Verifica se o usuário está autenticado
 * @returns {Object|false} Dados do usuário ou false se não autenticado
 */
function verificarAutenticacao() {
    console.log('🔐 Verificando autenticação...');
    
    // Tentar obter dados do usuário de ambos os storages
    const usuarioSalvo = localStorage.getItem('sismed_usuario') || 
                        sessionStorage.getItem('sismed_usuario');
    
    console.log('📦 Dados encontrados:', usuarioSalvo ? 'Sim' : 'Não');
    
    if (!usuarioSalvo) {
        console.log('❌ Usuário não autenticado');
        redirecionarParaLogin();
        return false;
    }
    
    try {
        // Tentar parsear os dados
        const usuario = JSON.parse(usuarioSalvo);
        
        console.log('👤 Usuário:', usuario.nome || usuario.usuario);
        
        // Verificar estrutura mínima
        if (!usuario || !usuario.usuario) {
            console.log('❌ Estrutura de usuário inválida');
            limparSessao();
            redirecionarParaLogin();
            return false;
        }
        
        // Verificar expiração da sessão (opcional - 8 horas)
        if (usuario.dataLogin) {
            const loginTime = new Date(usuario.dataLogin);
            const now = new Date();
            const diffHoras = (now - loginTime) / (1000 * 60 * 60);
            
            console.log(`⏰ Sessão ativa há: ${diffHoras.toFixed(2)} horas`);
            
            if (diffHoras > 8) {
                console.log('⏰ Sessão expirada');
                limparSessao();
                redirecionarParaLogin('?session=expired');
                return false;
            }
        }
        
        console.log('✅ Usuário autenticado com sucesso');
        return usuario;
        
    } catch (error) {
        console.error('❌ Erro ao verificar autenticação:', error);
        limparSessao();
        redirecionarParaLogin('?error=invalid_session');
        return false;
    }
}

/**
 * Redireciona para a página de login
 * @param {string} params Parâmetros de query string
 */
function redirecionarParaLogin(params = '') {
    console.log('↪️ Redirecionando para login...');
    
    // Determinar o caminho correto baseado na localização atual
    const caminhoAtual = window.location.pathname;
    
    // Se estiver em uma subpasta (src/), voltar um nível
    if (caminhoAtual.includes('/src/')) {
        window.location.href = '../index.html' + params;
    } else {
        window.location.href = './index.html' + params;
    }
}

/**
 * Limpa todos os dados de sessão
 */
function limparSessao() {
    console.log('🧹 Limpando sessão...');
    localStorage.removeItem('sismed_usuario');
    sessionStorage.removeItem('sismed_usuario');
}

/**
 * Obtém informações do usuário atual
 * @returns {Object} Dados do usuário
 */
function getUsuarioAtual() {
    const usuarioSalvo = localStorage.getItem('sismed_usuario') || 
                        sessionStorage.getItem('sismed_usuario');
    
    if (usuarioSalvo) {
        try {
            return JSON.parse(usuarioSalvo);
        } catch (e) {
            return null;
        }
    }
    return null;
}

/**
 * Faz logout do sistema
 */
function logout() {
    if (confirm('Deseja realmente sair do sistema?')) {
        console.log('🚪 Fazendo logout...');
        limparSessao();
        redirecionarParaLogin('?logout=success');
    }
}

/**
 * Verifica permissões do usuário
 * @param {string} nivelRequerido Nível de permissão necessário
 * @returns {boolean} True se tiver permissão
 */
function temPermissao(nivelRequerido) {
    const usuario = getUsuarioAtual();
    
    if (!usuario) return false;
    
    // Níveis hierárquicos
    const niveis = {
        'admin': 3,
        'medico': 2,
        'enfermeiro': 1,
        'usuario': 0
    };
    
    const nivelUsuario = niveis[usuario.nivel] || 0;
    const nivelNecessario = niveis[nivelRequerido] || 0;
    
    return nivelUsuario >= nivelNecessario;
}

// Exportar funções para uso global
window.auth = {
    verificarAutenticacao,
    getUsuarioAtual,
    logout,
    temPermissao,
    limparSessao
};