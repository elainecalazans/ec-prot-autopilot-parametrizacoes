# Cadastro de Empresas --- AutoPilot

> Documento de especificação funcional otimizado para desenvolvimento.

## Objetivo

Este documento é a **fonte de verdade** para o desenvolvimento das telas
de Cadastro de Empresas do AutoPilot.

Sempre que implementar ou revisar uma tela:

1.  Consulte este documento.
2.  Compare a implementação com os requisitos.
3.  Identifique campos ausentes ou divergentes.
4.  Não implemente funcionalidades fora do escopo.

------------------------------------------------------------------------

# 1. Dados Gerais

## Campos Essenciais

-   [ ] Razão Social *(Cockpit)*
-   [ ] CNPJ *(Cockpit)*
-   [ ] Natureza Jurídica *(Cockpit)*
-   [ ] Regime Tributário Federal *(Cockpit)*
-   [ ] Endereço Completo *(logradouro, número, complemento, bairro,
    município e UF)*
-   [ ] Inscrição Estadual *(Cockpit)*
-   [ ] Inscrição Municipal *(Cockpit)*
-   [ ] Contador Responsável *(novo vínculo com cadastro de Contadores)*
-   [ ] Início de Atividade
-   [ ] Status do Cliente (Ativo/Inativo)

## Campos Desejáveis

-   [ ] Cliente desde
-   [ ] Data de Inativação
-   [ ] Duração do Contrato

## Campos Reaproveitados do Cockpit

-   [ ] Certificado Digital
-   [ ] Observações Gerais

## Critério de Auditoria

A tela deve representar todos os campos acima, respeitando prioridade
Essencial e Desejável.

------------------------------------------------------------------------

# 2. Atividades

## Campos

-   [ ] CNAE Principal
-   [ ] CNAEs Secundários

Origem: Cockpit.

------------------------------------------------------------------------

# 3. Responsável Legal

## Campos

-   [ ] Nome
-   [ ] CPF
-   [ ] Cargo / Qualificação

Observação: Decisão pendente sobre permanecer no AutoPilot ou Cockpit.

------------------------------------------------------------------------

# 4. Quadro Societário

## Campos

-   [ ] Sócio
-   [ ] Percentual de Participação
-   [ ] Tipo de Sócio
-   [ ] Data de Entrada
-   [ ] Data de Saída

Relacionamento com Registro de Sócios.

------------------------------------------------------------------------

# 5. Empresa Centralizadora

## Campos

-   [ ] Empresa é Centralizadora (Sim/Não)
-   [ ] Vínculo Matriz x Filiais

Status: Desejável para Fase 1 quando existirem empresas com matriz e
filiais.

------------------------------------------------------------------------

# 6. Módulos Utilizados

## Essencial

-   [ ] Lista de módulos habilitados

## Fase 2

-   [ ] Perfil de Empresa
-   [ ] Importação de Perfil

------------------------------------------------------------------------

# 7. Cadastro de Contadores

## Campos

-   [ ] Nome
-   [ ] CRC
-   [ ] Dados de acesso
-   [ ] Credenciais necessárias

Utilizado como referência para o Contador Responsável da empresa.

------------------------------------------------------------------------

# 8. Cadastro de Sócios

## Campos

-   [ ] Nome
-   [ ] CPF
-   [ ] Dados de Contato

Cadastro único utilizado pelo Quadro Societário.

------------------------------------------------------------------------

# 9. Usuários e Permissões

## Essencial

-   [ ] Cadastro de Usuários
-   [ ] Nome
-   [ ] E-mail
-   [ ] Perfil

### Perfis

-   Administrador
-   Usuário

## Desejável

-   [ ] Controle de acesso por empresa

------------------------------------------------------------------------

# Decisões Pendentes

-   Responsável Legal ficará no AutoPilot ou Cockpit?
-   Módulos controlarão liberação de parâmetros?
-   Haverá Perfil de Empresa reutilizável?
-   Usuários serão compartilhados com o Cockpit?

------------------------------------------------------------------------

# Checklist para Claude Code

Para cada aba da interface:

## Verificar

-   Cobertura dos campos
-   Campos ausentes
-   Campos divergentes
-   Campos redundantes
-   Aderência às prioridades
-   Consistência com o Cockpit
-   Qualidade da UX

## Relatório esperado

-   Campos implementados
-   Campos ausentes
-   Divergências
-   Melhorias sugeridas
-   Percentual de cobertura

**Não implementar alterações durante a auditoria.**
