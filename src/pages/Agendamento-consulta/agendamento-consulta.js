const formularioEspecialidade = document.querySelector('#form-especialidade');
const campoEspecialidade = document.querySelector('#especialidade');
const buscaEspecialidade = document.querySelector('#especialidade-busca');
const comboboxEspecialidade = document.querySelector('[data-combobox]');
const listaEspecialidades = document.querySelector('#lista-especialidades');
const botaoLimpar = comboboxEspecialidade.querySelector('.combobox-limpar');
const botaoSeta = comboboxEspecialidade.querySelector('.combobox-seta');
const botaoContinuar = formularioEspecialidade.querySelector('button[type="submit"]');
const mensagemFormulario = document.querySelector('#mensagem-formulario');

const especialidades = [
    { valor: 'clinico-geral', nome: 'Clínico geral', descricao: 'Atendimento para cuidados gerais de saúde.' },
    { valor: 'cardiologia', nome: 'Cardiologia', descricao: 'Avaliação e acompanhamento do coração.' },
    { valor: 'pediatria', nome: 'Pediatria', descricao: 'Cuidados de saúde para crianças e adolescentes.' }
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
});

document.addEventListener('click', (evento) => {
    if (!comboboxEspecialidade.contains(evento.target)) {
        fecharLista();
    }
});

formularioEspecialidade.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const especialidadeSelecionada = campoEspecialidade.value;

    if (!especialidadeSelecionada) {
        mensagemFormulario.hidden = false;
        botaoContinuar.disabled = true;
        return;
    }

    mensagemFormulario.textContent = 'Especialidade selecionada. A próxima etapa será adicionada no próximo requisito.';
    mensagemFormulario.hidden = false;
    mensagemFormulario.style.borderLeftColor = '#168b64';
    mensagemFormulario.style.backgroundColor = '#eefaf5';
    mensagemFormulario.style.color = '#126746';
});
