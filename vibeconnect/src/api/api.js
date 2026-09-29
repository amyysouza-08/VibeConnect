import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://172.16.2.139:3000";

const CHAVE_USUARIO_LOGADO = "@VibeConnect:usuario";

// REQUISIÇÃO PRINCIPAL

async function requisicao(url, opcoes = {}) {
  try {
    console.log("FAZENDO REQUISIÇÃO:", url);

    const resposta = await fetch(url, {
      ...opcoes,
      headers: {
        "Content-Type": "application/json",
        ...(opcoes.headers || {}),
      },
    });

    console.log("STATUS:", resposta.status);

    if (!resposta.ok) {
      let mensagem = `Erro do servidor: ${resposta.status}`;

      try {
        const erroJson = await resposta.json();

        if (erroJson?.message) {
          mensagem = erroJson.message;
        }
      } catch (erro) {
        // ignora erro ao tentar ler resposta
      }

      throw new Error(mensagem);
    }

    return resposta;
  } catch (erro) {
    console.log("ERRO NA API:", erro);

    const mensagem = String(erro?.message || "");

    if (
      mensagem.includes("Network request failed") ||
      mensagem.includes("timed out") ||
      mensagem.includes("Failed to connect") ||
      mensagem.includes("Could not connect")
    ) {
      throw new Error(
        "Não foi possível conectar ao servidor. Verifique se o JSON Server está ligado e se o celular está na mesma rede Wi-Fi."
      );
    }

    throw erro;
  }
}

// FORMATAR HORÁRIO


export function formatarHorario(data) {
  if (!data) {
    return "Agora";
  }

  const dataPost = new Date(data);

  if (Number.isNaN(dataPost.getTime())) {
    console.log("DATA INVÁLIDA:", data);
    return "Agora";
  }

  const agora = new Date();

  const diferencaMs =
    agora.getTime() - dataPost.getTime();

  const segundos = Math.floor(
    diferencaMs / 1000
  );

  if (segundos < 0) {
    return "Agora";
  }

  if (segundos < 60) {
    return "Agora";
  }

  const minutos = Math.floor(
    segundos / 60
  );

  if (minutos < 60) {
    return minutos === 1
      ? "1 min"
      : `${minutos} min`;
  }

  const horas = Math.floor(
    minutos / 60
  );

  if (horas < 24) {
    return horas === 1
      ? "1 h"
      : `${horas} h`;
  }

  const dias = Math.floor(
    horas / 24
  );

  if (dias < 7) {
    return dias === 1
      ? "1 dia"
      : `${dias} dias`;
  }

  return dataPost.toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );
}


// NORMALIZAR PUBLICAÇÃO

function normalizarPost(publicacao, usuarios = []) {
  const autor = usuarios.find(
    (usuario) =>
      String(usuario.id) ===
      String(publicacao.usuarioId)
  );

  const dataCriacao =
    publicacao.criadoEm ||
    publicacao.dataCriacao ||
    publicacao.createdAt;

  const username =
    autor?.username ||
    publicacao.username ||
    "";

  const nome =
    autor?.nome ||
    publicacao.nome ||
    username ||
    "Usuário";

  const fotoPerfil =
    autor?.fotoPerfil ||
    publicacao.fotoPerfil ||
    "";

  return {
    id: publicacao.id,

    usuarioId:
      publicacao.usuarioId,

    username,

    nome,

    usuario: {
      id:
        autor?.id ||
        publicacao.usuarioId,

      nome,

      usuario:
        username,

      username,

      fotoPerfil,
    },

    fotoPerfil,

    texto:
      publicacao.legenda ||
      publicacao.texto ||
      "",

    legenda:
      publicacao.legenda ||
      publicacao.texto ||
      "",

    imagem:
      publicacao.imagem ||
      "",

    hashtags:
      publicacao.hashtags ||
      "",

    localizacao:
      publicacao.localizacao ||
      "",

    criadoEm:
      dataCriacao || null,

    horario:
      formatarHorario(dataCriacao),

    curtidas:
      Number(publicacao.curtidas || 0),

    curtido:
      publicacao.curtido === true,

    comentarios:
      Number(publicacao.comentarios || 0),

    comentariosLista:
      Array.isArray(publicacao.comentariosLista)
        ? publicacao.comentariosLista
        : [],

    salvo:
      publicacao.salvo === true,
  };
}


// OBTER USUÁRIO LOGADO

export async function obterUsuarioLogado() {
  try {
    const dados =
      await AsyncStorage.getItem(
        CHAVE_USUARIO_LOGADO
      );

    console.log(
      "USUÁRIO NO STORAGE:",
      dados
    );

    if (!dados) {
      return null;
    }

    return JSON.parse(dados);
  } catch (erro) {
    console.log(
      "ERRO AO PEGAR USUÁRIO:",
      erro
    );

    return null;
  }
}


// SALVAR USUÁRIO LOGADO

async function salvarUsuarioLogado(usuario) {
  try {
    await AsyncStorage.setItem(
      CHAVE_USUARIO_LOGADO,
      JSON.stringify(usuario)
    );

    console.log(
      "USUÁRIO SALVO:",
      usuario
    );
  } catch (erro) {
    console.log(
      "ERRO AO SALVAR USUÁRIO:",
      erro
    );

    throw erro;
  }
}


// SAIR DA CONTA

export async function sairDaConta() {
  await AsyncStorage.removeItem(
    CHAVE_USUARIO_LOGADO
  );
}


// CRIAR USUÁRIO

export async function criarUsuario(
  nome,
  email,
  senha
) {
  const emailNormalizado =
    String(email || "")
      .trim()
      .toLowerCase();

  const nomeLimpo =
    String(nome || "").trim();

  if (!nomeLimpo) {
    throw new Error(
      "Digite seu nome."
    );
  }

  if (!emailNormalizado) {
    throw new Error(
      "Digite seu e-mail."
    );
  }

  if (!senha) {
    throw new Error(
      "Digite sua senha."
    );
  }

  const resBusca =
    await requisicao(
      `${API_URL}/usuarios?email=${encodeURIComponent(
        emailNormalizado
      )}`
    );

  const existentes =
    await resBusca.json();

  if (
    Array.isArray(existentes) &&
    existentes.length > 0
  ) {
    throw new Error(
      "Este e-mail já está cadastrado."
    );
  }

  let username =
    nomeLimpo
      .toLowerCase()
      .normalize("NFD")
      .replace(
        /[\u0300-\u036f]/g,
        ""
      )
      .replace(
        /\s+/g,
        ""
      )
      .replace(
        /[^a-z0-9]/g,
        ""
      );

  if (!username) {
    username =
      `usuario${Date.now()}`;
  }

  const novoUsuario = {
    username,

    nome:
      nomeLimpo,

    email:
      emailNormalizado,

    senha,

    bio: "",

    localizacao: "",

    fotoPerfil: "",

    seguidores: 0,

    seguindo: 0,

    publicacoes: 0,

    seguidoresIds: [],

    seguindoIds: [],
  };

  const res =
    await requisicao(
      `${API_URL}/usuarios`,
      {
        method: "POST",

        body: JSON.stringify(
          novoUsuario
        ),
      }
    );

  const criado =
    await res.json();

  const usuario = {
    ...criado,

    usuario:
      criado.username,

    fotoPerfil:
      criado.fotoPerfil || "",
  };

  await salvarUsuarioLogado(
    usuario
  );

  return usuario;
}


// LOGIN

export async function loginUsuario(
  emailOuUsuario,
  senha
) {
  const login =
    String(emailOuUsuario || "")
      .trim()
      .toLowerCase();

  const res =
    await requisicao(
      `${API_URL}/usuarios`
    );

  const usuarios =
    await res.json();

  const usuarioEncontrado =
    usuarios.find((item) => {
      const email =
        String(
          item.email || ""
        ).toLowerCase();

      const username =
        String(
          item.username || ""
        ).toLowerCase();

      const senhaUsuario =
        String(
          item.senha || ""
        );

      return (
        (
          email === login ||
          username === login
        ) &&
        senhaUsuario ===
          String(senha)
      );
    });

  if (!usuarioEncontrado) {
    throw new Error(
      "E-mail/usuário ou senha incorretos."
    );
  }

  const usuario = {
    ...usuarioEncontrado,

    usuario:
      usuarioEncontrado.username,

    fotoPerfil:
      usuarioEncontrado.fotoPerfil ||
      "",
  };

  await salvarUsuarioLogado(
    usuario
  );

  return usuario;
}


// PEGAR USUÁRIO

export async function getUsuario(id) {
  if (!id) {
    throw new Error(
      "Usuário não identificado."
    );
  }

  const res =
    await requisicao(
      `${API_URL}/usuarios/${id}`
    );

  const usuario =
    await res.json();

  return {
    ...usuario,

    usuario:
      usuario.username,

    fotoPerfil:
      usuario.fotoPerfil ||
      "",
  };
}

// ATUALIZAR USUÁRIO

export async function atualizarUsuario(
  id,
  dados
) {
  if (!id) {
    throw new Error(
      "Usuário não identificado."
    );
  }

  if (!dados) {
    throw new Error(
      "Nenhum dado para atualizar."
    );
  }

  const nome =
    String(
      dados.nome || ""
    ).trim();

  const username =
    String(
      dados.username || ""
    )
      .trim()
      .toLowerCase()
      .replace(/\s/g, "");

  const bio =
    String(
      dados.bio || ""
    ).trim();

  const fotoPerfil =
    String(
      dados.fotoPerfil || ""
    ).trim();

  if (!nome) {
    throw new Error(
      "Digite seu nome."
    );
  }

  if (!username) {
    throw new Error(
      "Digite seu usuário."
    );
  }

  console.log(
    "ATUALIZANDO USUÁRIO:",
    {
      id,
      nome,
      username,
      bio,
      fotoPerfil,
    }
  );


  // BUSCAR USUÁRIOS

  const resUsuarios =
    await requisicao(
      `${API_URL}/usuarios`
    );

  const usuarios =
    await resUsuarios.json();


  // VERIFICAR USERNAME

  const usernameExistente =
    usuarios.find(
      (item) =>
        String(
          item.username || ""
        ).toLowerCase() ===
          username &&
        String(item.id) !==
          String(id)
    );

  if (usernameExistente) {
    throw new Error(
      "Este usuário já está sendo usado."
    );
  }


  // PEGAR USUÁRIO ATUAL

  const resUsuarioAtual =
    await requisicao(
      `${API_URL}/usuarios/${id}`
    );

  const usuarioAtual =
    await resUsuarioAtual.json();


  // MANTER FOTO ANTERIOR SE NÃO FOI ALTERADA

  const fotoFinal =
    fotoPerfil ||
    usuarioAtual.fotoPerfil ||
    "";


  // ATUALIZAR

  const res =
    await requisicao(
      `${API_URL}/usuarios/${id}`,
      {
        method: "PATCH",

        body: JSON.stringify({
          nome,
          username,
          bio,
          fotoPerfil: fotoFinal,
        }),
      }
    );

  const usuarioAtualizado =
    await res.json();


  // ATUALIZAR STORAG

  const usuarioAnterior =
    await obterUsuarioLogado();

  const usuarioFinal = {
    ...(usuarioAnterior || {}),
    ...usuarioAtualizado,

    usuario:
      usuarioAtualizado.username ||
      username,

    fotoPerfil:
      usuarioAtualizado.fotoPerfil ||
      fotoFinal ||
      "",
  };

  await salvarUsuarioLogado(
    usuarioFinal
  );

  console.log(
    "USUÁRIO ATUALIZADO E SALVO:",
    usuarioFinal
  );

  return usuarioFinal;
}


// PEGAR POSTS

export async function getPosts() {
  try {
    const [
      resPub,
      resUsu,
    ] = await Promise.all([
      requisicao(
        `${API_URL}/publicacoes`
      ),

      requisicao(
        `${API_URL}/usuarios`
      ),
    ]);

    const publicacoes =
      await resPub.json();

    const usuarios =
      await resUsu.json();

    if (!Array.isArray(publicacoes)) {
      throw new Error(
        "A resposta de publicações não é uma lista."
      );
    }

    if (!Array.isArray(usuarios)) {
      throw new Error(
        "A resposta de usuários não é uma lista."
      );
    }

    const ordenadas =
      [...publicacoes].sort(
        (a, b) => {
          const dataA =
            new Date(
              a.criadoEm ||
              a.dataCriacao ||
              a.createdAt ||
              0
            ).getTime();

          const dataB =
            new Date(
              b.criadoEm ||
              b.dataCriacao ||
              b.createdAt ||
              0
            ).getTime();

          return dataB - dataA;
        }
      );

    return ordenadas.map(
      (publicacao) =>
        normalizarPost(
          publicacao,
          usuarios
        )
    );
  } catch (erro) {
    console.log(
      "ERRO AO BUSCAR POSTS:",
      erro
    );

    throw erro;
  }
}


// CRIAR PUBLICAÇÃO

export async function criarPublicacao({
  usuarioId,
  username = "",
  nome = "",
  localizacao = "",
  imagem = "",
  legenda = "",
  hashtags = "",
}) {
  if (!usuarioId) {
    throw new Error(
      "Usuário não identificado."
    );
  }

  if (
    !String(legenda).trim() &&
    !imagem
  ) {
    throw new Error(
      "Adicione uma legenda ou uma imagem."
    );
  }

  const novaPublicacao = {
    usuarioId,

    username:
      username || "",

    nome:
      nome || "",

    localizacao:
      localizacao || "",

    imagem:
      imagem || "",

    legenda:
      String(legenda || "").trim(),

    hashtags:
      hashtags || "",

    criadoEm:
      new Date().toISOString(),

    curtidas: 0,

    curtido: false,

    comentarios: 0,

    comentariosLista: [],

    salvo: false,
  };

  const res =
    await requisicao(
      `${API_URL}/publicacoes`,
      {
        method: "POST",

        body: JSON.stringify(
          novaPublicacao
        ),
      }
    );

  const criada =
    await res.json();

  // Busca os usuários novamente para
  // retornar o autor corretamente
  const resUsuarios =
    await requisicao(
      `${API_URL}/usuarios`
    );

  const usuarios =
    await resUsuarios.json();

  return normalizarPost(
    criada,
    usuarios
  );
}


// CRIAR NOTIFICAÇÃO

async function criarNotificacao({
  destinatarioId,
  usuarioId,
  nome,
  username,
  tipo,
  mensagem,
  postId = null,
}) {
  if (
    destinatarioId === undefined ||
    destinatarioId === null
  ) {
    console.log(
      "NOTIFICAÇÃO SEM DESTINATÁRIO"
    );

    return null;
  }

  const novaNotificacao = {
    id:
      `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)}`,

    destinatarioId:
      String(destinatarioId),

    usuarioId:
      String(usuarioId ?? ""),

    nome:
      nome || "Usuário",

    username:
      username || "",

    tipo:
      tipo || "padrao",

    mensagem:
      mensagem || "",

    postId:
      postId !== null
        ? String(postId)
        : null,

    criadoEm:
      new Date().toISOString(),

    horario:
      "Agora",

    lida: false,
  };

  try {
    const res =
      await requisicao(
        `${API_URL}/notificacoes`,
        {
          method: "POST",

          body: JSON.stringify(
            novaNotificacao
          ),
        }
      );

    return await res.json();
  } catch (erro) {
    console.log(
      "ERRO AO CRIAR NOTIFICAÇÃO:",
      erro
    );

    return null;
  }
}


// CURTIR / DESCURTIR

export async function curtirPost(postId) {
  const id =
    typeof postId === "object"
      ? postId.id
      : postId;

  if (!id) {
    throw new Error(
      "Publicação não identificada."
    );
  }

  const resGet =
    await requisicao(
      `${API_URL}/publicacoes/${id}`
    );

  const post =
    await resGet.json();

  const curtido =
    !Boolean(post.curtido);

  const curtidas =
    curtido
      ? Number(post.curtidas || 0) + 1
      : Math.max(
          Number(post.curtidas || 0) - 1,
          0
        );

  const resPatch =
    await requisicao(
      `${API_URL}/publicacoes/${id}`,
      {
        method: "PATCH",

        body: JSON.stringify({
          curtido,
          curtidas,
        }),
      }
    );

  const atualizado =
    await resPatch.json();

  if (curtido) {
    const usuario =
      await obterUsuarioLogado();

    if (usuario) {
      await criarNotificacao({
        destinatarioId:
          post.usuarioId,

        usuarioId:
          usuario.id,

        nome:
          usuario.nome ||
          usuario.username ||
          usuario.usuario ||
          "Usuário",

        username:
          usuario.username ||
          usuario.usuario ||
          "",

        tipo:
          "curtida",

        mensagem:
          "curtiu sua publicação.",

        postId:
          post.id,
      });
    }
  }

  return normalizarPost(
    atualizado
  );
}


// SALVAR / REMOVER DOS SALVOS

export async function salvarPost(postId) {
  const id =
    typeof postId === "object"
      ? postId.id
      : postId;

  if (!id) {
    throw new Error(
      "Publicação não identificada."
    );
  }

  const resGet =
    await requisicao(
      `${API_URL}/publicacoes/${id}`
    );

  const post =
    await resGet.json();

  const salvo =
    !Boolean(post.salvo);

  const resPatch =
    await requisicao(
      `${API_URL}/publicacoes/${id}`,
      {
        method: "PATCH",

        body: JSON.stringify({
          salvo,
        }),
      }
    );

  const atualizado =
    await resPatch.json();

  if (salvo) {
    const usuario =
      await obterUsuarioLogado();

    if (usuario) {
      await criarNotificacao({
        destinatarioId:
          post.usuarioId,

        usuarioId:
          usuario.id,

        nome:
          usuario.nome ||
          usuario.username ||
          usuario.usuario ||
          "Usuário",

        username:
          usuario.username ||
          usuario.usuario ||
          "",

        tipo:
          "salvar",

        mensagem:
          "salvou sua publicação.",

        postId:
          post.id,
      });
    }
  }

  return normalizarPost(
    atualizado
  );
}


// COMENTAR PUBLICAÇÃO

export async function comentarPost(
  postId,
  dadosComentario
) {
  if (!postId) {
    throw new Error(
      "Publicação não identificada."
    );
  }

  if (
    !dadosComentario ||
    !dadosComentario.texto ||
    !dadosComentario.texto.trim()
  ) {
    throw new Error(
      "O comentário não pode estar vazio."
    );
  }

  const resGet =
    await requisicao(
      `${API_URL}/publicacoes/${postId}`
    );

  const post =
    await resGet.json();

  const novoComentario = {
    id:
      Date.now().toString(),

    usuarioId:
      dadosComentario.usuarioId,

    username:
      dadosComentario.username ||
      "Usuário",

    nome:
      dadosComentario.nome ||
      dadosComentario.username ||
      "Usuário",

    texto:
      dadosComentario.texto.trim(),

    criadoEm:
      new Date().toISOString(),
  };

  const comentariosAtuais =
    Array.isArray(
      post.comentariosLista
    )
      ? post.comentariosLista
      : [];

  const novaLista = [
    ...comentariosAtuais,
    novoComentario,
  ];

  const resPatch =
    await requisicao(
      `${API_URL}/publicacoes/${postId}`,
      {
        method: "PATCH",

        body: JSON.stringify({
          comentariosLista:
            novaLista,

          comentarios:
            novaLista.length,
        }),
      }
    );

  const atualizado =
    await resPatch.json();

  const usuario =
    await obterUsuarioLogado();

  if (usuario) {
    await criarNotificacao({
      destinatarioId:
        post.usuarioId,

      usuarioId:
        usuario.id,

      nome:
        usuario.nome ||
        usuario.username ||
        usuario.usuario ||
        "Usuário",

      username:
        usuario.username ||
        usuario.usuario ||
        "",

      tipo:
        "comentario",

      mensagem:
        "comentou na sua publicação.",

      postId:
        post.id,
    });
  }

  const resUsuarios =
    await requisicao(
      `${API_URL}/usuarios`
    );

  const usuarios =
    await resUsuarios.json();

  return normalizarPost(
    atualizado,
    usuarios
  );
}


// SEGUIR / DEIXAR DE SEGUIR

export async function seguirUsuario(
  usuarioId
) {
  if (!usuarioId) {
    throw new Error(
      "Usuário não identificado."
    );
  }

  const usuarioLogado =
    await obterUsuarioLogado();

  if (!usuarioLogado) {
    throw new Error(
      "Você precisa estar logado."
    );
  }

  const idLogado =
    Number(usuarioLogado.id);

  const idDestino =
    Number(usuarioId);

  if (Number.isNaN(idDestino)) {
    throw new Error(
      "Usuário inválido."
    );
  }

  if (idLogado === idDestino) {
    throw new Error(
      "Você não pode seguir a si mesmo."
    );
  }

  const resDestino =
    await requisicao(
      `${API_URL}/usuarios/${idDestino}`
    );

  const usuarioDestino =
    await resDestino.json();

  const seguidoresIds =
    Array.isArray(
      usuarioDestino.seguidoresIds
    )
      ? usuarioDestino.seguidoresIds.map(Number)
      : [];

  const seguindoIdsLogado =
    Array.isArray(
      usuarioLogado.seguindoIds
    )
      ? usuarioLogado.seguindoIds.map(Number)
      : [];

  const jaSegue =
    seguindoIdsLogado.includes(
      idDestino
    );

  if (jaSegue) {
    const novosSeguidores =
      seguidoresIds.filter(
        (id) =>
          id !== idLogado
      );

    const novoSeguindo =
      seguindoIdsLogado.filter(
        (id) =>
          id !== idDestino
      );

    const resDestinoPatch =
      await requisicao(
        `${API_URL}/usuarios/${idDestino}`,
        {
          method: "PATCH",

          body: JSON.stringify({
            seguidores:
              novosSeguidores.length,

            seguidoresIds:
              novosSeguidores,
          }),
        }
      );

    const destinoAtualizado =
      await resDestinoPatch.json();

    const resLogadoPatch =
      await requisicao(
        `${API_URL}/usuarios/${idLogado}`,
        {
          method: "PATCH",

          body: JSON.stringify({
            seguindo:
              novoSeguindo.length,

            seguindoIds:
              novoSeguindo,
          }),
        }
      );

    const logadoAtualizado =
      await resLogadoPatch.json();

    await salvarUsuarioLogado({
      ...logadoAtualizado,

      usuario:
        logadoAtualizado.username,

      fotoPerfil:
        logadoAtualizado.fotoPerfil ||
        "",
    });

    return {
      usuario:
        destinoAtualizado,

      seguindo: false,
    };
  }

  const novosSeguidores = [
    ...seguidoresIds,
    idLogado,
  ];

  const novoSeguindo = [
    ...seguindoIdsLogado,
    idDestino,
  ];

  const resDestinoPatch =
    await requisicao(
      `${API_URL}/usuarios/${idDestino}`,
      {
        method: "PATCH",

        body: JSON.stringify({
          seguidores:
            novosSeguidores.length,

          seguidoresIds:
            novosSeguidores,
        }),
      }
    );

  const destinoAtualizado =
    await resDestinoPatch.json();

  const resLogadoPatch =
    await requisicao(
      `${API_URL}/usuarios/${idLogado}`,
      {
        method: "PATCH",

        body: JSON.stringify({
          seguindo:
            novoSeguindo.length,

          seguindoIds:
            novoSeguindo,
        }),
      }
    );

  const logadoAtualizado =
    await resLogadoPatch.json();

  await salvarUsuarioLogado({
    ...logadoAtualizado,

    usuario:
      logadoAtualizado.username,

    fotoPerfil:
      logadoAtualizado.fotoPerfil ||
      "",
  });

  const nome =
    usuarioLogado.nome ||
    usuarioLogado.username ||
    usuarioLogado.usuario ||
    "Usuário";

  await criarNotificacao({
    destinatarioId:
      idDestino,

    usuarioId:
      idLogado,

    nome,

    username:
      usuarioLogado.username ||
      usuarioLogado.usuario ||
      "",

    tipo:
      "seguidor",

    mensagem:
      "começou a seguir você.",
  });

  return {
    usuario:
      destinoAtualizado,

    seguindo: true,
  };
}


// EXCLUIR PUBLICAÇÃO

export async function excluirPost(
  postId
) {
  if (!postId) {
    throw new Error(
      "Publicação não identificada."
    );
  }

  const usuario =
    await obterUsuarioLogado();

  if (!usuario) {
    throw new Error(
      "Você precisa estar logado."
    );
  }

  const resGet =
    await requisicao(
      `${API_URL}/publicacoes/${postId}`
    );

  const post =
    await resGet.json();

  if (
    Number(post.usuarioId) !==
    Number(usuario.id)
  ) {
    throw new Error(
      "Você só pode excluir suas próprias publicações."
    );
  }

  await requisicao(
    `${API_URL}/publicacoes/${postId}`,
    {
      method: "DELETE",
    }
  );

  return true;
}


// NOTIFICAÇÕES

export async function getNotificacoes() {
  const usuario =
    await obterUsuarioLogado();

  const res =
    await requisicao(
      `${API_URL}/notificacoes`
    );

  const notificacoes =
    await res.json();

  let filtradas =
    Array.isArray(notificacoes)
      ? notificacoes
      : [];

  if (
    usuario?.id !== undefined
  ) {
    filtradas =
      filtradas.filter(
        (notificacao) =>
          String(
            notificacao.destinatarioId
          ) ===
          String(usuario.id)
      );
  }

  filtradas.sort(
    (a, b) => {
      const dataA =
        new Date(
          a.criadoEm || 0
        ).getTime();

      const dataB =
        new Date(
          b.criadoEm || 0
        ).getTime();

      return dataB - dataA;
    }
  );

  return filtradas.map(
    (notificacao) => ({
      ...notificacao,

      horario:
        formatarHorario(
          notificacao.criadoEm
        ),
    })
  );
}

// MARCAR NOTIFICAÇÃO COMO LIDA

export async function marcarNotificacaoComoLida(
  id
) {
  if (!id) {
    return null;
  }

  const res =
    await requisicao(
      `${API_URL}/notificacoes/${id}`,
      {
        method: "PATCH",

        body: JSON.stringify({
          lida: true,
        }),
      }
    );

  return await res.json();
}


// MARCAR TODAS COMO LIDAS

export async function marcarTodasNotificacoesComoLidas() {
  const usuario =
    await obterUsuarioLogado();

  if (!usuario) {
    return;
  }

  const res =
    await requisicao(
      `${API_URL}/notificacoes`
    );

  const notificacoes =
    await res.json();

  const minhas =
    notificacoes.filter(
      (notificacao) =>
        String(
          notificacao.destinatarioId
        ) ===
        String(usuario.id)
    );

  await Promise.all(
    minhas.map(
      (notificacao) =>
        requisicao(
          `${API_URL}/notificacoes/${notificacao.id}`,
          {
            method: "PATCH",

            body: JSON.stringify({
              lida: true,
            }),
          }
        )
    )
  );
}


// EXCLUIR NOTIFICAÇÃO

export async function excluirNotificacao(
  id
) {
  if (!id) {
    return false;
  }

  await requisicao(
    `${API_URL}/notificacoes/${id}`,
    {
      method: "DELETE",
    }
  );

  return true;
}