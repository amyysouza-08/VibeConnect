import React from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import styles from "./infoStyle";

export default function Info({
  usuario,
  navigation,
}) {

  return (
    <View style={styles.container}>

      <View style={styles.topo}>

        <Image
          source={require("../../../assets/fotoPerfil.png")}
          style={styles.fotoPerfil}
        />

        <View style={styles.estatisticas}>

          <View style={styles.estatistica}>

            <Text style={styles.numero}>
              {usuario?.publicacoes || 0}
            </Text>

            <Text style={styles.label}>
              publicações
            </Text>

          </View>

          <View style={styles.estatistica}>

            <Text style={styles.numero}>
              {usuario?.seguidores || 0}
            </Text>

            <Text style={styles.label}>
              seguidores
            </Text>

          </View>

          <View style={styles.estatistica}>

            <Text style={styles.numero}>
              {usuario?.seguindo || 0}
            </Text>

            <Text style={styles.label}>
              seguindo
            </Text>

          </View>

        </View>

      </View>

      <Text style={styles.nome}>
        {usuario?.nome || ""}
      </Text>

      <Text style={styles.bio}>
        {usuario?.bio || ""}
      </Text>

      <View style={styles.localizacaoContainer}>

        <Image
          source={require("../../../assets/local-perfil.png")}
          style={styles.localizacaoIcone}
          resizeMode="contain"
        />

        <Text style={styles.localizacao}>
          {usuario?.localizacao || "Adicionar localização"}
        </Text>

      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={() =>
          navigation.navigate("EditarPerfil", {
            usuario,
          })
        }
      >

        <Text style={styles.textoBotao}>
          Editar Perfil
        </Text>

      </TouchableOpacity>

    </View>
  );
}