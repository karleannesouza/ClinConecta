const acoesAgendamento = Object.freeze({
  "agendar-consulta": "consulta",
  "agendar-exame": "exame",
  "meus-agendamentos": "meusAgendamentos",
});

// No protótipo, o cadastro salvo identifica o paciente. Isso não representa uma autenticação real.
const integracaoAgendamento = {
    obterEstadoAutenticacao: function () {
        try {
            const texto = localStorage.getItem("clinconecta.paciente");

            if (!texto) {
                return false;
            }

            const paciente = JSON.parse(texto);
            const sessao = JSON.parse(
                sessionStorage.getItem("clinconecta.sessao") || "null"
            );

            return (
                paciente !== null &&
                typeof paciente === "object" &&
                !Array.isArray(paciente) &&
                typeof paciente.cpf === "string" &&
                paciente.cpf.trim() !== "" &&
                sessao !== null &&
                typeof sessao.pacienteCpf === "string" &&
                typeof sessao.expiraEm === "number" &&
                Date.now() < sessao.expiraEm &&
                sessao.pacienteCpf === paciente.cpf.replace(/\D/g, "")
            );
        } catch {
            return false;
        }
    },

    destinos: {
        loginCadastro: "./pages/login/login-pacientes.html",
        consulta: "./pages/Agendamento-consulta/agendamento-consulta.html",
        exame: "./pages/agendamento-exame/agendamento-exame.html",
        meusAgendamentos: "./pages/meus-agendamentos/meus-agendamentos.html",
    },
};

const botaoSair = document.getElementById("botao-sair");

if (botaoSair) {
    botaoSair.hidden = !integracaoAgendamento.obterEstadoAutenticacao();

    botaoSair.addEventListener("click", function () {
        sessionStorage.removeItem("clinconecta.sessao");
        window.location.href = integracaoAgendamento.destinos.loginCadastro;
    });
}
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

  // Guarda se a pessoa escolheu consulta ou exame nesta aba.
sessionStorage.setItem(
    "clinconecta.tipoAgendamento",
    tipoAgendamento
);
  window.location.assign(destino);
});
