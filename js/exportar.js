// =====================================================
// MINHAS FINANÇAS
// exportar.js
// Exportação para Excel
// Compatível com Android, iPhone e computador
// =====================================================


// =====================================================
// EXPORTAR PARA EXCEL
// =====================================================

async function exportarParaExcel(
    lancamentos
) {

    try {

        // =================================================
        // VERIFICAR BIBLIOTECA XLSX
        // =================================================

        if (
            typeof XLSX ===
            "undefined"
        ) {

            throw new Error(
                "A biblioteca Excel não foi carregada."
            );

        }


        // =================================================
        // PLANILHA DE LANÇAMENTOS
        // =================================================

        const dadosLancamentos =
            lancamentos.map(
                lancamento => ({

                    Data:
                        formatarData(
                            lancamento.data
                        ),

                    Tipo:
                        lancamento.tipo ===
                        "entrada"
                            ? "Entrada"
                            : "Saída",

                    Descrição:
                        lancamento.descricao,

                    Categoria:
                        lancamento.categoria,

                    Pagamento:
                        lancamento.pagamento,

                    Valor:
                        Number(
                            lancamento.valor
                        ),

                    Observação:
                        lancamento.observacao ||
                        ""

                })
            );


        const planilhaLancamentos =
            XLSX.utils.json_to_sheet(
                dadosLancamentos
            );


        // =================================================
        // LARGURA DAS COLUNAS
        // =================================================

        planilhaLancamentos["!cols"] = [

            {
                wch: 12
            },

            {
                wch: 12
            },

            {
                wch: 30
            },

            {
                wch: 20
            },

            {
                wch: 18
            },

            {
                wch: 15
            },

            {
                wch: 40
            }

        ];


        // =================================================
        // RESUMO
        // =================================================

        const resumo =
            calcularResumo(
                lancamentos
            );


        const dadosResumo = [

            {
                Item:
                    "Total de entradas",

                Valor:
                    Number(
                        resumo.entradas
                    )

            },

            {
                Item:
                    "Total de saídas",

                Valor:
                    Number(
                        resumo.saidas
                    )

            },

            {
                Item:
                    "Saldo",

                Valor:
                    Number(
                        resumo.saldo
                    )

            },

            {
                Item:
                    "Quantidade de lançamentos",

                Valor:
                    lancamentos.length

            }

        ];


        const planilhaResumo =
            XLSX.utils.json_to_sheet(
                dadosResumo
            );


        planilhaResumo["!cols"] = [

            {
                wch: 30
            },

            {
                wch: 20
            }

        ];


        // =================================================
        // CATEGORIAS
        // =================================================

        const dadosCategorias =
            calcularPorCategoria(
                lancamentos
            );


        const categorias =
            Object.keys(
                dadosCategorias
            );


        const linhasCategorias =
            categorias.map(
                categoria => {

                    const entrada =
                        Number(
                            dadosCategorias[
                                categoria
                            ].entrada
                        );


                    const saida =
                        Number(
                            dadosCategorias[
                                categoria
                            ].saida
                        );


                    return {

                        Categoria:
                            categoria,

                        Entradas:
                            entrada,

                        Saídas:
                            saida,

                        Saldo:
                            entrada -
                            saida

                    };

                }
            );


        const planilhaCategorias =
            XLSX.utils.json_to_sheet(
                linhasCategorias
            );


        planilhaCategorias["!cols"] = [

            {
                wch: 25
            },

            {
                wch: 18
            },

            {
                wch: 18
            },

            {
                wch: 18
            }

        ];


        // =================================================
        // RECEITAS
        // =================================================

        const dadosReceitas =
            lancamentos
                .filter(
                    lancamento =>
                        lancamento.tipo ===
                        "entrada"
                )
                .map(
                    lancamento => ({

                        Data:
                            formatarData(
                                lancamento.data
                            ),

                        Descrição:
                            lancamento.descricao,

                        Categoria:
                            lancamento.categoria,

                        Pagamento:
                            lancamento.pagamento,

                        Valor:
                            Number(
                                lancamento.valor
                            ),

                        Observação:
                            lancamento.observacao ||
                            ""

                    })
                );


        const planilhaReceitas =
            XLSX.utils.json_to_sheet(
                dadosReceitas
            );


        planilhaReceitas["!cols"] = [

            {
                wch: 12
            },

            {
                wch: 30
            },

            {
                wch: 20
            },

            {
                wch: 18
            },

            {
                wch: 15
            },

            {
                wch: 40
            }

        ];


        // =================================================
        // CRIAR ARQUIVO EXCEL
        // =================================================

        const workbook =
            XLSX.utils.book_new();


        XLSX.utils.book_append_sheet(
            workbook,
            planilhaLancamentos,
            "Lançamentos"
        );


        XLSX.utils.book_append_sheet(
            workbook,
            planilhaResumo,
            "Resumo"
        );


        XLSX.utils.book_append_sheet(
            workbook,
            planilhaCategorias,
            "Categorias"
        );


        XLSX.utils.book_append_sheet(
            workbook,
            planilhaReceitas,
            "Receitas"
        );


        // =================================================
        // GERAR BUFFER XLSX
        // =================================================

        const buffer =
            XLSX.write(
                workbook,
                {
                    bookType:
                        "xlsx",

                    type:
                        "array"
                }
            );


        // =================================================
        // CRIAR BLOB
        // =================================================

        const blob =
            new Blob(
                [
                    buffer
                ],
                {
                    type:
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                }
            );


        // =================================================
        // NOME DO ARQUIVO
        // =================================================

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


        const dia =
            String(
                hoje.getDate()
            ).padStart(
                2,
                "0"
            );


        const nomeArquivo =
            "MinhasFinancas_" +
            ano +
            "-" +
            mes +
            "-" +
            dia +
            ".xlsx";


        // =================================================
        // CRIAR OBJETO FILE
        // =================================================

        const arquivo =
            new File(
                [
                    blob
                ],
                nomeArquivo,
                {
                    type:
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                }
            );


        // =================================================
        // COMPARTILHAMENTO NATIVO
        // Android / iPhone
        // =================================================

        if (
            typeof navigator.share ===
            "function"
        ) {

            let podeCompartilhar =
                true;


            if (
                typeof navigator.canShare ===
                "function"
            ) {

                podeCompartilhar =
                    navigator.canShare(
                        {
                            files:
                                [
                                    arquivo
                                ]
                        }
                    );

            }


            if (
                podeCompartilhar
            ) {

                try {

                    await navigator.share(
                        {
                            files:
                                [
                                    arquivo
                                ],

                            title:
                                "Minhas Finanças",

                            text:
                                "Arquivo Excel das minhas finanças"
                        }
                    );


                    return true;

                }

                catch (
                    erroCompartilhamento
                ) {

                    // =============================================
                    // USUÁRIO CANCELou O COMPARTILHAMENTO
                    // =============================================

                    if (
                        erroCompartilhamento &&
                        erroCompartilhamento.name ===
                        "AbortError"
                    ) {

                        console.log(
                            "Compartilhamento cancelado pelo usuário."
                        );


                        return false;

                    }


                    console.warn(
                        "Compartilhamento não disponível:",
                        erroCompartilhamento
                    );

                }

            }

        }


        // =================================================
        // FALLBACK — DOWNLOAD
        // =================================================

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


        link.style.display =
            "none";


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
            erro.message ||
            "Não foi possível gerar o arquivo Excel."
        );


        return false;

    }

}


// =====================================================
// COMPATIBILIDADE
// =====================================================

function exportarExcel(
    lancamentos
) {

    return exportarParaExcel(
        lancamentos
    );

}
