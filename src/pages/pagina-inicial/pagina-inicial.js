const acoesAgendamento = Object.freeze({
  "agendar-consulta": "consulta",
  "agendar-exame": "exame",
});

// Esses valores aguardam as rotas e a autenticação que serão fornecidas pelo projeto.
const integracaoAgendamento = {
  obterEstadoAutenticacao: null,
  destinos: {
    loginCadastro: null,
    consulta: null,
    exame: null,
  },
};

function obterDestinoDoFluxo(tipoAgendamento) {
  if (typeof integracaoAgendamento.obterEstadoAutenticacao !== "function") {
    console.warn("A integração do estado de autenticação ainda não foi definida.");
    return null;
  }

  const autenticado = integracaoAgendamento.obterEstadoAutenticacao();
  if (typeof autenticado !== "boolean") {
    console.warn("A integração de autenticação deve retornar true ou false.");
    return null;
  }

  // Sem autenticação os dois tipos compartilham o fluxo de login/cadastro.
  const nomeDoDestino = autenticado ? tipoAgendamento : "loginCadastro";
  return integracaoAgendamento.destinos[nomeDoDestino];
}

document.addEventListener("click", (evento) => {
  const botao = evento.target.closest("button[data-acao]");
  if (!botao) return;

  const tipoAgendamento = acoesAgendamento[botao.dataset.acao];
  if (!tipoAgendamento) return;

  const destino = obterDestinoDoFluxo(tipoAgendamento);
  if (typeof destino !== "string" || destino.trim() === "") {
    console.warn(`O destino para o fluxo de ${tipoAgendamento} ainda não foi configurado.`);
    return;
  }

  window.location.assign(destino);
});
