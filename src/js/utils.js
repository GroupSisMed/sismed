// src/js/utils.js - Utilitários gerais

/**
 * Formata data para exibição
 */
function formatarData(dataString) {
    if (!dataString) return '';
    
    const data = new Date(dataString);
    if (isNaN(data)) return dataString;
    
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

/**
 * Formata data e hora
 */
function formatarDataHora(dataString) {
    if (!dataString) return '';
    
    const data = new Date(dataString);
    if (isNaN(data)) return dataString;
    
    return data.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Exibe mensagem de alerta
 */
function mostrarAlerta(mensagem, tipo = 'info') {
    // Remover alertas anteriores
    const alertasAntigos = document.querySelectorAll('.alert-temporario');
    alertasAntigos.forEach(alerta => alerta.remove());
    
    // Criar alerta
    const alerta = document.createElement('div');
    alerta.className = `alert-temporario alert-${tipo}`;
    alerta.innerHTML = `
        <i class="fas fa-${getIconeTipo(tipo)}"></i>
        <span>${mensagem}</span>
    `;
    
    // Estilos
    alerta.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    // Cores por tipo
    const cores = {
        success: { bg: '#d1fae5', color: '#065f46', border: '#10b981' },
        error: { bg: '#fee2e2', color: '#991b1b', border: '#ef4444' },
        warning: { bg: '#fef3c7', color: '#92400e', border: '#f59e0b' },
        info: { bg: '#dbeafe', color: '#1e40af', border: '#3b82f6' }
    };
    
    const cor = cores[tipo] || cores.info;
    alerta.style.background = cor.bg;
    alerta.style.color = cor.color;
    alerta.style.borderLeft = `4px solid ${cor.border}`;
    
    document.body.appendChild(alerta);
    
    // Remover após 5 segundos
    setTimeout(() => {
        alerta.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alerta.remove(), 300);
    }, 5000);
}

function getIconeTipo(tipo) {
    const icones = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icones[tipo] || 'info-circle';
}

// Adicionar estilos de animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Exportar funções
window.utils = {
    formatarData,
    formatarDataHora,
    mostrarAlerta
};