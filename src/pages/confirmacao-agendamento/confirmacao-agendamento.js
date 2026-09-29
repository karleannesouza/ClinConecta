
    const exemplo = {
  tipo: 'Consulta',
  especialidade: 'Clínica Geral',
  profissional: 'Dr. João Santos',
  data: '19/09/2026',
  horario: '14:20'
};

let agendamento;

try {
  // Mantém a leitura dos dados que sua página já aceitava.
  agendamento = JSON.parse(
    sessionStorage.getItem('agendamentoConfirmado')
  );

  // O código do Rafa salva uma lista com esta chave.
  if (!agendamento) {
    const lista = JSON.parse(
      localStorage.getItem('clinconecta_agendamentos') || '[]'
    );

    if (Array.isArray(lista) && lista.length > 0) {
      const ultimo = lista[lista.length - 1];

      if (ultimo && typeof ultimo === 'object') {
        const data = String(ultimo.data || '');
        const partes = data.split('-');

        agendamento = {
          tipo: 'Consulta',
          especialidade: ultimo.nomeEspecialidade,
          profissional: ultimo.nomeProfissional,
          data: partes.length === 3
            ? `${partes[2]}/${partes[1]}/${partes[0]}`
            : data,
          horario: ultimo.horario
        };
      }
    }
  }
} catch (erro) {
  console.error('Não foi possível ler o agendamento:', erro);
}

if (!agendamento || typeof agendamento !== 'object' || Array.isArray(agendamento)) {
  agendamento = exemplo;
  document.querySelector('#demo').hidden = false;
}

for (const campo of Object.keys(exemplo)) {
  document.getElementById(campo).textContent =
    String(agendamento[campo] ?? 'Não informado');
}