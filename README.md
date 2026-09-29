# ClinConecta

## Sobre o projeto

O **ClinConecta** é um protótipo de alta fidelidade de um sistema web de agendamento online de consultas e exames para uma clínica popular. Desenvolvido como atividade acadêmica do curso de **Análise e Desenvolvimento de Sistemas**, o projeto tem como foco a experiência do usuário (UX), a interface (UI) e a integração dos fluxos de atendimento no navegador.

O projeto aborda a dificuldade enfrentada por pacientes que precisam se deslocar até uma unidade ou enfrentar filas telefônicas e atendimento presencial apenas para marcar uma consulta ou um exame. Sua proposta é demonstrar uma alternativa de agendamento pela internet, com poucos passos, linguagem simples e orientações claras.

O sistema utiliza **HTML, CSS e JavaScript**, sem backend e sem banco de dados. Os dados são fictícios, e os cadastros e agendamentos são persistidos localmente no navegador.

## Objetivos

- Facilitar o acesso aos serviços da clínica por meio do agendamento online de consultas e exames.
- Oferecer uma interface simples e intuitiva, inclusive para pessoas com pouca familiaridade com tecnologia.
- Integrar cadastro, login, agendamento, acompanhamento e cancelamento.
- Demonstrar persistência local e controle de sessão em uma aplicação executada no navegador.
- Manter a navegação consistente entre as páginas.

## Tecnologias utilizadas

| Tecnologia | Aplicação |
| --- | --- |
| HTML | Estrutura e conteúdo das páginas |
| CSS | Estilização, apresentação visual e padronização dos botões |
| JavaScript | Interações, navegação, controle de sessão e regras dos agendamentos |
| `localStorage` | Persistência dos dados de cadastro e dos agendamentos |
| `sessionStorage` | Controle da sessão temporária e transporte de dados entre páginas |

## Funcionalidades

### Cadastro, login e sessão

- Cadastro do paciente com persistência local dos dados.
- Login integrado à identificação do paciente durante a navegação.
- Sessão temporária de **10 minutos**, controlada por `sessionStorage` e validada durante a navegação entre as páginas.
- Botão **Sair**, que encerra a sessão e redireciona para o login sem excluir o cadastro ou os agendamentos salvos.
- Opção **Ir à página inicial** na tela de login.

O controle de acesso é demonstrativo e acontece no navegador; não há autenticação em um servidor.

### Agendamento de consultas e exames

- Fluxos para agendar **consultas** e **exames**, utilizando dados fictícios.
- Transporte de dados entre as páginas com `sessionStorage`.
- Persistência dos agendamentos em `localStorage`.
- Identificação de cada agendamento por um **ID único**.
- Associação do registro ao CPF do paciente.
- Uso dos status `marcado` e `cancelado` para acompanhar a situação do atendimento.
- Integração dos dois tipos de atendimento com a página **Meus Agendamentos**.

### Meus Agendamentos

- Leitura dos registros salvos na chave `clinconecta_agendamentos` do `localStorage`.
- Exibição dos agendamentos criados nos fluxos de consultas e exames, substituindo a lista fixa de demonstração dessa página.
- Filtragem pelo CPF do paciente identificado na sessão.
- Exibição da situação de cada agendamento.
- Destaque em **vermelho** para o status `cancelado`.
- Botão **Cancelar agendamento** exibido somente para registros com status `marcado`.

### Cancelamento integrado

- Seleção do agendamento a cancelar a partir de **Meus Agendamentos**.
- Identificação do registro pelo seu ID único.
- Exibição, na página de cancelamento, dos dados do agendamento selecionado.
- Atualização do status para `cancelado` após a confirmação.
- Persistência da alteração no `localStorage`, mantendo o registro cancelado disponível para consulta.

O cancelamento permanece salvo após recarregar a página, e o registro deixa de apresentar o botão de cancelamento.

### Navegação e interface

- Navegação integrada entre login, agendamento, listagem e cancelamento.
- Botões **Voltar** padronizados para manter a consistência visual e de navegação.
- Acesso à página inicial e encerramento de sessão pelos controles correspondentes.
- Diferenciação visual do status cancelado para facilitar a leitura dos registros.

## Fluxo principal

1. O paciente realiza o cadastro e o login.
2. Escolhe o fluxo de consulta ou exame e conclui o agendamento.
3. O sistema salva o registro com ID único, CPF do paciente, tipo de atendimento e status `marcado`.
4. A página **Meus Agendamentos** apresenta os registros associados ao CPF do paciente identificado.
5. Ao selecionar **Cancelar agendamento**, o paciente acessa os dados do registro correspondente.
6. A confirmação do cancelamento altera o status para `cancelado` e salva a mudança no navegador.
7. O paciente pode encerrar a sessão pelo botão **Sair**, preservando os dados persistidos.

## Armazenamento dos dados

### Persistência com `localStorage`

Os dados de cadastro e os agendamentos permanecem armazenados após recarregar as páginas ou encerrar a sessão, enquanto o armazenamento do navegador for mantido.

Os agendamentos utilizam a chave `clinconecta_agendamentos`. Entre os campos usados na integração estão:

| Campo | Finalidade |
| --- | --- |
| `id` | Identificar de forma única o agendamento, inclusive no cancelamento |
| `pacienteCpf` | Associar o registro ao paciente e filtrar a listagem |
| `tipo` | Diferenciar consulta e exame |
| `status` | Indicar se o agendamento está `marcado` ou `cancelado` |

### Dados temporários com `sessionStorage`

O `sessionStorage` mantém as informações da sessão temporária e auxilia no transporte de dados entre as páginas. A duração de **10 minutos** é uma regra controlada pelo JavaScript do projeto.

### Limites da persistência local

- Os dados ficam vinculados ao navegador e à origem em que o projeto é acessado.
- Não há sincronização entre dispositivos ou navegadores.
- Limpar os dados do site pode remover os cadastros e agendamentos salvos.
- A filtragem por CPF organiza a exibição dos registros no protótipo; ela não substitui autorização e proteção de dados em um backend.

## Organização da aplicação

A aplicação é composta por páginas HTML, arquivos CSS e scripts JavaScript que implementam a interface e conectam os fluxos. A comunicação entre páginas e a manutenção dos dados utilizam os recursos de armazenamento do navegador.

## Como executar

1. Baixe ou clone o repositório do projeto.
2. Abra a pasta em um editor de sua preferência.
3. Sirva a pasta com um servidor estático local, como a extensão **Live Server** do Visual Studio Code ou uma ferramenta equivalente.
4. Acesse a página inicial pelo endereço disponibilizado pelo servidor.
5. Utilize dados fictícios para explorar cadastro, login, consultas, exames e cancelamento.

Mantenha o mesmo endereço e porta durante a demonstração para acessar o mesmo armazenamento local. Servir as páginas por HTTP local ajuda a manter o comportamento consistente do armazenamento entre elas.

**Node.js e npm não são requisitos obrigatórios da aplicação.** Não é necessário configurar backend ou banco de dados.

## Roteiro de demonstração

- Realizar um cadastro e entrar no sistema.
- Criar uma consulta e um exame.
- Conferir os dois registros em **Meus Agendamentos**.
- Recarregar a página e conferir a persistência dos registros.
- Cancelar um agendamento e verificar o status em vermelho e a ausência do botão de cancelamento nesse registro.
- Recarregar a página e conferir a persistência do cancelamento.
- Usar **Sair** e verificar o retorno ao login, preservando os dados salvos.
- Entrar com outro paciente cadastrado e conferir a filtragem dos agendamentos por CPF.
- Conferir a duração da sessão de 10 minutos e a navegação pelos botões **Voltar** e **Ir à página inicial**.

## Escopo acadêmico e estado atual

O ClinConecta é um **protótipo acadêmico navegável**, com integração dos fluxos de cadastro, sessão, agendamento, acompanhamento e cancelamento no navegador.

- Utiliza dados fictícios para demonstração.
- Não possui backend nem banco de dados.
- A persistência ocorre localmente, por meio das APIs de armazenamento do navegador.
- Não realiza cobranças reais nem apresenta integração confirmada com gateway de pagamento.
- Não se destina ao uso com dados reais de pacientes ou à operação de uma clínica em produção.

---

Projeto acadêmico do curso de **Análise e Desenvolvimento de Sistemas**, com foco em UX/UI e na integração de fluxos web com HTML, CSS e JavaScript.
