# FinanSync V53 — correções da auditoria da versão 52.1

## Atualização sem perder lançamentos novos
Antes de atualizar, exporte o backup JSON no aplicativo que você usa hoje. Extraia a V53 em outra pasta, execute 2_ABRIR_PROGRAMA.bat e importe esse backup. O ZIP conserva a base originalmente enviada, não os lançamentos posteriores feitos no seu computador. Mantenha a versão anterior até conferir seus saldos.
O nome do executável permanece FinanSync V51.exe por compatibilidade com o pacote original; a interface e os arquivos de aplicação são V53.

## Nove correções verificadas
1. **Previsão em um cálculo comum.** Pendentes usam o vencimento; efetivados usam a data do pagamento/recebimento. Uma data efetiva indevidamente herdada em um registro antigo pendente é ignorada. Novos pendentes não guardam data de pagamento.
2. **Corte por período.** Pagamentos posteriores não entram no saldo efetivado de um mês anterior. Se o vencimento ocorreu antes do prazo selecionado e o pagamento ocorreu depois, a obrigação permanece na previsão daquele prazo. Faturas também respeitam a data do pagamento; antecipações posteriores preservam as parcelas originais nos cálculos anteriores ao pagamento.
3. **Gravação e memória consistentes.** Formulários, pagamento rápido, mudança de status dos fixos, exclusões, importação e desfazer antecipação usam uma proteção comum. Falha de gravação desfaz a mudança em memória; uma segunda alteração aguarda a conclusão da primeira. A validação estrutural é feita antes de escrever, inclusive em testes.
4. **Datas protegidas em meses fechados.** Edição/exclusão verificam vencimento, data efetiva, referência de fatura e recebimento quando presentes. Mudanças de saldo inicial ou moeda de uma conta com fechamentos exigem reabertura; ajuste corrente deve ser lançado como ajuste no mês aberto.
5. **Empréstimos e CET.** Parcela informada incompatível com taxa e prazo não pode criar uma última parcela inesperadamente alta. O usuário pode conferir o contrato ou deixar a parcela vazia para o cálculo automático. O CET estimado usa todos os valores do cronograma, inclusive a última parcela. Cronogramas antigos sem os dados necessários exibem pedido de conferência.
6. **Classificação explícita de custos.** Juros, IOF, parcelamento e tarifas são escolhidos no lançamento avulso. A escolha é preservada na edição e alimenta o relatório. Registros antigos ambíguos não são reclassificados por adivinhação: edite-os para informar o componente.
7. **Cotação ausente não vale 1.** Totais que dependem de uma moeda sem cotação ficam indisponíveis e aparece um aviso para cadastrar a cotação. Os saldos na moeda original continuam consultáveis.
8. **Fixos contínuos.** Um fixo sem término continua sendo projetado ao navegar para meses distantes; não termina silenciosamente depois de 24 meses. Data final e quantidade explícita de repetições, quando cadastradas, continuam respeitadas. A visão de todos os períodos usa um horizonte explícito, não uma soma infinita de compromissos.
9. **Compra convertida em parcelada.** Ao editar uma compra de uma parcela para várias, cada parcela recebe um identificador diferente e a soma dos centavos é preservada. Operações já parceladas/com pagamentos continuam protegidas pelas regras de edição do grupo.

## Como interpretar os valores
A previsão e o saldo efetivado têm uma data de corte indicada na tela. Para um mês anterior, o saldo efetivado é o valor até aquele prazo, e não o saldo de hoje. Previsão = saldo efetivado até o prazo + recebíveis em aberto até o prazo − obrigações em aberto até o prazo. Cofres aparecem separadamente.
O saldo bruto da conta mostra seus movimentos efetivados cadastrados. O relatório de renda/consumo continua pela data efetiva, conforme o guia anterior. As cotações são informadas pelo usuário; não são cotações bancárias históricas automáticas.

## Verificações realizadas
- 48 verificações novas para os nove problemas: dados reais da função de salvamento, identificadores únicos, erro de disco, botões de pagamento/fixo/exclusão, fechamento por data efetiva, parcelas incompatíveis, CET e igualdade das previsões.
- 27 verificações de regressão e 68 verificações financeiras anteriores.
- Verificações legadas e sintaxe dos módulos.
- Leitura e geração de HTML de todas as telas usando a base originalmente enviada.
- Integridade do ZIP e preservação exata dos arquivos originais de dados, backups e executável Windows.

A execução nativa no Windows e a inspeção visual continuam não verificadas neste ambiente. Estes testes cobrem os cenários descritos; não representam garantia de ausência de outros erros.

## Limitações mantidas
O empréstimo usa Price mensal. Juros diários, carência, SAC e calendário irregular não são reproduzidos automaticamente. O CET é uma estimativa mensal anualizada, não o CET contratual por dias. Antecipações quitam parcelas inteiras; o detalhamento automático dos custos de uma antecipação é estimado, com opção manual. Alterações antigas sem histórico suficiente não permitem reconstruir todas as versões passadas de um cadastro. Nenhuma composição antiga foi inventada nem seus arquivos de dados foram recalculados no ZIP.
