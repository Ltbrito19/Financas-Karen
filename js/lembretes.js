/*
=====================================================
MINHAS FINANÇAS
lembretes.js
Regras e funções dos pagamentos agendados
=====================================================
*/


// =====================================================
// CRIAR LEMBRETE
// =====================================================

function criarLembrete({
    data,
    valor = "",
    descricao
}) {

    let valorNumerico = null;


    // -------------------------------------------------
    // VALOR É OPCIONAL
    // -------------------------------------------------

    if (
        valor !== "" &&
        valor !== null &&
        valor !== undefined
    ) {

        valorNumerico =
            Number(valor);

    }


    return {

        id:
            Date.now(),

        data:
            data,

        valor:
            valorNumerico,

        descricao:
            String(
                descricao
            ).trim(),

        criadoEm:
            new Date().toISOString()

    };

}


// =====================================================
// VALIDAR LEMBRETE
// =====================================================

function validarLembrete(
    lembrete
) {

    // -------------------------------------------------
    // DATA
    // -------------------------------------------------

    if (
        !lembrete ||
        !lembrete.data
    ) {

        return {

            valido: false,

            mensagem:
                "Informe a data do pagamento."

        };

    }


    // -------------------------------------------------
    // VERIFICAR FORMATO DA DATA
    // -------------------------------------------------

    const partes =
        String(
            lembrete.data
        ).split("-");


    if (
        partes.length !== 3
    ) {

        return {

            valido: false,

            mensagem:
                "A data informada é inválida."

        };

    }


    // -------------------------------------------------
    // DESCRIÇÃO
    // -------------------------------------------------

    if (
        !lembrete.descricao ||
        !String(
            lembrete.descricao
        ).trim()
    ) {

        return {

            valido: false,

            mensagem:
                "Informe uma descrição."

        };

    }


    // -------------------------------------------------
    // VALOR OPCIONAL
    // -------------------------------------------------

    if (
        lembrete.valor !== null &&
        lembrete.valor !== undefined &&
        lembrete.valor !== ""
    ) {

        const valor =
            Number(
                lembrete.valor
            );


        if (
            !Number.isFinite(
                valor
            ) ||
            valor <= 0
        ) {

            return {

                valido: false,

                mensagem:
                    "Informe um valor válido."

            };

        }

    }


    return {

        valido: true,

        mensagem: ""

    };

}


// =====================================================
// ORDENAR LEMBRETES
// =====================================================
// Mais próximos primeiro.
// Em caso de mesma data, mantém a ordem de criação.
// =====================================================

function ordenarLembretes(
    lembretes
) {

    return [
        ...lembretes
    ].sort(
        (
            a,
            b
        ) => {

            const dataA =
                String(
                    a.data || ""
                );

            const dataB =
                String(
                    b.data || ""
                );


            if (
                dataA < dataB
            ) {

                return -1;

            }


            if (
                dataA > dataB
            ) {

                return 1;

            }


            const criadoA =
                String(
                    a.criadoEm || ""
                );

            const criadoB =
                String(
                    b.criadoEm || ""
                );


            return criadoA.localeCompare(
                criadoB
            );

        }
    );

}


// =====================================================
// OBTER DATA DE HOJE
// =====================================================

function obterDataHojeLembrete() {

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


    return (
        ano +
        "-" +
        mes +
        "-" +
        dia
    );

}


// =====================================================
// CALCULAR DIFERENÇA EM DIAS
// =====================================================

function calcularDiasParaLembrete(
    data
) {

    if (
        !data
    ) {

        return null;

    }


    const hoje =
        obterDataHojeLembrete();


    const dataAtual =
        new Date(
            hoje +
            "T00:00:00"
        );


    const dataLembrete =
        new Date(
            data +
            "T00:00:00"
        );


    if (
        Number.isNaN(
            dataLembrete.getTime()
        )
    ) {

        return null;

    }


    const diferenca =
        dataLembrete.getTime() -
        dataAtual.getTime();


    return Math.round(
        diferenca /
        (
            1000 *
            60 *
            60 *
            24
        )
    );

}


// =====================================================
// OBTER STATUS DO LEMBRETE
// =====================================================
// Status possíveis:
//
// vencido
// hoje
// proximo
// futuro
//
// "próximo" = pagamento dentro dos próximos 7 dias.
// =====================================================

function obterStatusLembrete(
    lembrete
) {

    const dias =
        calcularDiasParaLembrete(
            lembrete.data
        );


    if (
        dias === null
    ) {

        return {

            status:
                "futuro",

            dias:
                null,

            texto:
                "",

            classe:
                ""

        };

    }


    // -------------------------------------------------
    // VENCIDO
    // -------------------------------------------------

    if (
        dias < 0
    ) {

        const quantidade =
            Math.abs(
                dias
            );


        return {

            status:
                "vencido",

            dias:
                dias,

            texto:
                quantidade === 1
                    ? "Vencido ontem"
                    : "Vencido há " +
                      quantidade +
                      " dias",

            classe:
                "lembrete-vencido"

        };

    }


    // -------------------------------------------------
    // HOJE
    // -------------------------------------------------

    if (
        dias === 0
    ) {

        return {

            status:
                "hoje",

            dias:
                0,

            texto:
                "Vence hoje",

            classe:
                "lembrete-hoje"

        };

    }


    // -------------------------------------------------
    // PRÓXIMOS 7 DIAS
    // -------------------------------------------------

    if (
        dias <= 7
    ) {

        return {

            status:
                "proximo",

            dias:
                dias,

            texto:
                dias === 1
                    ? "Vence amanhã"
                    : "Vence em " +
                      dias +
                      " dias",

            classe:
                "lembrete-proximo"

        };

    }


    // -------------------------------------------------
    // FUTURO
    // -------------------------------------------------

    return {

        status:
            "futuro",

        dias:
            dias,

        texto:
            "Vence em " +
            dias +
            " dias",

        classe:
            "lembrete-futuro"

    };

}


// =====================================================
// CONTAR LEMBRETES DE ATENÇÃO
// =====================================================
// Consideramos como atenção:
//
// - vencidos
// - vence hoje
// - próximos 7 dias
//
// Essa quantidade será usada posteriormente
// no indicador do sino 🔔.
// =====================================================

function contarLembretesAtencao() {

    const lembretes =
        obterLembretes();


    return lembretes.filter(
        lembrete => {

            const status =
                obterStatusLembrete(
                    lembrete
                );


            return (
                status.status ===
                    "vencido" ||

                status.status ===
                    "hoje" ||

                status.status ===
                    "proximo"
            );

        }
    ).length;

}


// =====================================================
// CONTAR LEMBRETES VENCIDOS
// =====================================================

function contarLembretesVencidos() {

    const lembretes =
        obterLembretes();


    return lembretes.filter(
        lembrete => {

            const status =
                obterStatusLembrete(
                    lembrete
                );


            return (
                status.status ===
                "vencido"
            );

        }
    ).length;

}


// =====================================================
// CONTAR LEMBRETES DE HOJE
// =====================================================

function contarLembretesHoje() {

    const lembretes =
        obterLembretes();


    return lembretes.filter(
        lembrete => {

            const status =
                obterStatusLembrete(
                    lembrete
                );


            return (
                status.status ===
                "hoje"
            );

        }
    ).length;

}


// =====================================================
// CONTAR PRÓXIMOS LEMBRETES
// =====================================================

function contarLembretesProximos() {

    const lembretes =
        obterLembretes();


    return lembretes.filter(
        lembrete => {

            const status =
                obterStatusLembrete(
                    lembrete
                );


            return (
                status.status ===
                "proximo"
            );

        }
    ).length;

}


// =====================================================
// OBTER LEMBRETES ORDENADOS
// =====================================================

function obterLembretesOrdenados() {

    return ordenarLembretes(
        obterLembretes()
    );

}


// =====================================================
// SALVAR NOVO LEMBRETE
// =====================================================

function salvarNovoLembrete(
    dados
) {

    const novo =
        criarLembrete(
            dados
        );


    const validacao =
        validarLembrete(
            novo
        );


    if (
        !validacao.valido
    ) {

        return {

            sucesso:
                false,

            mensagem:
                validacao.mensagem

        };

    }


    adicionarLembrete(
        novo
    );


    return {

        sucesso:
            true,

        mensagem:
            "Lembrete salvo com sucesso.",

        lembrete:
            novo

    };

}


// =====================================================
// SALVAR ALTERAÇÃO DO LEMBRETE
// =====================================================

function salvarAlteracaoLembrete(
    id,
    dados
) {

    const lembrete =
        obterLembretePorId(
            id
        );


    if (
        !lembrete
    ) {

        return {

            sucesso:
                false,

            mensagem:
                "Lembrete não encontrado."

        };

    }


    const dadosAtualizados = {

        data:
            dados.data,

        valor:
            (
                dados.valor === "" ||
                dados.valor === null ||
                dados.valor === undefined
            )
                ? null
                : Number(
                    dados.valor
                ),

        descricao:
            String(
                dados.descricao
            ).trim()

    };


    const validacao =
        validarLembrete(
            dadosAtualizados
        );


    if (
        !validacao.valido
    ) {

        return {

            sucesso:
                false,

            mensagem:
                validacao.mensagem

        };

    }


    const atualizado =
        atualizarLembrete(
            id,
            dadosAtualizados
        );


    if (
        !atualizado
    ) {

        return {

            sucesso:
                false,

            mensagem:
                "Não foi possível atualizar o lembrete."

        };

    }


    return {

        sucesso:
            true,

        mensagem:
            "Lembrete atualizado com sucesso."

    };

}


// =====================================================
// EXCLUIR LEMBRETE
// =====================================================

function removerLembrete(
    id
) {

    const excluido =
        excluirLembrete(
            id
        );


    if (
        !excluido
    ) {

        return {

            sucesso:
                false,

            mensagem:
                "Lembrete não encontrado."

        };

    }


    return {

        sucesso:
            true,

        mensagem:
            "Lembrete excluído com sucesso."

    };

}
