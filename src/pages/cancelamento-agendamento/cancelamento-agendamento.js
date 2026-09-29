// ===== ELEMENTOS DO HTML =====

// Encontra a janela de confirmação
const modalCancelamento = document.getElementById("modal-cancelamento");

// Encontra os botões
const botaoAbrir = document.getElementById("abrir-cancelamento");
const botaoFechar = document.getElementById("fechar-cancelamento");
const botaoVoltar = document.getElementById("desistir-cancelamento");
const botaoConfirmar = document.getElementById("confirmar-cancelamento");

// Encontra o espaço para mensagens na página
const mensagemCancelamento = document.getElementById("mensagem-cancelamento");

// Encontra os parágrafos do resumo
const resumoServico = document.getElementById("resumo-servico");
const resumoProfissional = document.getElementById("resumo-profissional");
const resumoDataHorario = document.getElementById("resumo-data-horario");


    // ===== AGENDAMENTO SELECIONADO =====

    // Recupera o ID do agendamento escolhido na página Meus Agendamentos
const idAgendamento = sessionStorage.getItem(
    "clinconecta.agendamentoCancelar"
);

    // Recupera os agendamentos salvos no navegador
const dadosAgendamentos = localStorage.getItem(
    "clinconecta_agendamentos"
);

const agendamentos = dadosAgendamentos
    ? JSON.parse(dadosAgendamentos)
    : [];

    // Procura o agendamento correspondente ao ID selecionado
const agendamentoTeste = agendamentos.find(function (agendamento) {
    return agendamento.id === idAgendamento;
});

    // Mostra na página os mesmos dados usados na confirmação.
const detalhesCancelamento = document.getElementById(
    "detalhes-cancelamento"
);

function atualizarResumoDaPagina() {
    const tipo = agendamentoTeste.tipo === "consulta"
        ? "Consulta"
        : "Exame";

    const servico = agendamentoTeste.tipo === "consulta"
        ? agendamentoTeste.nomeEspecialidade
        : agendamentoTeste.nomeExame;

    const dataFormatada = agendamentoTeste.data
        .split("-")
        .reverse()
        .join("/");

    const status = agendamentoTeste.status === "cancelado"
        ? "Cancelado"
        : "Marcado";

    const linhas = [
        `${tipo} — ${servico}`,
        agendamentoTeste.nomeProfissional,
        `${dataFormatada} às ${agendamentoTeste.horario}`,
        `Status: ${status}`
    ];

    detalhesCancelamento.replaceChildren();

    linhas.filter(Boolean).forEach(function (texto) {
        const paragrafo = document.createElement("p");
        paragrafo.textContent = texto;
        detalhesCancelamento.appendChild(paragrafo);
    });

    botaoAbrir.disabled = agendamentoTeste.status !== "marcado";
}

// Preenche o resumo ao carregar a página.
atualizarResumoDaPagina();


// ===== IDENTIFICAÇÃO DO PACIENTE =====

// Consulta o paciente salvo pelo cadastro da simulação
function obterCpfPacienteAtual() {
    const dadosSalvos = localStorage.getItem("clinconecta.paciente");

    // Sem dados salvos, não há paciente identificado
    if (dadosSalvos === null) {
        return null;
    }

    // Converte o texto armazenado em um objeto
    const paciente = JSON.parse(dadosSalvos);

    // Verifica a estrutura antes de utilizar o CPF
    if (
        !paciente ||
        typeof paciente !== "object" ||
        Array.isArray(paciente) ||
        typeof paciente.cpf !== "string"
    ) {
        return null;
    }

    // Remove os caracteres de formatação do CPF
    const cpf = paciente.cpf.replace(/[.\s-]/g, "");

    // Exige 11 dígitos e rejeita sequências de dígitos iguais
    if (
        !/^[0-9]{11}$/.test(cpf) ||
        /^([0-9])\1{10}$/.test(cpf)
    ) {
        return null;
    }

    return cpf;
}


// ===== ABERTURA DO MODAL =====

botaoAbrir.addEventListener("click", function () {
    // Remove mensagens da tentativa anterior
    mensagemCancelamento.textContent = "";

    let cpfPacienteAtual;

    // Trata possíveis falhas na leitura do armazenamento
    try {
        cpfPacienteAtual = obterCpfPacienteAtual();
    } catch (erro) {
        mensagemCancelamento.textContent =
            "Não foi possível ler a identificação do paciente.";
        return;
    }

    // Exige identificação antes de continuar
    if (cpfPacienteAtual === null) {
        mensagemCancelamento.textContent =
            "Identifique o paciente pelo cadastro antes de continuar.";
        return;
    }

    // Confere o proprietário do agendamento
    if (agendamentoTeste.pacienteCpf !== cpfPacienteAtual) {
        mensagemCancelamento.textContent =
            "Este agendamento não pertence ao paciente atual.";
        return;
    }

    // Impede a abertura para registros que não estejam marcados
    if (agendamentoTeste.status !== "marcado") {
        mensagemCancelamento.textContent =
            "Este agendamento não está disponível para cancelamento.";
        return;
    }

    // Escolhe o tipo de atendimento para exibição
    const tipoExibido = agendamentoTeste.tipo === "consulta"
        ? "Consulta"
        : "Exame";

    // Escolhe o nome do serviço
    const nomeServico = agendamentoTeste.tipo === "consulta"
        ? agendamentoTeste.nomeEspecialidade
        : agendamentoTeste.nomeExame;

    // Formata a data sem conversão de fuso horário
    const partesData = agendamentoTeste.data.split("-");
    const dataFormatada = partesData.reverse().join("/");

    // Preenche o resumo com texto
    resumoServico.textContent = `${tipoExibido} — ${nomeServico}`;

    resumoProfissional.textContent =
        agendamentoTeste.nomeProfissional || "";

    // Esconde o profissional quando não existir
    resumoProfissional.hidden = !agendamentoTeste.nomeProfissional;

    resumoDataHorario.textContent =
        `${dataFormatada} às ${agendamentoTeste.horario}`;

    // Abre a confirmação depois de preencher os dados
    modalCancelamento.showModal();
});


// ===== FECHAMENTO SEM CANCELAMENTO =====

// Fecha a janela sem modificar o registro
function fecharModal() {
    modalCancelamento.close();
}

// O × e o botão Voltar executam a mesma função
botaoFechar.addEventListener("click", fecharModal);
botaoVoltar.addEventListener("click", fecharModal);

// A tecla Esc já fecha o diálogo pelo comportamento nativo do navegador


// ===== CONFIRMAÇÃO DO CANCELAMENTO =====

botaoConfirmar.addEventListener("click", function () {
    let cpfPacienteAtual;

    // Verifica novamente a identificação no momento da confirmação
    try {
        cpfPacienteAtual = obterCpfPacienteAtual();
    } catch (erro) {
        fecharModal();
        mensagemCancelamento.textContent =
            "Não foi possível verificar o paciente. O agendamento não foi cancelado.";
        return;
    }

    // Impede cancelar sem identificação ou para outro paciente
    if (
        cpfPacienteAtual === null ||
        agendamentoTeste.pacienteCpf !== cpfPacienteAtual
    ) {
        fecharModal();
        mensagemCancelamento.textContent =
            "Não foi possível cancelar: o paciente atual não corresponde ao agendamento.";
        return;
    }

    // Impede repetir o cancelamento
    if (agendamentoTeste.status !== "marcado") {
        fecharModal();
        mensagemCancelamento.textContent =
            "Este agendamento não está disponível para cancelamento.";
        return;
    }

    // Mantém o registro e seu proprietário, alterando apenas o status
    agendamentoTeste.status = "cancelado";
    localStorage.setItem("clinconecta_agendamentos",
    JSON.stringify(agendamentos)
    );
    atualizarResumoDaPagina();

    // Fecha a janela e informa o resultado
    fecharModal();

    mensagemCancelamento.textContent =
        "Agendamento cancelado com sucesso.";
});