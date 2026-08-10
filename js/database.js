/*
=====================================================
MINHAS FINANÇAS
database.js
Responsável pelo armazenamento dos lançamentos
e dos lembretes
=====================================================
*/


// =====================================================
// CHAVES DO BANCO
// =====================================================

const DB_CHAVE =
    "minhas_financas_lancamentos";


const DB_LEMBRETES_CHAVE =
    "minhas_financas_lembretes";


// =====================================================
// LANÇAMENTOS
// =====================================================

function obterLancamentos() {

    const dados =
        localStorage.getItem(DB_CHAVE);

    if (!dados) {
        return [];
    }

    try {

        const lancamentos =
            JSON.parse(dados);

        if (!Array.isArray(lancamentos)) {
            return [];
        }

        return lancamentos;

    } catch (erro) {

        console.error(
            "Erro ao carregar lançamentos:",
            erro
        );

        return [];
    }
}


function salvarLancamentos(lancamentos) {

    localStorage.setItem(
        DB_CHAVE,
        JSON.stringify(lancamentos)
    );

}


function adicionarLancamento(lancamento) {

    const lancamentos =
        obterLancamentos();

    lancamentos.push(lancamento);

    salvarLancamentos(
        lancamentos
    );

    return lancamento;
}


function atualizarLancamento(
    id,
    dadosAtualizados
) {

    const lancamentos =
        obterLancamentos();

    const indice =
        lancamentos.findIndex(
            item => item.id === id
        );

    if (indice === -1) {

        return false;

    }

    lancamentos[indice] = {

        ...lancamentos[indice],

        ...dadosAtualizados

    };

    salvarLancamentos(
        lancamentos
    );

    return true;
}


function excluirLancamento(id) {

    const lancamentos =
        obterLancamentos();

    const novosLancamentos =
        lancamentos.filter(
            item => item.id !== id
        );

    if (
        novosLancamentos.length ===
        lancamentos.length
    ) {

        return false;

    }

    salvarLancamentos(
        novosLancamentos
    );

    return true;
}


function obterLancamentoPorId(id) {

    const lancamentos =
        obterLancamentos();

    return lancamentos.find(
        item => item.id === id
    );

}


function limparTodosLancamentos() {

    localStorage.removeItem(
        DB_CHAVE
    );

}


// =====================================================
// LEMBRETES
// =====================================================
// Os lembretes possuem armazenamento separado
// dos lançamentos financeiros.
// =====================================================


function obterLembretes() {

    const dados =
        localStorage.getItem(
            DB_LEMBRETES_CHAVE
        );

    if (!dados) {

        return [];

    }

    try {

        const lembretes =
            JSON.parse(
                dados
            );

        if (
            !Array.isArray(
                lembretes
            )
        ) {

            return [];

        }

        return lembretes;

    }

    catch (
        erro
    ) {

        console.error(
            "Erro ao carregar lembretes:",
            erro
        );

        return [];

    }

}


function salvarLembretes(
    lembretes
) {

    localStorage.setItem(

        DB_LEMBRETES_CHAVE,

        JSON.stringify(
            lembretes
        )

    );

}


function adicionarLembrete(
    lembrete
) {

    const lembretes =
        obterLembretes();

    lembretes.push(
        lembrete
    );

    salvarLembretes(
        lembretes
    );

    return lembrete;

}


function atualizarLembrete(
    id,
    dadosAtualizados
) {

    const lembretes =
        obterLembretes();

    const indice =
        lembretes.findIndex(
            item =>
                item.id === id
        );

    if (
        indice === -1
    ) {

        return false;

    }

    lembretes[indice] = {

        ...lembretes[indice],

        ...dadosAtualizados

    };

    salvarLembretes(
        lembretes
    );

    return true;

}


function excluirLembrete(
    id
) {

    const lembretes =
        obterLembretes();

    const novosLembretes =
        lembretes.filter(
            item =>
                item.id !== id
        );

    if (
        novosLembretes.length ===
        lembretes.length
    ) {

        return false;

    }

    salvarLembretes(
        novosLembretes
    );

    return true;

}


function obterLembretePorId(
    id
) {

    const lembretes =
        obterLembretes();

    return lembretes.find(
        item =>
            item.id === id
    );

}


function limparTodosLembretes() {

    localStorage.removeItem(
        DB_LEMBRETES_CHAVE
    );

}
