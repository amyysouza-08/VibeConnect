import React, { useState } from "react";

import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import styles from "./PublicacaoStyles";

import Footer from "../footer/Footer";

export default function Publicacao({ navigation, route }) {
  // =====================================================
  // PUBLICAÇÃO RECEBIDA
  // =====================================================

  const publicacao = route?.params?.publicacao || null;

  // =====================================================
  // ESTADOS
  // =====================================================

  const [curtido, setCurtido] = useState(
    publicacao?.curtido || false
  );

  const [salvo, setSalvo] = useState(
    publicacao?.salvo || false
  );

  const [curtidas, setCurtidas] = useState(
    publicacao?.curtidas || 0
  );

  const [comentario, setComentario] = useState("");

  // =====================================================
  // VOLTAR
  // =====================================================

  const handleVoltar = () => {
    navigation.goBack();
  };

  // =====================================================
  // MENU
  // =====================================================

  const handleMenu = () => {
    Alert.alert(
      "Opções",
      "Menu da publicação"
    );
  };

  // =====================================================
  // CURTIR
  // =====================================================

  const handleCurtir = () => {
    if (curtido) {
      setCurtidas((valor) =>
        Math.max(valor - 1, 0)
      );
    } else {
      setCurtidas((valor) => valor + 1);
    }

    setCurtido(!curtido);
  };

  // =====================================================
  // COMENTÁRIO
  // =====================================================

  const handleComentario = () => {
    Alert.alert(
      "Comentários",
      "Área de comentários"
    );
  };

  // =====================================================
  // COMPARTILHAR
  // =====================================================

  const handleCompartilhar = () => {
    Alert.alert(
      "Compartilhar",
      "Compartilhar publicação"
    );
  };

  // =====================================================
  // SALVAR
  // =====================================================

  const handleSalvar = () => {
    setSalvo(!salvo);

    Alert.alert(
      "Salvar",
      salvo
        ? "Publicação removida dos salvos."
        : "Publicação salva!"
    );
  };

  // =====================================================
  // ENVIAR COMENTÁRIO
  // =====================================================

  const handleEnviarComentario = () => {
    if (!comentario.trim()) {
      return;
    }

    Alert.alert(
      "Comentário",
      "Comentário enviado!"
    );

    setComentario("");
  };

  // =====================================================
  // SE NÃO EXISTIR PUBLICAÇÃO
  // =====================================================

  if (!publicacao) {
    return (
      <View style={styles.container}>

        <View style={styles.header}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={handleVoltar}
            activeOpacity={0.7}
          >
            <Image
              source={require(
                "../../../assets/seta-voltar.png"
              )}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 30,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#777777",
              textAlign: "center",
            }}
          >
            Publicação não encontrada.
          </Text>
        </View>

        <Footer navigation={navigation} />

      </View>
    );
  }

  // =====================================================
  // DADOS DA PUBLICAÇÃO
  // =====================================================

  const nome =
    publicacao.usuario?.nome ||
    publicacao.nome ||
    publicacao.username ||
    "Usuário";

  const username =
    publicacao.usuario?.usuario ||
    publicacao.username ||
    "usuario";

  const localizacao =
    publicacao.localizacao ||
    "";

  const texto =
    publicacao.texto ||
    publicacao.legenda ||
    "";

  const hashtags =
    publicacao.hashtags ||
    "";

  const imagem =
    publicacao.imagem ||
    null;

  const comentarios =
    publicacao.comentarios || 0;

  // =====================================================
  // TELA
  // =====================================================

  return (
    <View style={styles.container}>

      <KeyboardAvoidingView
        style={styles.keyboardArea}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "height"
        }
        keyboardVerticalOffset={0}
      >

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={
            styles.scrollContent
          }
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* =====================================================
              CABEÇALHO
          ===================================================== */}

          <View style={styles.header}>

            <TouchableOpacity
              style={styles.backButton}
              onPress={handleVoltar}
              activeOpacity={0.7}
            >
              <Image
                source={require(
                  "../../../assets/seta-voltar.png"
                )}
                style={styles.backIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={handleMenu}
              activeOpacity={0.7}
            >
              <Image
                source={require(
                  "../../../assets/tres-pontos.png"
                )}
                style={styles.menuIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

          </View>

          {/* =====================================================
              USUÁRIO
          ===================================================== */}

          <View style={styles.userContainer}>

            <View style={styles.avatar} />

            <View style={styles.userInfo}>

              <Text style={styles.username}>
                {username}
              </Text>

              {localizacao ? (
                <View style={styles.locationContainer}>

                  <Image
                    source={require(
                      "../../../assets/localizacao.png"
                    )}
                    style={styles.locationIcon}
                    resizeMode="contain"
                  />

                  <Text style={styles.locationText}>
                    {localizacao}
                  </Text>

                </View>
              ) : null}

            </View>

          </View>

          {/* =====================================================
              FOTO DA PUBLICAÇÃO
          ===================================================== */}

          {imagem ? (
            <Image
              source={
                typeof imagem === "string"
                  ? { uri: imagem }
                  : imagem
              }
              style={styles.postImage}
              resizeMode="cover"
            />
          ) : null}

          {/* =====================================================
              AÇÕES
          ===================================================== */}

          <View style={styles.actionsContainer}>

            <View style={styles.actionsLeft}>

              {/* CURTIDA */}

              <TouchableOpacity
                style={styles.action}
                onPress={handleCurtir}
                activeOpacity={0.7}
              >

                <Image
                  source={require(
                    "../../../assets/curtida.png"
                  )}
                  style={styles.actionIcon}
                  resizeMode="contain"
                />

                <Text style={styles.actionNumber}>
                  {curtidas}
                </Text>

              </TouchableOpacity>

              {/* COMENTÁRIOS */}

              <TouchableOpacity
                style={styles.action}
                onPress={handleComentario}
                activeOpacity={0.7}
              >

                <Image
                  source={require(
                    "../../../assets/comentario-publicacao.png"
                  )}
                  style={styles.actionIcon}
                  resizeMode="contain"
                />

                <Text style={styles.actionNumber}>
                  {comentarios}
                </Text>

              </TouchableOpacity>

              {/* COMPARTILHAR */}

              <TouchableOpacity
                style={styles.action}
                onPress={handleCompartilhar}
                activeOpacity={0.7}
              >

                <Image
                  source={require(
                    "../../../assets/aviao-publicacao.png"
                  )}
                  style={styles.shareIcon}
                  resizeMode="contain"
                />

              </TouchableOpacity>

            </View>

            {/* SALVAR */}

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSalvar}
              activeOpacity={0.7}
            >

              <Image
                source={require(
                  "../../../assets/salvar-publicacao.png"
                )}
                style={styles.saveIcon}
                resizeMode="contain"
              />

            </TouchableOpacity>

          </View>

          {/* =====================================================
              LEGENDA
          ===================================================== */}

          {texto ? (
            <View style={styles.captionContainer}>

              <Text style={styles.caption}>

                <Text style={styles.captionUsername}>
                  {username}
                </Text>

                {" "}

                {texto}

              </Text>

              {hashtags ? (
                <Text style={styles.hashtags}>
                  {hashtags}
                </Text>
              ) : null}

            </View>
          ) : null}

          {/* =====================================================
              VER COMENTÁRIOS
          ===================================================== */}

          <TouchableOpacity
            style={styles.allCommentsButton}
            activeOpacity={0.7}
            onPress={handleComentario}
          >

            <Text style={styles.allComments}>
              Ver todos os comentários
            </Text>

          </TouchableOpacity>

          {/* =====================================================
              COMENTÁRIOS
              
              NÃO TEM MAIS COMENTÁRIOS FIXOS AQUI.
              Eles poderão vir da API depois.
          ===================================================== */}

          {/* =====================================================
              ADICIONAR COMENTÁRIO
          ===================================================== */}

          <View style={styles.commentInputRow}>

            <View
              style={styles.commentInputAvatar}
            />

            <View
              style={styles.commentInputContainer}
            >

              <TextInput
                style={styles.commentInput}
                placeholder="Adicione um comentário..."
                placeholderTextColor="#6E9AA5"
                value={comentario}
                onChangeText={setComentario}
                returnKeyType="send"
                onSubmitEditing={
                  handleEnviarComentario
                }
              />

              <TouchableOpacity
                style={styles.sendButton}
                activeOpacity={0.7}
                onPress={
                  handleEnviarComentario
                }
              >

                <Image
                  source={require(
                    "../../../assets/aviao.png"
                  )}
                  style={styles.sendIcon}
                  resizeMode="contain"
                />

              </TouchableOpacity>

            </View>

          </View>

        </ScrollView>

      </KeyboardAvoidingView>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer navigation={navigation} />

    </View>
  );
}