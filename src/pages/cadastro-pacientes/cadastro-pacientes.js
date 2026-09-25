    // Confirma que o arquivo JavaScript foi carregado
console.log("JavaScript do cadastro conectado.");

    // NOME -Encontra o campo NOME no HTML
const campoNome = document.getElementById("nome");
    // Remove os números do campo de nome
campoNome.addEventListener("input", function () {
    campoNome.value = campoNome.value.replace(/[0-9]/g, "");
});

    // CPF - Verifica o tamanho, as repetições e os dígitos verificadores do CPF
function validarCpf(cpf) {
    if (!/^[0-9]{11}$/.test(cpf)) {
        return false;
    }

    if (/^([0-9])\1{10}$/.test(cpf)) {
        return false;
    }

    for (let tamanho = 9; tamanho <= 10; tamanho++) {
        let soma = 0;

        for (let indice = 0; indice < tamanho; indice++) {
            soma += Number(cpf[indice]) * (tamanho + 1 - indice);
        }

        const resto = soma % 11;
        const digitoEsperado = resto < 2 ? 0 : 11 - resto;

        if (Number(cpf[tamanho]) !== digitoEsperado) {
            return false;
        }
    }

    return true;
}
   // CPF - limpa a entrada e informa os erros de preenchimento
const campoCpf = document.getElementById("cpf");

campoCpf.addEventListener("input", function () {
    const numeros = campoCpf.value.replace(/[^0-9]/g, "").slice(0, 11);

    campoCpf.value = numeros;

    if (numeros.length === 0) {
        campoCpf.setCustomValidity("");
    } else if (numeros.length !== 11) {
        campoCpf.setCustomValidity("Digite os 11 números do CPF.");
    } else if (!validarCpf(numeros)) {
        campoCpf.setCustomValidity("CPF inválido. Confira os números digitados.");
    } else {
        campoCpf.setCustomValidity("");
    }
});

    // NASCIMENTO - Encontra o campo NASCIMENTO no HTML
const campoNascimento = document.getElementById("nascimento");
    // DATA DE NASCIMENTO — impede datas posteriores a hoje
const hoje = new Date();
const ano = hoje.getFullYear();
const mes = String(hoje.getMonth() + 1).padStart(2, "0");
const dia = String(hoje.getDate()).padStart(2, "0");

campoNascimento.max = `${ano}-${mes}-${dia}`;
 // TELEFONE - Encontra o campo TELEFONE no html
const campoTelefone = document.getElementById("telefone");
    // Limita os números de telefone e aplica a formatação com DDD
campoTelefone.addEventListener("input", function () {
    const numeros = campoTelefone.value.replace(/[^0-9]/g, "").slice(0, 11);

    const ddd = numeros.slice(0, 2);
    const numero = numeros.slice(2);

    let telefoneFormatado = "";

    if (numeros.length > 0) {
        telefoneFormatado = `(${ddd}`;
    }

    if (numeros.length >= 2) {
        telefoneFormatado += ") ";
    }

    if (numero.length > 0) {
        const posicaoHifen = numero.length <= 8 ? 4 : 5;

        telefoneFormatado += numero.slice(0, posicaoHifen);

        if (numero.length > posicaoHifen) {
            telefoneFormatado += `-${numero.slice(posicaoHifen)}`;
        }
    }

    campoTelefone.value = telefoneFormatado;
     // TELEFONE- Verifica se o telefone tem a quantidade esperada de dígitos
    const telefoneCompleto = numeros.length === 10 || numeros.length === 11;

    if (numeros.length === 0 || telefoneCompleto) {
        campoTelefone.setCustomValidity("");
    } else {
        campoTelefone.setCustomValidity(
            "Digite o telefone com DDD: 10 ou 11 números."
        );
    }
});

    // SENHA- Encontra o campo e os indicadores SENHA no html
const campoSenha = document.getElementById("senha");
const requisitoTamanho = document.getElementById("requisito-tamanho");
const requisitoMaiuscula = document.getElementById("requisito-maiuscula");
const requisitoEspecial = document.getElementById("requisito-especial");
    // Atualiza os indicadores e a validade durante a digitação da senha, se cumpre os requisitos
campoSenha.addEventListener("input", function () {
    const senha = campoSenha.value;

    const temTamanho = senha.length >= 8;
    const temMaiuscula = /\p{Lu}/u.test(senha);
    const temEspecial = /[\p{P}\p{S}]/u.test(senha);

    requisitoTamanho.classList.toggle("atendido", temTamanho);
    requisitoMaiuscula.classList.toggle("atendido", temMaiuscula);
    requisitoEspecial.classList.toggle("atendido", temEspecial);

    if (!temTamanho || !temMaiuscula || !temEspecial) {
        campoSenha.setCustomValidity(
            "Use pelo menos 8 caracteres, uma letra maiúscula e um caractere especial."
        );
    } else {
        campoSenha.setCustomValidity("");
    }
});
    // CONFIRMAR SENHA - Encontra o campo CONFIRMAR SENHA no html
const campoConfirmarSenha = document.getElementById("confirmar-senha");
    // CONFIRMAR SENHA - verifica se as duas senhas são iguais
function validarConfirmacaoSenha() {
    const senhasIguais = campoSenha.value === campoConfirmarSenha.value;

    if (senhasIguais) {
        campoConfirmarSenha.setCustomValidity("");
    } else {
        campoConfirmarSenha.setCustomValidity("As senhas precisam ser iguais.");
    }
}

campoSenha.addEventListener("input", validarConfirmacaoSenha);
campoConfirmarSenha.addEventListener("input", validarConfirmacaoSenha);

    // SENHA — encontra os botões de mostrar e ocultar as senhas
const botoesAlternarSenha = document.querySelectorAll(".alternar-senha");

    // SENHA VISIBILIDADE - mostra ou oculta cada campo de senha
botoesAlternarSenha.forEach(function (botao) {
    const idCampo = botao.getAttribute("aria-controls");
    const campo = document.getElementById(idCampo);
    const nomeCampo = idCampo === "senha" ? "senha" : "confirmação de senha";

    botao.addEventListener("click", function () {
        const vaiMostrar = campo.type === "password";

        campo.type = vaiMostrar ? "text" : "password";

        botao.setAttribute("aria-pressed", String(vaiMostrar));
        botao.setAttribute(
            "aria-label",
            `${vaiMostrar ? "Ocultar" : "Mostrar"} ${nomeCampo}`
        );
    });
});

    // FORMULARIO — encontra o formulário e o espaço para mensagens
const formulario = document.getElementById("form-cadastro");
const mensagemCadastro = document.getElementById("mensagem-cadastro");

formulario.addEventListener("submit", function (evento) {
    // FORMULARIO- Impede o recarregamento da página
    evento.preventDefault();

    // FORMULARIO- Reúne os dados na mesma ordem dos campos do HTML
    const paciente = {
        nome: document.getElementById("nome").value.trim(),
        cpf: document.getElementById("cpf").value,
        nascimento: document.getElementById("nascimento").value,
        telefone: document.getElementById("telefone").value.replace(/[^0-9]/g, ""),
        email: document.getElementById("email").value.trim()
    };

    // Salva o cadastro fictício no navegador
try {
    const pacienteEmTexto = JSON.stringify(paciente);

    localStorage.setItem("clinconecta.paciente", pacienteEmTexto);

    mensagemCadastro.textContent =
        "Cadastro salvo com sucesso neste navegador.";
    } catch (erro) {
    mensagemCadastro.textContent =
        "Não foi possível salvar. Os campos foram mantidos para tentar novamente.";
    }
});