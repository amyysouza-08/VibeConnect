import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import styles from "./HomeStyles";

import Footer from "../footer/Footer";

function Home() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>

      <View style={styles.content}>

        {/* LOGO */}
        <Text style={styles.logoText}>
          <Text style={styles.vibe}>Vibe</Text>
          <Text style={styles.connect}>Connect</Text>
        </Text>

        {/* PRIMEIRO POST */}
        <View style={styles.postCard}>

          <View style={styles.postHeader}>

            <View style={styles.userInfo}>
              <View style={styles.avatar} />

              <View style={styles.userTexts}>
                <Text style={styles.userName}>
                  Eloysa
                </Text>

                <Text style={styles.postTime}>
                  Hoje às 10:30
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.moreButton}>
              <Image
                source={require("../../../assets/pontos.png")}
                style={styles.pontosIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

          </View>

          <Text style={styles.postText}>
            Lorem ipsum dolor sit amet, consectetur{"\n"}
            adipiscing
          </Text>

          <View style={styles.postActions}>

            <View style={styles.leftActions}>

              <TouchableOpacity style={styles.actionButton}>
                <Image
                  source={require("../../../assets/curtida.png")}
                  style={styles.actionIcon}
                  resizeMode="contain"
                />

                <Text style={styles.actionNumber}>
                  20
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Image
                  source={require("../../../assets/comentario.png")}
                  style={styles.actionIcon}
                  resizeMode="contain"
                />

                <Text style={styles.actionNumber}>
                  3
                </Text>
              </TouchableOpacity>

            </View>

            <TouchableOpacity>
              <Image
                source={require("../../../assets/salvar.png")}
                style={styles.actionIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

          </View>

        </View>

        {/* SEGUNDO POST */}
        <View style={styles.postCard}>

          <View style={styles.postHeader}>

            <View style={styles.userInfo}>
              <View style={styles.avatar} />

              <View style={styles.userTexts}>
                <Text style={styles.userName}>
                  Eloysa
                </Text>

                <Text style={styles.postTime}>
                  Hoje às 10:30
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.moreButton}>
              <Image
                source={require("../../../assets/pontos.png")}
                style={styles.pontosIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

          </View>

          <Text style={styles.postText}>
            Lorem ipsum dolor sit amet, consectetur{"\n"}
            adipiscing
          </Text>

          <View style={styles.postActions}>

            <View style={styles.leftActions}>

              <TouchableOpacity style={styles.actionButton}>
                <Image
                  source={require("../../../assets/curtida.png")}
                  style={styles.actionIcon}
                  resizeMode="contain"
                />

                <Text style={styles.actionNumber}>
                  20
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Image
                  source={require("../../../assets/comentario.png")}
                  style={styles.actionIcon}
                  resizeMode="contain"
                />

                <Text style={styles.actionNumber}>
                  3
                </Text>
              </TouchableOpacity>

            </View>

            <TouchableOpacity>
              <Image
                source={require("../../../assets/salvar.png")}
                style={styles.actionIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

          </View>

        </View>

      </View>

      {/* FOOTER */}
      <Footer />

    </View>
  );
}

export { Home };
export default Home;