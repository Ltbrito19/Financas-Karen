// =====================================================
// MINHAS FINANÇAS
// app.js
// =====================================================

let tipoSelecionado = "entrada";
let lancamentoEmEdicao = null;
let lembreteEmEdicao = null;

// =====================================================
// INICIALIZAÇÃO
// =====================================================

document.addEventListener("DOMContentLoaded", iniciarAplicativo);

function iniciarAplicativo() {
    configurarElementos();
    configurarNavegacao();
    configurarLancamentos();
    configurarFiltros();
    configurarExportacao();
    configurarLimpezaRegistros();
    configurarLembretes();
    definirDataAtual();
    atualizarMes();
    carregarTela();
    atualizarIndicadorLembretes();
}

// =====================================================
// ELEMENTOS
// =====================================================

let telaInicio;
let telaResumo;
let telaExportar;
let telaLembretes;

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
let btnMenuLembretes;
let btnMenuBackup;

let btnResumoTopo;
let btnVoltarInicio;
let btnVoltarInicioExportar;
let btnVoltarInicioLembretes;

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

// =====================================================
// ELEMENTOS DOS LEMBRETES
// =====================================================

let btnNovoLembrete;
let btnFecharModalLembrete;
let btnSalvarLembrete;
let btnExcluirLembrete;
let modalLembrete;
let tituloModalLembrete;
let lembreteDataInput;
let lembreteValorInput;
let lembreteDescricaoInput;
let listaLembretes;
let mensagemLembretesVazia;
let quantidadeLembretes;
let badgeLembretes;

// =====================================================
// CONFIGURAR ELEMENTOS
// =====================================================

function configurarElementos() {
    telaInicio = document.getElementById("telaInicio");
    telaResumo = document.getElementById("telaResumo");
    telaExportar = document.getElementById("telaExportar");
    telaLembretes = document.getElementById("telaLembretes");

    modal = document.getElementById("modalLancamento");
    tituloModal = document.getElementById("tituloModal");

    btnNovoLancamento = document.getElementById("btnNovoLancamento");
    btnFecharModal = document.getElementById("btnFecharModal");
    btnEntrada = document.getElementById("btnEntrada");
    btnSaida = document.getElementById("btnSaida");
    btnSalvar = document.getElementById("btnSalvar");
    btnExcluir = document.getElementById("btnExcluir");

    valorInput = document.getElementById("valor");
    descricaoInput = document.getElementById("descricao");
    categoriaInput = document.getElementById("categoria");
    pagamentoInput = document.getElementById("pagamento");
    dataInput = document.getElementById("data");
    observacaoInput = document.getElementById("observacao");

    listaLancamentos = document.getElementById("listaLancamentos");
    mensagemVazia = document.getElementById("mensagemVazia");
    totalEntradas = document.getElementById("totalEntradas");
    totalSaidas = document.getElementById("totalSaidas");
    saldo = document.getElementById("saldo");
    quantidadeLancamentos = document.getElementById("quantidadeLancamentos");

    resumoSaldo = document.getElementById("resumoSaldo");
    resumoEntradas = document.getElementById("resumoEntradas");
    resumoSaidas = document.getElementById("resumoSaidas");
    resumoCategorias = document.getElementById("resumoCategorias");
    resumoPagamentos = document.getElementById("resumoPagamentos");
    mesResumo = document.getElementById("mesResumo");

    filtroPeriodo = document.getElementById("filtroPeriodo");
    filtroTipo = document.getElementById("filtroTipo");
    datasPersonalizadas = document.getElementById("datasPersonalizadas");
    filtroDataInicial = document.getElementById("filtroDataInicial");
    filtroDataFinal = document.getElementById("filtroDataFinal");
    btnLimparFiltros = document.getElementById("btnLimparFiltros");

    btnMenuInicio = document.getElementById("btnMenuInicio");
    btnMenuResumo = document.getElementById("btnMenuResumo");
    btnMenuExcel = document.getElementById("btnMenuExcel");
    btnMenuLembretes = document.getElementById("btnMenuLembretes");
    btnMenuBackup = document.getElementById("btnMenuBackup");

    btnResumoTopo = document.getElementById("btnResumoTopo");
    btnVoltarInicio = document.getElementById("btnVoltarInicio");
    btnVoltarInicioExportar = document.getElementById("btnVoltarInicioExportar");
    btnVoltarInicioLembretes = document.getElementById("btnVoltarInicioLembretes");

    exportarPeriodo = document.getElementById("exportarPeriodo");
    exportarTipo = document.getElementById("exportarTipo");
    exportarDatasPersonalizadas = document.getElementById("exportarDatasPersonalizadas");
    exportarDataInicial = document.getElementById("exportarDataInicial");
    exportarDataFinal = document.getElementById("exportarDataFinal");
    exportarQuantidade = document.getElementById("exportarQuantidade");
    exportarPeriodoTexto = document.getElementById("exportarPeriodoTexto");
    btnGerarExcel = document.getElementById("btnGerarExcel");
    mensagemExportacao = document.getElementById("mensagemExportacao");

    btnLimparRegistros = document.getElementById("btnLimparRegistros");

    btnNovoLembrete = document.getElementById("btnNovoLembrete");
    btnFecharModalLembrete = document.getElementById("btnFecharModalLembrete");
    btnSalvarLembrete = document.getElementById("btnSalvarLembrete");
    btnExcluirLembrete = document.getElementById("btnExcluirLembrete");
    modalLembrete = document.getElementById("modalLembrete");
    tituloModalLembrete = document.getElementById("tituloModalLembrete");
    lembreteDataInput = document.getElementById("lembreteData");
    lembreteValorInput = document.getElementById("lembreteValor");
    lembreteDescricaoInput = document.getElementById("lembreteDescricao");
    listaLembretes = document.getElementById("listaLembretes");
    mensagemLembretesVazia = document.getElementById("mensagemLembretesVazia");
    quantidadeLembretes = document.getElementById("quantidadeLembretes");
    badgeLembretes = document.getElementById("badgeLembretes");
}

// =====================================================
// NAVEGAÇÃO
// =====================================================

function configurarNavegacao() {
    btnMenuInicio.addEventListener("click", mostrarInicio);
    btnMenuResumo.addEventListener("click", mostrarResumo);
    btnMenuExcel.addEventListener("click", mostrarExportar);
    btnMenuLembretes.addEventListener("click", mostrarLembretes);

    btnResumoTopo.addEventListener("click", mostrarResumo);
    btnVoltarInicio.addEventListener("click", mostrarInicio);
    btnVoltarInicioExportar.addEventListener("click", mostrarInicio);
    btnVoltarInicioLembretes.addEventListener("click", mostrarInicio);
}

function mostrarInicio() {
    telaInicio.hidden = false;
    telaResumo.hidden = true;
    telaExportar.hidden = true;
    telaLembretes.hidden = true;

    btnMenuInicio.classList.add("ativo");
    btnMenuResumo.classList.remove("ativo");
    btnMenuExcel.classList.remove("ativo");
    btnMenuLembretes.classList.remove("ativo");

    window.scrollTo(0, 0);
}

function mostrarResumo() {
    atualizarResumoCompleto();

    telaInicio.hidden = true;
    telaResumo.hidden = false;
    telaExportar.hidden = true;
    telaLembretes.hidden = true;

    btnMenuInicio.classList.remove("ativo");
    btnMenuResumo.classList.add("ativo");
    btnMenuExcel.classList.remove("ativo");
    btnMenuLembretes.classList.remove("ativo");

    window.scrollTo(0, 0);
}

function mostrarExportar() {
    telaInicio.hidden = true;
    telaResumo.hidden = true;
    telaExportar.hidden = false;
    telaLembretes.hidden = true;

    btnMenuInicio.classList.remove("ativo");
    btnMenuResumo.classList.remove("ativo");
    btnMenuExcel.classList.add("ativo");
    btnMenuLembretes.classList.remove("ativo");

    atualizarPreviaExportacao();

    window.scrollTo(0, 0);
}

function mostrarLembretes() {
    telaInicio.hidden = true;
    telaResumo.hidden = true;
    telaExportar.hidden = true;
    telaLembretes.hidden = false;

    btnMenuInicio.classList.remove("ativo");
    btnMenuResumo.classList.remove("ativo");
    btnMenuExcel.classList.remove("ativo");
    btnMenuLembretes.classList.add("ativo");

    renderizarLembretes();
    atualizarIndicadorLembretes();

    window.scrollTo(0, 0);
}

// =====================================================
// DATA
// =====================================================

function definirDataAtual() {
    dataInput.value = formatarDataISO(new Date());
}

function atualizarMes() {
    const hoje = new Date();
    const texto = hoje.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric"
    });

    document.getElementById("mesAtual").textContent = texto;
    mesResumo.textContent = texto;
}

// =====================================================
// LANÇAMENTOS
// =====================================================

function configurarLancamentos() {
    btnNovoLancamento.addEventListener("click", abrirNovoLancamento);
    btnFecharModal.addEventListener("click", fecharModal);

    modal.addEventListener("click", evento => {
        if (evento.target === modal) fecharModal();
    });

    btnEntrada.addEventListener("click", () => selecionarTipo("entrada"));
    btnSaida.addEventListener("click", () => selecionarTipo("saida"));

    btnSalvar.addEventListener("click", salvarLancamentoFormulario);
    btnExcluir.addEventListener("click", excluirLancamentoAtual);
}

function abrirNovoLancamento() {
    lancamentoEmEdicao = null;
    limparFormulario();

    tituloModal.textContent = "Novo lançamento";
    btnSalvar.textContent = "Salvar lançamento";
    btnExcluir.hidden = true;

    modal.hidden = false;

    setTimeout(() => valorInput.focus(), 200);
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

    if (tipo === "entrada") {
        btnEntrada.classList.add("entrada-selecionada");
        btnSaida.classList.remove("saida-selecionada");

        if (categoriaInput) categoriaInput.value = "Sem categoria";
    } else {
        btnSaida.classList.add("saida-selecionada");
        btnEntrada.classList.remove("entrada-selecionada");

        if (categoriaInput && categoriaInput.value === "Sem categoria") {
            categoriaInput.value = "Alimentação";
        }
    }
}

// =====================================================
// SALVAR LANÇAMENTO
// =====================================================

function salvarLancamentoFormulario() {
    const dados = {
        tipo: tipoSelecionado,
        valor: valorInput.value,
        descricao: descricaoInput.value,
        categoria: tipoSelecionado === "entrada" ? "Sem categoria" : categoriaInput.value,
        pagamento: "Padrão",
        data: dataInput.value,
        observacao: observacaoInput.value
    };

    const novo = criarLancamento(dados);
    const validacao = validarLancamento(novo);

    if (!validacao.valido) {
        alert(validacao.mensagem);
        return;
    }

    if (lancamentoEmEdicao !== null) {
        atualizarLancamento(lancamentoEmEdicao, {
            tipo: dados.tipo,
            valor: Number(dados.valor),
            descricao: String(dados.descricao).trim(),
            categoria: dados.categoria,
            pagamento: "Padrão",
            data: dados.data,
            observacao: String(dados.observacao).trim()
        });
    } else {
        adicionarLancamento(novo);
    }

    carregarTela();
    atualizarResumoCompleto();
    atualizarPreviaExportacao();
    fecharModal();
}

// =====================================================
// EDIÇÃO DE LANÇAMENTO
// =====================================================

function abrirEdicao(id) {
    const lancamento = obterLancamentoPorId(id);
    if (!lancamento) return;

    lancamentoEmEdicao = id;

    tituloModal.textContent = "Editar lançamento";
    btnSalvar.textContent = "Salvar alterações";
    btnExcluir.hidden = false;

    selecionarTipo(lancamento.tipo);

    valorInput.value = lancamento.valor;
    descricaoInput.value = lancamento.descricao;

    categoriaInput.value =
        lancamento.tipo === "entrada"
            ? "Sem categoria"
            : lancamento.categoria || "Alimentação";

    pagamentoInput.value = "Padrão";
    dataInput.value = lancamento.data;
    observacaoInput.value = lancamento.observacao || "";

    modal.hidden = false;
}

// =====================================================
// EXCLUSÃO DE LANÇAMENTO
// =====================================================

function excluirLancamentoAtual() {
    if (lancamentoEmEdicao === null) return;

    const confirmar = confirm("Deseja excluir este lançamento?");
    if (!confirmar) return;

    excluirLancamento(lancamentoEmEdicao);

    carregarTela();
    atualizarResumoCompleto();
    atualizarPreviaExportacao();
    fecharModal();
}

// =====================================================
// LIMPAR TODOS OS REGISTROS
// =====================================================

function configurarLimpezaRegistros() {
    if (!btnLimparRegistros) {
        console.warn("Botão de limpar registros não encontrado.");
        return;
    }

    btnLimparRegistros.addEventListener("click", limparTodosOsRegistros);
}

function limparTodosOsRegistros() {
    const lancamentos = obterLancamentos();
    const quantidade = lancamentos.length;

    if (quantidade === 0) {
        alert("Não existem registros para limpar.");
        return;
    }

    const primeiraConfirmacao = confirm(
        "ATENÇÃO!\n\n" +
        "Você está prestes a excluir TODOS os " + quantidade + " registros do aplicativo.\n\n" +
        "Essa ação não poderá ser desfeita pelo aplicativo.\n\n" +
        "Deseja continuar?"
    );

    if (!primeiraConfirmacao) return;

    const segundaConfirmacao = confirm(
        "SEGUNDA CONFIRMAÇÃO\n\n" +
        "Todos os lançamentos atuais serão apagados.\n\n" +
        "Recomendamos criar um backup antes de continuar.\n\n" +
        "Tem certeza absoluta que deseja apagar os registros?"
    );

    if (!segundaConfirmacao) return;

    const confirmacaoHumana = prompt(
        "VERIFICAÇÃO DE SEGURANÇA\n\n" +
        "Para confirmar a exclusão definitiva, digite exatamente:\n\n" +
        "LIMPAR"
    );

    if (confirmacaoHumana === null) return;

    if (confirmacaoHumana.trim() !== "LIMPAR") {
        alert("Verificação incorreta.\n\nNenhum registro foi apagado.");
        return;
    }

    const confirmacaoFinal = confirm(
        "ÚLTIMA CONFIRMAÇÃO\n\n" +
        "A exclusão será realizada agora.\n\n" +
        "Deseja realmente continuar?"
    );

    if (!confirmacaoFinal) return;

    try {
        salvarLancamentos([]);
        carregarTela();
        atualizarResumoCompleto();
        atualizarPreviaExportacao();

        alert(quantidade + " registro(s) foram removidos com sucesso.");
    } catch (erro) {
        console.error("Erro ao limpar registros:", erro);
        alert("Não foi possível limpar os registros.");
    }
}

// =====================================================
// TELA INICIAL
// =====================================================

function carregarTela() {
    const lancamentos = obterLancamentos();
    const ordenados = ordenarLancamentos(lancamentos);

    renderizarLancamentos(ordenados);
    atualizarResumoTela(ordenados);
}

// =====================================================
// RENDERIZAR LANÇAMENTOS
// =====================================================

function renderizarLancamentos(lancamentos) {
    const itens = listaLancamentos.querySelectorAll(".lancamento");
    itens.forEach(item => item.remove());

    quantidadeLancamentos.textContent = lancamentos.length;

    if (lancamentos.length === 0) {
        mensagemVazia.style.display = "block";
        return;
    }

    mensagemVazia.style.display = "none";

    lancamentos.forEach(lancamento => {
        listaLancamentos.appendChild(criarElementoLancamento(lancamento));
    });
}

// =====================================================
// CRIAR ELEMENTO DE LANÇAMENTO
// =====================================================

function criarElementoLancamento(lancamento) {
    const elemento = document.createElement("div");
    elemento.className = "lancamento";

    const entrada = lancamento.tipo === "entrada";
    const classe = entrada ? "entrada" : "saida";
    const sinal = entrada ? "+" : "-";
    const icone = entrada ? "↑" : "↓";

    elemento.innerHTML = `
        <div class="lancamento-icone ${classe}">
            ${icone}
        </div>

        <div class="lancamento-info">
            <strong
