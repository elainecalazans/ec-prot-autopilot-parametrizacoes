# Autopilot — Parametrizações Transversais

Protótipo de interface para parametrização das regras transversais do módulo Autopilot da BHub. Permite configurar e gerenciar as regras que se aplicam a todas as trilhas (Fiscal, DP, Contábil etc.), bem como regras específicas por empresa.

## Funcionalidades

### Regras Gerais
- **Feriados**: cadastro de feriados federais, estaduais e municipais por vigência (2024–2027), com toggle para incluir/excluir do cálculo
- **INSS**: tabela de faixas e alíquotas progressivas por vigência
- **IRRF**: tabela de faixas, alíquotas e parcelas de dedução por vigência
- Suporte a múltiplas vigências com histórico e status (vigente / histórico / não iniciada)
- Busca de regras dentro de cada seção
- Confirmação antes de excluir registros

### Regras por Empresa (trilha Fiscal)
- **CFOP**: base nacional de CFOPs (saída/entrada, escopo, origem) com exceções por empresa
- **Fornecedor × Plano de Contas**: vínculo fornecedor → CFOP + Acumulador por empresa
- **Acumulador × Conta Contábil**: mapeamento de acumuladores para contas contábeis (padrão ou personalizado)
- **Simples Nacional**: tabela de anexos (I–V) por atividade com flag de uso

## Stack

- **React 19** + **Vite**
- **Tailwind CSS** (via CDN no protótipo)
- **Lucide React** para ícones
- Design System da BHub portado via `style` inline (tokens de cor, sombra, tipografia)

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

## Contexto

Este repositório é um protótipo funcional criado para validação de UX/produto com as equipes de Fiscal (Elizandra, Jeisy) e DP (Jeniffer Dauricio). Não há integração com backend — todos os dados são ilustrativos e definidos no próprio componente `AutopilotRegras.jsx`.

Decisões de produto relevantes registradas no código:
- CFOP e Simples Nacional (base nacional) vivem em "Regras por trilha > Fiscal", fora dos parâmetros por empresa — decisão da reunião de 17/07 (Fernando + Jeniffer)
- Exceções de CFOP por empresa permanecem dentro dos parâmetros por empresa
