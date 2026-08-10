/*
=====================================================
MINHAS FINANÇAS
lancamentos.js
Regras e funções dos lançamentos
=====================================================
*/


// =====================================================
// CRIAR LANÇAMENTO
// =====================================================

function criarLancamento({
    tipo,
    valor,
    descricao,
    categoria,
    pagamento,
    data,
    observacao = ""
}) {

    return {

        id: Date.now(),

        tipo: tipo,

        valor: Number(valor),

        descricao:
            String(descricao).trim(),

        categoria: categoria,

        pagamento: pagamento,

        data: data,

        observacao:
            String(observacao).trim(),

        criadoEm:
            new Date().toISOString()

    };

}


// =====================================================
// VALIDAR LANÇAMENTO
// =====================================================

function validarLancamento(
    lancamento
) {

    if (
        !lancamento.tipo ||
        (
            lancamento.tipo !== "entrada" &&
            lancamento.tipo !== "saida"
        )
    ) {

        return {

            valido: false,

            mensagem:
                "Selecione Entrada ou Saída."

        };

    }


    if (
        !lancamento.valor ||
        Number(lancamento.valor) <= 0
    ) {

        return {

            valido: false,

            mensagem:
                "Informe um valor válido."

        };

    }


    if (
        !lancamento.descricao ||
        !lancamento.descricao.trim()
    ) {

        return {

            valido: false,

            mensagem:
                "Informe uma descrição."

        };

    }


    if (!lancamento.data) {

        return {

            valido: false,

            mensagem:
                "Informe a data."

        };

    }


    return {

        valido: true,

        mensagem: ""

    };

}


// =====================================================
// ORDENAR LANÇAMENTOS
// =====================================================

function ordenarLancamentos(
    lancamentos
) {

    return [...lancamentos].sort(
        (a, b) => {

            const dataA =
                new Date(a.data);

            const dataB =
                new Date(b.data);

            return dataB - dataA;

        }
    );

}


// =====================================================
// FORMATAR MOEDA
// =====================================================

function formatarMoeda(
    valor
) {

    return new Intl.NumberFormat(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    ).format(
        Number(valor) || 0
    );

}


// =====================================================
// FORMATAR DATA
// =====================================================

function formatarData(
    data
) {

    if (!data) {

        return "";

    }


    const partes =
        data.split("-");


    if (partes.length !== 3) {

        return data;

    }


    return (
        partes[2] +
        "/" +
        partes[1] +
        "/" +
        partes[0]
    );

}


// =====================================================
// ESCAPAR HTML
// Evita que uma descrição digitada pelo usuário
// seja interpretada como código HTML.
// =====================================================

function escaparHTML(
    texto
) {

    return String(texto)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}