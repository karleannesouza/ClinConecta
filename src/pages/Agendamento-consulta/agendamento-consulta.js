const formularioEspecialidade = document.querySelector('#form-especialidade');
const campoEspecialidade = document.querySelector('#especialidade');
const buscaEspecialidade = document.querySelector('#especialidade-busca');
const comboboxEspecialidade = document.querySelector('[data-combobox]');
const listaEspecialidades = document.querySelector('#lista-especialidades');
const botaoLimpar = comboboxEspecialidade.querySelector('.combobox-limpar');
const botaoSeta = comboboxEspecialidade.querySelector('.combobox-seta');
const campoProfissional = document.querySelector('#profissional');
const buscaProfissional = document.querySelector('#profissional-busca');
const comboboxProfissional = document.querySelector('[data-combobox-profissional]');
const listaProfissionais = document.querySelector('#lista-profissionais');
const botaoLimparProfissional = comboboxProfissional.querySelector('.combobox-limpar');
const botaoSetaProfissional = comboboxProfissional.querySelector('.combobox-seta');
const dataConsulta = document.querySelector('#data-consulta');
const horarioSelecionado = document.querySelector('#horario');
const buscaHorario = document.querySelector('#horario-busca');
const comboboxHorario = document.querySelector('[data-combobox-horario]');
const listaHorarios = document.querySelector('#lista-horarios');
const botaoLimparHorario = comboboxHorario.querySelector('.combobox-limpar');
const botaoSetaHorario = comboboxHorario.querySelector('.combobox-seta');
const buscaData = document.querySelector('#data-consulta-busca');
const comboboxData = document.querySelector('[data-combobox-data]');
const calendario = document.querySelector('#calendario-consulta');
const diasCalendario = calendario.querySelector('[data-calendario-dias]');
const tituloCalendario = calendario.querySelector('[data-calendario-mes]');
const botaoSetaData = comboboxData.querySelector('.combobox-seta');
const botaoFecharData = calendario.querySelector('[data-calendario-fechar]');
const botaoConfirmarData = calendario.querySelector('[data-calendario-confirmar]');
const botaoContinuar = formularioEspecialidade.querySelector('button[type="submit"]');
const mensagemFormulario = document.querySelector('#mensagem-formulario');

const especialidades = [
    { valor: 'clinico-geral', nome: 'Clínico geral', descricao: 'Atendimento para cuidados gerais de saúde.' },
    { valor: 'cardiologia', nome: 'Cardiologia', descricao: 'Avaliação e acompanhamento do coração.' },
    { valor: 'pediatria', nome: 'Pediatria', descricao: 'Cuidados de saúde para crianças e adolescentes.' }
];

const profissionais = [
    { valor: 'marcos-silva', nome: 'Dr. Marcos Silva', especialidade: 'clinico-geral', registro: 'CRM 12841' },
    { valor: 'ana-costa', nome: 'Dra. Ana Costa', especialidade: 'clinico-geral', registro: 'CRM 19302' },
    { valor: 'rafael-mendes', nome: 'Dr. Rafael Mendes', especialidade: 'cardiologia', registro: 'CRM 15420' },
    { valor: 'juliana-alves', nome: 'Dra. Juliana Alves', especialidade: 'pediatria', registro: 'CRM 22107' }
];

const horariosDisponiveis = ['08:00', '09:30', '11:00', '14:00', '15:30', '17:00'];
let mesCalendario = new Date();
let dataTemporaria = '';

function abrirLista() {
    listaEspecialidades.hidden = false;
    buscaEspecialidade.setAttribute('aria-expanded', 'true');
    botaoSeta.setAttribute('aria-expanded', 'true');
}

function fecharLista() {
    listaEspecialidades.hidden = true;
    buscaEspecialidade.setAttribute('aria-expanded', 'false');
    botaoSeta.setAttribute('aria-expanded', 'false');
}

function renderizarEspecialidades(filtro = '') {
    const termo = filtro.trim().toLowerCase();
    const resultados = especialidades.filter((especialidade) =>
        `${especialidade.nome} ${especialidade.descricao}`.toLowerCase().includes(termo)
    );

    listaEspecialidades.innerHTML = resultados.length
        ? resultados.map((especialidade) => `
            <button class="opcao-combobox" type="button" role="option" data-valor="${especialidade.valor}">
                <strong>${especialidade.nome}</strong>
                <span>${especialidade.descricao}</span>
            </button>
        `).join('')
        : '<span class="combobox-vazio">Nenhuma especialidade encontrada.</span>';
}

function selecionarEspecialidade(especialidade) {
    campoEspecialidade.value = especialidade.valor;
    buscaEspecialidade.value = especialidade.nome;
    botaoLimpar.hidden = false;
    botaoContinuar.disabled = false;
    mensagemFormulario.hidden = true;
    limparProfissional();
    fecharLista();
}

function limparEspecialidade() {
    campoEspecialidade.value = '';
    buscaEspecialidade.value = '';
    botaoLimpar.hidden = true;
    botaoContinuar.disabled = true;
    renderizarEspecialidades();
    abrirLista();
    limparProfissional();
}

function abrirListaProfissionais() {
    listaProfissionais.hidden = false;
    buscaProfissional.setAttribute('aria-expanded', 'true');
    botaoSetaProfissional.setAttribute('aria-expanded', 'true');
}

function fecharListaProfissionais() {
    listaProfissionais.hidden = true;
    buscaProfissional.setAttribute('aria-expanded', 'false');
    botaoSetaProfissional.setAttribute('aria-expanded', 'false');
}

function renderizarProfissionais(filtro = '') {
    const termo = filtro.trim().toLowerCase();
    const resultados = profissionais.filter((profissional) =>
        profissional.especialidade === campoEspecialidade.value &&
        `${profissional.nome} ${profissional.registro}`.toLowerCase().includes(termo)
    );

    listaProfissionais.innerHTML = resultados.length
        ? resultados.map((profissional) => `
            <button class="opcao-combobox" type="button" role="option" data-profissional="${profissional.valor}">
                <strong>${profissional.nome}</strong>
                <span>${profissional.registro}</span>
            </button>
        `).join('')
        : '<span class="combobox-vazio">Nenhum profissional encontrado.</span>';
}

function selecionarProfissional(profissional) {
    campoProfissional.value = profissional.valor;
    buscaProfissional.value = profissional.nome;
    botaoLimparProfissional.hidden = false;
    botaoContinuar.disabled = false;
    mensagemFormulario.hidden = true;
    buscaData.disabled = false;
    botaoSetaData.disabled = false;
    comboboxData.classList.remove('combobox-desabilitado');
    buscaData.placeholder = 'Selecione uma data';
    fecharListaProfissionais();
}

function limparProfissional() {
    campoProfissional.value = '';
    buscaProfissional.value = '';
    buscaProfissional.placeholder = 'Selecione uma especialidade primeiro';
    buscaProfissional.disabled = !campoEspecialidade.value;
    botaoSetaProfissional.disabled = !campoEspecialidade.value;
    comboboxProfissional.classList.toggle('combobox-desabilitado', !campoEspecialidade.value);
    botaoLimparProfissional.hidden = true;
    botaoContinuar.disabled = true;
    dataConsulta.value = '';
    buscaData.value = '';
    buscaData.disabled = true;
    botaoSetaData.disabled = true;
    comboboxData.classList.add('combobox-desabilitado');
    fecharCalendario();
    limparHorario();
    fecharListaProfissionais();
}

function habilitarProfissionais() {
    comboboxProfissional.classList.remove('combobox-desabilitado');
    buscaProfissional.disabled = false;
    botaoSetaProfissional.disabled = false;
    buscaProfissional.placeholder = 'Selecione um profissional';
    renderizarProfissionais();
}

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
    const dataHoje = formatarData(new Date());
    const minutosAtuais = new Date().getHours() * 60 + new Date().getMinutes();

    listaHorarios.innerHTML = horariosDisponiveis.map((horario) => {
        const [hora, minuto] = horario.split(':').map(Number);
        const horarioPassado = dataConsulta.value === dataHoje && hora * 60 + minuto < minutosAtuais;
        const estado = horarioPassado ? ' horario-indisponivel' : '';
        const bloqueado = horarioPassado ? ' disabled' : '';
        const descricao = horarioPassado ? 'Horário indisponível' : 'Horário disponível';

        return `
        <button class="opcao-combobox${estado}" type="button" role="option" data-horario="${horario}"${bloqueado}>
            <strong>${horario}</strong>
            <span>${descricao}</span>
        </button>
    `;
    }).join('');
}

function selecionarHorario(horario) {
    horarioSelecionado.value = horario;
    buscaHorario.value = horario;
    botaoLimparHorario.hidden = false;
    botaoContinuar.disabled = false;
    mensagemFormulario.hidden = true;
    fecharListaHorarios();
}

function limparHorario() {
    horarioSelecionado.value = '';
    buscaHorario.value = '';
    buscaHorario.placeholder = 'Selecione uma data primeiro';
    buscaHorario.disabled = !dataConsulta.value;
    botaoSetaHorario.disabled = !dataConsulta.value;
    comboboxHorario.classList.toggle('combobox-desabilitado', !dataConsulta.value);
    botaoLimparHorario.hidden = true;
    botaoContinuar.disabled = true;
    fecharListaHorarios();
}

function habilitarHorarios() {
    buscaHorario.disabled = false;
    botaoSetaHorario.disabled = false;
    buscaHorario.placeholder = 'Selecione um horário';
    comboboxHorario.classList.remove('combobox-desabilitado');
    renderizarHorarios();
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

function renderizarCalendario() {
    const ano = mesCalendario.getFullYear();
    const mes = mesCalendario.getMonth();
    const hoje = new Date();
    const dataMinima = formatarData(hoje);
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
        const indisponivel = valor < dataMinima;
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

    dataTemporaria = dataConsulta.value || '';
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
    dataConsulta.value = dataTemporaria;
    buscaData.value = formatarDataExibicao(dataTemporaria);
    limparHorario();
    habilitarHorarios();
    fecharCalendario();
}

renderizarEspecialidades();

buscaEspecialidade.addEventListener('focus', () => {
    renderizarEspecialidades();
    abrirLista();
});

buscaEspecialidade.addEventListener('click', () => {
    renderizarEspecialidades();
    abrirLista();
});

buscaEspecialidade.addEventListener('input', () => {
    campoEspecialidade.value = '';
    botaoLimpar.hidden = true;
    botaoContinuar.disabled = true;
    limparProfissional();
    renderizarEspecialidades(buscaEspecialidade.value);
    abrirLista();
});

botaoSeta.addEventListener('click', () => {
    if (listaEspecialidades.hidden) {
        renderizarEspecialidades();
        buscaEspecialidade.focus();
        abrirLista();
    } else {
        fecharLista();
    }
});

botaoLimpar.addEventListener('click', limparEspecialidade);

listaEspecialidades.addEventListener('click', (evento) => {
    const opcao = evento.target.closest('[data-valor]');

    if (!opcao) {
        return;
    }

    const especialidade = especialidades.find((item) => item.valor === opcao.dataset.valor);
    selecionarEspecialidade(especialidade);
    habilitarProfissionais();
});

buscaProfissional.addEventListener('focus', () => {
    renderizarProfissionais();
    abrirListaProfissionais();
});

buscaProfissional.addEventListener('click', () => {
    renderizarProfissionais();
    abrirListaProfissionais();
});

buscaProfissional.addEventListener('input', () => {
    campoProfissional.value = '';
    botaoLimparProfissional.hidden = true;
    botaoContinuar.disabled = true;
    renderizarProfissionais(buscaProfissional.value);
    abrirListaProfissionais();
});

botaoSetaProfissional.addEventListener('click', () => {
    if (listaProfissionais.hidden) {
        renderizarProfissionais();
        buscaProfissional.focus();
        abrirListaProfissionais();
    } else {
        fecharListaProfissionais();
    }
});

botaoLimparProfissional.addEventListener('click', limparProfissional);

listaProfissionais.addEventListener('click', (evento) => {
    const opcao = evento.target.closest('[data-profissional]');

    if (!opcao) {
        return;
    }

    const profissional = profissionais.find((item) => item.valor === opcao.dataset.profissional);
    selecionarProfissional(profissional);
});

dataConsulta.addEventListener('change', () => {
    limparHorario();

    if (dataConsulta.value) {
        habilitarHorarios();
    }
});

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
    dataTemporaria = dataConsulta.value;
    fecharCalendario();
});

botaoConfirmarData.addEventListener('click', confirmarData);

document.addEventListener('click', (evento) => {
    if (!comboboxEspecialidade.contains(evento.target)) {
        fecharLista();
    }

    if (!comboboxProfissional.contains(evento.target)) {
        fecharListaProfissionais();
    }

    if (!comboboxHorario.contains(evento.target)) {
        fecharListaHorarios();
    }

    if (!comboboxData.contains(evento.target)) {
        fecharCalendario();
    }
});

formularioEspecialidade.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const especialidadeSelecionada = campoEspecialidade.value;

    if (!especialidadeSelecionada || !campoProfissional.value || !dataConsulta.value || !horarioSelecionado.value) {
        mensagemFormulario.hidden = false;
        botaoContinuar.disabled = true;
        return;
    }

    mensagemFormulario.textContent = 'Data e horário selecionados. A próxima etapa será adicionada no próximo requisito.';
    mensagemFormulario.hidden = false;
    mensagemFormulario.style.borderLeftColor = '#168b64';
    mensagemFormulario.style.backgroundColor = '#eefaf5';
    mensagemFormulario.style.color = '#126746';
});
