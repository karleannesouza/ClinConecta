const formularioExame = document.querySelector('#form-exame');
const campoExame = document.querySelector('#exame');
const buscaExame = document.querySelector('#exame-busca');
const comboboxExame = document.querySelector('[data-combobox-exame]');
const listaExames = document.querySelector('#lista-exames');
const botaoLimparExame = comboboxExame.querySelector('.combobox-limpar');
const botaoSetaExame = comboboxExame.querySelector('.combobox-seta');

// Dados fictícios dos exames oferecidos pela clínica.
const exames = [
    {
        valor: 'eletrocardiograma',
        nome: 'Eletrocardiograma',
        descricao: 'Registra a atividade elétrica do coração para avaliar ritmo e frequência cardíaca.'
    },
    {
        valor: 'hemograma-completo',
        nome: 'Hemograma Completo',
        descricao: 'Exame de sangue que avalia glóbulos vermelhos, glóbulos brancos e plaquetas.'
    },
    {
        valor: 'ultrassonografia',
        nome: 'Ultrassonografia',
        descricao: 'Exame de imagem que usa ondas sonoras para avaliar órgãos internos.'
    }
];

function buscarExame(valor) {
    return exames.find((exame) => exame.valor === valor);
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

function selecionarExame(exame) {
    campoExame.value = exame.valor;
    buscaExame.value = exame.nome;
    botaoLimparExame.hidden = false;
    fecharListaExames();
}

function limparExame() {
    campoExame.value = '';
    buscaExame.value = '';
    botaoLimparExame.hidden = true;
    renderizarExames();
    abrirListaExames();
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

document.addEventListener('click', (evento) => {
    if (!comboboxExame.contains(evento.target)) {
        fecharListaExames();
    }
});
