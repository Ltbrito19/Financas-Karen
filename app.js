// =====================================================
// MINHAS FINANÇAS
// app.js
// =====================================================

let tipoSelecionado = "entrada";
let lancamentoEmEdicao = null;


// =====================================================
// INICIALIZAÇÃO
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    iniciarAplicativo
);


function iniciarAplicativo() {

    configurarElementos();

    configurarNavegacao();

    configurarLancamentos();

    configurarFiltros();

    configurarExportacao();

    configurarLimpezaRegistros();

    definirDataAtual();

    atualizarMes();

    carregarTela();

}


// =====================================================
// ELEMENTOS
// =====================================================

let telaInicio;
let telaResumo;
let telaExportar;

let modal;
let tituloModal;

let btnNovoLancamento;
let btnFecharModal;
let btnEntrada;
let btnSaida;
let btnSalvar;
let btnExcluir;

let valorInput;
let descricaoInput;
let categoriaInput;
let pagamentoInput;
let dataInput;
let observacaoInput;

let listaLancamentos;
let mensagemVazia;
let totalEntradas;
let totalSaidas;
let saldo;
let quantidadeLancamentos;

let resumoSaldo;
let resumoEntradas;
let resumoSaidas;
let resumoCategorias;
let resumoPagamentos;
let mesResumo;

let filtroPeriodo;
let filtroTipo;
let datasPersonalizadas;
let filtroDataInicial;
let filtroDataFinal;
let btnLimparFiltros;

let btnMenuInicio;
let btnMenuResumo;
let btnMenuExcel;
let btnResumoTopo;
let btnVoltarInicio;
let btnVoltarInicioExportar;

let exportarPeriodo;
let exportarTipo;
let exportarDatasPersonalizadas;
let exportarDataInicial;
let exportarDataFinal;
let exportarQuantidade;
let exportarPeriodoTexto;
let btnGerarExcel;
let mensagemExportacao;

// Limpeza
let btnLimparRegistros;


function configurarElementos() {

    telaInicio =
        document.getElementById(
            "telaInicio"
        );

    telaResumo =
        document.getElementById(
            "telaResumo"
        );

    telaExportar =
        document.getElementById(
            "telaExportar"
        );


    modal =
        document.getElementById(
            "modalLancamento"
        );

    tituloModal =
        document.getElementById(
            "tituloModal"
        );


    btnNovoLancamento =
        document.getElementById(
            "btnNovoLancamento"
        );

    btnFecharModal =
        document.getElementById(
            "btnFecharModal"
        );

    btnEntrada =
        document.getElementById(
            "btnEntrada"
        );

    btnSaida =
        document.getElementById(
            "btnSaida"
        );

    btnSalvar =
        document.getElementById(
            "btnSalvar"
        );

    btnExcluir =
        document.getElementById(
            "btnExcluir"
        );


    valorInput =
        document.getElementById(
            "valor"
        );

    descricaoInput =
        document.getElementById(
            "descricao"
        );

    categoriaInput =
        document.getElementById(
            "categoria"
        );

    pagamentoInput =
        document.getElementById(
            "pagamento"
        );

    dataInput =
        document.getElementById(
            "data"
        );

    observacaoInput =
        document.getElementById(
            "observacao"
        );


    listaLancamentos =
        document.getElementById(
            "listaLancamentos"
        );

    mensagemVazia =
        document.getElementById(
            "mensagemVazia"
        );

    totalEntradas =
        document.getElementById(
            "totalEntradas"
        );

    totalSaidas =
        document.getElementById(
            "totalSaidas"
        );

    saldo =
        document.getElementById(
            "saldo"
        );

    quantidadeLancamentos =
        document.getElementById(
            "quantidadeLancamentos"
        );


    resumoSaldo =
        document.getElementById(
            "resumoSaldo"
        );

    resumoEntradas =
        document.getElementById(
            "resumoEntradas"
        );

    resumoSaidas =
        document.getElementById(
            "resumoSaidas"
        );

    resumoCategorias =
        document.getElementById(
            "resumoCategorias"
        );

    resumoPagamentos =
        document.getElementById(
            "resumoPagamentos"
        );

    mesResumo =
        document.getElementById(
            "mesResumo"
        );


    filtroPeriodo =
        document.getElementById(
            "filtroPeriodo"
        );

    filtroTipo =
        document.getElementById(
            "filtroTipo"
        );

    datasPersonalizadas =
        document.getElementById(
            "datasPersonalizadas"
        );

    filtroDataInicial =
        document.getElementById(
            "filtroDataInicial"
        );

    filtroDataFinal =
        document.getElementById(
            "filtroDataFinal"
        );

    btnLimparFiltros =
        document.getElementById(
            "btnLimparFiltros"
        );


    btnMenuInicio =
        document.getElementById(
            "btnMenuInicio"
        );

    btnMenuResumo =
        document.getElementById(
            "btnMenuResumo"
        );

    btnMenuExcel =
        document.getElementById(
            "btnMenuExcel"
        );

    btnResumoTopo =
        document.getElementById(
            "btnResumoTopo"
        );

    btnVoltarInicio =
        document.getElementById(
            "btnVoltarInicio"
        );

    btnVoltarInicioExportar =
        document.getElementById(
            "btnVoltarInicioExportar"
        );


    exportarPeriodo =
        document.getElementById(
            "exportarPeriodo"
        );

    exportarTipo =
        document.getElementById(
            "exportarTipo"
        );

    exportarDatasPersonalizadas =
        document.getElementById(
            "exportarDatasPersonalizadas"
        );

    exportarDataInicial =
        document.getElementById(
            "exportarDataInicial"
        );

    exportarDataFinal =
        document.getElementById(
            "exportarDataFinal"
        );

    exportarQuantidade =
        document.getElementById(
            "exportarQuantidade"
        );

    exportarPeriodoTexto =
        document.getElementById(
            "exportarPeriodoTexto"
        );

    btnGerarExcel =
        document.getElementById(
            "btnGerarExcel"
        );

    mensagemExportacao =
        document.getElementById(
            "mensagemExportacao"
        );


    // =================================================
    // BOTÃO LIMPAR REGISTROS
    // =================================================

    btnLimparRegistros =
        document.getElementById(
            "btnLimparRegistros"
        );

}


// =====================================================
// NAVEGAÇÃO
// =====================================================

function configurarNavegacao() {

    btnMenuInicio.addEventListener(
        "click",
        mostrarInicio
    );

    btnMenuResumo.addEventListener(
        "click",
        mostrarResumo
    );

    btnMenuExcel.addEventListener(
        "click",
        mostrarExportar
    );

    btnResumoTopo.addEventListener(
        "click",
        mostrarResumo
    );

    btnVoltarInicio.addEventListener(
        "click",
        mostrarInicio
    );

    btnVoltarInicioExportar.addEventListener(
        "click",
        mostrarInicio
    );

}


function mostrarInicio() {

    telaInicio.hidden = false;
    telaResumo.hidden = true;
    telaExportar.hidden = true;

    btnMenuInicio.classList.add("ativo");
    btnMenuResumo.classList.remove("ativo");
    btnMenuExcel.classList.remove("ativo");

    window.scrollTo(0, 0);

}


function mostrarResumo() {

    atualizarResumoCompleto();

    telaInicio.hidden = true;
    telaResumo.hidden = false;
    telaExportar.hidden = true;

    btnMenuInicio.classList.remove("ativo");
    btnMenuResumo.classList.add("ativo");
    btnMenuExcel.classList.remove("ativo");

    window.scrollTo(0, 0);

}


function mostrarExportar() {

    telaInicio.hidden = true;
    telaResumo.hidden = true;
    telaExportar.hidden = false;

    btnMenuInicio.classList.remove("ativo");
    btnMenuResumo.classList.remove("ativo");
    btnMenuExcel.classList.add("ativo");

    atualizarPreviaExportacao();

    window.scrollTo(0, 0);

}


// =====================================================
// DATA
// =====================================================

function definirDataAtual() {

    dataInput.value =
        formatarDataISO(
            new Date()
        );

}


function atualizarMes() {

    const hoje = new Date();

    const texto =
        hoje.toLocaleDateString(
            "pt-BR",
            {
                month: "long",
                year: "numeric"
            }
        );

    document.getElementById(
        "mesAtual"
    ).textContent = texto;

    mesResumo.textContent = texto;

}


// =====================================================
// LANÇAMENTOS
// =====================================================

function configurarLancamentos() {

    btnNovoLancamento.addEventListener(
        "click",
        abrirNovoLancamento
    );

    btnFecharModal.addEventListener(
        "click",
        fecharModal
    );

    modal.addEventListener(
        "click",
        evento => {

            if (
                evento.target === modal
            ) {

                fecharModal();

            }

        }
    );


    btnEntrada.addEventListener(
        "click",
        () => selecionarTipo("entrada")
    );


    btnSaida.addEventListener(
        "click",
        () => selecionarTipo("saida")
    );


    btnSalvar.addEventListener(
        "click",
        salvarLancamentoFormulario
    );


    btnExcluir.addEventListener(
        "click",
        excluirLancamentoAtual
    );

}


function abrirNovoLancamento() {

    lancamentoEmEdicao = null;

    limparFormulario();

    tituloModal.textContent =
        "Novo lançamento";

    btnSalvar.textContent =
        "Salvar lançamento";

    btnExcluir.hidden = true;

    modal.hidden = false;

    setTimeout(
        () => valorInput.focus(),
        200
    );

}


function fecharModal() {

    modal.hidden = true;

    lancamentoEmEdicao = null;

}


// =====================================================
// SELECIONAR TIPO
// =====================================================

function selecionarTipo(tipo) {

    tipoSelecionado = tipo;


    if (
        tipo === "entrada"
    ) {

        btnEntrada.classList.add(
            "entrada-selecionada"
        );

        btnSaida.classList.remove(
            "saida-selecionada"
        );


        if (
            categoriaInput
        ) {

            categoriaInput.value =
                "Sem categoria";

        }

    } else {

        btnSaida.classList.add(
            "saida-selecionada"
        );

        btnEntrada.classList.remove(
            "entrada-selecionada"
        );


        if (
            categoriaInput &&
            categoriaInput.value ===
                "Sem categoria"
        ) {

            categoriaInput.value =
                "Alimentação";

        }

    }

}


// =====================================================
// SALVAR
// =====================================================

function salvarLancamentoFormulario() {

    const dados = {

        tipo: tipoSelecionado,

        valor: valorInput.value,

        descricao: descricaoInput.value,

        categoria:
            tipoSelecionado === "entrada"
                ? "Sem categoria"
                : categoriaInput.value,

        pagamento: "Padrão",

        data: dataInput.value,

        observacao: observacaoInput.value

    };


    const novo =
        criarLancamento(dados);


    const validacao =
        validarLancamento(novo);


    if (
        !validacao.valido
    ) {

        alert(
            validacao.mensagem
        );

        return;

    }


    if (
        lancamentoEmEdicao !== null
    ) {

        atualizarLancamento(
            lancamentoEmEdicao,
            {
                tipo: dados.tipo,
                valor: Number(dados.valor),
                descricao:
                    String(
                        dados.descricao
                    ).trim(),
                categoria:
                    dados.categoria,
                pagamento:
                    "Padrão",
                data:
                    dados.data,
                observacao:
                    String(
                        dados.observacao
                    ).trim()
            }
        );

    } else {

        adicionarLancamento(novo);

    }


    carregarTela();

    atualizarResumoCompleto();

    atualizarPreviaExportacao();

    fecharModal();

}


// =====================================================
// EDIÇÃO
// =====================================================

function abrirEdicao(id) {

    const lancamento =
        obterLancamentoPorId(id);


    if (!lancamento) {
        return;
    }


    lancamentoEmEdicao = id;

    tituloModal.textContent =
        "Editar lançamento";

    btnSalvar.textContent =
        "Salvar alterações";

    btnExcluir.hidden = false;


    selecionarTipo(
        lancamento.tipo
    );


    valorInput.value =
        lancamento.valor;

    descricaoInput.value =
        lancamento.descricao;


    if (
        lancamento.tipo === "entrada"
    ) {

        categoriaInput.value =
            "Sem categoria";

    } else {

        categoriaInput.value =
            lancamento.categoria ||
            "Alimentação";

    }


    pagamentoInput.value =
        "Padrão";

    dataInput.value =
        lancamento.data;

    observacaoInput.value =
        lancamento.observacao || "";


    modal.hidden = false;

}


// =====================================================
// EXCLUSÃO
// =====================================================

function excluirLancamentoAtual() {

    if (
        lancamentoEmEdicao === null
    ) {
        return;
    }


    const confirmar =
        confirm(
            "Deseja excluir este lançamento?"
        );


    if (!confirmar) {
        return;
    }


    excluirLancamento(
        lancamentoEmEdicao
    );


    carregarTela();

    atualizarResumoCompleto();

    atualizarPreviaExportacao();

    fecharModal();

}


// =====================================================
// LIMPAR TODOS OS REGISTROS
// =====================================================

function configurarLimpezaRegistros() {

    if (
        !btnLimparRegistros
    ) {

        console.warn(
            "Botão de limpar registros não encontrado."
        );

        return;

    }


    btnLimparRegistros.addEventListener(
        "click",
        limparTodosOsRegistros
    );

}


function limparTodosOsRegistros() {

    const lancamentos =
        obterLancamentos();


    const quantidade =
        lancamentos.length;


    if (
        quantidade === 0
    ) {

        alert(
            "Não existem registros para limpar."
        );

        return;

    }


    // =================================================
    // PRIMEIRA CONFIRMAÇÃO
    // =================================================

    const primeiraConfirmacao =
        confirm(

            "ATENÇÃO!\n\n" +

            "Você está prestes a excluir TODOS os " +
            quantidade +
            " registros do aplicativo.\n\n" +

            "Essa ação não poderá ser desfeita pelo aplicativo.\n\n" +

            "Deseja continuar?"

        );


    if (
        !primeiraConfirmacao
    ) {

        return;

    }


    // =================================================
    // SEGUNDA CONFIRMAÇÃO
    // =================================================

    const segundaConfirmacao =
        confirm(

            "SEGUNDA CONFIRMAÇÃO\n\n" +

            "Todos os lançamentos atuais serão apagados.\n\n" +

            "Recomendamos criar um backup antes de continuar.\n\n" +

            "Tem certeza absoluta que deseja apagar os registros?"

        );


    if (
        !segundaConfirmacao
    ) {

        return;

    }


    // =================================================
    // VERIFICAÇÃO HUMANA
    // =================================================

    const confirmacaoHumana =
        prompt(

            "VERIFICAÇÃO DE SEGURANÇA\n\n" +

            "Para confirmar a exclusão definitiva, " +
            "digite exatamente:\n\n" +

            "LIMPAR"

        );


    if (
        confirmacaoHumana === null
    ) {

        return;

    }


    if (
        confirmacaoHumana.trim() !==
        "LIMPAR"
    ) {

        alert(
            "Verificação incorreta.\n\n" +
            "Nenhum registro foi apagado."
        );

        return;

    }


    // =================================================
    // ÚLTIMA CONFIRMAÇÃO
    // =================================================

    const confirmacaoFinal =
        confirm(

            "ÚLTIMA CONFIRMAÇÃO\n\n" +

            "A exclusão será realizada agora.\n\n" +

            "Deseja realmente continuar?"

        );


    if (
        !confirmacaoFinal
    ) {

        return;

    }


    // =================================================
    // APAGAR REGISTROS
    // =================================================

    try {

        salvarLancamentos(
            []
        );


        carregarTela();

        atualizarResumoCompleto();

        atualizarPreviaExportacao();


        alert(
            quantidade +
            " registro(s) foram removidos com sucesso."
        );

    }

    catch (
        erro
    ) {

        console.error(
            "Erro ao limpar registros:",
            erro
        );


        alert(
            "Não foi possível limpar os registros."
        );

    }

}


// =====================================================
// TELA INICIAL
// =====================================================

function carregarTela() {

    const lancamentos =
        obterLancamentos();


    const ordenados =
        ordenarLancamentos(
            lancamentos
        );


    renderizarLancamentos(
        ordenados
    );


    atualizarResumoTela(
        ordenados
    );

}


function renderizarLancamentos(
    lancamentos
) {

    const itens =
        listaLancamentos.querySelectorAll(
            ".lancamento"
        );


    itens.forEach(
        item => item.remove()
    );


    quantidadeLancamentos.textContent =
        lancamentos.length;


    if (
        lancamentos.length === 0
    ) {

        mensagemVazia.style.display =
            "block";

        return;

    }


    mensagemVazia.style.display =
        "none";


    lancamentos.forEach(
        lancamento => {

            listaLancamentos.appendChild(
                criarElementoLancamento(
                    lancamento
                )
            );

        }
    );

}


function criarElementoLancamento(
    lancamento
) {

    const elemento =
        document.createElement(
            "div"
        );


    elemento.className =
        "lancamento";


    const entrada =
        lancamento.tipo === "entrada";


    const classe =
        entrada
            ? "entrada"
            : "saida";


    const sinal =
        entrada
            ? "+"
            : "-";


    const icone =
        entrada
            ? "↑"
            : "↓";


    elemento.innerHTML = `

        <div class="lancamento-icone ${classe}">
            ${icone}
        </div>

        <div class="lancamento-info">

            <strong>
                ${escaparHTML(
                    lancamento.descricao
                )}
            </strong>

            <small>

                ${formatarData(
                    lancamento.data
                )}

                ·

                ${escaparHTML(
                    lancamento.categoria
                )}

                ·

                ${escaparHTML(
                    lancamento.pagamento
                )}

            </small>

        </div>

        <div class="lancamento-valor ${classe}">

            ${sinal}
            ${formatarMoeda(
                lancamento.valor
            )}

        </div>

        <button
            type="button"
            class="btn-editar-lancamento"
        >
            Editar
        </button>

    `;


    elemento
        .querySelector(
            ".btn-editar-lancamento"
        )
        .addEventListener(
            "click",
            evento => {

                evento.stopPropagation();

                abrirEdicao(
                    lancamento.id
                );

            }
        );


    elemento.addEventListener(
        "click",
        () => {

            abrirEdicao(
                lancamento.id
            );

        }
    );


    return elemento;

}


// =====================================================
// RESUMO INICIAL
// =====================================================

function atualizarResumoTela(
    lancamentos
) {

    const resumo =
        calcularResumo(
            lancamentos
        );


    totalEntradas.textContent =
        formatarMoeda(
            resumo.entradas
        );


    totalSaidas.textContent =
        formatarMoeda(
            resumo.saidas
        );


    saldo.textContent =
        formatarMoeda(
            resumo.saldo
        );


    saldo.style.color =
        resumo.saldo < 0
            ? "#dc2626"
            : "#111827";

}


// =====================================================
// FILTROS
// =====================================================

function configurarFiltros() {

    filtroPeriodo.addEventListener(
        "change",
        alterarPeriodo
    );


    filtroTipo.addEventListener(
        "change",
        atualizarResumoCompleto
    );


    filtroDataInicial.addEventListener(
        "change",
        atualizarResumoCompleto
    );


    filtroDataFinal.addEventListener(
        "change",
        atualizarResumoCompleto
    );


    btnLimparFiltros.addEventListener(
        "click",
        limparFiltros
    );

}


function alterarPeriodo() {

    datasPersonalizadas.hidden =
        filtroPeriodo.value !==
        "personalizado";


    if (
        filtroPeriodo.value ===
        "personalizado"
    ) {

        if (
            !filtroDataInicial.value
        ) {

            filtroDataInicial.value =
                obterInicioDoMesAtual();

        }


        if (
            !filtroDataFinal.value
        ) {

            filtroDataFinal.value =
                obterFimDoMesAtual();

        }

    }


    atualizarResumoCompleto();

}


function obterFiltrosAtuais() {

    return obterFiltrosGenericos(
        filtroPeriodo.value,
        filtroTipo.value,
        filtroDataInicial.value,
        filtroDataFinal.value
    );

}


function obterFiltrosGenericos(
    periodo,
    tipo,
    dataInicialPersonalizada,
    dataFinalPersonalizada
) {

    let dataInicial = "";
    let dataFinal = "";


    if (
        periodo === "mes"
    ) {

        dataInicial =
            obterInicioDoMesAtual();

        dataFinal =
            obterFimDoMesAtual();

    }


    if (
        periodo === "hoje"
    ) {

        dataInicial =
            obterDataHoje();

        dataFinal =
            obterDataHoje();

    }


    if (
        periodo === "semana"
    ) {

        const hoje = new Date();

        const dia =
            hoje.getDay();

        const diferenca =
            dia === 0
                ? 6
                : dia - 1;


        const inicio =
            new Date(hoje);


        inicio.setDate(
            hoje.getDate() -
            diferenca
        );


        const fim =
            new Date(inicio);


        fim.setDate(
            inicio.getDate() + 6
        );


        dataInicial =
            formatarDataISO(
                inicio
            );

        dataFinal =
            formatarDataISO(
                fim
            );

    }


    if (
        periodo ===
        "mesAnterior"
    ) {

        const hoje = new Date();


        const inicio =
            new Date(
                hoje.getFullYear(),
                hoje.getMonth() - 1,
                1
            );


        const fim =
            new Date(
                hoje.getFullYear(),
                hoje.getMonth(),
                0
            );


        dataInicial =
            formatarDataISO(
                inicio
            );

        dataFinal =
            formatarDataISO(
                fim
            );

    }


    if (
        periodo ===
        "personalizado"
    ) {

        dataInicial =
            dataInicialPersonalizada;

        dataFinal =
            dataFinalPersonalizada;

    }


    return {
        tipo,
        dataInicial,
        dataFinal
    };

}


function obterLancamentosFiltrados() {

    const filtros =
        obterFiltrosAtuais();


    return filtrarLancamentos(
        obterLancamentos(),
        filtros
    );

}


function limparFiltros() {

    filtroPeriodo.value =
        "mes";

    filtroTipo.value =
        "todos";

    filtroDataInicial.value =
        "";

    filtroDataFinal.value =
        "";

    datasPersonalizadas.hidden =
        true;


    atualizarResumoCompleto();

}


// =====================================================
// RESUMO
// =====================================================

function atualizarResumoCompleto() {

    const lancamentos =
        obterLancamentosFiltrados();


    const resumo =
        calcularResumo(
            lancamentos
        );


    resumoEntradas.textContent =
        formatarMoeda(
            resumo.entradas
        );


    resumoSaidas.textContent =
        formatarMoeda(
            resumo.saidas
        );


    resumoSaldo.textContent =
        formatarMoeda(
            resumo.saldo
        );


    resumoSaldo.style.color =
        resumo.saldo < 0
            ? "#dc2626"
            : "#111827";


    renderizarResumoCategorias(
        lancamentos
    );


    renderizarResumoPagamentos(
        lancamentos
    );


    atualizarTituloResumo();

}


function atualizarTituloResumo() {

    const periodo =
        filtroPeriodo.value;


    const textos = {

        mes:
            "Este mês",

        hoje:
            "Hoje",

        semana:
            "Esta semana",

        mesAnterior:
            "Mês anterior",

        todos:
            "Todos os lançamentos"

    };


    if (
        periodo ===
        "personalizado"
    ) {

        if (
            filtroDataInicial.value &&
            filtroDataFinal.value
        ) {

            mesResumo.textContent =
                formatarData(
                    filtroDataInicial.value
                ) +
                " até " +
                formatarData(
                    filtroDataFinal.value
                );

        } else {

            mesResumo.textContent =
                "Período personalizado";

        }

        return;

    }


    mesResumo.textContent =
        textos[periodo] ||
        "";

}


function renderizarResumoCategorias(
    lancamentos
) {

    const dados =
        calcularPorCategoria(
            lancamentos
        );


    resumoCategorias.innerHTML =
        "";


    const categorias =
        Object.keys(dados);


    if (
        categorias.length === 0
    ) {

        resumoCategorias.innerHTML = `

            <div class="vazio">

                <div class="icone-vazio">
                    📊
                </div>

                <h3>
                    Nenhum dado
                </h3>

                <p>
                    Não existem lançamentos
                    neste período.
                </p>

            </div>

        `;

        return;

    }


    categorias.forEach(
        categoria => {

            const entrada =
                dados[categoria].entrada;


            const saida =
                dados[categoria].saida;


            const resultado =
                entrada - saida;


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "lancamento";


            item.innerHTML = `

                <div class="lancamento-icone">
                    📁
                </div>

                <div class="lancamento-info">

                    <strong>
                        ${escaparHTML(
                            categoria
                        )}
                    </strong>

                    <small>

                        Entradas:
                        ${formatarMoeda(
                            entrada
                        )}

                        ·

                        Saídas:
                        ${formatarMoeda(
                            saida
                        )}

                    </small>

                </div>

                <div
                    class="lancamento-valor
                    ${
                        resultado >= 0
                            ? "entrada"
                            : "saida"
                    }"
                >

                    ${formatarMoeda(
                        resultado
                    )}

                </div>

            `;


            resumoCategorias.appendChild(
                item
            );

        }
    );

}


function renderizarResumoPagamentos(
    lancamentos
) {

    const dados =
        calcularPorPagamento(
            lancamentos
        );


    resumoPagamentos.innerHTML =
        "";


    const pagamentos =
        Object.keys(dados);


    if (
        pagamentos.length === 0
    ) {

        resumoPagamentos.innerHTML = `

            <div class="vazio">

                <div class="icone-vazio">
                    💳
                </div>

                <h3>
                    Nenhum dado
                </h3>

                <p>
                    Não existem lançamentos
                    neste período.
                </p>

            </div>

        `;

        return;

    }


    pagamentos.forEach(
        pagamento => {

            const entrada =
                dados[pagamento].entrada;


            const saida =
                dados[pagamento].saida;


            const resultado =
                entrada - saida;


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "lancamento";


            item.innerHTML = `

                <div class="lancamento-icone">
                    💳
                </div>

                <div class="lancamento-info">

                    <strong>
                        ${escaparHTML(
                            pagamento
                        )}
                    </strong>

                    <small>

                        Entradas:
                        ${formatarMoeda(
                            entrada
                        )}

                        ·

                        Saídas:
                        ${formatarMoeda(
                            saida
                        )}

                    </small>

                </div>

                <div
                    class="lancamento-valor
                    ${
                        resultado >= 0
                            ? "entrada"
                            : "saida"
                    }"
                >

                    ${formatarMoeda(
                        resultado
                    )}

                </div>

            `;


            resumoPagamentos.appendChild(
                item
            );

        }
    );

}


// =====================================================
// EXPORTAÇÃO
// =====================================================

function configurarExportacao() {

    exportarPeriodo.addEventListener(
        "change",
        alterarPeriodoExportacao
    );


    exportarTipo.addEventListener(
        "change",
        atualizarPreviaExportacao
    );


    exportarDataInicial.addEventListener(
        "change",
        atualizarPreviaExportacao
    );


    exportarDataFinal.addEventListener(
        "change",
        atualizarPreviaExportacao
    );


    btnGerarExcel.addEventListener(
        "click",
        gerarExcel
    );

}


function alterarPeriodoExportacao() {

    const personalizado =
        exportarPeriodo.value ===
        "personalizado";


    exportarDatasPersonalizadas.hidden =
        !personalizado;


    if (
        personalizado
    ) {

        if (
            !exportarDataInicial.value
        ) {

            exportarDataInicial.value =
                obterInicioDoMesAtual();

        }


        if (
            !exportarDataFinal.value
        ) {

            exportarDataFinal.value =
                obterFimDoMesAtual();

        }

    }


    atualizarPreviaExportacao();

}


function obterFiltrosExportacao() {

    return obterFiltrosGenericos(

        exportarPeriodo.value,

        exportarTipo.value,

        exportarDataInicial.value,

        exportarDataFinal.value

    );

}


function obterLancamentosParaExportar() {

    const filtros =
        obterFiltrosExportacao();


    return filtrarLancamentos(
        obterLancamentos(),
        filtros
    );

}


function atualizarPreviaExportacao() {

    const lancamentos =
        obterLancamentosParaExportar();


    exportarQuantidade.textContent =
        lancamentos.length;


    exportarPeriodoTexto.textContent =
        obterTextoPeriodoExportacao();


    mensagemExportacao.textContent =
        "";

}


function obterTextoPeriodoExportacao() {

    const periodo =
        exportarPeriodo.value;


    if (
        periodo === "mes"
    ) {

        return "Este mês";

    }


    if (
        periodo === "hoje"
    ) {

        return "Hoje";

    }


    if (
        periodo === "semana"
    ) {

        return "Esta semana";

    }


    if (
        periodo === "mesAnterior"
    ) {

        return "Mês anterior";

    }


    if (
        periodo === "todos"
    ) {

        return "Todos os lançamentos";

    }


    if (
        periodo === "personalizado"
    ) {

        if (
            exportarDataInicial.value &&
            exportarDataFinal.value
        ) {

            return (
                formatarData(
                    exportarDataInicial.value
                ) +
                " até " +
                formatarData(
                    exportarDataFinal.value
                )
            );

        }


        return "Período personalizado";

    }


    return "";

}


// =====================================================
// GERAR EXCEL
// =====================================================

function gerarExcel() {

    const lancamentos =
        obterLancamentosParaExportar();


    if (
        lancamentos.length === 0
    ) {

        mensagemExportacao.textContent =
            "Não existem lançamentos para exportar.";

        return;

    }


    if (
        typeof exportarParaExcel ===
        "function"
    ) {

        exportarParaExcel(
            lancamentos
        );

        mensagemExportacao.textContent =
            "Excel gerado com sucesso.";

        return;

    }


    if (
        typeof exportarExcel ===
        "function"
    ) {

        exportarExcel(
            lancamentos
        );

        mensagemExportacao.textContent =
            "Excel gerado com sucesso.";

        return;

    }


    mensagemExportacao.textContent =
        "O módulo de Excel ainda não foi conectado.";

}


// =====================================================
// LIMPAR FORMULÁRIO
// =====================================================

function limparFormulario() {

    valorInput.value = "";

    descricaoInput.value = "";

    observacaoInput.value = "";

    categoriaInput.value =
        "Sem categoria";

    pagamentoInput.value =
        "Padrão";


    definirDataAtual();


    selecionarTipo(
        "entrada"
    );

}