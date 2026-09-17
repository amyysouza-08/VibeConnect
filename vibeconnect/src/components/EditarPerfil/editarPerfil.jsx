import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import styles from "./editarPerfilStyle";

import {
  atualizarUsuario,
  obterUsuarioLogado,
} from "../../api/api";

export default function EditarPerfil({
  navigation,
  route,
}) {

  const usuarioInicial =
    route?.params?.usuario ||
    obterUsuarioLogado();

  const [nome, setNome] =
    useState(usuarioInicial?.nome || "");

  const [username, setUsername] =
    useState(usuarioInicial?.username || "");

  const [bio, setBio] =
    useState(usuarioInicial?.bio || "");

  const [carregando, setCarregando] =
    useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSalvar = async () => {

    if (!nome.trim()) {
      Alert.alert(
        "Atenção",
        "Digite seu nome."
      );
      return;
    }

    if (!username.trim()) {
      Alert.alert(
        "Atenção",
        "Digite seu usuário."
      );
      return;
    }

    try {

      setCarregando(true);

      await atualizarUsuario(
        usuarioInicial.id,
        {
          nome: nome.trim(),
          username: username
            .trim()
            .toLowerCase()
            .replace(/\s/g, ""),
          bio: bio.trim(),
        }
      );

      Alert.alert(
        "Sucesso",
        "Perfil atualizado!",
        [
          {
            text: "OK",
            onPress: () =>
              navigation.goBack(),
          },
        ]
      );

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
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() =>
            navigation.goBack()
          }
        >

          <Text style={styles.seta}>
            ‹
          </Text>

        </TouchableOpacity>

        <Text style={styles.titulo}>
          Editar perfil
        </Text>

        <View style={styles.espaco} />

      </View>

      <View style={styles.fotoContainer}>

        <Image
          source={require("../../../assets/fotoPerfil.png")}
          style={styles.foto}
        />

        <TouchableOpacity style={styles.camera}>

          <Image
            source={require("../../../assets/camera.png")}
            style={styles.cameraIcone}
          />

        </TouchableOpacity>

      </View>

      <View style={styles.campo}>

        <Text style={styles.label}>
          Nome
        </Text>

        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite seu nome"
          placeholderTextColor="#999999"
        />

      </View>

      <View style={styles.campo}>

        <Text style={styles.label}>
          Usuário
        </Text>

        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Digite seu usuário"
          placeholderTextColor="#999999"
          autoCapitalize="none"
        />

      </View>

      <View style={styles.campo}>

        <Text style={styles.label}>
          Bio
        </Text>

        <View>

          <TextInput
            style={[
              styles.input,
              styles.inputBio,
            ]}
            value={bio}
            onChangeText={setBio}
            placeholder="Digite sua bio"
            placeholderTextColor="#999999"
            multiline
            maxLength={150}
          />

          <Text style={styles.contador}>
            {bio.length}/150
          </Text>

        </View>

      </View>

      <TouchableOpacity
        style={styles.botaoSalvar}
        onPress={handleSalvar}
        disabled={carregando}
      >

        {carregando ? (

          <ActivityIndicator color="#FFFFFF" />

        ) : (

          <Text style={styles.textoBotao}>
            Salvar alterações
          </Text>

        )}

      </TouchableOpacity>

    </ScrollView>
  );
}