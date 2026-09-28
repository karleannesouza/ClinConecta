const formularioExame = document.querySelector('#form-exame');
const campoExame = document.querySelector('#exame');
const buscaExame = document.querySelector('#exame-busca');
const comboboxExame = document.querySelector('[data-combobox-exame]');
const listaExames = document.querySelector('#lista-exames');
const botaoLimparExame = comboboxExame.querySelector('.combobox-limpar');
const botaoSetaExame = comboboxExame.querySelector('.combobox-seta');
const descricaoExame = document.querySelector('#descricao-exame');
const dataExame = document.querySelector('#data-exame');
const buscaData = document.querySelector('#data-exame-busca');
const comboboxData = document.querySelector('[data-combobox-data]');
const calendario = document.querySelector('#calendario-exame');
const diasCalendario = calendario.querySelector('[data-calendario-dias]');
const tituloCalendario = calendario.querySelector('[data-calendario-mes]');
const botaoSetaData = comboboxData.querySelector('.combobox-seta');
const botaoFecharData = calendario.querySelector('[data-calendario-fechar]');
const botaoConfirmarData = calendario.querySelector('[data-calendario-confirmar]');
const horarioSelecionado = document.querySelector('#horario');
const buscaHorario = document.querySelector('#horario-busca');
const comboboxHorario = document.querySelector('[data-combobox-horario]');
const listaHorarios = document.querySelector('#lista-horarios');
const botaoLimparHorario = comboboxHorario.querySelector('.combobox-limpar');
const botaoSetaHorario = comboboxHorario.querySelector('.combobox-seta');
const mensagemFormulario = document.querySelector('#mensagem-formulario');

// Dados fictícios: cada exame tem sua grade de horários e os horários já ocupados.
const exames = [
    {
        valor: 'eletrocardiograma',
        nome: 'Eletrocardiograma',
        descricao: 'Registra a atividade elétrica do coração para avaliar ritmo e frequência cardíaca.',
        preparo: 'Não é necessário jejum. Evite cremes ou óleos no peito no dia do exame.',
        horarios: ['08:00', '09:00', '10:00', '13:30', '15:00', '16:30'],
        ocupados: ['09:00', '15:00']
    },
    {
        valor: 'hemograma-completo',
        nome: 'Hemograma Completo',
        descricao: 'Exame de sangue que avalia glóbulos vermelhos, glóbulos brancos e plaquetas.',
        preparo: 'Jejum de 4 horas. Beba água normalmente.',
        horarios: ['07:00', '07:30', '08:00', '08:30', '09:00', '10:00'],
        ocupados: ['07:30', '08:30']
    },
    {
        valor: 'ultrassonografia',
        nome: 'Ultrassonografia',
        descricao: 'Exame de imagem que usa ondas sonoras para avaliar órgãos internos.',
        preparo: 'Jejum de 8 horas. Para abdome total, beba 1 litro de água 1 hora antes e não urine.',
        horarios: ['08:00', '09:30', '11:00', '14:00', '15:30', '17:00'],
        ocupados: ['11:00', '14:00']
    }
];

// A clínica não atende aos domingos (0 = domingo em Date.getDay()).
const diasSemAtendimento = [0];
const chaveAgendamentos = 'clinconecta_agendamentos';
let mesCalendario = new Date();
let dataTemporaria = '';

function lerAgendamentos() {
    try {
        const agendamentos = JSON.parse(localStorage.getItem(chaveAgendamentos) || '[]');
        return Array.isArray(agendamentos) ? agendamentos : [];
    } catch {
        return [];
    }
}

function buscarExame(valor) {
    return exames.find((exame) => exame.valor === valor);
}

function formatarData(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

function formatarDataExibicao(valor) {
    const [ano, mes, dia] = valor.split('-');
    return `${dia}/${mes}/${ano}`;
}

// Retorna somente os horários livres: remove ocupados, já agendados e horários passados de hoje.
function obterHorariosDisponiveis(valorExame, data) {
    const exame = buscarExame(valorExame);

    if (!exame || !data) {
        return [];
    }

    const agendados = lerAgendamentos()
        .filter((agendamento) => agendamento.exame === valorExame && agendamento.data === data)
        .map((agendamento) => agendamento.horario);
    const ehHoje = data === formatarData(new Date());
    const agora = new Date();
    const minutosAtuais = agora.getHours() * 60 + agora.getMinutes();

    return exame.horarios.filter((horario) => {
        const [hora, minuto] = horario.split(':').map(Number);
        const horarioPassado = ehHoje && hora * 60 + minuto <= minutosAtuais;
        return !horarioPassado && !exame.ocupados.includes(horario) && !agendados.includes(horario);
    });
}

function marcarCampo(input, invalido) {
    input.closest('.campo-formulario').classList.toggle('campo-invalido', invalido);
    input.setAttribute('aria-invalid', String(invalido));
}

function ocultarMensagem() {
    mensagemFormulario.hidden = true;
}

/* ===== Exame ===== */

function abrirListaExames() {
    listaExames.hidden = false;
    buscaExame.setAttribute('aria-expanded', 'true');
    botaoSetaExame.setAttribute('aria-expanded', 'true');
}

function fecharListaExames() {
    listaExames.hidden = true;
    buscaExame.setAttribute('aria-expanded', 'false');
    botaoSetaExame.setAttribute('aria-expanded', 'false');
}

function renderizarExames() {
    listaExames.innerHTML = exames.map((exame) => `
        <button class="opcao-combobox" type="button" role="option" data-exame="${exame.valor}" aria-selected="${exame.valor === campoExame.value}">
            <strong>${exame.nome}</strong>
            <span>${exame.descricao}</span>
        </button>
    `).join('');
}

function mostrarDescricao(exame) {
    descricaoExame.querySelector('[data-descricao-nome]').textContent = exame.nome;
    descricaoExame.querySelector('[data-descricao-texto]').textContent = exame.descricao;
    descricaoExame.querySelector('[data-descricao-preparo]').textContent = exame.preparo;
    descricaoExame.hidden = false;
}

function selecionarExame(exame) {
    const exameAlterado = campoExame.value !== exame.valor;

    campoExame.value = exame.valor;
    buscaExame.value = exame.nome;
    botaoLimparExame.hidden = false;
    marcarCampo(buscaExame, false);
    ocultarMensagem();
    mostrarDescricao(exame);
    fecharListaExames();

    // Horários dependem do exame: ao trocar de exame, recarrega a lista para a data escolhida.
    if (exameAlterado) {
        limparHorario();
    }

    habilitarData();
}

function limparExame() {
    campoExame.value = '';
    buscaExame.value = '';
    botaoLimparExame.hidden = true;
    descricaoExame.hidden = true;
    limparData();
    renderizarExames();
    abrirListaExames();
}

/* ===== Data ===== */

function habilitarData() {
    buscaData.disabled = false;
    botaoSetaData.disabled = false;
    buscaData.placeholder = 'Selecione uma data';
    comboboxData.classList.remove('combobox-desabilitado');

    if (dataExame.value) {
        habilitarHorarios();
    }
}

function limparData() {
    dataExame.value = '';
    buscaData.value = '';
    buscaData.placeholder = 'Selecione um exame primeiro';
    buscaData.disabled = !campoExame.value;
    botaoSetaData.disabled = !campoExame.value;
    comboboxData.classList.toggle('combobox-desabilitado', !campoExame.value);
    fecharCalendario();
    limparHorario();
}

function renderizarCalendario() {
    const ano = mesCalendario.getFullYear();
    const mes = mesCalendario.getMonth();
    const dataMinima = formatarData(new Date());
    const primeiroDia = new Date(ano, mes, 1).getDay();
    const quantidadeDias = new Date(ano, mes + 1, 0).getDate();
    const nomeMes = mesCalendario.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

    tituloCalendario.textContent = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);
    diasCalendario.innerHTML = '';

    for (let indice = 0; indice < primeiroDia; indice += 1) {
        diasCalendario.insertAdjacentHTML('beforeend', '<span class="calendario-dia-vazio" aria-hidden="true"></span>');
    }

    for (let dia = 1; dia <= quantidadeDias; dia += 1) {
        const data = new Date(ano, mes, dia);
        const valor = formatarData(data);
        const indisponivel = valor < dataMinima || diasSemAtendimento.includes(data.getDay());
        const selecionado = valor === dataTemporaria ? ' dia-selecionado' : '';
        const estadoIndisponivel = indisponivel ? ' dia-indisponivel' : '';
        const atributoDesabilitado = indisponivel ? ' disabled' : '';
        diasCalendario.insertAdjacentHTML('beforeend', `
            <button class="calendario-dia${selecionado}${estadoIndisponivel}" type="button" data-data="${valor}"${atributoDesabilitado}>${dia}</button>
        `);
    }

    botaoConfirmarData.disabled = !dataTemporaria;
}

function abrirCalendario() {
    if (buscaData.disabled) {
        return;
    }

    dataTemporaria = dataExame.value || '';
    if (dataTemporaria) {
        const [ano, mes] = dataTemporaria.split('-');
        mesCalendario = new Date(Number(ano), Number(mes) - 1, 1);
    }
    renderizarCalendario();
    calendario.hidden = false;
    buscaData.setAttribute('aria-expanded', 'true');
    botaoSetaData.setAttribute('aria-expanded', 'true');
}

function fecharCalendario() {
    calendario.hidden = true;
    buscaData.setAttribute('aria-expanded', 'false');
    botaoSetaData.setAttribute('aria-expanded', 'false');
}

function confirmarData() {
    dataExame.value = dataTemporaria;
    buscaData.value = formatarDataExibicao(dataTemporaria);
    marcarCampo(buscaData, false);
    ocultarMensagem();
    limparHorario();
    habilitarHorarios();
    fecharCalendario();
}

/* ===== Horário ===== */

function abrirListaHorarios() {
    listaHorarios.hidden = false;
    buscaHorario.setAttribute('aria-expanded', 'true');
    botaoSetaHorario.setAttribute('aria-expanded', 'true');
}

function fecharListaHorarios() {
    listaHorarios.hidden = true;
    buscaHorario.setAttribute('aria-expanded', 'false');
    botaoSetaHorario.setAttribute('aria-expanded', 'false');
}

function renderizarHorarios() {
    const disponiveis = obterHorariosDisponiveis(campoExame.value, dataExame.value);

    listaHorarios.innerHTML = disponiveis.length
        ? disponiveis.map((horario) => `
            <button class="opcao-combobox" type="button" role="option" data-horario="${horario}" aria-selected="${horario === horarioSelecionado.value}">
                <strong>${horario}</strong>
                <span>Horário disponível</span>
            </button>
        `).join('')
        : '<span class="combobox-vazio">Nenhum horário disponível nesta data. Escolha outra data.</span>';
}

function habilitarHorarios() {
    buscaHorario.disabled = false;
    botaoSetaHorario.disabled = false;
    buscaHorario.placeholder = 'Selecione um horário';
    comboboxHorario.classList.remove('combobox-desabilitado');
    renderizarHorarios();
}

function selecionarHorario(horario) {
    horarioSelecionado.value = horario;
    buscaHorario.value = horario;
    botaoLimparHorario.hidden = false;
    marcarCampo(buscaHorario, false);
    ocultarMensagem();
    fecharListaHorarios();
}

function limparHorario() {
    const semData = !dataExame.value;

    horarioSelecionado.value = '';
    buscaHorario.value = '';
    buscaHorario.placeholder = semData ? 'Selecione uma data primeiro' : 'Selecione um horário';
    buscaHorario.disabled = semData;
    botaoSetaHorario.disabled = semData;
    comboboxHorario.classList.toggle('combobox-desabilitado', semData);
    botaoLimparHorario.hidden = true;
    fecharListaHorarios();
}

/* ===== Eventos ===== */

renderizarExames();

buscaExame.addEventListener('click', () => {
    renderizarExames();
    abrirListaExames();
});

botaoSetaExame.addEventListener('click', () => {
    if (listaExames.hidden) {
        renderizarExames();
        buscaExame.focus();
        abrirListaExames();
    } else {
        fecharListaExames();
    }
});

botaoLimparExame.addEventListener('click', limparExame);

listaExames.addEventListener('click', (evento) => {
    const opcao = evento.target.closest('[data-exame]');

    if (opcao) {
        selecionarExame(buscarExame(opcao.dataset.exame));
    }
});

buscaData.addEventListener('click', abrirCalendario);

botaoSetaData.addEventListener('click', () => {
    if (calendario.hidden) {
        abrirCalendario();
    } else {
        fecharCalendario();
    }
});

calendario.addEventListener('click', (evento) => {
    evento.stopPropagation();
    const dia = evento.target.closest('[data-data]');

    if (dia) {
        evento.preventDefault();
        dataTemporaria = dia.dataset.data;
        renderizarCalendario();
        return;
    }

    if (evento.target.closest('[data-mes-anterior]')) {
        mesCalendario.setMonth(mesCalendario.getMonth() - 1);
        renderizarCalendario();
    }

    if (evento.target.closest('[data-mes-proximo]')) {
        mesCalendario.setMonth(mesCalendario.getMonth() + 1);
        renderizarCalendario();
    }
});

botaoFecharData.addEventListener('click', () => {
    dataTemporaria = dataExame.value;
    fecharCalendario();
});

botaoConfirmarData.addEventListener('click', confirmarData);

buscaHorario.addEventListener('click', () => {
    renderizarHorarios();
    abrirListaHorarios();
});

botaoSetaHorario.addEventListener('click', () => {
    if (listaHorarios.hidden) {
        renderizarHorarios();
        buscaHorario.focus();
        abrirListaHorarios();
    } else {
        fecharListaHorarios();
    }
});

botaoLimparHorario.addEventListener('click', limparHorario);

listaHorarios.addEventListener('click', (evento) => {
    const opcao = evento.target.closest('[data-horario]');

    if (opcao) {
        selecionarHorario(opcao.dataset.horario);
    }
});

document.addEventListener('click', (evento) => {
    if (!comboboxExame.contains(evento.target)) {
        fecharListaExames();
    }

    if (!comboboxData.contains(evento.target)) {
        fecharCalendario();
    }

    if (!comboboxHorario.contains(evento.target)) {
        fecharListaHorarios();
    }
});

formularioExame.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const camposObrigatorios = [
        { nome: 'Exame', valor: campoExame.value, input: buscaExame },
        { nome: 'Data', valor: dataExame.value, input: buscaData },
        { nome: 'Horário', valor: horarioSelecionado.value, input: buscaHorario }
    ];
    const faltando = camposObrigatorios.filter((campo) => !campo.valor);

    camposObrigatorios.forEach((campo) => marcarCampo(campo.input, !campo.valor));

    if (faltando.length) {
        mensagemFormulario.textContent = `Preencha os campos obrigatórios: ${faltando.map((campo) => campo.nome).join(', ')}.`;
        mensagemFormulario.hidden = false;
        return;
    }
});
