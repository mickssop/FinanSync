# FinanSync 52 — resultado financeiro mensal

## O que mudou
O painel e os relatórios agora distinguem renda recebida, consumo pago, crédito recebido, principal pago, redução da dívida, juros, IOF, parcelamento, tarifas e economia comprovada. O CSV do relatório usa as mesmas linhas e componentes da tela.

**Resultado do mês = renda recebida − consumo pago − custos financeiros pagos.**
Empréstimos e maquininha vinculados não são renda. Pagamento de principal não é consumo. Cofres não são despesas. Transferências entre contas não são ganhos; somente sua tarifa entra no custo. Ajustes de saldo não são renda nem consumo. Garantias representam controle de limite/garantia, sem criar saída de dinheiro por si só.

O relatório adota a data efetiva do pagamento. Compras no cartão aparecem no consumo/custos quando a fatura é paga; as compras não são somadas novamente ao pagamento da fatura. Pagamentos parciais distribuem os componentes em centavos, sem repetir o custo integral. Essa é uma visão de pagamentos, não de consumo pela data da compra.

Os filtros de período, conta, cartão, moeda, categoria e busca limitam o relatório mensal. A visão de resultado sempre usa somente valores efetivados, independentemente do filtro de status usado nas listas de pendências. Os totais consolidados convertem moedas pelas cotações cadastradas; não são um cálculo histórico de ganho cambial. A variação de caixa das operações exclui ajustes, transferências internas e reavaliações cambiais.

## Maquininha e cartão
Informe o valor original antes de custos adicionados, o número de parcelas e, separadamente, juros, IOF, parcelamento e tarifas. Na maquininha, escolha para cada custo se foi descontado do recebimento ou adicionado às parcelas.

Exemplo: valor original R$ 1.000, tarifa retida R$ 30, juros financiados R$ 100, IOF financiado R$ 20 e parcelamento R$ 50. O líquido é R$ 970 e as faturas totalizam R$ 1.170. Em 10 parcelas, cada uma contém R$ 100 de principal, R$ 10 de juros, R$ 2 de IOF e R$ 5 de parcelamento. A tarifa retida de R$ 30 é reconhecida na data do recebimento e não sai novamente da conta.

O formulário confere líquido e custos; não inventa a composição quando os números não fecham. O resumo antes de salvar mostra o total nas faturas e o líquido esperado. Uma operação parcelada ainda não paga é excluída como grupo, incluindo seu crédito vinculado. Grupos com pagamentos não podem ser excluídos antes de desfazer os pagamentos. A edição individual de operações parceladas não está habilitada.

## Empréstimos
O cadastro usa o saldo financiado inicial **sem juros futuros**, líquido recebido, IOF e tarifas: saldo financiado = líquido + IOF + tarifas. Identifique se cada custo foi financiado ou descontado no início. Informe separadamente o recebimento e o primeiro vencimento.

O cálculo usa amortização mensal Price, com juros sobre a dívida restante. Principal, IOF e tarifas financiados são distribuídos dentro da amortização, e juros são separados. A última parcela zera o saldo e ajusta centavos; pode diferir da parcela regular informada. O formulário mostra primeira, última e total antes de salvar.

O cronograma é uma estimativa, não uma reprodução universal de contratos bancários: SAC, juros diários, carência e vencimentos irregulares não foram implementados. Confira com o contrato e edite a composição das parcelas quando necessário. O CET exibido permanece aproximado, baseado em parcelas mensais regulares; não é CET contratual calculado por dias.

## Antecipações e economia
Selecione parcelas pendentes do mesmo empréstimo que serão quitadas integralmente, a data e o valor efetivamente pago. Economia comprovada = soma original dessas parcelas − valor pago, já incluindo custos do pagamento. Não lance a economia como receita.

A opção automática estima a composição preservando o principal até o limite do valor pago e distribuindo o restante entre os custos originais. Se houver desconto de principal ou o banco fornecer os componentes, use Manual. A economia total é calculada pelos valores reais vinculados; a classificação automática dos componentes continua sendo estimada.

A redução da dívida é o saldo devedor das parcelas retiradas, que pode diferir do principal efetivamente pago quando existe desconto. As parcelas quitadas deixam de compor os próximos meses. Desfazer reabre as parcelas originais, remove a saída e a economia, e respeita os fechamentos mensais. Antecipações antigas sem vínculos continuam exigindo o backup anterior. Amortização parcial sem quitação integral das parcelas não foi implementada neste fluxo.

## Dados e testes
A base e os 73 arquivos de dados/backups recebidos foram preservados sem alteração. Operações antigas não são reinterpretadas nem têm juros e IOF inventados. Descontos antigos sem parcelas vinculadas não entram na economia comprovada; custos antigos sem discriminação são identificados no relatório.

Além das verificações antigas, há 27 regressões do código real e 68 verificações de resultado mensal, custos, datas efetivas, pagamentos parciais, amortização, antecipação e desfazer. A geração de HTML de todas as telas também foi exercitada com a base recebida. Não foi possível executar o aplicativo nativo no Windows nem inspecionar visualmente a interface neste ambiente.

Extraia a pasta inteira e abra 2_ABRIR_PROGRAMA.bat. Se lançou dados depois de enviar o ZIP, importe seu backup mais recente. Mantenha a versão anterior até conferir saldos e relatórios.

O saldo disponível desconta reservas e obrigações vencidas ou com vencimento até o fim do período escolhido, respeitando a conta selecionada. Busca, categoria e status não ocultam dívidas nesse cálculo.

## V52.1 — previsão em destaque
No início da visão geral, a previsão soma saldo atual e receitas pendentes/previstas e desconta gastos pendentes/previstos, fixos, faturas e parcelas de empréstimos. Mostra quanto deve sobrar ou faltar. Inclui atrasados até o fim do mês selecionado (ou data final do filtro). Os cofres são exibidos separadamente no disponível previsto após reservas. Valores pagos não entram novamente nas pendências. Não é garantia de recebimento: depende das entradas previstas se concretizarem.

Antes de atualizar, exporte o backup no aplicativo que está usando e importe esse backup nesta versão. O ZIP contém a base enviada anteriormente, não os lançamentos que você fez depois do envio.
