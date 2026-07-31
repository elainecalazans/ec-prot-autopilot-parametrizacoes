# AutoPilot

## Fonte da verdade

Sempre que trabalhar em uma funcionalidade:

1. Identifique a documentação correspondente em /docs.
2. Leia a documentação antes de alterar código.
3. Utilize-a como fonte oficial dos requisitos.

## Fluxo obrigatório

1. Ler documentação
2. Auditar implementação
3. Relatar divergências
4. Implementar somente após validação
5. Executar aplicação
6. Validar visualmente
7. Garantir ausência de regressões

## Restrições

- Não alterar Design System.
- Não criar componentes duplicados.
- Reutilizar componentes existentes.
- Manter consistência visual.

## Auditorias

Antes de auditar campos de uma tela:

1. Ler toda a documentação da funcionalidade.
2. Identificar todas as funcionalidades previstas.
3. Confirmar que cada funcionalidade possui representação na interface.

Somente depois iniciar a comparação campo a campo.

Caso alguma funcionalidade prevista não exista na interface, reportar imediatamente antes de continuar a auditoria.