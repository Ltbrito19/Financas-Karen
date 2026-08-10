/*
=====================================================
MINHAS FINANÇAS
database.js
Responsável pelo armazenamento dos lançamentos
=====================================================
*/

const DB_CHAVE = "minhas_financas_lancamentos";


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