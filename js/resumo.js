/*
=====================================================
MINHAS FINANÇAS
resumo.js
Cálculos e informações financeiras
=====================================================
*/


// =====================================================
// RESUMO GERAL
// =====================================================

function calcularResumo(
    lancamentos
) {

    let entradas = 0;

    let saidas = 0;


    lancamentos.forEach(
        lancamento => {

            const valor =
                Number(lancamento.valor) || 0;


            if (
                lancamento.tipo === "entrada"
            ) {

                entradas += valor;

            }


            if (
                lancamento.tipo === "saida"
            ) {

                saidas += valor;

            }

        }
    );


    return {

        entradas: entradas,

        saidas: saidas,

        saldo:
            entradas - saidas,

        quantidade:
            lancamentos.length

    };

}


// =====================================================
// TOTAL POR CATEGORIA
// =====================================================

function calcularPorCategoria(
    lancamentos
) {

    const resultado = {};


    lancamentos.forEach(
        lancamento => {

            const categoria =
                lancamento.categoria ||
                "Outros";

            const valor =
                Number(lancamento.valor) || 0;


            if (
                !resultado[categoria]
            ) {

                resultado[categoria] = {

                    entrada: 0,

                    saida: 0

                };

            }


            if (
                lancamento.tipo === "entrada"
            ) {

                resultado[categoria].entrada +=
                    valor;

            }


            if (
                lancamento.tipo === "saida"
            ) {

                resultado[categoria].saida +=
                    valor;

            }

        }
    );


    return resultado;

}


// =====================================================
// TOTAL POR FORMA DE PAGAMENTO
// =====================================================

function calcularPorPagamento(
    lancamentos
) {

    const resultado = {};


    lancamentos.forEach(
        lancamento => {

            const pagamento =
                lancamento.pagamento ||
                "Outro";

            const valor =
                Number(lancamento.valor) || 0;


            if (
                !resultado[pagamento]
            ) {

                resultado[pagamento] = {

                    entrada: 0,

                    saida: 0

                };

            }


            if (
                lancamento.tipo === "entrada"
            ) {

                resultado[pagamento].entrada +=
                    valor;

            }


            if (
                lancamento.tipo === "saida"
            ) {

                resultado[pagamento].saida +=
                    valor;

            }

        }
    );


    return resultado;

}


// =====================================================
// RESUMO POR PERÍODO
// =====================================================

function calcularResumoPorPeriodo(
    lancamentos,
    dataInicial,
    dataFinal
) {

    const filtrados =
        lancamentos.filter(
            lancamento => {

                if (
                    dataInicial &&
                    lancamento.data < dataInicial
                ) {

                    return false;

                }


                if (
                    dataFinal &&
                    lancamento.data > dataFinal
                ) {

                    return false;

                }


                return true;

            }
        );


    return calcularResumo(
        filtrados
    );

}


// =====================================================
// TOTAL DE ENTRADAS
// =====================================================

function calcularTotalEntradas(
    lancamentos
) {

    return lancamentos.reduce(
        (total, lancamento) => {

            if (
                lancamento.tipo === "entrada"
            ) {

                return (
                    total +
                    (Number(lancamento.valor) || 0)
                );

            }

            return total;

        },
        0
    );

}


// =====================================================
// TOTAL DE SAÍDAS
// =====================================================

function calcularTotalSaidas(
    lancamentos
) {

    return lancamentos.reduce(
        (total, lancamento) => {

            if (
                lancamento.tipo === "saida"
            ) {

                return (
                    total +
                    (Number(lancamento.valor) || 0)
                );

            }

            return total;

        },
        0
    );

}


// =====================================================
// SALDO
// =====================================================

function calcularSaldo(
    lancamentos
) {

    const entradas =
        calcularTotalEntradas(
            lancamentos
        );


    const saidas =
        calcularTotalSaidas(
            lancamentos
        );


    return entradas - saidas;

}