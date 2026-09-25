
    const exemplo = {
      tipo: 'Consulta',
      especialidade: 'Clínica Geral',
      profissional: 'Dr. João Santos',
      data: '19/09/2026',
      horario: '14:20'
    };

    let agendamento;

    try {
      agendamento = JSON.parse(sessionStorage.getItem('agendamentoConfirmado'));
    } catch (_) {
      // Se não houver dados, a página mostra apenas a prévia.
    }

    if (!agendamento || typeof agendamento !== 'object' || Array.isArray(agendamento)) {
      agendamento = exemplo;
      document.querySelector('#demo').hidden = false;
    }

    for (const campo of Object.keys(exemplo)) {
      document.getElementById(campo).textContent =
        String(agendamento[campo] ?? 'Não informado');
    }