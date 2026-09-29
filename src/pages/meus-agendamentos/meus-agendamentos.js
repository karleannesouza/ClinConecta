(() => {
    'use strict';

    // Dados de demonstração com proprietários fixos. Não são gravados no navegador.
    // Paciente sem registros para teste: 111.444.777-35.
    const agendamentosFicticios = [
        {
            id: 'consulta-001',
            pacienteCpf: '52998224725',
            tipo: 'consulta',
            especialidade: 'clinico-geral',
            nomeEspecialidade: 'Clínico geral',
            profissional: 'marcos-silva',
            nomeProfissional: 'Dr. Marcos Silva',
            data: '2026-12-10',
            horario: '14:30',
            status: 'marcado'
        },
        {
            id: 'exame-001',
            pacienteCpf: '52998224725',
            tipo: 'exame',
            exame: 'hemograma',
            nomeExame: 'Hemograma',
            profissional: null,
            nomeProfissional: null,
            data: '2026-10-05',
            horario: '08:00',
            status: 'cancelado'
        },
        {
            id: 'consulta-002',
            pacienteCpf: '52998224725',
            tipo: 'consulta',
            especialidade: 'cardiologia',
            nomeEspecialidade: 'Cardiologia',
            profissional: 'rafael-mendes',
            nomeProfissional: 'Dr. Rafael Mendes',
            data: '2026-10-05',
            horario: '10:30',
            status: 'marcado'
        },
        {
            id: 'exame-002',
            pacienteCpf: '16899535009',
            tipo: 'exame',
            exame: 'ultrassonografia',
            nomeExame: 'Ultrassonografia',
            profissional: null,
            nomeProfissional: null,
            data: '2026-11-12',
            horario: '09:00',
            status: 'marcado'
        }
    ];

    const lista = document.getElementById('lista-agendamentos');
    const estadoVazio = document.getElementById('estado-vazio');
    const modelo = document.getElementById('modelo-agendamento');

    if (!lista || !estadoVazio || !modelo || !modelo.content) {
        return;
    }

    const mensagem = estadoVazio.querySelector('p');
    if (!mensagem) {
        return;
    }

    function normalizarCpf(valor) {
        if (typeof valor !== 'string' || !/^[\d.\-\s]+$/.test(valor)) {
            return null;
        }

        const cpf = valor.replace(/\D/g, '');
        return /^\d{11}$/.test(cpf) && !/^(\d)\1{10}$/.test(cpf) ? cpf : null;
    }

    function lerPacienteAtual() {
        // Este cadastro identifica apenas o paciente da simulação, não uma sessão real.
        const texto = localStorage.getItem('clinconecta.paciente');
        if (texto === null) {
            return null;
        }

        const paciente = JSON.parse(texto);
        if (!paciente || typeof paciente !== 'object' || Array.isArray(paciente)) {
            return null;
        }

        return normalizarCpf(paciente.cpf);
    }

    function obterAgendamentos() {
        // Ponto de integração futura: substituir a fonte após acordar o contrato.
        // Os registros atuais de clinconecta_agendamentos não têm proprietário.
        return agendamentosFicticios;
    }

    function textoValido(valor) {
        return typeof valor === 'string' && valor.trim().length > 0;
    }

    function dataValida(valor) {
        if (typeof valor !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
            return false;
        }

        const [ano, mes, dia] = valor.split('-').map(Number);
        const bissexto = ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0);
        const diasPorMes = [31, bissexto ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return ano > 0 && mes >= 1 && mes <= 12 && dia >= 1 && dia <= diasPorMes[mes - 1];
    }

    function registroValido(registro) {
        if (!registro || typeof registro !== 'object' || Array.isArray(registro)) {
            return false;
        }

        const servicoValido = registro.tipo === 'consulta'
            ? textoValido(registro.nomeEspecialidade)
            : registro.tipo === 'exame' && textoValido(registro.nomeExame);
        const profissionalValido = registro.nomeProfissional == null
            || textoValido(registro.nomeProfissional);

        return textoValido(registro.id)
            && normalizarCpf(registro.pacienteCpf) !== null
            && servicoValido
            && profissionalValido
            && dataValida(registro.data)
            && typeof registro.horario === 'string'
            && /^([01]\d|2[0-3]):[0-5]\d$/.test(registro.horario)
            && ['marcado', 'cancelado'].includes(registro.status);
    }

    function selecionarAgendamentos(registros, cpf) {
        if (!Array.isArray(registros)) {
            throw new Error('Fonte de agendamentos inválida.');
        }

        return registros
            .filter((registro) => registroValido(registro)
                && normalizarCpf(registro.pacienteCpf) === cpf)
            .sort((primeiro, segundo) => {
                const inicioPrimeiro = primeiro.data + 'T' + primeiro.horario;
                const inicioSegundo = segundo.data + 'T' + segundo.horario;
                return inicioPrimeiro < inicioSegundo ? -1 : inicioPrimeiro > inicioSegundo ? 1 : 0;
            });
    }

    function exibirMensagem(texto) {
        lista.replaceChildren();
        lista.hidden = true;
        mensagem.textContent = texto;
        estadoVazio.hidden = false;
    }

    function renderizarAgendamentos(registros) {
        if (registros.length === 0) {
            exibirMensagem('Você ainda não possui agendamentos.');
            return;
        }

        const fragmento = document.createDocumentFragment();

        registros.forEach((registro) => {
            const item = modelo.content.cloneNode(true);
            const campo = (nome) => item.querySelector('[data-campo="' + nome + '"]');
            campo('servico').textContent = registro.tipo === 'consulta'
                ? registro.nomeEspecialidade : registro.nomeExame;
            campo('tipo').textContent = registro.tipo === 'consulta' ? 'Consulta' : 'Exame';
            campo('profissional').textContent = registro.nomeProfissional || '';
            item.querySelector('[data-grupo="profissional"]').hidden = !registro.nomeProfissional;

            // Formatação textual: não converte a data para UTC nem altera o dia.
            const [ano, mes, dia] = registro.data.split('-');
            campo('data').textContent = dia + '/' + mes + '/' + ano;
            campo('data').setAttribute('datetime', registro.data);
            campo('horario').textContent = registro.horario;
            campo('horario').setAttribute('datetime', registro.horario);
            campo('status').textContent = registro.status === 'marcado' ? 'Marcado' : 'Cancelado';

            fragmento.appendChild(item);
        });

        lista.replaceChildren(fragmento);
        estadoVazio.hidden = true;
        lista.hidden = false;
    }

    try {
        const cpf = lerPacienteAtual();
        if (!cpf) {
            exibirMensagem('Identifique o paciente pelo cadastro para visualizar seus agendamentos.');
            return;
        }

        renderizarAgendamentos(selecionarAgendamentos(obterAgendamentos(), cpf));
    } catch {
        exibirMensagem('Não foi possível carregar os agendamentos. Tente novamente mais tarde.');
    }
})();
