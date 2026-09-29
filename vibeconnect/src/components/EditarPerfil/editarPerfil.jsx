import React, { useEffect, useState } from "react";

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

import * as ImagePicker from "expo-image-picker";

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

export default function EditarPerfil({ navigation, route }) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [usuario, setUsuario] = useState(null);

  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  // CARREGAR USUÁRIO

  useEffect(() => {
    carregarUsuario();
  }, []);

  const carregarUsuario = async () => {
    try {
      setCarregando(true);

      let usuarioAtual =
        route?.params?.usuario || null;

      if (!usuarioAtual) {
        usuarioAtual = await obterUsuarioLogado();
      }

      if (!usuarioAtual) {
        Alert.alert(
          "Erro",
          "Não foi possível encontrar o usuário logado.",
          [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ]
        );

        return;
      }

      console.log(
        "USUÁRIO CARREGADO PARA EDITAR:",
        usuarioAtual
      );

      setUsuario(usuarioAtual);

      setNome(usuarioAtual.nome || "");

      setUsername(
        usuarioAtual.username ||
          usuarioAtual.usuario ||
          ""
      );

      setBio(usuarioAtual.bio || "");

      setFotoPerfil(
        usuarioAtual.fotoPerfil || ""
      );
    } catch (error) {
      console.log(
        "ERRO AO CARREGAR USUÁRIO:",
        error
      );

      Alert.alert(
        "Erro",
        error?.message ||
          "Não foi possível carregar seus dados."
      );
    } finally {
      setCarregando(false);
    }
  };

  // ESCOLHER FOTO

  const escolherFoto = async () => {
    try {
      const permissao =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissao.granted) {
        Alert.alert(
          "Permissão necessária",
          "Permita o acesso à galeria para escolher uma foto."
        );

        return;
      }

      const resultado =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });

      if (
        !resultado.canceled &&
        resultado.assets &&
        resultado.assets.length > 0
      ) {
        const uri =
          resultado.assets[0].uri;

        console.log(
          "FOTO ESCOLHIDA:",
          uri
        );

        setFotoPerfil(uri);
      }
    } catch (error) {
      console.log(
        "ERRO AO ESCOLHER FOTO:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível escolher a foto."
      );
    }
  };


  // TIRAR FOTO

  const tirarFoto = async () => {
    try {
      const permissao =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permissao.granted) {
        Alert.alert(
          "Permissão necessária",
          "Permita o acesso à câmera para tirar uma foto."
        );

        return;
      }

      const resultado =
        await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });

      if (
        !resultado.canceled &&
        resultado.assets &&
        resultado.assets.length > 0
      ) {
        const uri =
          resultado.assets[0].uri;

        console.log(
          "FOTO TIRADA:",
          uri
        );

        setFotoPerfil(uri);
      }
    } catch (error) {
      console.log(
        "ERRO AO TIRAR FOTO:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível abrir a câmera."
      );
    }
  };

  // OPÇÕES DA FOTO

  const alterarFoto = () => {
    Alert.alert(
      "Foto de perfil",
      "Escolha uma opção",
      [
        {
          text: "Galeria",
          onPress: escolherFoto,
        },
        {
          text: "Câmera",
          onPress: tirarFoto,
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  };


  // SALVAR

  const handleSalvar = async () => {
    if (!usuario) {
      Alert.alert(
        "Erro",
        "Usuário não carregado."
      );

      return;
    }

    const nomeFinal =
      nome.trim();

    const usernameFinal =
      username
        .trim()
        .toLowerCase()
        .replace(/\s/g, "");

    const bioFinal =
      bio.trim();

    if (!nomeFinal) {
      Alert.alert(
        "Atenção",
        "Digite seu nome."
      );

      return;
    }

    if (!usernameFinal) {
      Alert.alert(
        "Atenção",
        "Digite seu usuário."
      );

      return;
    }

    if (!usuario.id) {
      Alert.alert(
        "Erro",
        "ID do usuário não encontrado."
      );

      return;
    }

    try {
      setSalvando(true);

      console.log(
        "SALVANDO PERFIL:",
        {
          id: usuario.id,
          nome: nomeFinal,
          username: usernameFinal,
          bio: bioFinal,
          fotoPerfil,
        }
      );

      const usuarioAtualizado =
        await atualizarUsuario(
          usuario.id,
          {
            nome: nomeFinal,
            username: usernameFinal,
            bio: bioFinal,
            fotoPerfil: fotoPerfil,
          }
        );

      console.log(
        "PERFIL SALVO:",
        usuarioAtualizado
      );

      setUsuario(
        usuarioAtualizado
      );

      Alert.alert(
        "Sucesso",
        "Perfil atualizado!",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.goBack();
            },
          },
        ]
      );
    } catch (error) {
      console.log(
        "ERRO AO SALVAR PERFIL:",
        error
      );

      Alert.alert(
        "Erro",
        error?.message ||
          "Não foi possível atualizar o perfil."
      );
    } finally {
      setSalvando(false);
    }
  };


  // FONTES

  if (!fontsLoaded) {
    return null;
  }


  // CARREGAND

  if (carregando) {
    return (
      <View
        style={[
          styles.container,
          {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }


  // TELA

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >

      {/* CABEÇALHO */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() =>
            navigation.goBack()
          }
          activeOpacity={0.7}
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

      {/* FOTO */}

      <View
        style={styles.fotoContainer}
      >

        <Image
          source={
            fotoPerfil
              ? { uri: fotoPerfil }
              : require(
                  "../../../assets/fotoPerfil.png"
                )
          }
          style={styles.foto}
        />

        <TouchableOpacity
          style={styles.camera}
          onPress={alterarFoto}
          activeOpacity={0.7}
        >

          <Image
            source={require(
              "../../../assets/camera.png"
            )}
            style={styles.cameraIcone}
          />

        </TouchableOpacity>

      </View>

      {/* NOME */}

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
          autoCapitalize="words"
          editable={!salvando}
        />

      </View>

      {/* USUÁRIO */}

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
          autoCorrect={false}
          editable={!salvando}
        />

      </View>

      {/* BIO */}

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
            textAlignVertical="top"
            editable={!salvando}
          />

          <Text
            style={styles.contador}
          >
            {bio.length}/150
          </Text>

        </View>

      </View>

      {/* BOTÃO */}

      <TouchableOpacity
        style={[
          styles.botaoSalvar,
          salvando && {
            opacity: 0.6,
          },
        ]}
        onPress={handleSalvar}
        disabled={salvando}
        activeOpacity={0.8}
      >

        {salvando ? (
          <ActivityIndicator
            color="#350616"
          />
        ) : (
          <Text
            style={styles.textoBotao}
          >
            Salvar alterações
          </Text>
        )}

      </TouchableOpacity>

    </ScrollView>
  );
}