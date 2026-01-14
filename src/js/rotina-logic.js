// src/js/rotina-logic.js - Atualizado para nova estrutura

// Funções da Rotina (compatíveis com a nova estrutura)
function carregarRotinas() {
    // Esta função agora é implementada diretamente no rotina.html
    console.log('Carregando rotinas...');
}

function salvarRotina() {
    // Esta função agora é implementada diretamente no rotina.html
    console.log('Salvando rotina...');
}

// Funções de exportação
function exportarRotinasParaCSV() {
    const rotinas = JSON.parse(localStorage.getItem('sismed_rotinas') || '[]');
    
    if (rotinas.length === 0) {
        utils.mostrarAlerta('Nenhuma rotina para exportar', 'warning');
        return;
    }
    
    // Criar CSV
    let csv = 'Data,Paciente,Prontuário,Medicação,Status,Usuário\n';
    
    rotinas.forEach(rotina => {
        const linha = [
            rotina.data,
            `"${rotina.paciente}"`,
            rotina.prontuario || '',
            `"${rotina.medicacao.replace(/"/g, '""')}"`,
            rotina.status,
            rotina.usuario
        ].join(',');
        
        csv += linha + '\n';
    });
    
    // Criar e baixar arquivo
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `rotinas_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    utils.mostrarAlerta('Rotinas exportadas com sucesso!', 'success');
}

function exportarRotinasParaPDF() {
    utils.mostrarAlerta('Exportação PDF em desenvolvimento', 'info');
}

// Funções de busca
function buscarPacientes(termo) {
    const rotinas = JSON.parse(localStorage.getItem('sismed_rotinas') || '[]');
    
    if (!termo) {
        return rotinas;
    }
    
    termo = termo.toLowerCase();
    return rotinas.filter(rotina => 
        rotina.paciente.toLowerCase().includes(termo) ||
        rotina.prontuario?.toLowerCase().includes(termo) ||
        rotina.medicacao.toLowerCase().includes(termo)
    );
}

// Funções de backup
function fazerBackupRotinas() {
    const rotinas = JSON.parse(localStorage.getItem('sismed_rotinas') || '[]');
    const backup = {
        data: new Date().toISOString(),
        total: rotinas.length,
        rotinas: rotinas
    };
    
    localStorage.setItem('sismed_backup', JSON.stringify(backup));
    utils.mostrarAlerta(`Backup realizado com sucesso! ${rotinas.length} rotinas salvas.`, 'success');
}

function restaurarBackupRotinas() {
    const backup = localStorage.getItem('sismed_backup');
    
    if (!backup) {
        utils.mostrarAlerta('Nenhum backup encontrado', 'error');
        return;
    }
    
    if (confirm('Deseja restaurar o último backup? Isso substituirá as rotinas atuais.')) {
        const dados = JSON.parse(backup);
        localStorage.setItem('sismed_rotinas', JSON.stringify(dados.rotinas));
        utils.mostrarAlerta(`Backup restaurado! ${dados.total} rotinas carregadas.`, 'success');
        
        // Recarregar a página
        setTimeout(() => location.reload(), 1000);
    }
}

// Funções de limpeza
function limparRotinasAntigas() {
    const hoje = new Date();
    const umMesAtras = new Date(hoje.setMonth(hoje.getMonth() - 1)).toISOString().split('T')[0];
    
    let rotinas = JSON.parse(localStorage.getItem('sismed_rotinas') || '[]');
    const totalAntes = rotinas.length;
    
    // Manter apenas rotinas dos últimos 30 dias
    rotinas = rotinas.filter(r => r.data >= umMesAtras);
    
    localStorage.setItem('sismed_rotinas', JSON.stringify(rotinas));
    
    const removidas = totalAntes - rotinas.length;
    utils.mostrarAlerta(`${removidas} rotinas antigas foram removidas.`, 'success');
}

// Exportar funções para uso global
window.rotina = {
    exportarRotinasParaCSV,
    exportarRotinasParaPDF,
    buscarPacientes,
    fazerBackupRotinas,
    restaurarBackupRotinas,
    limparRotinasAntigas
};