import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import styles from "./LoginStyles";

function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>

      {/* LOGO */}
      <Image
        source={require("../../../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* NOME */}
      <Text style={styles.logoText}>
        <Text style={styles.vibe}>Vibe</Text>
        <Text style={styles.connect}>Connect</Text>
      </Text>

      {/* SUBTÍTULO */}
      <Text style={styles.subtitle}>
        Conecte pessoas, compartilhe{"\n"}
        boas vibrações
      </Text>

      <View style={styles.space} />

      {/* CAMPO E-MAIL */}
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
        />
      </View>

      {/* CAMPO SENHA */}
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
        />

        {/* OLHO */}
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setMostrarSenha(!mostrarSenha)}
        >
          <Image
            source={require("../../../assets/eyes.vector.png")}
            style={styles.eyeIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* BOTÃO ENTRAR */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      {/* ESQUECEU A SENHA */}
      <TouchableOpacity style={styles.forgotButton}>
        <Text style={styles.forgotText}>
          Esqueceu sua senha?
        </Text>
      </TouchableOpacity>

      {/* OU */}
      <View style={styles.dividerContainer}>
        <View style={styles.line} />

        <Text style={styles.orText}>ou</Text>

        <View style={styles.line} />
      </View>

      {/* CRIAR CONTA */}
      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.createButtonText}>
          Criar conta
        </Text>
      </TouchableOpacity>

      {/* JÁ TEM UMA CONTA */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          Já tem uma conta?{" "}
        </Text>

        <TouchableOpacity>
          <Text style={styles.registerLink}>
            Entrar
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

export { Login };
export default Login;