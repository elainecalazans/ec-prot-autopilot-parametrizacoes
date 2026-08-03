# Cadastro de Empresas — Especificação do estado atual (as-built)

> Este documento descreve **o que existe hoje** no protótipo do Cadastro de Empresas do AutoPilot. Ele não é a especificação original de requisitos — é o retrato funcional da implementação, para que Product Managers validem o que foi construído e planejem as próximas evoluções. Não repete o conteúdo do documento de requisitos original; documenta apenas o comportamento real da tela.

## Visão geral

O Cadastro de Empresas é composto por duas telas:

1. **Listagem de Empresas** — tela inicial, mostra todas as empresas cadastradas.
2. **Cadastro de uma empresa** — aberto ao clicar em uma empresa da listagem, organizado em **6 abas internas**: Dados Gerais, Atividades, Sócios, Contadores, Empresa Centralizadora e Módulos.

Não existe mais uma navegação de nível superior por "Empresas / Sócios / Contadores" — Sócios e Contadores só existem como abas dentro do cadastro de uma empresa específica.

------------------------------------------------------------------------

## 1. Listagem de Empresas

### Objetivo
Permitir localizar rapidamente uma empresa cadastrada e navegar até seu cadastro completo.

### Comportamento
- Empresas matrizes aparecem com suas filiais agrupadas visualmente e ocultas por padrão; um botão permite expandir/recolher a lista de filiais daquela matriz sem sair da tela.
- Empresas sem relação de matriz/filial ("avulsas") aparecem como linhas simples, misturadas com as matrizes na mesma lista.
- A linha inteira de cada empresa é clicável e leva direto ao cadastro completo dela.
- Existe um filtro de busca (por nome, código ou CNPJ), um filtro de status (Todas / Ativas / Inativas) e um filtro de tipo (Todas / Matrizes / Filiais). Ao escolher "Filiais", a lista mostra todas as filiais soltas, sem o agrupamento por matriz.
- Existe ordenação por Empresa, Código, CNPJ ou Contador responsável.
- A lista é paginada ("Mostrar mais") tanto no nível principal quanto dentro de cada matriz expandida (paginação própria para filiais).
- Ao trocar qualquer filtro, busca ou ordenação, a lista sempre volta a mostrar a primeira página.
- Existe um estado vazio ("Nenhuma empresa encontrada para os filtros selecionados") com atalho para limpar os filtros aplicados.

### Telas
Uma única tela, com barra de filtros no topo e tabela de resultados abaixo.

### Campos implementados
Código, Empresa (nome, com indicação visual de "Matriz"/"Filial" e contagem de filiais quando aplicável), CNPJ, Contador responsável, Status (Ativa/Inativa).

### Regras de negócio implementadas
- Uma filial só aparece agrupada sob sua matriz quando o filtro de tipo está em "Todas" ou "Matrizes"; no filtro "Filiais" ela aparece solta.
- O contador responsável mostrado na listagem é o mesmo vinculado na aba Contadores do cadastro daquela empresa.

### Integrações
Nenhuma integração externa nesta tela — os dados vêm da mesma base usada pelo cadastro individual de cada empresa.

### Pendências
Nenhuma pendência funcional conhecida nesta tela.

### Itens de Fase 2
Não há itens de Fase 2 previstos especificamente para a listagem.

### Decisões de UX adotadas
- A linha inteira é clicável (em vez de um botão "Ver cadastro"), com um ícone de seta como indicação visual residual da ação — decisão tomada para reduzir peso visual e ambiguidade de ter dois elementos clicáveis fazendo a mesma coisa.
- O botão de expandir/recolher filiais é separado e tem sua própria área de clique, para não competir com o clique de abrir o cadastro da matriz.
- A expansão/recolhimento das filiais é animada (altura e rotação do ícone), para deixar clara a relação de hierarquia entre matriz e filiais.
- Linhas de filiais escondidas (recolhidas) ficam fora da navegação por teclado — só é possível chegar até elas com Tab depois de expandir o grupo, para não haver "saltos invisíveis" de foco.

------------------------------------------------------------------------

## 2. Dados Gerais

### Objetivo
Apresentar os dados cadastrais centrais da empresa (identificação, localização e relacionamento comercial), tal como vêm do Cockpit.

### Comportamento
A aba é organizada em blocos temáticos: Identificação, Inscrições, Contato e localização, Relacionamento e Complementares. Toda a aba é somente leitura, com um aviso de origem dos dados e um atalho para editar no Cockpit.

### Telas
Uma única tela (aba "Dados Gerais" dentro do cadastro da empresa).

### Campos implementados
- **Identificação**: Razão social, Nome fantasia, Natureza jurídica, CNPJ, Regime tributário federal.
- **Inscrições**: Inscrição estadual, Inscrição municipal.
- **Contato e localização**: Telefone, E-mail, Endereço completo (logradouro, número, complemento, bairro, município, UF e CEP, apresentados como uma única linha de texto).
- **Relacionamento**: Contador responsável (nome + CRC, com atalho "Ver em Contadores"), Cliente desde, Status do cliente, Início de atividade, Data de inativação (só aparece quando o status é inativo), Duração do contrato.
- **Complementares**: Certificado digital, Observações gerais (com estado vazio "Nenhuma observação cadastrada." quando não há texto).

### Regras de negócio implementadas
- "Data de inativação" só é exibida quando o status do cliente é "Inativo" — para clientes ativos, o campo não aparece.
- O contador responsável exibido aqui é sempre o mesmo mostrado na aba Contadores; um atalho leva direto para lá.

### Integrações
Dados de origem do Cockpit (indicado explicitamente na tela). Um botão "Editar no Cockpit" registra a intenção de abrir a tela correspondente no Cockpit para edição — a navegação real para o Cockpit ainda não está conectada a uma URL de destino; é um ponto de integração já preparado, pendente da definição do link real.

### Pendências
Não existe, em nenhuma tela do sistema, uma forma de alterar qual contador é o responsável por uma empresa — a aba mostra o vínculo, mas não permite geri-lo.

### Itens de Fase 2
Nenhum previsto para esta aba.

### Decisões de UX adotadas
- O aviso de "somente leitura" e o botão "Editar no Cockpit" só aparecem nesta aba e na aba Atividades — as únicas duas com conteúdo de fato espelhado do Cockpit. As demais abas (Sócios, Contadores, Empresa Centralizadora, Módulos) não mostram esse aviso.
- Optou-se por não duplicar a razão social da empresa dentro do card (ela já aparece uma vez no cabeçalho do cadastro) — o título do card é genérico ("Dados gerais").
- O card tem largura limitada (não ocupa a tela inteira) porque o conteúdo é uma lista de campos de texto, não uma tabela — segue o mesmo padrão da aba Atividades.

------------------------------------------------------------------------

## 3. Atividades

### Objetivo
Mostrar a classificação de atividade econômica (CNAE) da empresa.

### Comportamento
Aba somente leitura, com o mesmo aviso de origem e o mesmo botão "Editar no Cockpit" da aba Dados Gerais.

### Telas
Uma única tela (aba "Atividades").

### Campos implementados
CNAE principal, CNAEs secundários (lista; quando vazia, mostra "Nenhum CNAE secundário cadastrado.").

### Regras de negócio implementadas
Nenhuma regra de negócio além da exibição condicional do estado vazio de CNAEs secundários.

### Integrações
Dados de origem do Cockpit, com o mesmo comportamento de atalho "Editar no Cockpit" descrito na aba Dados Gerais.

### Pendências
Os CNAEs são mostrados apenas pelo código (ex.: "2599-3/99"), sem a descrição textual da atividade — não há indicação de que essa descrição deva ou não existir.

### Itens de Fase 2
Nenhum previsto para esta aba.

### Decisões de UX adotadas
Mesmo padrão visual e de "somente leitura" da aba Dados Gerais, por serem as duas únicas abas com conteúdo espelhado do Cockpit.

------------------------------------------------------------------------

## 4. Sócios

### Objetivo
Mostrar e gerenciar quais sócios participam do capital social da empresa, e em qual proporção.

### Comportamento
A aba lista as participações societárias vinculadas à empresa aberta. É possível vincular um sócio já existente (de um registro compartilhado entre todas as empresas), editar os dados dessa participação, ou remover o vínculo. Não é uma aba de "somente leitura" — é a única, junto com Empresa Centralizadora, que permite alterações diretamente pelo AutoPilot.

### Telas
- Aba "Sócios" dentro do cadastro da empresa, com a tabela de participações.
- Painel lateral ("Adicionar sócio" / "Editar participação") para criar ou editar um vínculo.

### Campos implementados
Sócio (nome), CPF, Contato (telefone e e-mail), Tipo de sócio (Administrador ou Cotista), Participação (%), Quotas integralizadas, Data de entrada, Data de saída.

### Regras de negócio implementadas
- Um mesmo sócio pode ter participação em mais de uma empresa — o cadastro de sócios é único e compartilhado; cada empresa só referencia esse registro com uma participação própria.
- "Adicionar sócio" vincula um sócio **já existente** no registro compartilhado à empresa aberta, com percentual, quotas, tipo e datas próprios dessa empresa. Um mesmo sócio não pode ser vinculado duas vezes à mesma empresa.
- "Editar" altera os dados da participação (percentual, quotas, tipo, datas) sem afetar as participações desse sócio em outras empresas.
- "Excluir" remove apenas o vínculo do sócio com a empresa aberta — o sócio continua existindo no registro compartilhado e mantém suas participações em outras empresas.
- "Data de saída" fica em branco (mostrada como "—" na tabela) enquanto o sócio continuar ativo na empresa.

### Integrações
Nenhuma integração externa — dado nativo do AutoPilot (não vem do Cockpit).

### Pendências
Não existe, em nenhuma tela, uma forma de cadastrar um sócio **novo** (nome, CPF e contato do zero) — só é possível vincular alguém que já exista no registro compartilhado. Na prática, hoje o conjunto de sócios disponíveis é fixo.

### Itens de Fase 2
Nenhum previsto para esta aba.

### Decisões de UX adotadas
- O botão de ação se chama "+ Adicionar sócio", mas o comportamento real é vincular uma participação — não criar um sócio novo. Essa nomenclatura foi mantida por ser a mais natural do ponto de vista do usuário que está no cadastro de uma empresa, mesmo sabendo que tecnicamente é uma ação de vínculo.
- Os campos "Tipo de sócio", "Data de entrada" e "Data de saída" foram tratados como atributos da participação (o vínculo entre sócio e empresa), não do sócio em si — um mesmo sócio pode ser "Administrador" em uma empresa e "Cotista" em outra, com datas de entrada diferentes em cada uma.
- O contato (telefone/e-mail) foi tratado como atributo do sócio (não muda entre empresas), e por isso é o mesmo em todas as participações daquele sócio.
- As ações "editar" e "excluir" foram implementadas como botões de texto simples (sem ícone), com sublinhado ao passar o mouse e contorno de foco visível ao navegar por teclado — consistente com o mesmo tratamento dado a outros links de ação no restante da tela.

------------------------------------------------------------------------

## 5. Contadores

### Objetivo
Mostrar quais contadores estão habilitados a atuar sobre a empresa aberta (por exemplo, para assinar demonstrativos).

### Comportamento
Lista simples e somente leitura dos contadores vinculados à empresa. Não há nenhuma ação de cadastro, edição ou vínculo nesta aba.

### Telas
Uma única tela (aba "Contadores").

### Campos implementados
Nome, CPF, CRC.

### Regras de negócio implementadas
Um contador aparece nesta lista quando a empresa aberta está entre as empresas que ele atende — a mesma informação usada para preencher "Contador responsável" na aba Dados Gerais e na listagem principal.

### Integrações
Nenhuma integração externa — dado nativo do AutoPilot.

### Pendências
- Não foram implementados os campos "Dados de acesso" e "Credenciais necessárias" previstos na especificação original — o significado exato desses campos ainda não está definido claramente o suficiente para implementar com segurança (em especial se envolvem ou não login/senha).
- Não existe, em nenhuma tela, uma forma de cadastrar um contador novo, editar os dados de um contador existente, ou alterar quais empresas ele atende.

### Itens de Fase 2
Nenhum previsto para esta aba.

### Decisões de UX adotadas
Mantido como tabela simples de 3 colunas, sem coluna de ações — reforça visualmente que é uma tela apenas de consulta, sem induzir o usuário a procurar um botão de editar que não existe.

------------------------------------------------------------------------

## 6. Empresa Centralizadora

### Objetivo
Indicar se a empresa participa de uma relação de matriz e filiais e, quando participa, qual empresa do grupo centraliza as informações para fins de consolidação contábil.

### Comportamento
Mostra uma tabela com todas as empresas do mesmo grupo (matriz + filiais) quando existe essa relação, ou apenas a própria empresa quando não existe. Para cada empresa do grupo, é possível classificar seu papel (Centralizadora/Filial/Não se aplica) diretamente na tabela.

### Telas
Uma única tela (aba "Empresa Centralizadora").

### Campos implementados
Código, Razão social, Tipo de inscrição, Inscrição, Status, Centralização (seletor com as opções "Centralizadora (Matriz)", "Filial" e "Não se aplica").

### Regras de negócio implementadas
- Quando a empresa aberta não tem nenhuma relação de matriz/filial, a tela mostra apenas ela mesma, classificada como "Não se aplica".
- Quando existe relação, a tabela mostra o grupo inteiro (a matriz e todas as suas filiais), com a linha da empresa aberta destacada visualmente.
- A classificação pode ser alterada a partir de qualquer linha do grupo, refletindo na visualização de qualquer empresa daquele grupo.

### Integrações
Nenhuma integração externa — dado nativo do AutoPilot.

### Pendências
Não há validação que impeça duas empresas do mesmo grupo de serem marcadas como "Centralizadora" ao mesmo tempo.

### Itens de Fase 2
Nenhum previsto para esta aba (a especificação original trata esta funcionalidade inteira como desejável, não essencial, para esta fase).

### Decisões de UX adotadas
- "Empresa é Centralizadora (Sim/Não)" foi implementado como uma classificação de três opções (Centralizadora/Filial/Não se aplica) em vez de um campo binário Sim/Não — decisão tomada porque o conceito de "filial" também precisa ser representado explicitamente para a tabela do grupo fazer sentido.
- Um texto de contexto no rodapé explica por que esse campo é considerado importante para o futuro (consolidação contábil), já que hoje há pouca variedade de exemplos com matriz/filial na base.

------------------------------------------------------------------------

## 7. Módulos

### Objetivo
Mostrar quais módulos do AutoPilot estão habilitados para a empresa aberta.

### Comportamento
Lista somente leitura com os módulos hoje disponíveis no AutoPilot, indicando para cada um se está habilitado ou não para aquela empresa.

### Telas
Uma única tela (aba "Módulos").

### Campos implementados
Módulo (Fiscal, DP, Contábil) e seu status (Habilitado / Não habilitado) para a empresa aberta.

### Regras de negócio implementadas
Os três módulos são sempre listados para toda empresa, independentemente de quantos estejam habilitados — o objetivo é sempre mostrar o catálogo completo e o status de cada item, não apenas os habilitados.

### Integrações
Nenhuma integração externa — dado nativo do AutoPilot.

### Pendências
Nenhuma pendência dentro do escopo essencial desta aba.

### Itens de Fase 2
Explicitamente não implementados nesta aba, por estarem fora do escopo essencial: Perfil de Empresa, Importação de Perfil, Modelos pré-configurados.

### Decisões de UX adotadas
- Cada módulo é apresentado como uma linha própria, com o nome à esquerda e uma etiqueta de status à direita (verde para "Habilitado", neutra para "Não habilitado") — mesma linguagem visual já usada para comunicar status em outras partes da tela (ex.: Ativa/Inativa).
- Não há nenhum controle de edição (sem caixas de marcação, sem botões "Todos"/"Nenhum"/"Inverter") — a tela é estritamente de consulta, sem indução a uma ação de gestão que não existe.

------------------------------------------------------------------------

## Divergências em relação aos requisitos originais

Durante a implementação foram tomadas as seguintes decisões, que resultam em uma representação diferente (não necessariamente incompleta) do que estava descrito originalmente:

- **Endereço Completo** foi implementado como uma única linha de texto formatada (logradouro, número, complemento, bairro, município, UF e CEP), em vez de campos separados e rotulados individualmente.
- **Contador Responsável** (Dados Gerais) foi implementado apenas como exibição do vínculo atual + atalho de navegação para a aba Contadores — não como uma tela de gestão desse vínculo ("novo vínculo com cadastro de Contadores").
- **Nome fantasia, Telefone e E-mail** foram incluídos na aba Dados Gerais, além dos campos originalmente listados para essa aba.
- **Empresa é Centralizadora (Sim/Não)** foi implementado como uma classificação de três estados (Centralizadora/Filial/Não se aplica), não como um campo binário.
- **"+ Adicionar sócio"** vincula um sócio já existente no registro compartilhado — não abre um formulário de cadastro de um sócio novo.
- **CPF** foi incluído na aba Contadores, além dos campos originalmente listados.
- **Dados de acesso** e **Credenciais necessárias** (aba Contadores) não foram implementados — o significado desses campos foi considerado ambíguo demais para implementar sem uma definição de produto mais clara.
- Toda a aba **Dados Gerais/Atividades** foi tratada como 100% somente leitura, inclusive para os campos que a especificação original não marcava explicitamente como vindos do Cockpit (Contador Responsável, Início de Atividade, Status do Cliente, Cliente desde, Data de Inativação, Duração do Contrato).

------------------------------------------------------------------------

## Pendências gerais (fora do escopo desta implementação)

- **Responsável Legal** (Nome, CPF, Cargo/Qualificação) — não implementado; a própria especificação original marca essa decisão como pendente (permanecer no AutoPilot ou no Cockpit).
- **Usuários e Permissões** (Cadastro de Usuários: Nome, E-mail, Perfil, com perfis Administrador/Usuário) — classificado como Essencial na especificação original, mas ainda sem nenhuma tela implementada em todo o Cadastro de Empresas.
- **Cadastro de um sócio novo** (fora do vínculo com uma empresa específica) — não implementado.
- **Cadastro/edição de um contador novo**, e gestão de quais empresas ele atende — não implementado.
- **Dados de acesso / Credenciais necessárias** de Contadores — aguardando definição de produto.
- **Validação de unicidade** da empresa centralizadora dentro de um mesmo grupo matriz/filial — não implementada.

------------------------------------------------------------------------

## Próximas evoluções (Fase 2)

Itens previstos na especificação original para fases futuras, conscientemente não implementados agora:

- Perfil de Empresa (aba Módulos)
- Importação de Perfil (aba Módulos)
- Modelos pré-configurados (aba Módulos)
- Controle de acesso por empresa (Usuários e Permissões, quando essa funcionalidade for implementada)
