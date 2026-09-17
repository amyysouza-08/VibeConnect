import React from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import styles from "./headerStyle";

export default function Header({
  usuario,
}) {
  return (
    <View style={styles.container}>

      <Text style={styles.nomeUsuario}>
        {usuario?.username || "usuário"}
      </Text>

      <TouchableOpacity>

        <Image
          source={require("../../../assets/engrenagem.png")}
          style={styles.icone}
        />

      </TouchableOpacity>

    </View>
  );
}