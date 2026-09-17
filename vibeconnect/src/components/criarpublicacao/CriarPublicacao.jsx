import React, {
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import styles from "./CriarPublicacaoStyles";

import {
  criarPublicacao,
  obterUsuarioLogado,
} from "../../api/api";

export default function CriarPublicacao({
  navigation,
}) {

  const [legenda, setLegenda] =
    useState("");

  const [carregando, setCarregando] =
    useState(false);

  const handleVoltar = () => {
    navigation.goBack();
  };

  const handlePublicar = async () => {

    if (!legenda.trim()) {
      Alert.alert(
        "Atenção",
        "Escreva uma legenda."
      );
      return;
    }

    const usuario =
      obterUsuarioLogado();

    if (!usuario) {
      Alert.alert(
        "Erro",
        "Você precisa estar logado."
      );
      return;
    }

    try {

      setCarregando(true);

      await criarPublicacao({
        usuarioId: usuario.id,
        username: usuario.username,
        legenda: legenda.trim(),
        localizacao: "",
        imagem: "",
        hashtags: "",
      });

      Alert.alert(
        "Publicação",
        "Publicação criada com sucesso!",
        [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("Home"),
          },
        ]
      );

      setLegenda("");

    } catch (error) {

      Alert.alert(
        "Erro",
        error.message
      );

    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={handleVoltar}
          activeOpacity={0.7}
        >

          <Image
            source={require("../../../assets/seta-voltar.png")}
            style={styles.setaVoltar}
            resizeMode="contain"
          />

        </TouchableOpacity>

        <Text style={styles.titulo}>
          Nova Publicação
        </Text>

        <TouchableOpacity
          style={styles.botaoPublicar}
          onPress={handlePublicar}
          disabled={carregando}
          activeOpacity={0.7}
        >

          <Text style={styles.textoPublicar}>
            {carregando
              ? "..."
              : "Publicar"}
          </Text>

        </TouchableOpacity>

      </View>

      <TouchableOpacity
        style={styles.areaMidia}
        activeOpacity={0.8}
      >

        <Image
          source={require("../../../assets/quadro.png")}
          style={styles.iconeImagem}
          resizeMode="contain"
        />

        <Text style={styles.textoMidia}>
          Adicione uma foto ou vídeo
        </Text>

      </TouchableOpacity>

      <View style={styles.legendaContainer}>

        <TextInput
          style={styles.inputLegenda}
          placeholder="Escreva uma legenda..."
          placeholderTextColor="#777777"
          value={legenda}
          onChangeText={setLegenda}
          multiline
          maxLength={220}
          textAlignVertical="top"
        />

        <Text style={styles.contador}>
          {legenda.length}/220
        </Text>

      </View>

      <TouchableOpacity
        style={styles.opcao}
        activeOpacity={0.7}
      >

        <Image
          source={require("../../../assets/localizacao-2.png")}
          style={styles.iconeOpcao}
          resizeMode="contain"
        />

        <Text style={styles.textoOpcao}>
          Adicionar localização
        </Text>

        <View style={styles.chevron}>
          <View style={styles.chevronLinha1} />
          <View style={styles.chevronLinha2} />
        </View>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.opcao}
        activeOpacity={0.7}
      >

        <Image
          source={require("../../../assets/globo.png")}
          style={styles.iconeOpcao}
          resizeMode="contain"
        />

        <Text style={styles.textoOpcao}>
          Quem pode ver?
        </Text>

        <Text style={styles.todos}>
          Todos
        </Text>

        <View style={styles.chevron}>
          <View style={styles.chevronLinha1} />
          <View style={styles.chevronLinha2} />
        </View>

      </TouchableOpacity>

    </View>
  );
}