/*
=====================================================
MINHAS FINANÇAS
exportar.js
Exportação para Excel
=====================================================
*/


// =====================================================
// PREPARAR LANÇAMENTOS PARA EXCEL
// =====================================================

function prepararDadosParaExcel(
    lancamentos
) {

    return lancamentos.map(
        lancamento => {

            return {

                "Data":
                    formatarData(
                        lancamento.data
                    ),

                "Tipo":
                    lancamento.tipo === "entrada"
                        ? "Entrada"
                        : "Saída",

                "Descrição":
                    lancamento.descricao,

                "Categoria":
                    lancamento.categoria || "Sem categoria",

                "Forma de pagamento":
                    lancamento.pagamento || "Padrão",

                "Valor":
                    Number(
                        lancamento.valor
                    ) || 0,

                "Observação":
                    lancamento.observacao || ""

            };

        }
    );

}


// =====================================================
// PREPARAR RECEITAS PARA EXCEL
// =====================================================

function prepararReceitasParaExcel(
    lancamentos
) {

    const receitas =
        lancamentos.filter(
            lancamento =>
                lancamento.tipo === "entrada"
        );


    return receitas.map(
        lancamento => {

            return {

                "Data":
                    formatarData(
                        lancamento.data
                    ),

                "Descrição":
                    lancamento.descricao,

                "Valor":
                    Number(
                        lancamento.valor
                    ) || 0,

                "Observação":
                    lancamento.observacao || ""

            };

        }
    );

}


// =====================================================
// PREPARAR RESUMO PARA EXCEL
// =====================================================

function prepararResumoParaExcel(
    lancamentos
) {

    const resumo =
        calcularResumo(
            lancamentos
        );


    return [

        {
            "Indicador":
                "Total de entradas",

            "Valor":
                resumo.entradas
        },

        {
            "Indicador":
                "Total de saídas",

            "Valor":
                resumo.saidas
        },

        {
            "Indicador":
                "Saldo",

            "Valor":
                resumo.saldo
        },

        {
            "Indicador":
                "Quantidade de lançamentos",

            "Valor":
                lancamentos.length
        }

    ];

}


// =====================================================
// PREPARAR RESUMO POR CATEGORIA
// =====================================================

function prepararCategoriasParaExcel(
    lancamentos
) {

    const dados =
        calcularPorCategoria(
            lancamentos
        );


    return Object.keys(dados)
        .map(
            categoria => {

                return {

                    "Categoria":
                        categoria,

                    "Entradas":
                        dados[categoria].entrada,

                    "Saídas":
                        dados[categoria].saida,

                    "Saldo":
                        dados[categoria].entrada -
                        dados[categoria].saida

                };

            }
        );

}


// =====================================================
// NOME DO ARQUIVO
// =====================================================

function obterNomeArquivoExcel(
    dataInicial = "",
    dataFinal = ""
) {

    if (
        dataInicial &&
        dataFinal
    ) {

        return (
            "MinhasFinancas_" +
            dataInicial.replaceAll(
                "-",
                ""
            ) +
            "_" +
            dataFinal.replaceAll(
                "-",
                ""
            ) +
            ".xlsx"
        );

    }


    const hoje =
        new Date();


    const ano =
        hoje.getFullYear();


    const mes =
        String(
            hoje.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    return (
        "MinhasFinancas_" +
        ano +
        "_" +
        mes +
        ".xlsx"
    );

}


// =====================================================
// VERIFICAR BIBLIOTECA XLSX
// =====================================================

function verificarBibliotecaExcel() {

    if (
        typeof XLSX === "undefined"
    ) {

        console.error(
            "Biblioteca XLSX não encontrada."
        );

        return false;

    }


    return true;

}


// =====================================================
// FORMATAR VALORES MONETÁRIOS
// =====================================================

function formatarPlanilhaMoeda(
    planilha,
    coluna,
    quantidadeLinhas
) {

    for (
        let linha = 2;
        linha <= quantidadeLinhas;
        linha++
    ) {

        const celula =
            planilha[
                coluna + linha
            ];


        if (
            celula
        ) {

            celula.z =
                'R$ #,##0.00';

        }

    }

}


// =====================================================
// CRIAR ABA
// =====================================================

function adicionarPlanilha(
    workbook,
    dados,
    nome,
    larguras
) {

    const planilha =
        XLSX.utils.json_to_sheet(
            dados
        );


    planilha["!cols"] =
        larguras.map(
            largura => ({
                wch: largura
            })
        );


    XLSX.utils.book_append_sheet(
        workbook,
        planilha,
        nome
    );


    return planilha;

}


// =====================================================
// EXPORTAR PARA EXCEL
// =====================================================

function exportarParaExcel(
    lancamentos,
    dataInicial = "",
    dataFinal = ""
) {

    if (
        !verificarBibliotecaExcel()
    ) {

        alert(
            "A biblioteca Excel não foi carregada."
        );

        return false;

    }


    if (
        !lancamentos ||
        lancamentos.length === 0
    ) {

        alert(
            "Não existem lançamentos para exportar."
        );

        return false;

    }


    try {

        // =============================================
        // CRIAR WORKBOOK
        // =============================================

        const workbook =
            XLSX.utils.book_new();


        // =============================================
        // ABA LANÇAMENTOS
        // =============================================

        const dadosLancamentos =
            prepararDadosParaExcel(
                lancamentos
            );


        const planilhaLancamentos =
            adicionarPlanilha(

                workbook,

                dadosLancamentos,

                "Lançamentos",

                [
                    13,
                    12,
                    30,
                    20,
                    22,
                    15,
                    35
                ]

            );


        formatarPlanilhaMoeda(
            planilhaLancamentos,
            "F",
            dadosLancamentos.length + 1
        );


        // =============================================
        // ABA RESUMO
        // =============================================

        const dadosResumo =
            prepararResumoParaExcel(
                lancamentos
            );


        const planilhaResumo =
            adicionarPlanilha(

                workbook,

                dadosResumo,

                "Resumo",

                [
                    30,
                    18
                ]

            );


        // Entradas
        formatarPlanilhaMoeda(
            planilhaResumo,
            "B",
            2
        );


        // Saídas
        formatarPlanilhaMoeda(
            planilhaResumo,
            "B",
            3
        );


        // Saldo
        formatarPlanilhaMoeda(
            planilhaResumo,
            "B",
            4
        );


        // =============================================
        // ABA CATEGORIAS
        // =============================================

        const dadosCategorias =
            prepararCategoriasParaExcel(
                lancamentos
            );


        const planilhaCategorias =
            adicionarPlanilha(

                workbook,

                dadosCategorias,

                "Categorias",

                [
                    25,
                    18,
                    18,
                    18
                ]

            );


        formatarPlanilhaMoeda(
            planilhaCategorias,
            "B",
            dadosCategorias.length + 1
        );


        formatarPlanilhaMoeda(
            planilhaCategorias,
            "C",
            dadosCategorias.length + 1
        );


        formatarPlanilhaMoeda(
            planilhaCategorias,
            "D",
            dadosCategorias.length + 1
        );


        // =============================================
        // ABA RECEITAS
        // =============================================

        const dadosReceitas =
            prepararReceitasParaExcel(
                lancamentos
            );


        const planilhaReceitas =
            adicionarPlanilha(

                workbook,

                dadosReceitas,

                "Receitas",

                [
                    13,
                    35,
                    18,
                    40
                ]

            );


        if (
            dadosReceitas.length > 0
        ) {

            formatarPlanilhaMoeda(
                planilhaReceitas,
                "C",
                dadosReceitas.length + 1
            );

        }


        // =============================================
        // NOME DO ARQUIVO
        // =============================================

        const nomeArquivo =
            obterNomeArquivoExcel(
                dataInicial,
                dataFinal
            );


        // =============================================
        // GERAR XLSX
        // =============================================

        const arquivo =
            XLSX.write(
                workbook,
                {
                    bookType:
                        "xlsx",

                    type:
                        "array"
                }
            );


        const blob =
            new Blob(
                [
                    arquivo
                ],
                {
                    type:
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                }
            );


        // =============================================
        // COMPARTILHAR
        // =============================================

        compartilharArquivoExcel(
            blob,
            nomeArquivo
        );


        return true;

    }

    catch (
        erro
    ) {

        console.error(
            "Erro ao gerar Excel:",
            erro
        );


        alert(
            "Não foi possível gerar o arquivo Excel."
        );


        return false;

    }

}


// =====================================================
// COMPARTILHAR ARQUIVO
// =====================================================

async function compartilharArquivoExcel(
    blob,
    nomeArquivo
) {

    /*
    -----------------------------------------------------
    TENTA USAR O COMPARTILHAMENTO NATIVO DO IPHONE.
    -----------------------------------------------------
    */

    if (
        navigator.share &&
        navigator.canShare
    ) {

        try {

            const arquivo =
                new File(
                    [
                        blob
                    ],
                    nomeArquivo,
                    {
                        type:
                            blob.type
                    }
                );


            if (
                navigator.canShare(
                    {
                        files:
                            [
                                arquivo
                            ]
                    }
                )
            ) {

                await navigator.share(
                    {
                        files:
                            [
                                arquivo
                            ],

                        title:
                            "Minhas Finanças",

                        text:
                            "Relatório financeiro"
                    }
                );


                return;

            }

        }

        catch (
            erro
        ) {

            console.log(
                "Compartilhamento cancelado:",
                erro
            );

            return;

        }

    }


    // =============================================
    // FALLBACK
    // =============================================

    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        nomeArquivo;


    document.body.appendChild(
        link
    );


    link.click();


    document.body.removeChild(
        link
    );


    setTimeout(
        () => {

            URL.revokeObjectURL(
                url
            );

        },
        1000
    );

}