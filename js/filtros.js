/*
=====================================================
MINHAS FINANÇAS
filtros.js
Filtros e consultas dos lançamentos
=====================================================
*/


// =====================================================
// FILTRAR POR TIPO
// =====================================================

function filtrarPorTipo(
    lancamentos,
    tipo
) {

    if (
        !tipo ||
        tipo === "todos"
    ) {

        return [...lancamentos];

    }


    return lancamentos.filter(
        lancamento =>
            lancamento.tipo === tipo
    );

}


// =====================================================
// FILTRAR POR CATEGORIA
// =====================================================

function filtrarPorCategoria(
    lancamentos,
    categoria
) {

    if (
        !categoria ||
        categoria === "todas"
    ) {

        return [...lancamentos];

    }


    return lancamentos.filter(
        lancamento =>
            lancamento.categoria === categoria
    );

}


// =====================================================
// FILTRAR POR FORMA DE PAGAMENTO
// =====================================================

function filtrarPorPagamento(
    lancamentos,
    pagamento
) {

    if (
        !pagamento ||
        pagamento === "todos"
    ) {

        return [...lancamentos];

    }


    return lancamentos.filter(
        lancamento =>
            lancamento.pagamento === pagamento
    );

}


// =====================================================
// FILTRAR POR PERÍODO
// =====================================================

function filtrarPorPeriodo(
    lancamentos,
    dataInicial,
    dataFinal
) {

    return lancamentos.filter(
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

}


// =====================================================
// FILTRAR POR DATA ESPECÍFICA
// =====================================================

function filtrarPorData(
    lancamentos,
    data
) {

    if (!data) {

        return [...lancamentos];

    }


    return lancamentos.filter(
        lancamento =>
            lancamento.data === data
    );

}


// =====================================================
// FILTRAR HOJE
// =====================================================

function filtrarHoje(
    lancamentos
) {

    const hoje =
        obterDataHoje();

    return filtrarPorData(
        lancamentos,
        hoje
    );

}


// =====================================================
// FILTRAR ESTA SEMANA
// =====================================================

function filtrarEstaSemana(
    lancamentos
) {

    const hoje =
        new Date();


    const diaSemana =
        hoje.getDay();


    const diferenca =
        diaSemana === 0
            ? 6
            : diaSemana - 1;


    const inicio =
        new Date(hoje);

    inicio.setDate(
        hoje.getDate() - diferenca
    );


    const fim =
        new Date(inicio);

    fim.setDate(
        inicio.getDate() + 6
    );


    return filtrarPorPeriodo(
        lancamentos,
        formatarDataISO(inicio),
        formatarDataISO(fim)
    );

}


// =====================================================
// FILTRAR ESTE MÊS
// =====================================================

function filtrarEsteMes(
    lancamentos
) {

    const inicio =
        obterInicioDoMesAtual();

    const fim =
        obterFimDoMesAtual();


    return filtrarPorPeriodo(
        lancamentos,
        inicio,
        fim
    );

}


// =====================================================
// FILTRAR MÊS ESPECÍFICO
// =====================================================

function filtrarPorMes(
    lancamentos,
    ano,
    mes
) {

    if (
        !ano ||
        !mes
    ) {

        return [...lancamentos];

    }


    const inicio =
        `${ano}-${String(mes).padStart(2, "0")}-01`;


    const ultimoDia =
        new Date(
            Number(ano),
            Number(mes),
            0
        ).getDate();


    const fim =
        `${ano}-${String(mes).padStart(2, "0")}-${String(ultimoDia).padStart(2, "0")}`;


    return filtrarPorPeriodo(
        lancamentos,
        inicio,
        fim
    );

}


// =====================================================
// FILTRAR COM VÁRIOS CRITÉRIOS
// =====================================================

function filtrarLancamentos(
    lancamentos,
    filtros = {}
) {

    let resultado =
        [...lancamentos];


    // Tipo

    if (
        filtros.tipo &&
        filtros.tipo !== "todos"
    ) {

        resultado =
            filtrarPorTipo(
                resultado,
                filtros.tipo
            );

    }


    // Categoria

    if (
        filtros.categoria &&
        filtros.categoria !== "todas"
    ) {

        resultado =
            filtrarPorCategoria(
                resultado,
                filtros.categoria
            );

    }


    // Forma de pagamento

    if (
        filtros.pagamento &&
        filtros.pagamento !== "todos"
    ) {

        resultado =
            filtrarPorPagamento(
                resultado,
                filtros.pagamento
            );

    }


    // Período

    if (
        filtros.dataInicial ||
        filtros.dataFinal
    ) {

        resultado =
            filtrarPorPeriodo(
                resultado,
                filtros.dataInicial,
                filtros.dataFinal
            );

    }


    return resultado;

}


// =====================================================
// DATA DE HOJE
// =====================================================

function obterDataHoje() {

    const hoje =
        new Date();

    return formatarDataISO(
        hoje
    );

}


// =====================================================
// INÍCIO DO MÊS
// =====================================================

function obterInicioDoMesAtual() {

    const hoje =
        new Date();


    const ano =
        hoje.getFullYear();


    const mes =
        hoje.getMonth() + 1;


    return (
        ano +
        "-" +
        String(mes).padStart(2, "0") +
        "-01"
    );

}


// =====================================================
// FINAL DO MÊS
// =====================================================

function obterFimDoMesAtual() {

    const hoje =
        new Date();


    const ano =
        hoje.getFullYear();


    const mes =
        hoje.getMonth() + 1;


    const ultimoDia =
        new Date(
            ano,
            mes,
            0
        ).getDate();


    return (
        ano +
        "-" +
        String(mes).padStart(2, "0") +
        "-" +
        String(ultimoDia).padStart(2, "0")
    );

}


// =====================================================
// FORMATAR DATA PARA BANCO
// =====================================================

function formatarDataISO(
    data
) {

    const ano =
        data.getFullYear();


    const mes =
        String(
            data.getMonth() + 1
        ).padStart(2, "0");


    const dia =
        String(
            data.getDate()
        ).padStart(2, "0");


    return (
        ano +
        "-" +
        mes +
        "-" +
        dia
    );

}