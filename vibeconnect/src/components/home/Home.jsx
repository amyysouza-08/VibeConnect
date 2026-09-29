import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import styles from "./HomeStyles";

import Footer from "../footer/Footer";

import {
  getPosts,
  curtirPost,
  salvarPost,
  comentarPost,
  excluirPost,
} from "../../api/api";

export default function Home({ navigation }) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // =====================================================
  // COMENTÁRIO
  // =====================================================

  const [modalComentario, setModalComentario] = useState(false);
  const [comentario, setComentario] = useState("");
  const [postSelecionado, setPostSelecionado] = useState(null);
  const [enviandoComentario, setEnviandoComentario] = useState(false);

  // =====================================================
  // CARREGAR PUBLICAÇÕES
  // =====================================================

  useEffect(() => {
    carregarPosts();
  }, []);

  const carregarPosts = async () => {
    try {
      setCarregando(true);

      const dados = await getPosts();

      setPosts(dados);
    } catch (error) {
      console.log("ERRO AO CARREGAR POSTS:", error);

      Alert.alert(
        "Erro",
        error?.message ||
        "Não foi possível carregar as publicações."
      );
    } finally {
      setCarregando(false);
    }
  };

  // =====================================================
  // CURTIR
  // =====================================================

  const handleCurtir = async (post) => {
    try {
      const atualizado = await curtirPost(post.id);

      setPosts((lista) =>
        lista.map((item) =>
          item.id === post.id
            ? {
              ...item,
              ...atualizado,
            }
            : item
        )
      );
    } catch (error) {
      console.log("ERRO AO CURTIR:", error);

      Alert.alert(
        "Erro",
        error?.message ||
        "Não foi possível curtir a publicação."
      );
    }
  };

  // =====================================================
  // SALVAR
  // =====================================================

  const handleSalvar = async (post) => {
    try {
      const atualizado = await salvarPost(post.id);

      setPosts((lista) =>
        lista.map((item) =>
          item.id === post.id
            ? {
              ...item,
              ...atualizado,
            }
            : item
        )
      );
    } catch (error) {
      console.log("ERRO AO SALVAR:", error);

      Alert.alert(
        "Erro",
        error?.message ||
        "Não foi possível salvar a publicação."
      );
    }
  };

  // =====================================================
  // ABRIR COMENTÁRIOS
  // =====================================================

  const abrirComentarios = (post) => {
    setPostSelecionado(post);
    setComentario("");
    setModalComentario(true);
  };

  // =====================================================
  // FECHAR COMENTÁRIOS
  // =====================================================

  const fecharComentarios = () => {
    Keyboard.dismiss();

    setComentario("");
    setPostSelecionado(null);
    setModalComentario(false);
  };

  // =====================================================
  // ENVIAR COMENTÁRIO
  // =====================================================

  const handleComentar = async () => {
    if (!comentario.trim()) {
      Alert.alert(
        "Atenção",
        "Escreva um comentário."
      );
      return;
    }

    if (!postSelecionado) {
      return;
    }

    try {
      setEnviandoComentario(true);

      const dadosUsuario =
        await AsyncStorage.getItem(
          "@VibeConnect:usuario"
        );

      if (!dadosUsuario) {
        Alert.alert(
          "Erro",
          "Você precisa estar logado para comentar."
        );
        return;
      }

      const usuario = JSON.parse(dadosUsuario);

      const atualizado = await comentarPost(
  postSelecionado.id,
  {
    usuarioId: usuario.id,

    username:
      usuario.username ||
      usuario.usuario ||
      "Usuário",

    nome:
      usuario.nome ||
      usuario.username ||
      usuario.usuario ||
      "Usuário",

    texto: comentario.trim(),
  }
);

      setPosts((lista) =>
        lista.map((item) =>
          item.id === postSelecionado.id
            ? {
              ...item,
              ...atualizado,
            }
            : item
        )
      );

      setPostSelecionado(atualizado);
      setComentario("");
      setModalComentario(false);

    } catch (error) {
      console.log(
        "ERRO AO COMENTAR:",
        error
      );

      Alert.alert(
        "Erro",
        error?.message ||
        "Não foi possível adicionar o comentário."
      );
    } finally {
      setEnviandoComentario(false);
    }
  };

  // =====================================================
  // EXCLUIR
  // =====================================================

  const handleExcluir = async (post) => {
    try {
      const dadosUsuario =
        await AsyncStorage.getItem(
          "@VibeConnect:usuario"
        );

      if (!dadosUsuario) {
        Alert.alert(
          "Erro",
          "Você precisa estar logado."
        );
        return;
      }

      const usuario = JSON.parse(dadosUsuario);

      const idUsuarioLogado =
        String(usuario.id);

      const idDonoPost =
        String(post.usuarioId || "");

      if (
        idDonoPost &&
        idDonoPost !== idUsuarioLogado
      ) {
        Alert.alert(
          "Não permitido",
          "Você só pode excluir suas próprias publicações."
        );

        return;
      }

      Alert.alert(
        "Excluir publicação",
        "Tem certeza que deseja excluir esta publicação?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },

          {
            text: "Excluir",
            style: "destructive",

            onPress: async () => {
              try {
                await excluirPost(post.id);

                setPosts((lista) =>
                  lista.filter(
                    (item) =>
                      item.id !== post.id
                  )
                );

                Alert.alert(
                  "Publicação",
                  "Publicação excluída com sucesso."
                );
              } catch (error) {
                console.log(
                  "ERRO AO EXCLUIR:",
                  error
                );

                Alert.alert(
                  "Erro",
                  error?.message ||
                  "Não foi possível excluir a publicação."
                );
              }
            },
          },
        ]
      );
    } catch (error) {
      console.log(
        "ERRO AO VERIFICAR USUÁRIO:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível verificar o usuário."
      );
    }
  };

  // =====================================================
  // MENU DOS TRÊS PONTOS
  // =====================================================

  const abrirMenu = (post) => {
    Alert.alert(
      "Publicação",
      "Escolha uma opção",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },

        {
          text: "Excluir",
          style: "destructive",
          onPress: () =>
            handleExcluir(post),
        },
      ]
    );
  };

  // =====================================================
  // FONTES
  // =====================================================

  if (!fontsLoaded) {
    return null;
  }

  // =====================================================
  // TELA
  // =====================================================

  return (
    <View style={styles.container}>

      {/* =================================================
          FEED
      ================================================= */}

      <ScrollView
        style={styles.content}
        contentContainerStyle={
          styles.contentContainer
        }
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >

        {/* LOGO */}

        <Text style={styles.logoText}>

          <Text style={styles.vibe}>
            Vibe
          </Text>

          <Text style={styles.connect}>
            Connect
          </Text>

        </Text>

        {/* CARREGANDO */}

        {carregando ? (

          <View
            style={styles.loadingContainer}
          >
            <ActivityIndicator
              size="large"
            />
          </View>

        ) : posts.length === 0 ? (

          /* SEM PUBLICAÇÕES */

          <View
            style={styles.emptyContainer}
          >
            <Text
              style={styles.emptyText}
            >
              Nenhuma publicação ainda.
            </Text>
          </View>

        ) : (

          /* PUBLICAÇÕES */

          posts.map((post) => (

            <View
              key={post.id}
              style={styles.postCard}
            >

              {/* =================================================
                  CABEÇALHO
              ================================================= */}

              <View
                style={styles.postHeader}
              >

                <TouchableOpacity
                  style={styles.userInfo}
                  activeOpacity={0.7}
                >

                  <Image
                    style={styles.avatar}
                    source={
      post.usuario?.fotoPerfil
        ? { uri: post.usuario.fotoPerfil }
        : require("../../../assets/fotoPerfil.png")
    }
                  />

                  <View
                    style={styles.userTexts}
                  >

                    <Text
                      style={styles.userName}
                    >
                      {post.usuario?.nome ||
                        post.username ||
                        "Usuário"}
                    </Text>

                    <Text
                      style={styles.postTime}
                    >
                      {post.horario ||
                        "Agora"}
                    </Text>

                  </View>

                </TouchableOpacity>

                {/* TRÊS PONTOS */}

                <TouchableOpacity
                  style={styles.moreButton}
                  onPress={() =>
                    abrirMenu(post)
                  }
                  activeOpacity={0.7}
                >

                  <Image
                    source={require(
                      "../../../assets/pontos.png"
                    )}
                    style={
                      styles.pontosIcon
                    }
                    resizeMode="contain"
                  />

                </TouchableOpacity>

              </View>

              {/* =================================================
                  IMAGEM
              ================================================= */}

              {post.imagem ? (

                <Image
                  source={{
                    uri: post.imagem,
                  }}
                  style={styles.postImage}
                  resizeMode="cover"
                />

              ) : null}

              {/* =================================================
                  LEGENDA
              ================================================= */}

              {post.texto ? (

                <Text
                  style={styles.postText}
                >
                  {post.texto}
                </Text>

              ) : null}

              {/* HASHTAGS */}

              {post.hashtags ? (

                <Text
                  style={styles.hashtags}
                >
                  {post.hashtags}
                </Text>

              ) : null}

              {/* =================================================
                  AÇÕES
              ================================================= */}

              <View
                style={styles.postActions}
              >

                <View
                  style={styles.leftActions}
                >

                  {/* CURTIR */}

                  <TouchableOpacity
                    style={
                      styles.actionButton
                    }
                    onPress={() =>
                      handleCurtir(post)
                    }
                    activeOpacity={0.7}
                  >

                    <Image
                      source={
                        post.curtido
                          ? require("../../../assets/curtida-preenchida.png")
                          : require("../../../assets/curtida.png")
                      }
                      style={styles.actionIcon}
                      resizeMode="contain"
                    />

                    <Text
                      style={
                        styles.actionNumber
                      }
                    >
                      {post.curtidas || 0}
                    </Text>

                  </TouchableOpacity>

                  {/* COMENTAR */}

                  <TouchableOpacity
                    style={
                      styles.actionButton
                    }
                    onPress={() =>
                      abrirComentarios(
                        post
                      )
                    }
                    activeOpacity={0.7}
                  >

                    <Image
                      source={require(
                        "../../../assets/comentario.png"
                      )}
                      style={
                        styles.actionIcon
                      }
                      resizeMode="contain"
                    />

                    <Text
                      style={
                        styles.actionNumber
                      }
                    >
                      {post.comentarios ||
                        0}
                    </Text>

                  </TouchableOpacity>

                </View>

                {/* SALVAR */}

                <TouchableOpacity
                  onPress={() => handleSalvar(post)}
                  activeOpacity={0.7}
                >
                  <Image
                    source={
                      post.salvo
                        ? require("../../../assets/salvar-preenchido.png")
                        : require("../../../assets/salvar.png")
                    }
                    style={styles.actionIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

              </View>

            </View>
          ))
        )}

      </ScrollView>

      {/* =================================================
          MODAL DE COMENTÁRIO
      ================================================= */}

      <Modal
        visible={modalComentario}
        transparent={true}
        animationType="slide"
        statusBarTranslucent={true}
        onRequestClose={
          fecharComentarios
        }
      >

        <KeyboardAvoidingView
          style={styles.modalFundo}
          behavior={
            Platform.OS === "ios"
              ? "padding"
              : "height"
          }
          keyboardVerticalOffset={
            Platform.OS === "ios"
              ? 0
              : 0
          }
        >

          {/* ÁREA PARA FECHAR O MODAL */}

          <TouchableOpacity
            style={styles.modalAreaFora}
            activeOpacity={1}
            onPress={fecharComentarios}
          />

          {/* CAIXA DE COMENTÁRIO */}

          <View
            style={styles.modalComentario}
          >

            {/* BARRINHA */}

            <View
              style={
                styles.modalIndicador
              }
            />

            <Text
              style={styles.modalTitulo}
            >
              Adicionar comentário
            </Text>

            <TextInput
              style={
                styles.inputComentario
              }
              placeholder="Escreva um comentário..."
              placeholderTextColor="#999999"
              value={comentario}
              onChangeText={
                setComentario
              }
              multiline={true}
              maxLength={220}
              textAlignVertical="top"
              autoFocus={true}
              returnKeyType="default"
            />

            <View
              style={styles.modalBotoes}
            >

              <TouchableOpacity
                style={
                  styles.botaoCancelar
                }
                onPress={
                  fecharComentarios
                }
              >

                <Text
                  style={
                    styles.textoCancelar
                  }
                >
                  Cancelar
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={
                  styles.botaoEnviar
                }
                onPress={
                  handleComentar
                }
                disabled={
                  enviandoComentario
                }
              >

                <Text
                  style={
                    styles.textoEnviar
                  }
                >
                  {enviandoComentario
                    ? "Enviando..."
                    : "Comentar"}
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        </KeyboardAvoidingView>

      </Modal>

      {/* FOOTER */}

      <Footer
        navigation={navigation}
        telaAtiva="home"
      />

    </View>
  );
}