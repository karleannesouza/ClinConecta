const formularioExame = document.querySelector('#form-exame');
const campoExame = document.querySelector('#exame');
const buscaExame = document.querySelector('#exame-busca');
const comboboxExame = document.querySelector('[data-combobox-exame]');
const listaExames = document.querySelector('#lista-exames');
const botaoLimparExame = comboboxExame.querySelector('.combobox-limpar');
const botaoSetaExame = comboboxExame.querySelector('.combobox-seta');
const descricaoExame = document.querySelector('#descricao-exame');

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
}

function limparExame() {
    campoExame.value = '';
    buscaExame.value = '';
    botaoLimparExame.hidden = true;
    descricaoExame.hidden = true;
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
