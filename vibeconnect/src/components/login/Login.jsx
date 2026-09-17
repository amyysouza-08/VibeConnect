import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import styles from "./LoginStyles";

import {
  loginUsuario,
} from "../../api/api";

export default function Login({ navigation }) {

  const [mostrarSenha, setMostrarSenha] =
    useState(false);

  const [emailOuUsuario, setEmailOuUsuario] =
    useState("");

  const [senha, setSenha] =
    useState("");

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

  const handleLogin = async () => {

    if (
      !emailOuUsuario.trim() ||
      !senha
    ) {
      Alert.alert(
        "Atenção",
        "Digite seu e-mail/usuário e sua senha."
      );
      return;
    }

    try {

      setCarregando(true);

      await loginUsuario(
        emailOuUsuario,
        senha
      );

      navigation.replace("Home");

    } catch (error) {

      Alert.alert(
        "Não foi possível entrar",
        error.message
      );

    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>

      <Image
        source={require("../../../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.logoText}>

        <Text style={styles.vibe}>
          Vibe
        </Text>

        <Text style={styles.connect}>
          Connect
        </Text>

      </Text>

      <Text style={styles.subtitle}>
        Conecte pessoas, compartilhe{"\n"}
        boas vibrações
      </Text>

      <View style={styles.space} />

      <View style={styles.inputContainer}>

        <Image
          source={require("../../../assets/email.png")}
          style={styles.icon}
          resizeMode="contain"
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail ou usuário"
          placeholderTextColor="#999999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={emailOuUsuario}
          onChangeText={setEmailOuUsuario}
        />

      </View>

      <View style={styles.inputContainer}>

        <Image
          source={require("../../../assets/senha.vector.png")}
          style={styles.icon}
          resizeMode="contain"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999999"
          secureTextEntry={!mostrarSenha}
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() =>
            setMostrarSenha(!mostrarSenha)
          }
        >

          <Image
            source={require("../../../assets/eyes.vector.png")}
            style={styles.eyeIcon}
            resizeMode="contain"
          />

        </TouchableOpacity>

      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={carregando}
      >

        <Text style={styles.loginButtonText}>
          {carregando
            ? "Entrando..."
            : "Entrar"}
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotButton}
      >

        <Text style={styles.forgotText}>
          Esqueceu sua senha?
        </Text>

      </TouchableOpacity>

      <View style={styles.dividerContainer}>

        <View style={styles.line} />

        <Text style={styles.orText}>
          ou
        </Text>

        <View style={styles.line} />

      </View>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() =>
          navigation.navigate("CriarConta")
        }
      >

        <Text style={styles.createButtonText}>
          Criar conta
        </Text>

      </TouchableOpacity>

    </View>
  );
}