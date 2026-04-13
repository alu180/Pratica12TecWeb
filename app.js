// essa e parte da minha lista real que eu super recomendo 

const LIVROS_INICIAIS = [
  { id: 1, titulo: "the new world",                                     autor: "JMoonsoon" },
  { id: 2, titulo: "stubborn skill grinder in a time loop",             autor: "X-rhoden-X" },
  { id: 3, titulo: "Primal hunter",                                     autor: "Zogarth" },
  { id: 4, titulo: "Follow the path of dao from infancy",               autor: "Ancient Xi" },
  { id: 5, titulo: "Grinding cultivation towards martial saint",        autor: "scenery on the river" },
  { id: 6, titulo: "my skills enhance infinitely",                      autor: "Wu jiechao" },
  { id: 7, titulo: "Starting to gain exp from push-ups",                autor: "sea breeze" },
  { id: 8, titulo: "Hyper_dimensional player",                          autor: "all students are buddhist" },
  { id: 9, titulo: "A novel concept he who eludes death",               autor: "Priam" },
];

// Carrega estado do sessionStorage ou cria do zero 
function carregarState() {
  const salvo = sessionStorage.getItem("appState");
  if (salvo) {
    return JSON.parse(salvo);
  }
  return {
    usuarios:      [],
    usuarioLogado: null,
    livros:        LIVROS_INICIAIS.map((l) => ({ ...l })),
    proximoId:     10,
  };
}

// Persiste o state atual no sessionStorage
function salvarState() {
  sessionStorage.setItem("appState", JSON.stringify(state));
}

// Estado ativo em memória
const state = carregarState();

//  FUNÇÕES DE USUÁRIO

/**
 * Retorna { ok: true } ou { ok: false, msg: "..." }
 */
function cadastrarUsuario(username, senha) {
  username = username.trim();

  if (!username || !senha) {
    return { ok: false, msg: "Preencha todos os campos." };
  }

  const existe = state.usuarios.find(
    (u) => u.username.toLowerCase() === username.toLowerCase()
  );

  if (existe) {
    return { ok: false, msg: "Nome de usuário já está em uso." };
  }

  state.usuarios.push({ username, senha });
  salvarState();
  return { ok: true };
}

/**
 * Autenticacao
 * Retorna { ok: true } ou { ok: false, msg: "..." }
 */
function fazerLogin(username, senha) {
  username = username.trim();

  if (!username || !senha) {
    return { ok: false, msg: "Preencha todos os campos." };
  }

  const usuario = state.usuarios.find(
    (u) =>
      u.username.toLowerCase() === username.toLowerCase() &&
      u.senha === senha
  );

  if (!usuario) {
    return { ok: false, msg: "Usuário ou senha incorretos." };
  }

  state.usuarioLogado = usuario.username;
  salvarState();
  return { ok: true };
}

/**
 * Verifica se há um usuário logado.
 * Se não houver, redireciona para a página de login.
 */
function verificarLogin() {
  if (!state.usuarioLogado) {
    window.location.href = "index.html";
  }
}

/**
 * Desloga o usuário
 */
function logout() {
  state.usuarioLogado = null;
  salvarState();
  window.location.href = "index.html";
}


//  FUNÇÕES DE LIVROS


/**
 * Adiciona um livro ao array.
 * Retorna { ok: true, livro } ou { ok: false, msg }
 */
function adicionarLivro(titulo, autor) {
  titulo = titulo.trim();
  autor  = autor.trim();

  if (!titulo || !autor) {
    return { ok: false, msg: "Título e autor são obrigatórios." };
  }

  const novoLivro = { id: state.proximoId++, titulo, autor };
  state.livros.push(novoLivro);
  salvarState();
  return { ok: true, livro: novoLivro };
}

/**
 * Edita um livro existente via ID.
 * Retorna { ok: true } ou { ok: false, msg }
 */
function editarLivro(id, titulo, autor) {
  titulo = titulo.trim();
  autor  = autor.trim();

  if (!titulo || !autor) {
    return { ok: false, msg: "Título e autor são obrigatórios." };
  }

  const idx = state.livros.findIndex((l) => l.id === id);
  if (idx === -1) return { ok: false, msg: "Livro não encontrado." };

  state.livros[idx].titulo = titulo;
  state.livros[idx].autor  = autor;
  salvarState();
  return { ok: true };
}

/**
 * Remove um livro pelo ID.
 */
function removerLivro(id) {
  const idx = state.livros.findIndex((l) => l.id === id);
  if (idx !== -1) {
    state.livros.splice(idx, 1);
    salvarState();
  }
}

/**
 * Busca um livro pelo ID.
 */
function buscarLivro(id) {
  return state.livros.find((l) => l.id === id) || null;
}
