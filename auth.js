// =====================================================
// MINHAS FINANÇAS
// auth.js
// Autenticação local por senha
// =====================================================


// =====================================================
// CONFIGURAÇÕES
// =====================================================

const CHAVE_SENHA =
    "minhasFinancasSenha";

const CHAVE_AUTENTICADO =
    "minhasFinancasAutenticado";


// =====================================================
// INICIALIZAÇÃO
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    iniciarAutenticacao
);


function iniciarAutenticacao() {

    criarTelaAutenticacao();

    verificarAutenticacao();

}


// =====================================================
// CRIAR TELA DE AUTENTICAÇÃO
// =====================================================

function criarTelaAutenticacao() {

    if (
        document.getElementById(
            "telaAutenticacao"
        )
    ) {

        return;

    }


    const tela =
        document.createElement(
            "div"
        );


    tela.id =
        "telaAutenticacao";


    tela.innerHTML = `

        <div class="auth-container">

            <div class="auth-card">

                <div class="auth-icone">
                    🔐
                </div>

                <h1>
                    Minhas Finanças
                </h1>

                <p id="authMensagem">
                    Acesso protegido
                </p>

                <div
                    id="authCriarSenha"
                    hidden
                >

                    <label>
                        Crie sua senha
                    </label>

                    <input
                        type="password"
                        id="authNovaSenha"
                        placeholder="Digite sua senha"
                        autocomplete="new-password"
                    >

                    <label>
                        Confirme sua senha
                    </label>

                    <input
                        type="password"
                        id="authConfirmarSenha"
                        placeholder="Digite novamente"
                        autocomplete="new-password"
                    >

                    <button
                        type="button"
                        id="btnCriarSenha"
                    >
                        Criar senha
                    </button>

                </div>


                <div
                    id="authEntrar"
                    hidden
                >

                    <label>
                        Senha
                    </label>

                    <input
                        type="password"
                        id="authSenha"
                        placeholder="Digite sua senha"
                        autocomplete="current-password"
                    >

                    <button
                        type="button"
                        id="btnEntrar"
                    >
                        Entrar
                    </button>

                </div>


                <p
                    id="authErro"
                    class="auth-erro"
                ></p>

            </div>

        </div>

    `;


    document.body.appendChild(
        tela
    );


    document
        .getElementById(
            "btnCriarSenha"
        )
        .addEventListener(
            "click",
            criarSenha
        );


    document
        .getElementById(
            "btnEntrar"
        )
        .addEventListener(
            "click",
            verificarSenha
        );


    document
        .getElementById(
            "authNovaSenha"
        )
        .addEventListener(
            "keydown",
            evento => {

                if (
                    evento.key ===
                    "Enter"
                ) {

                    criarSenha();

                }

            }
        );


    document
        .getElementById(
            "authConfirmarSenha"
        )
        .addEventListener(
            "keydown",
            evento => {

                if (
                    evento.key ===
                    "Enter"
                ) {

                    criarSenha();

                }

            }
        );


    document
        .getElementById(
            "authSenha"
        )
        .addEventListener(
            "keydown",
            evento => {

                if (
                    evento.key ===
                    "Enter"
                ) {

                    verificarSenha();

                }

            }
        );

}


// =====================================================
// VERIFICAR AUTENTICAÇÃO
// =====================================================

function verificarAutenticacao() {

    const senha =
        localStorage.getItem(
            CHAVE_SENHA
        );


    if (
        !senha
    ) {

        mostrarCriacaoSenha();

        return;

    }


    const autenticado =
        sessionStorage.getItem(
            CHAVE_AUTENTICADO
        );


    if (
        autenticado ===
        "true"
    ) {

        liberarAplicativo();

        return;

    }


    mostrarLogin();

}


// =====================================================
// MOSTRAR CRIAÇÃO DE SENHA
// =====================================================

function mostrarCriacaoSenha() {

    bloquearAplicativo();


    const mensagem =
        document.getElementById(
            "authMensagem"
        );


    const criar =
        document.getElementById(
            "authCriarSenha"
        );


    const entrar =
        document.getElementById(
            "authEntrar"
        );


    mensagem.textContent =
        "Crie uma senha para proteger o aplicativo.";


    criar.hidden =
        false;


    entrar.hidden =
        true;


    setTimeout(
        () => {

            document
                .getElementById(
                    "authNovaSenha"
                )
                .focus();

        },
        100
    );

}


// =====================================================
// MOSTRAR LOGIN
// =====================================================

function mostrarLogin() {

    bloquearAplicativo();


    const mensagem =
        document.getElementById(
            "authMensagem"
        );


    const criar =
        document.getElementById(
            "authCriarSenha"
        );


    const entrar =
        document.getElementById(
            "authEntrar"
        );


    mensagem.textContent =
        "Digite sua senha para continuar.";


    criar.hidden =
        true;


    entrar.hidden =
        false;


    setTimeout(
        () => {

            document
                .getElementById(
                    "authSenha"
                )
                .focus();

        },
        100
    );

}


// =====================================================
// CRIAR SENHA
// =====================================================

function criarSenha() {

    const senha =
        document
            .getElementById(
                "authNovaSenha"
            )
            .value;


    const confirmacao =
        document
            .getElementById(
                "authConfirmarSenha"
            )
            .value;


    limparErro();


    if (
        senha.length < 4
    ) {

        mostrarErro(
            "A senha deve ter pelo menos 4 caracteres."
        );

        return;

    }


    if (
        senha !==
        confirmacao
    ) {

        mostrarErro(
            "As senhas não coincidem."
        );

        return;

    }


    localStorage.setItem(
        CHAVE_SENHA,
        senha
    );


    sessionStorage.setItem(
        CHAVE_AUTENTICADO,
        "true"
    );


    liberarAplicativo();

}


// =====================================================
// VERIFICAR SENHA
// =====================================================

function verificarSenha() {

    const senha =
        document
            .getElementById(
                "authSenha"
            )
            .value;


    limparErro();


    const senhaSalva =
        localStorage.getItem(
            CHAVE_SENHA
        );


    if (
        senha ===
        senhaSalva
    ) {

        sessionStorage.setItem(
            CHAVE_AUTENTICADO,
            "true"
        );


        liberarAplicativo();


        return;

    }


    mostrarErro(
        "Senha incorreta."
    );


    document
        .getElementById(
            "authSenha"
        )
        .value = "";


    document
        .getElementById(
            "authSenha"
        )
        .focus();

}


// =====================================================
// BLOQUEAR APLICATIVO
// =====================================================

function bloquearAplicativo() {

    const app =
        document.querySelector(
            ".app"
        );


    if (
        app
    ) {

        app.style.display =
            "none";

    }


    const tela =
        document.getElementById(
            "telaAutenticacao"
        );


    if (
        tela
    ) {

        tela.style.display =
            "flex";

    }

}


// =====================================================
// LIBERAR APLICATIVO
// =====================================================

function liberarAplicativo() {

    const tela =
        document.getElementById(
            "telaAutenticacao"
        );


    if (
        tela
    ) {

        tela.style.display =
            "none";

    }


    const app =
        document.querySelector(
            ".app"
        );


    if (
        app
    ) {

        app.style.display =
            "";

    }

}


// =====================================================
// ERROS
// =====================================================

function mostrarErro(
    mensagem
) {

    const elemento =
        document.getElementById(
            "authErro"
        );


    if (
        elemento
    ) {

        elemento.textContent =
            mensagem;

    }

}


function limparErro() {

    const elemento =
        document.getElementById(
            "authErro"
        );


    if (
        elemento
    ) {

        elemento.textContent =
            "";

    }

}