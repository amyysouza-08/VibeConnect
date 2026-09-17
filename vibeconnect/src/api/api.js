// ==============================
// CONFIGURAÇÃO
// ==============================
// IMPORTANTE: "localhost" só funciona se você testar no navegador do
// próprio PC. Em Expo Go / emulador, o app roda em outro dispositivo
// e "localhost" aponta pra ele mesmo, não pro seu computador.
//
// - Emulador Android: use 10.0.2.2 no lugar do IP
// - Celular físico (Expo Go): use o IP local do seu PC na rede Wi-Fi
//   (ex: 192.168.0.15) — descubra com `ipconfig` (Windows) ou
//   `ifconfig`/`ip a` (Mac/Linux). PC e celular precisam estar na
//   MESMA rede Wi-Fi.
// - iOS Simulator (só Mac): localhost funciona normalmente.
//
// Rode o servidor com: npx json-server --watch db.json --port 3000

const API_URL = "http://192.168.0.15:3000"; // <-- TROQUE pelo seu IP

// ==============================
// USUÁRIOS
// ==============================

export async function criarUsuario(nome, email, senha) {
  const emailNormalizado = email.trim().toLowerCase();

  const resBusca = await fetch(
    `${API_URL}/usuarios?email=${encodeURIComponent(emailNormalizado)}`
  );
  if (!resBusca.ok) {
    throw new Error("Não foi possível conectar ao servidor.");
  }
  const existentes = await resBusca.json();

  if (existentes.length > 0) {
    throw new Error("Este e-mail já está cadastrado.");
  }

  const nomeLimpo = nome.trim();

  const username = nomeLimpo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");

  const novoUsuario = {
    username,
    nome: nomeLimpo,
    email: emailNormalizado,
    senha,
    bio: "",
    localizacao: "",
    seguidores: 0,
    seguindo: 0,
    publicacoes: 0,
  };

  const res = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoUsuario),
  });

  if (!res.ok) {
    throw new Error("Não foi possível criar a conta.");
  }

  const criado = await res.json();

  // mantém o mesmo formato que CriarConta.jsx espera
  return { ...criado, usuario: criado.username };
}

// ==============================
// LOGIN
// ==============================

export async function loginUsuario(emailOuUsuario, senha) {
  const login = emailOuUsuario.trim().toLowerCase();

  const res = await fetch(`${API_URL}/usuarios`);
  if (!res.ok) {
    throw new Error("Não foi possível conectar ao servidor.");
  }
  const usuarios = await res.json();

  const usuarioEncontrado = usuarios.find(
    (item) =>
      (item.email.toLowerCase() === login ||
        item.username.toLowerCase() === login) &&
      item.senha === senha
  );

  if (!usuarioEncontrado) {
    throw new Error("E-mail/usuário ou senha incorretos.");
  }

  return { ...usuarioEncontrado, usuario: usuarioEncontrado.username };
}

// ==============================
// PEGAR USUÁRIO
// ==============================

export async function getUsuario(id = 1) {
  const res = await fetch(`${API_URL}/usuarios/${id}`);
  if (!res.ok) {
    throw new Error("Usuário não encontrado.");
  }
  const usuario = await res.json();
  return { ...usuario, usuario: usuario.username };
}

// ==============================
// PEGAR POSTS
// ==============================

export async function getPosts() {
  const [resPub, resUsu] = await Promise.all([
    fetch(`${API_URL}/publicacoes`),
    fetch(`${API_URL}/usuarios`),
  ]);

  if (!resPub.ok || !resUsu.ok) {
    throw new Error("Não foi possível carregar as publicações.");
  }

  const publicacoes = await resPub.json();
  const usuarios = await resUsu.json();

  return publicacoes.map((pub) => {
    const autor = usuarios.find((u) => u.id === pub.usuarioId);

    return {
      id: pub.id,
      usuario: {
        nome: autor ? autor.nome : pub.username,
        usuario: pub.username,
      },
      texto: pub.legenda,
      horario: pub.horario || "Agora",
      curtidas: pub.curtidas || 0,
      comentarios: pub.comentarios || 0,
      curtido: pub.curtido ?? false,
      salvo: pub.salvo ?? false,
    };
  });
}

// ==============================
// CURTIR POST
// ==============================

export async function curtirPost(postId) {
  const resGet = await fetch(`${API_URL}/publicacoes/${postId}`);
  if (!resGet.ok) {
    throw new Error("Publicação não encontrada.");
  }
  const post = await resGet.json();

  const curtido = !post.curtido;
  const curtidas = curtido
    ? (post.curtidas || 0) + 1
    : (post.curtidas || 0) - 1;

  const resPatch = await fetch(`${API_URL}/publicacoes/${postId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ curtido, curtidas }),
  });

  if (!resPatch.ok) {
    throw new Error("Não foi possível curtir a publicação.");
  }

  const atualizado = await resPatch.json();

  return {
    id: atualizado.id,
    usuario: { nome: atualizado.username, usuario: atualizado.username },
    texto: atualizado.legenda,
    horario: atualizado.horario || "Agora",
    curtidas: atualizado.curtidas,
    comentarios: atualizado.comentarios,
    curtido: atualizado.curtido,
    salvo: atualizado.salvo ?? false,
  };
}

// ==============================
// SALVAR POST
// ==============================

export async function salvarPost(postId) {
  const resGet = await fetch(`${API_URL}/publicacoes/${postId}`);
  if (!resGet.ok) {
    throw new Error("Publicação não encontrada.");
  }
  const post = await resGet.json();

  const salvo = !post.salvo;

  const resPatch = await fetch(`${API_URL}/publicacoes/${postId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ salvo }),
  });

  if (!resPatch.ok) {
    throw new Error("Não foi possível salvar a publicação.");
  }

  const atualizado = await resPatch.json();

  return {
    id: atualizado.id,
    usuario: { nome: atualizado.username, usuario: atualizado.username },
    texto: atualizado.legenda,
    horario: atualizado.horario || "Agora",
    curtidas: atualizado.curtidas,
    comentarios: atualizado.comentarios,
    curtido: atualizado.curtido ?? false,
    salvo: atualizado.salvo,
  };
}

// ==============================
// NOTIFICAÇÕES
// ==============================

export async function getNotificacoes() {
  const res = await fetch(`${API_URL}/notificacoes`);
  if (!res.ok) {
    throw new Error("Não foi possível carregar notificações.");
  }
  return await res.json();
}