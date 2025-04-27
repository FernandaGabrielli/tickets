Sistema de Controle de Atendimento - Laboratórios Médicos UNINASSAU
Descrição

Sistema desenvolvido com Ionic Angular para gestão de filas em laboratórios médicos, permitindo a emissão de senhas, chamada de atendimentos e geração de relatórios. O sistema segue um modelo de priorização com três tipos de senhas e oferece diferentes interfaces para cada tipo de usuário (Agente Cliente, Agente Atendente e Agente Sistema).
Você pode visita-lo e testar no link: https://ticketsfg.vercel.app/tabs/tab1 
Funcionalidades Principais
Para Agente Cliente (AC)

    Emissão de senhas de atendimento com três tipos:

        SP (Senha Prioritária)

        SG (Senha Geral)

        SE (Retirada de Exames)

    Visualização do status atual do expediente (aberto/fechado)

Para Agente Atendente (AA)

    Painel de chamadas com:

        Próximo atendimento

        Guichês disponíveis

        Últimas 5 senhas chamadas

        Botão para chamar próxima senha

    Visualização de senhas na fila

Para Agente Sistema (AS)

    Geração de relatórios diários e mensais com:

        Total de atendimentos

        Tempo médio por tipo de senha

        Quantitativo de senhas emitidas e atendidas

        Exportação para Excel

    Configurações do sistema

Tecnologias Utilizadas

    Framework: Ionic Angular

    Backend: Node.js

    UI Components: Ionic Components

    Geração de Relatórios: ExcelJS (para exportação em Excel)

Regras de Negócio
Priorização de Atendimentos

    SP (Senha Prioritária) - maior prioridade (TM: 15±5 min)

    SE (Retirada de Exames) - atendimento rápido (TM: 1 min para 95% dos casos)

    SG (Senha Geral) - menor prioridade (TM: 5±3 min)

Padrão de Numeração

YYMMDD-PPSQ onde:

    YY: Ano (2 dígitos)

    MM: Mês (2 dígitos)

    DD: Dia (2 dígitos)

    PP: Tipo de senha (SP/SG/SE)

    SQ: Sequência diária

Expediente

    Horário de funcionamento: 7h às 17h

    Senhas não atendidas ao final do expediente são descartadas

Instalação

    Clone o repositório:
    git clone https://github.com/FernandaGabrielli/tickets

Instale as dependências:

    npm install
    
Configure o arquivo environment.ts com as informações do backend

Execute o projeto:

    ionic serve
    
Requisitos do Sistema

    Node.js 16+

    Ionic CLI 6+

    Angular 13+
