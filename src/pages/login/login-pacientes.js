/* Captura os elementos da página */
const loginForm = document.getElementById("loginForm");
const identifierInput = document.getElementById("identifier");
const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePasswordBtn");
const errorMessage = document.getElementById("errorMessage");


/* Mostra a mensagem de erro */
function mostrarErro() {
  errorMessage.classList.add("show");
}


/* Oculta a mensagem de erro */
function ocultarErro() {
  errorMessage.classList.remove("show");
}


/* Remove caracteres não numéricos */
function somenteNumeros(valor) {
  return valor.replace(/\D/g, "");
}


/* Aplica a máscara do CPF */
function formatarCPF(valor) {
  const numeros = somenteNumeros(valor).slice(0, 11);

  if (numeros.length <= 3) {
    return numeros;
  }

  if (numeros.length <= 6) {
    return `${numeros.slice(0, 3)}.${numeros.slice(3)}`;
  }

  if (numeros.length <= 9) {
    return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6)}`;
  }

  return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-${numeros.slice(9, 11)}`;
}


/* Verifica se o CPF possui apenas números repetidos */
function cpfComNumerosIguais(cpf) {
  return /^(\d)\1{10}$/.test(cpf);
}


/* Valida o CPF */
function validarCPF(cpf) {
  const numeros = somenteNumeros(cpf);

  if (numeros.length !== 11 || cpfComNumerosIguais(numeros)) {
    return false;
  }

  let soma = 0;

  for (let i = 0; i < 9; i++) {
    soma += Number(numeros[i]) * (10 - i);
  }

  let primeiroDigito = (soma * 10) % 11;

  if (primeiroDigito === 10) {
    primeiroDigito = 0;
  }

  if (primeiroDigito !== Number(numeros[9])) {
    return false;
  }

  soma = 0;

  for (let i = 0; i < 10; i++) {
    soma += Number(numeros[i]) * (11 - i);
  }

  let segundoDigito = (soma * 10) % 11;

  if (segundoDigito === 10) {
    segundoDigito = 0;
  }

  return segundoDigito === Number(numeros[10]);
}


/* Valida o formato do e-mail */
function validarEmail(email) {
  const regraEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regraEmail.test(email);
}


/* Identifica se o campo está sendo usado como CPF */
function ehCPF(valor) {
    return /^[\d.\-\s]+$/.test(valor);
}


/* Formata o CPF enquanto o usuário digita */
identifierInput.addEventListener("input", () => {
  const valor = identifierInput.value;

  if (ehCPF(valor)) {
    identifierInput.value = formatarCPF(valor);
  }

  ocultarErro();
});


/* Mostra ou oculta a senha */
togglePasswordBtn.addEventListener("click", () => {
  const senhaVisivel = passwordInput.type === "text";

  passwordInput.type = senhaVisivel ? "password" : "text";

  togglePasswordBtn.setAttribute(
    "aria-label",
    senhaVisivel
      ? "Mostrar senha"
      : "Ocultar senha"
  );
});


/* Oculta o erro quando a senha é alterada */
passwordInput.addEventListener("input", () => {
  ocultarErro();
});


/* Valida os dados do formulário */
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  errorMessage.textContent = "Informe um CPF ou e-mail válido e preencha a senha.";

  const identificador = identifierInput.value.trim();
  const senha = passwordInput.value.trim();

  let dadosValidos = true;

  if (!identificador || !senha) {
    dadosValidos = false;
  }

  if (identificador && ehCPF(identificador)) {
    if (!validarCPF(identificador)) {
      dadosValidos = false;
    }
  } else if (identificador && !validarEmail(identificador)) {
    dadosValidos = false;
  }

  /* Mostra o erro quando os dados são inválidos */
  if (!dadosValidos) {
    mostrarErro();
    return;
  }

  /* Oculta o erro quando os dados são válidos */
  ocultarErro();
/* Identifica o paciente e inicia a sessão simulada. */
try {
    const paciente = JSON.parse(
        localStorage.getItem("clinconecta.paciente") || "null"
    );

    const cpf = typeof paciente?.cpf === "string"
        ? somenteNumeros(paciente.cpf)
        : "";

    const correspondeAoCadastro = ehCPF(identificador)
        ? somenteNumeros(identificador) === cpf
        : typeof paciente?.email === "string" &&
          identificador.toLowerCase() === paciente.email.trim().toLowerCase();

    if (!validarCPF(cpf) || !correspondeAoCadastro) {
        errorMessage.textContent =
            "Use o CPF ou e-mail cadastrado neste navegador. Se necessário, clique em Cadastre-se.";
        mostrarErro();
        return;
    }

    sessionStorage.setItem(
        "clinconecta.sessao",
        JSON.stringify({ pacienteCpf: cpf })
    );
} catch {
    errorMessage.textContent =
        "Não foi possível iniciar a sessão neste navegador.";
    mostrarErro();
    return;
}  

  /* Recupera o tipo de agendamento escolhido na página inicial. */
const tipoAgendamento = sessionStorage.getItem(
    "clinconecta.tipoAgendamento"
);

  /* Define os destinos permitidos. */
const destinos = {
    consulta: "../Agendamento-consulta/agendamento-consulta.html",
    exame: "../agendamento-exame/agendamento-exame.html",
    meusAgendamentos: "../meus-agendamentos/meus-agendamentos.html"

};

  /* Sem uma escolha válida, retorna à página inicial. */
const destino = destinos[tipoAgendamento] || "../../index.html";

  /* Remove a escolha depois de utilizá-la. */
sessionStorage.removeItem("clinconecta.tipoAgendamento");

window.location.assign(destino);
});