# ClinConecta

## 1. Sobre o projeto

O *ClinConecta* é um protótipo de alta fidelidade de um sistema web de agendamento online de consultas e exames para uma clínica popular. O projeto foi desenvolvido como atividade acadêmica do curso de Análise e Desenvolvimento de Sistemas e tem como foco principal a *experiência do usuário (UX) e a interface (UI)*.

O problema que o sistema busca resolver é a dificuldade que pacientes de clínicas populares enfrentam para agendar atendimentos: em muitos casos, é necessário se deslocar até a unidade, enfrentar filas telefônicas ou atendimento presencial apenas para marcar uma consulta ou um exame.

A finalidade do ClinConecta é permitir que o paciente realize todo o agendamento pela internet, em poucos passos, com linguagem simples e orientações claras — inclusive o pagamento, que é demonstrado de forma simulada dentro do próprio sistema.

> *Nota:* trata-se de um protótipo navegável, sem backend, banco de dados ou integração real. Todos os dados são fictícios e existem apenas na memória do navegador durante a utilização.

## 2. Objetivo

O objetivo geral do sistema é *facilitar o acesso dos pacientes aos serviços da clínica*, permitindo agendar consultas e exames online, sem deslocamento e sem burocracia.

De forma mais específica, o sistema busca:

- Reduzir o número de etapas necessárias para agendar um atendimento;
- Oferecer uma interface simples e intuitiva, adequada a usuários com pouca familiaridade com tecnologia;
- Apresentar informações essenciais (serviço, preço, preparo, profissional, data, horário) de forma organizada e legível;
- Demonstrar um fluxo completo de agendamento, incluindo pagamento, revisão, confirmação e acompanhamento dos agendamentos.

## 3. Funcionalidades

As funcionalidades abaixo estão implementadas no protótipo e podem ser navegadas no navegador.

### 3.1 Cadastro e login (simulados)

- Tela de acesso com a marca ClinConecta, campos de e-mail e senha e botão "Entrar";
- Criação de novo cadastro ("Criar cadastro") com formulário simples;
- Recuperação de senha, que exibe a mensagem "Instruções enviadas para o e-mail informado";
- Validação visual de erro quando os campos não são preenchidos corretamente.

> A autenticação é simulada: qualquer e-mail e senha permitem avançar, e nenhuma credencial é armazenada ou verificada.

### 3.2 Página inicial

- Saudação personalizada: "Olá, Vitória! O que você deseja agendar?";
- Cards de atalho para *"Agendar consulta"* e *"Agendar exame"*;
- Acesso a *"Meus agendamentos", *"Meu perfil"* e **área administrativa* pelo cabeçalho;
- Cartão informativo "Tudo em um só lugar", com acesso ao perfil.

### 3.3 Agendamento de consultas

Fluxo específico para consultas, em etapas guiadas:

1. Escolha da categoria (Consulta);
2. Seleção do serviço/especialidade: *Clínico geral, Pediatra ou Cardiologista*, com nome, descrição e preço;
3. Seleção do *profissional*: cards com nome, especialidade e CRM (ex.: "Dr. Marcos Silva — Clínico geral — CRM 12841"); o card selecionado fica em destaque;
4. Escolha da *data* em calendário;
5. Escolha do *horário*;
6. Pagamento, revisão e confirmação.

### 3.4 Agendamento de exames

Fluxo específico para exames, sem etapa de profissional:

1. Escolha da categoria (Exame);
2. Seleção do exame: *Hemograma, Ecocardiograma ou Ultrassonografia, com nome, descrição, **instruções de preparo* (ex.: "Jejum de 8 horas") e preço;
3. Escolha da *data* e do *horário*;
4. Pagamento, revisão e confirmação.

### 3.5 Pesquisa e filtro de exames

- Campo de pesquisa por nome do exame (ex.: "Buscar exame, ex: Hemograma");
- Botões de filtro por grupo: *Todos, Laboratório e Imagem*;
- Estado vazio com a mensagem *"Nenhum exame encontrado."* e sugestão de nova busca quando a combinação de pesquisa e filtro não retorna resultados.

### 3.6 Seleção de data e horário

- *Calendário mensal (maio de 2026)* com dias da semana; dias disponíveis são selecionáveis e dias indisponíveis aparecem desabilitados (esmaecidos e riscados);
- Confirmação visual da data escolhida: "Data selecionada: 15/05/2026";
- Grade de *horários* (ex.: 14:20, 16:00, 17:20) em botões grandes, com apenas um horário selecionável por vez;
- Legenda visual com os estados "Selecionado", "Disponível" e "Indisponível".

### 3.7 Pagamento (Mercado Pago — simulado)

- Tela "Escolha uma forma de pagamento" com duas opções: *PIX* e *Cartão*;
- Fluxo PIX: QR Code fictício, código PIX de teste e status *"Aguardando pagamento" → "Pagamento aprovado"*;
- Fluxo Cartão: formulário com número, nome, validade e CVV, com simulação de *aprovação* ou *recusa*; em caso de recusa, é exibida a mensagem "Não foi possível realizar o pagamento. Tente novamente." e o usuário pode tentar novamente ou trocar a forma de pagamento;
- A aprovação do pagamento é obrigatória para avançar para a revisão;
- Todas as telas de pagamento exibem o aviso *"Mercado Pago Sandbox — Ambiente seguro de teste"*.

### 3.8 Revisão do agendamento

- Resumo completo com: paciente, tipo de atendimento, serviço, profissional (quando aplicável), data, horário, forma de pagamento e status *"Pagamento aprovado"*;
- Botões *"Voltar e editar"* (retorna à etapa anterior) e *"Confirmar agendamento"*.

### 3.9 Confirmação / comprovante do agendamento

- Mensagem de sucesso: *"Agendamento realizado com sucesso!"*;
- Cartão-resumo com serviço, tipo de atendimento, profissional (quando aplicável), data e horário, forma de pagamento e status *"Confirmado"*;
- Botões de continuidade: *"Ver meus agendamentos"* e *"Voltar para o início"*.

### 3.10 Meus agendamentos

- Lista de cards com os agendamentos do paciente, exibindo tipo (Consulta/Exame), serviço, profissional ou unidade, data, horário e *status* ("Confirmado" ou "Cancelado");
- Botão *"Novo agendamento"* para reiniciar o fluxo.

### 3.11 Perfil do paciente

- Tela "Meu perfil" com os dados do paciente de demonstração (Vitória Régia) e navegação de volta para a área principal.

### 3.12 Área administrativa

- Tela administrativa simples com *tabela de agendamentos* contendo: paciente, serviço, tipo, data, horário e status (ex.: Vitória R. | Clínico geral | 15/05/2026 | 14:20 | Confirmado).

### 3.13 Feedbacks ao usuário

- Mensagens de sucesso (pagamento aprovado, agendamento confirmado, instruções enviadas);
- Mensagens de erro (campos obrigatórios, pagamento recusado, "Nenhum exame encontrado.");
- Estados visuais distintos para itens selecionados, disponíveis, indisponíveis e desabilitados.

## 4. Fluxo de navegação

A navegação é *guiada por etapas*, com um indicador de progresso fixo no topo durante o agendamento, exibindo a posição atual e as etapas concluídas:


Login/Cadastro
      │
      ▼
   Início ──► Meus agendamentos / Meu perfil / Administração
      │
      ▼
 Categoria (Consulta ou Exame)
      │
      ▼
 Serviço (especialidade ou exame)
      │
      ▼
 Profissional (somente para consultas)
      │
      ▼
 Data ──► Horário
      │
      ▼
 Pagamento (PIX ou Cartão — simulado)
      │
      ▼
 Revisão ──► Confirmação
      │
      ▼
 Meus agendamentos


Características do fluxo:

- Em *consultas, o fluxo inclui a etapa de escolha do profissional; em **exames*, essa etapa é omitida;
- É possível *voltar a etapas anteriores* a qualquer momento, por meio do botão "Voltar" presente em cada tela e da opção "Voltar e editar" na revisão;
- Os botões de avanço ("Continuar") permanecem *desabilitados* até que a escolha obrigatória da etapa seja feita, evitando avanços sem seleção;
- As escolhas do paciente são mantidas durante todo o percurso, e a revisão final consolida todas as informações antes da confirmação.

## 5. Tecnologias utilizadas

| Tecnologia | Uso no projeto |
| --- | --- |
| *React 19* | Biblioteca para construção da interface |
| *TypeScript* | Tipagem estática do código |
| *TanStack Start v1* | Framework full-stack (roteamento em arquivos, SSR e funções de servidor) |
| *TanStack Router* | Roteamento da aplicação |
| *Vite* | Ferramenta de build e servidor de desenvolvimento |
| *Tailwind CSS v4* | Estilização utilitária e design system (tokens semânticos de cor) |
| *Lucide React* | Ícones da interface |
| *Componentes de UI no padrão shadcn/ui* (Radix UI, class-variance-authority, clsx, tailwind-merge) | Botões, campos de entrada e utilitários de estilo |

> O protótipo *não utiliza* backend, banco de dados, bibliotecas de autenticação ou gateway de pagamento real: todo o comportamento é simulado no navegador com estado do React (useState/useMemo).

## 6. UX/UI

As principais decisões de UX/UI do protótipo foram:

### Identidade visual

- Direção visual *"Warm teal wellness"*: verde-petróleo como cor primária e laranja acolhedor como destaque, transmitindo saúde, segurança, confiança e tranquilidade, sem aparência hospitalar;
- Tipografia moderna: *Sora* para títulos e *Inter* para textos;
- Estilo minimalista, com cartões organizados, cantos suaves, botões claros e bom uso de espaço em branco.

### Organização e hierarquia visual

- Divisão do agendamento em *etapas curtas*, uma decisão por tela, reduzindo a carga cognitiva;
- Indicador de progresso fixo mostrando onde o usuário está e o que falta;
- Uso de "eyebrows" (rótulos como "Passo 1", "Próxima etapa") e títulos grandes para orientar o usuário;
- Informações essenciais (preço, preparo, CRM, status) sempre visíveis nos cartões.

### Facilidade de navegação

- Botões grandes e de fácil identificação, com rótulos em linguagem simples;
- Botões de avanço desabilitados até a conclusão da escolha, prevenindo erros;
- Possibilidade de voltar e editar etapas anteriores sem perder os dados já informados.

### Acessibilidade e estados visuais

- Contraste elevado entre texto e fundo;
- Estados visuais bem definidos: *selecionado* (anel e preenchimento), *desabilitado* (esmaecido/riscado), *erro* (vermelho) e *sucesso* (verde);
- Mensagens de feedback com ícones e cores semânticas (role="alert" nas mensagens de erro/aviso);
- Atributos aria-label em elementos interativos e role="progressbar" no indicador de etapas;
- Respeito à preferência do sistema prefers-reduced-motion para reduzir animações.

## 7. Estrutura do projeto


├── index.html                          # Página HTML raiz
├── package.json                        # Dependências e scripts
├── src/
│   ├── components/
│   │   ├── clin-conecta-app.tsx        # Aplicação completa: telas, estado,
│   │   │                               #   navegação e dados de demonstração
│   │   └── ui/                         # Componentes de interface reutilizáveis
│   │       ├── button.tsx              #   (botão)
│   │       └── input.tsx               #   (campo de entrada)
│   ├── routes/
│   │   ├── __root.tsx                  # Shell raiz: fontes e metadados globais
│   │   └── index.tsx                   # Rota "/" com metadados da página
│   ├── styles.css                      # Design system: tokens de cor, fontes
│   │                                   #   e utilidades
│   ├── router.tsx                      # Configuração do roteador
│   ├── routeTree.gen.ts                # Árvore de rotas (gerado automaticamente)
│   ├── start.ts                        # Inicialização do TanStack Start
│   └── server.ts                       # Entrada do servidor
└── vite.config.ts                      # Configuração do Vite


Toda a lógica do protótipo está centralizada em src/components/clin-conecta-app.tsx, que define:

- Os *tipos* das telas (Screen), categorias (Category) e formas de pagamento (PaymentMethod);
- Os *dados fictícios* de consultas, exames e profissionais;
- O *controle de navegação* entre telas por estado do React;
- Os *componentes de cada tela*: autenticação, início, categoria, serviço, profissional, data, horário, pagamento (PIX e cartão), revisão, confirmação, meus agendamentos, perfil e administração.

## 8. Responsividade

O protótipo é responsivo e se adapta a computador, tablet e celular:

- *Grade fluida:* as grades de cards (serviços, profissionais, horários) se reorganizam conforme a largura da tela (sm:grid-cols-2, lg:grid-cols-3);
- *Cabeçalho adaptável:* no computador, apresenta logotipo, navegação e perfil distribuídos em três colunas; no celular, os itens de navegação são agrupados em um menu inferior compacto;
- *Indicador de progresso:* no celular, exibe apenas os números das etapas para economizar espaço; no computador, mostra também os nomes;
- *Pagamento:* a escolha da forma de pagamento e o painel correspondente ficam lado a lado no computador e empilhados no celular;
- *Formulários e tabelas:* campos e tabelas se ajustam à largura disponível, com rolagem horizontal na área administrativa quando necessário.

O layout foi verificado em resoluções de desktop (1280 px) e mobile (390 px), sem overflow horizontal.

## 9. Pagamentos

O fluxo de pagamento do protótipo *simula* a integração com o *Mercado Pago em modo sandbox*. Nenhuma cobrança real é realizada e nenhuma transação é enviada a serviço externo.

Funcionamento:

1. O paciente escolhe entre *PIX* e *Cartão*;
2. *PIX:* é exibido um QR Code fictício e um código PIX de teste. Ao clicar em "Simular pagamento", o status muda de "Aguardando pagamento" para "Pagamento aprovado";
3. *Cartão:* o paciente preenche número, nome, validade e CVV (apenas dados de teste). O protótipo permite simular tanto a *aprovação* quanto a *recusa* do pagamento; em caso de recusa, é exibida uma mensagem clara e o usuário pode tentar novamente ou trocar a forma de pagamento;
4. Somente com o pagamento *aprovado* o botão "Revisar agendamento" é habilitado;
5. Todas as telas de pagamento exibem o aviso de ambiente de teste: "Mercado Pago Sandbox · Ambiente seguro de teste" e "Esta é apenas uma simulação. Nenhuma cobrança real será realizada.".

## 10. Como executar o projeto

Pré-requisitos: *Node.js* (versão 20 ou superior) e *npm* instalados.

bash
# 1. Clonar o repositório
git clone <url-do-repositorio>
cd clinconecta

# 2. Instalar as dependências
npm install

# 3. Executar em modo de desenvolvimento
npm run dev


Após executar, acesse *http://localhost:8080* no navegador.

Comandos adicionais:

bash
npm run build     # gera a build de produção
npm run preview   # serve a build de produção localmente
npm run lint      # executa a verificação de código


> Não é necessária nenhuma configuração de variáveis de ambiente, banco de dados ou chaves de API: o protótipo funciona integralmente no navegador.

## 11. Equipe

| Integrante | Função |
| --- | --- |
| (nome do integrante) | (função) |
| (nome do integrante) | (função) |
| (nome do integrante) | (função) |
| (nome do integrante) | (função) |

## 12. Status do projeto

*Protótipo de alta fidelidade — projeto acadêmico em desenvolvimento.*

- O sistema é um protótipo navegável, com foco em UX/UI e representação visual;
- Não há backend, banco de dados, autenticação real nem integração real com o Mercado Pago;
- Os dados exibidos (paciente, profissionais, exames, consultas, agendamentos) são fictícios e não são persistidos — ao recarregar a página, o protótipo retorna à tela inicial;
- O protótipo serve como referência visual e de experiência para orientar a equipe de desenvolvimento nas próximas fases do projeto.

---

Projeto acadêmico do curso de Análise e Desenvolvimento de Sistemas.
