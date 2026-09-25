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
    fecharListaProfissionais();
}

function habilitarProfissionais() {
    comboboxProfissional.classList.remove('combobox-desabilitado');
    buscaProfissional.disabled = false;
    botaoSetaProfissional.disabled = false;
    buscaProfissional.placeholder = 'Selecione um profissional';
    renderizarProfissionais();
}

renderizarEspecialidades();

buscaEspecialidade.addEventListener('focus', () => {
    renderizarEspecialidades(buscaEspecialidade.value === campoEspecialidade.value ? '' : buscaEspecialidade.value);
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
    renderizarProfissionais(buscaProfissional.value);
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

document.addEventListener('click', (evento) => {
    if (!comboboxEspecialidade.contains(evento.target)) {
        fecharLista();
    }

    if (!comboboxProfissional.contains(evento.target)) {
        fecharListaProfissionais();
    }
});

formularioEspecialidade.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const especialidadeSelecionada = campoEspecialidade.value;

    if (!especialidadeSelecionada || !campoProfissional.value) {
        mensagemFormulario.hidden = false;
        botaoContinuar.disabled = true;
        return;
    }

    mensagemFormulario.textContent = 'Profissional selecionado. A próxima etapa será adicionada no próximo requisito.';
    mensagemFormulario.hidden = false;
    mensagemFormulario.style.borderLeftColor = '#168b64';
    mensagemFormulario.style.backgroundColor = '#eefaf5';
    mensagemFormulario.style.color = '#126746';
});
