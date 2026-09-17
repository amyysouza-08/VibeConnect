import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import styles from "./FooterStyles";

export default function Footer({
  navigation,
  telaAtiva,
}) {
  return (
    <View style={styles.footer}>

      {/* INÍCIO */}
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation?.navigate("Home")}
        activeOpacity={0.7}
      >
        <Image
          source={require("../../../assets/casa.png")}
          style={[
            styles.icone,
            telaAtiva === "home" && styles.iconeAtivo,
          ]}
          resizeMode="contain"
        />

        <Text style={styles.texto}>
          Início
        </Text>
      </TouchableOpacity>

      {/* CRIAR */}
      <TouchableOpacity
        style={styles.botao}
        onPress={() =>
          navigation?.navigate("CriarPublicacao")
        }
        activeOpacity={0.7}
      >
        <Image
          source={require("../../../assets/criar.png")}
          style={styles.icone}
          resizeMode="contain"
        />

        <Text style={styles.texto}>
          Criar
        </Text>
      </TouchableOpacity>

      {/* NOTIFICAÇÕES */}
      <TouchableOpacity
        style={styles.botao}
        onPress={() =>
          navigation?.navigate("Notificacao")
        }
        activeOpacity={0.7}
      >
        <Image
          source={require("../../../assets/notificacao.png")}
          style={[
            styles.icone,
            telaAtiva === "notificacao" &&
              styles.iconeAtivo,
          ]}
          resizeMode="contain"
        />

        <Text style={styles.texto}>
          Notificações
        </Text>
      </TouchableOpacity>

      {/* PERFIL */}
      <TouchableOpacity
        style={styles.botao}
        onPress={() =>
          navigation?.navigate("Perfil")
        }
        activeOpacity={0.7}
      >
        <Image
          source={require("../../../assets/perfil.png")}
          style={[
            styles.icone,
            telaAtiva === "perfil" &&
              styles.iconeAtivo,
          ]}
          resizeMode="contain"
        />

        <Text style={styles.texto}>
          Perfil
        </Text>
      </TouchableOpacity>

    </View>
  );
}