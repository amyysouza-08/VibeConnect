import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import styles from "../footer/FooterStyles";

export default function Footer() {
  return (
    <View style={styles.footer}>

      <TouchableOpacity style={styles.item}>
        <Image
          source={require("../../../assets/casa.png")}
          style={styles.icone}
        />

        <Text style={styles.texto}>
          Início
        </Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.item}>
        <Image
          source={require("../../../assets/criar.png")}
          style={styles.icone}
        />

        <Text style={styles.texto}>
          Criar
        </Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.item}>
        <Image
          source={require("../../../assets/sino.png")}
          style={styles.icone}
        />

        <Text style={styles.texto}>
          Notificações
        </Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.item}>
        <Image
          source={require("../../../assets/perfil.png")}
          style={styles.icone}
        />

        <Text style={styles.texto}>
          Perfil
        </Text>
      </TouchableOpacity>

    </View>
  );
}