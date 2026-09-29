import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import styles from "./CriarPublicacaoStyles";

import { criarPublicacao } from "../../api/api";

export default function CriarPublicacao({ navigation }) {
  const [legenda, setLegenda] = useState("");
  const [carregando, setCarregando] = useState(false);

  const [imagem, setImagem] = useState("");
  const [localizacao, setLocalizacao] = useState("");

  // =====================================================
  // VOLTAR
  // =====================================================

  const handleVoltar = () => {
    navigation.goBack();
  };

  // =====================================================
  // ABRIR GALERIA
  // =====================================================

  const handleSelecionarImagem = async () => {
    try {
      const permissao =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissao.granted) {
        Alert.alert(
          "Permissão necessária",
          "Precisamos de acesso à sua galeria para escolher uma foto."
        );
        return;
      }

      const resultado =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          aspect: [4, 4],
          quality: 0.8,
        });

      if (resultado.canceled) {
        return;
      }

      if (
        resultado.assets &&
        resultado.assets.length > 0
      ) {
        const uri = resultado.assets[0].uri;

        console.log("Imagem selecionada:", uri);

        setImagem(uri);
      }
    } catch (error) {
      console.log(
        "ERRO AO ABRIR GALERIA:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível abrir a galeria."
      );
    }
  };

  // =====================================================
  // LOCALIZAÇÃO
  // =====================================================

  const handleAdicionarLocalizacao = async () => {
    try {
      setCarregando(true);

      const permissao =
        await Location.requestForegroundPermissionsAsync();

      if (permissao.status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Precisamos da sua localização para adicionar o local da publicação."
        );

        setCarregando(false);
        return;
      }

      const local =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

      console.log(
        "Coordenadas:",
        local.coords.latitude,
        local.coords.longitude
      );

      const enderecos =
        await Location.reverseGeocodeAsync({
          latitude: local.coords.latitude,
          longitude: local.coords.longitude,
        });

      if (
        enderecos &&
        enderecos.length > 0
      ) {
        const endereco = enderecos[0];

        const cidade =
          endereco.city ||
          endereco.subregion ||
          "";

        const estado =
          endereco.region ||
          "";

        let textoLocalizacao = "";

        if (cidade && estado) {
          textoLocalizacao =
            `${cidade}, ${estado}`;
        } else if (cidade) {
          textoLocalizacao = cidade;
        } else if (estado) {
          textoLocalizacao = estado;
        } else {
          textoLocalizacao =
            `${local.coords.latitude.toFixed(
              5
            )}, ${local.coords.longitude.toFixed(
              5
            )}`;
        }

        setLocalizacao(textoLocalizacao);

        Alert.alert(
          "Localização",
          `Localização adicionada:\n${textoLocalizacao}`
        );
      } else {
        const coordenadas =
          `${local.coords.latitude.toFixed(
            5
          )}, ${local.coords.longitude.toFixed(
            5
          )}`;

        setLocalizacao(coordenadas);

        Alert.alert(
          "Localização",
          "Localização atual adicionada."
        );
      }
    } catch (error) {
      console.log(
        "ERRO AO PEGAR LOCALIZAÇÃO:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível obter sua localização."
      );
    } finally {
      setCarregando(false);
    }
  };

  // =====================================================
  // PUBLICAR
  // =====================================================

  const handlePublicar = async () => {
    if (!legenda.trim() && !imagem) {
      Alert.alert(
        "Atenção",
        "Escreva uma legenda ou adicione uma foto."
      );
      return;
    }

    try {
      setCarregando(true);

      console.log(
        "1 - começando publicação"
      );

      // =================================================
      // PEGAR USUÁRIO SALVO
      // =================================================

      const dadosUsuario =
        await AsyncStorage.getItem(
          "@VibeConnect:usuario"
        );

      console.log(
        "2 - usuário salvo:",
        dadosUsuario
      );

      if (!dadosUsuario) {
        Alert.alert(
          "Erro",
          "Você precisa estar logado."
        );

        return;
      }

      // =================================================
      // TRANSFORMAR JSON EM OBJETO
      // =================================================

      let usuario;

      try {
        usuario = JSON.parse(dadosUsuario);
      } catch (error) {
        console.log(
          "ERRO AO LER USUÁRIO:",
          error
        );

        Alert.alert(
          "Erro",
          "Os dados do usuário estão inválidos."
        );

        return;
      }

      console.log(
        "3 - usuário:",
        usuario
      );

      // =================================================
      // VERIFICAR ID
      // =================================================

      if (!usuario.id) {
        Alert.alert(
          "Erro",
          "Usuário logado não possui ID."
        );

        return;
      }

      console.log(
        "4 - chamando criarPublicacao"
      );

      // =================================================
      // CRIAR PUBLICAÇÃO
      // =================================================

      const resultado =
        await criarPublicacao({
          usuarioId: usuario.id,

          username:
            usuario.username ||
            usuario.usuario ||
            "",

          nome:
            usuario.nome || "",

          localizacao:
            localizacao || "",

          imagem:
            imagem || "",

          legenda:
            legenda.trim(),

          hashtags: "",
        });

      console.log(
        "5 - publicação criada:",
        resultado
      );

      // =================================================
      // LIMPAR CAMPOS
      // =================================================

      setLegenda("");
      setImagem("");
      setLocalizacao("");

      // =================================================
      // AVISAR USUÁRIO
      // =================================================

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
    } catch (error) {
      console.log(
        "ERRO COMPLETO AO PUBLICAR:",
        error
      );

      Alert.alert(
        "Erro",
        error?.message ||
          "Não foi possível publicar."
      );
    } finally {
      setCarregando(false);
    }
  };

  // =====================================================
  // TELA
  // =====================================================

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : "height"
      }
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <View style={styles.header}>

        {/* VOLTAR */}

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={handleVoltar}
          activeOpacity={0.7}
        >
          <Image
            source={require(
              "../../../assets/seta-voltar.png"
            )}
            style={styles.setaVoltar}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* TÍTULO */}

        <Text style={styles.titulo}>
          Nova Publicação
        </Text>

        {/* PUBLICAR */}

        <TouchableOpacity
          style={[
            styles.botaoPublicar,
            carregando &&
              styles.botaoPublicarDesativado,
          ]}
          onPress={handlePublicar}
          disabled={carregando}
          activeOpacity={0.7}
        >
          {carregando ? (
            <ActivityIndicator
              size="small"
              color="#555555"
            />
          ) : (
            <Text style={styles.textoPublicar}>
              Publicar
            </Text>
          )}
        </TouchableOpacity>

      </View>

      {/* =================================================
          CONTEÚDO COM SCROLL
      ================================================= */}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={
          Platform.OS === "ios"
            ? "interactive"
            : "on-drag"
        }
      >

        {/* =================================================
            FOTO / VÍDEO
        ================================================= */}

        <TouchableOpacity
          style={styles.areaMidia}
          activeOpacity={0.8}
          onPress={handleSelecionarImagem}
        >

          {imagem ? (
            <>
              <Image
                source={{ uri: imagem }}
                style={styles.imagemSelecionada}
                resizeMode="cover"
              />

              <View
                style={styles.botaoTrocarImagem}
              >
                <Text
                  style={styles.textoTrocarImagem}
                >
                  Trocar foto
                </Text>
              </View>
            </>
          ) : (
            <>
              <Image
                source={require(
                  "../../../assets/quadro.png"
                )}
                style={styles.iconeImagem}
                resizeMode="contain"
              />

              <Text style={styles.textoMidia}>
                Adicione uma foto ou vídeo
              </Text>

              <Text style={styles.textoGaleria}>
                Toque para abrir a galeria
              </Text>
            </>
          )}

        </TouchableOpacity>

        {/* =================================================
            LEGENDA
        ================================================= */}

        <View
          style={styles.legendaContainer}
        >

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

        {/* =================================================
            LOCALIZAÇÃO
        ================================================= */}

        <TouchableOpacity
          style={styles.opcao}
          activeOpacity={0.7}
          onPress={handleAdicionarLocalizacao}
          disabled={carregando}
        >

          <Image
            source={require(
              "../../../assets/localizacao-2.png"
            )}
            style={styles.iconeOpcao}
            resizeMode="contain"
          />

          <Text
            style={[
              styles.textoOpcao,
              localizacao &&
                styles.localizacaoSelecionada,
            ]}
            numberOfLines={1}
          >
            {localizacao
              ? localizacao
              : "Adicionar localização"}
          </Text>

          <View style={styles.chevron}>

            <View
              style={styles.chevronLinha1}
            />

            <View
              style={styles.chevronLinha2}
            />

          </View>

        </TouchableOpacity>

        {/* =================================================
            PRIVACIDADE
        ================================================= */}

        <TouchableOpacity
          style={styles.opcao}
          activeOpacity={0.7}
        >

          <Image
            source={require(
              "../../../assets/globo.png"
            )}
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

            <View
              style={styles.chevronLinha1}
            />

            <View
              style={styles.chevronLinha2}
            />

          </View>

        </TouchableOpacity>

        {/* Espaço no final para poder rolar melhor */}

        <View style={{ height: 40 }} />

      </ScrollView>
    </KeyboardAvoidingView>
  );
}