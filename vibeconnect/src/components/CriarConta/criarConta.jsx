import React, { useState } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import styles from "./criarContaStyle";

import { criarUsuario } from "../../api/api";

export default function CriarConta({ navigation }) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  const handleCriarConta = async () => {
    if (
      !nome.trim() ||
      !email.trim() ||
      !senha ||
      !confirmarSenha
    ) {
      Alert.alert(
        "Atenção",
        "Preencha todos os campos."
      );
      return;
    }

    if (!email.includes("@")) {
      Alert.alert(
        "Atenção",
        "Digite um e-mail válido."
      );
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert(
        "Atenção",
        "As senhas não são iguais."
      );
      return;
    }

    if (senha.length < 6) {
      Alert.alert(
        "Atenção",
        "A senha deve ter pelo menos 6 caracteres."
      );
      return;
    }

    try {
      setCarregando(true);

      const novoUsuario = await criarUsuario(
        nome,
        email,
        senha
      );

      Alert.alert(
        "Conta criada!",
        `Bem-vindo(a), ${novoUsuario.nome}!`,
        [
          {
            text: "Entrar",
            onPress: () =>
              navigation.replace("Login"),
          },
        ]
      );

      setNome("");
      setEmail("");
      setSenha("");
      setConfirmarSenha("");

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

      <View style={styles.logoContainer}>

        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
        />

        <Text style={styles.nomeLogo}>
          <Text style={styles.vibe}>
            Vibe
          </Text>

          <Text style={styles.connect}>
            Connect
          </Text>
        </Text>

      </View>

      <Text style={styles.titulo}>
        Criar conta
      </Text>

      <View style={styles.campo}>

        <Text style={styles.label}>
          Nome completo
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#999999"
          value={nome}
          onChangeText={setNome}
        />

      </View>

      <View style={styles.campo}>

        <Text style={styles.label}>
          E-mail
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#999999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

      </View>

      <View style={styles.campo}>

        <Text style={styles.label}>
          Senha
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Crie uma senha"
          placeholderTextColor="#999999"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

      </View>

      <View style={styles.campo}>

        <Text style={styles.label}>
          Confirmar senha
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          placeholderTextColor="#999999"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

      </View>

      <TouchableOpacity
        style={styles.botaoCriar}
        onPress={handleCriarConta}
        disabled={carregando}
      >

        <Text style={styles.textoBotao}>
          {carregando
            ? "Criando..."
            : "Criar conta"}
        </Text>

      </TouchableOpacity>

      <View style={styles.loginContainer}>

        <Text style={styles.textoLogin}>
          Já tem uma conta?
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Login")
          }
        >

          <Text style={styles.entrar}>
            Entrar
          </Text>

        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}