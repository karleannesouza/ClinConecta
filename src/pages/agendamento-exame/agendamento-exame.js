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

// Dados fictícios dos exames oferecidos pela clínica.
const exames = [
    {
        valor: 'eletrocardiograma',
        nome: 'Eletrocardiograma',
        descricao: 'Registra a atividade elétrica do coração para avaliar ritmo e frequência cardíaca.',
        preparo: 'Não é necessário jejum. Evite cremes ou óleos no peito no dia do exame.'
    },
    {
        valor: 'hemograma-completo',
        nome: 'Hemograma Completo',
        descricao: 'Exame de sangue que avalia glóbulos vermelhos, glóbulos brancos e plaquetas.',
        preparo: 'Jejum de 4 horas. Beba água normalmente.'
    },
    {
        valor: 'ultrassonografia',
        nome: 'Ultrassonografia',
        descricao: 'Exame de imagem que usa ondas sonoras para avaliar órgãos internos.',
        preparo: 'Jejum de 8 horas. Para abdome total, beba 1 litro de água 1 hora antes e não urine.'
    }
];

// A clínica não atende aos domingos (0 = domingo em Date.getDay()).
const diasSemAtendimento = [0];
let mesCalendario = new Date();
let dataTemporaria = '';

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
    campoExame.value = exame.valor;
    buscaExame.value = exame.nome;
    botaoLimparExame.hidden = false;
    mostrarDescricao(exame);
    fecharListaExames();

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
}

function limparData() {
    dataExame.value = '';
    buscaData.value = '';
    buscaData.placeholder = 'Selecione um exame primeiro';
    buscaData.disabled = !campoExame.value;
    botaoSetaData.disabled = !campoExame.value;
    comboboxData.classList.toggle('combobox-desabilitado', !campoExame.value);
    fecharCalendario();
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
    fecharCalendario();
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

document.addEventListener('click', (evento) => {
    if (!comboboxExame.contains(evento.target)) {
        fecharListaExames();
    }

    if (!comboboxData.contains(evento.target)) {
        fecharCalendario();
    }
});
