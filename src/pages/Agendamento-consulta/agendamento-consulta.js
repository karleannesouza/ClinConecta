const formularioEspecialidade = document.querySelector('#form-especialidade');
const opcoesEspecialidade = document.querySelectorAll('input[name="especialidade"]');
const botaoContinuar = formularioEspecialidade.querySelector('button[type="submit"]');
const mensagemFormulario = document.querySelector('#mensagem-formulario');

opcoesEspecialidade.forEach((opcao) => {
    opcao.addEventListener('change', () => {
        botaoContinuar.disabled = false;
        mensagemFormulario.hidden = true;
    });
});

formularioEspecialidade.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const especialidadeSelecionada = formularioEspecialidade.elements.especialidade.value;

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