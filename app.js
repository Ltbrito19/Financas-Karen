// MINHAS FINANÇAS — app.js (versão unificada + exportação funcionando)

let tipoSelecionado = "entrada";
let lancamentoEmEdicao = null;
let lembreteEmEdicao = null;

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

// ELEMENTOS
let telaInicio, telaResumo, telaExportar, telaLembretes;
let modal, tituloModal, btnNovoLancamento, btnFecharModal, btnEntrada, btnSaida, btnSalvar, btnExcluir;
let valorInput, descricaoInput, categoriaInput, pagamentoInput, dataInput, observacaoInput;
let listaLancamentos, mensagemVazia, totalEntradas, totalSaidas, saldo, quantidadeLancamentos;
let resumoSaldo, resumoEntradas, resumoSaidas, resumoCategorias, resumoPagamentos, mesResumo;
let filtroPeriodo, filtroTipo, datasPersonalizadas, filtroDataInicial, filtroDataFinal, btnLimparFiltros;
let btnMenuInicio, btnMenuResumo, btnMenuExcel, btnMenuLembretes, btnMenuBackup;
let btnResumoTopo, btnVoltarInicio, btnVoltarInicioExportar, btnVoltarInicioLembretes;
let exportarPeriodo, exportarTipo, exportarDatasPersonalizadas, exportarDataInicial, exportarDataFinal;
let exportarQuantidade, exportarPeriodoTexto, btnGerarExcel, mensagemExportacao;
let btnLimparRegistros;

// Lembretes
let btnNovoLembrete, btnFecharModalLembrete, btnSalvarLembrete, btnExcluirLembrete;
let modalLembrete, tituloModalLembrete, lembreteDataInput, lembreteValorInput, lembreteDescricaoInput;
let listaLembretes, mensagemLembretesVazia, quantidadeLembretes, badgeLembretes;

// CONFIG ELEMENTOS
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

// NAVEGAÇÃO
function configurarNavegacao() {
    btnMenuInicio.onclick = mostrarInicio;
    btnMenuResumo.onclick = mostrarResumo;
    btnMenuExcel.onclick = mostrarExportar;
    btnMenuLembretes.onclick = mostrarLembretes;

    btnResumoTopo.onclick = mostrarResumo;
    btnVoltarInicio.onclick = mostrarInicio;
    btnVoltarInicioExportar.onclick = mostrarInicio;
    btnVoltarInicioLembretes.onclick = mostrarInicio;
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

// DATA
function definirDataAtual() {
    dataInput.value = formatarDataISO(new Date());
}

function atualizarMes() {
    const hoje = new Date();
    const texto = hoje.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
    document.getElementById("mesAtual").textContent = texto;
    mesResumo.textContent = texto;
}

// LANÇAMENTOS
function configurarLancamentos() {
    btnNovoLancamento.onclick = abrirNovoLancamento;
    btnFecharModal.onclick = fecharModal;

    modal.onclick = e => { if (e.target === modal) fecharModal(); };

    btnEntrada.onclick = () => selecionarTipo("entrada");
    btnSaida.onclick = () => selecionarTipo("saida");

    btnSalvar.onclick = salvarLancamentoFormulario;
    btnExcluir.onclick = excluirLancamentoAtual;
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

function selecionarTipo(tipo) {
    tipoSelecionado = tipo;

    if (tipo === "entrada") {
        btnEntrada.classList.add("entrada-selecionada");
        btnSaida.classList.remove("saida-selecionada");
        categoriaInput.value = "Sem categoria";
    } else {
        btnSaida.classList.add("saida-selecionada");
        btnEntrada.classList.remove("entrada-selecionada");
        if (categoriaInput.value === "Sem categoria") categoriaInput.value = "Alimentação";
    }
}

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

    if (!validacao.valido) return alert(validacao.mensagem);

    if (lancamentoEmEdicao !== null) {
        atualizarLancamento(lancamentoEmEdicao, {
            tipo: dados.tipo,
            valor: Number(dados.valor),
            descricao: dados.descricao.trim(),
            categoria: dados.categoria,
            pagamento: "Padrão",
            data: dados.data,
            observacao: dados.observacao.trim()
        });
    } else {
        adicionarLancamento(novo);
    }

    carregarTela();
    atualizarResumoCompleto();
    atualizarPreviaExportacao();
    fecharModal();
}

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
    categoriaInput.value = lancamento.tipo === "entrada" ? "Sem categoria" : lancamento.categoria || "Alimentação";
    pagamentoInput.value = "Padrão";
    dataInput.value = lancamento.data;
    observacaoInput.value = lancamento.observacao || "";

    modal.hidden = false;
}

function excluirLancamentoAtual() {
    if (lancamentoEmEdicao === null) return;

    if (!confirm("Deseja excluir este lançamento?")) return;

    excluirLancamento(lancamentoEmEdicao);

    carregarTela();
    atualizarResumoCompleto();
    atualizarPreviaExportacao();
    fecharModal();
}

// LIMPAR REGISTROS
function configurarLimpezaRegistros() {
    if (!btnLimparRegistros) return;
    btnLimparRegistros.onclick = limparTodosOsRegistros;
}

function limparTodosOsRegistros() {
    const lancamentos = obterLancamentos();
    const quantidade = lancamentos.length;

    if (quantidade === 0) return alert("Não existem registros para limpar.");

    if (!confirm("ATENÇÃO! Você está prestes a excluir TODOS os registros.")) return;
    if (!confirm("SEGUNDA CONFIRMAÇÃO: Tem certeza absoluta?")) return;

    const texto = prompt("Digite LIMPAR para confirmar:");
    if (texto !== "LIMPAR") return alert("Verificação incorreta.");

    if (!confirm("Última confirmação: deseja continuar?")) return;

    salvarLancamentos([]);
    carregarTela();
    atualizarResumoCompleto();
    atualizarPreviaExportacao();
    alert("Registros removidos com sucesso.");
}

// TELA INICIAL
function carregarTela() {
    const lancamentos = obterLancamentos();
    const ordenados = ordenarLancamentos(lancamentos);
    renderizarLancamentos(ordenados);
    atualizarResumoTela(ordenados);
}

function renderizarLancamentos(lancamentos) {
    listaLancamentos.innerHTML = "";
    quantidadeLancamentos.textContent = lancamentos.length;

    if (lancamentos.length === 0) {
        mensagemVazia.style.display = "block";
        return;
    }

    mensagemVazia.style.display = "none";

    lancamentos.forEach(l => listaLancamentos.appendChild(criarElementoLancamento(l)));
}

function criarElementoLancamento(l) {
    const div = document.createElement("div");
    div.className = "lancamento";

    const entrada = l.tipo === "entrada";
    const classe = entrada ? "entrada" : "saida";
    const sinal = entrada ? "+" : "-";
    const icone = entrada ? "↑" : "↓";

    div.innerHTML = `
        <div class="lancamento-icone ${classe}">${icone}</div>
        <div class="lancamento-info">
            <strong>${escaparHTML(l.descricao)}</strong>
            <small>${formatarData(l.data)} · ${escaparHTML(l.categoria)} · ${escaparHTML(l.pagamento)}</small>
        </div>
        <div class="lancamento-valor ${classe}">${sinal}${formatarMoeda(l.valor)}</div>
        <button class="btn-editar-lancamento">Editar</button>
    `;

    div.querySelector(".btn-editar-lancamento").onclick = e => {
        e.stopPropagation();
        abrirEdicao(l.id);
    };

    div.onclick = () => abrirEdicao(l.id);

    return div;
}

// RESUMO
function atualizarResumoTela(lancamentos) {
    const r = calcularResumo(lancamentos);
    totalEntradas.textContent = formatarMoeda(r.entradas);
    totalSaidas.textContent = formatarMoeda(r.saidas);
    saldo.textContent = formatarMoeda(r.saldo);
    saldo.style.color = r.saldo < 0 ? "#dc2626" : "#111827";
}

function configurarFiltros() {
    filtroPeriodo.onchange = alterarPeriodo;
    filtroTipo.onchange = atualizarResumoCompleto;
    filtroDataInicial.onchange = atualizarResumoCompleto;
    filtroDataFinal.onchange = atualizarResumoCompleto;
    btnLimparFiltros.onclick = limparFiltros;
}

function alterarPeriodo() {
    datasPersonalizadas.hidden = filtroPeriodo.value !== "personalizado";

    if (filtroPeriodo.value === "personalizado") {
        if (!filtroDataInicial.value) filtroDataInicial.value = obterInicioDoMesAtual();
        if (!filtroDataFinal.value) filtroDataFinal.value = obterFimDoMesAtual();
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

function obterLancamentosFiltrados() {
    return filtrarLancamentos(obterLancamentos(), obterFiltrosAtuais());
}

function limparFiltros() {
    filtroPeriodo.value = "mes";
    filtroTipo.value = "todos";
    filtroDataInicial.value = "";
    filtroDataFinal.value = "";
    datasPersonalizadas.hidden = true;
    atualizarResumoCompleto();
}

function atualizarResumoCompleto() {
    const lancamentos = obterLancamentosFiltrados();
    const r = calcularResumo(lancamentos);

    resumoEntradas.textContent = formatarMoeda(r.entradas);
    resumoSaidas.textContent = formatarMoeda(r.saidas);
    resumoSaldo.textContent = formatarMoeda(r.saldo);
    resumoSaldo.style.color = r.saldo < 0 ? "#dc2626" : "#111827";

    renderizarResumoCategorias(lancamentos);
    renderizarResumoPagamentos(lancamentos);
    atualizarTituloResumo();
}

function atualizarTituloResumo() {
    const periodo = filtroPeriodo.value;
    const textos = {
        mes: "Este
