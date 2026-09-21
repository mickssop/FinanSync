# FinanSync 51.1

## Correções
- Datas mensais usam o último dia disponível, sem pular fevereiro e meses de 30 dias.
- Data inicial usa o dia local do computador.
- Valores como `1.000` são mil reais; valores inválidos são rejeitados.
- Fatura tem um mês de referência separado do dia do pagamento.
- Pagamento editado/excluído recalcula a distribuição entre as compras.
- Fechamento da fatura considera o mês anterior quando o vencimento ocorre antes do dia de fechamento.
- Marcar um fixo como pago preserva valor, conta, descrição e data ajustados daquele mês.
- Modais não acumulam eventos de envio; botão Salvar bloqueia cliques durante a gravação.
- Falha ao salvar formulário reverte a alteração em memória.
- Busca mantém o foco durante a digitação; Limpar filtros limpa todos os filtros adicionais.
- Edição de cofres, fechamentos e transferências preserva as opções selecionadas.
- Ajuste positivo acrescenta saldo e negativo retira saldo; informe a diferença, não o saldo final desejado.
- Edição verifica também a data antiga em meses fechados.
- Contas com cartões, transferências e outros vínculos não podem ser excluídas.
- Recebimentos vinculados a empréstimos/maquininha devem ser editados pela operação de origem.
- Histórico guarda cópias independentes dos registros.
- Backups importados/restaurados têm validação estrutural antes da gravação.
- Duas instâncias do aplicativo não podem sobrescrever a mesma base simultaneamente.
- Exportação de relatório separa principal e custos em colunas, sem somá-los novamente; compras e pagamento de fatura não são duplicados nos agrupamentos.
- Registros cancelados não compõem receitas/despesas do resumo.

## Opções de uso
- Novo registro organizado em Dia a dia, Cartões, Planejamento e Cadastros.
- Status selecionável nos formulários, sem necessidade de digitar.
- Duplicar abre o formulário para revisão antes de salvar.
- Mês da fatura explícito no pagamento.
- Escape fecha o formulário; destaque de foco e ações de formulário mais acessíveis.
- Mensagem clara na abertura de uma base inválida.

## Antecipações
A versão anterior alterava parcelas ao antecipar, mas editar/excluir a antecipação não desfazia essas alterações. Essas ações agora são bloqueadas. Para desfazer uma antecipação já aplicada, restaure o backup anterior. A reconstrução automática de todo o histórico de amortização não está implementada.

## Validação e limites
Os testes antigos continuam incluídos. O novo test_regressions.mjs executa funções reais do aplicativo, cobrindo datas, valores, parcelamento, pagamento de fatura em outro mês, recálculo, fixos, fechamento, importação inválida, vínculos e falha de gravação.
A base e todos os backups recebidos foram preservados sem alterações. A base recebida passou na validação estrutural e na geração de HTML de todas as telas.
O executável de Windows fornecido no ZIP original foi preservado; seus arquivos de aplicação em resources/app foram atualizados. A execução nativa do Windows e a inspeção visual não puderam ser realizadas neste ambiente. Confira os saldos após importar seus dados.
Esta revisão não é uma auditoria de todas as regras financeiras. Os cronogramas/CET de empréstimos continuam sendo estimativas: compare principal, IOF, taxas, datas e parcelas com o contrato. Bases antigas não têm cronogramas recalculados automaticamente.
As versões de Electron e das ferramentas foram mantidas; atualização de dependências não fez parte desta revisão.
