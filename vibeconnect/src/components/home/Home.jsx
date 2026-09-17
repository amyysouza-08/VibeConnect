import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
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

import styles from "./HomeStyles";

import Footer from "../footer/Footer";

import {
  getPosts,
  curtirPost,
  salvarPost,
} from "../../api/api";

export default function Home({ navigation }) {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] =
    useState(true);

  useEffect(() => {
    carregarPosts();
  }, []);

  const carregarPosts = async () => {
    try {

      setCarregando(true);

      const dados = await getPosts();

      setPosts(dados);

    } catch (error) {

      Alert.alert(
        "Erro",
        error.message
      );

    } finally {
      setCarregando(false);
    }
  };

  const handleCurtir = async (post) => {
    try {

      const atualizado =
        await curtirPost(post);

      setPosts((lista) =>
        lista.map((item) =>
          item.id === post.id
            ? atualizado
            : item
        )
      );

    } catch (error) {
      Alert.alert(
        "Erro",
        error.message
      );
    }
  };

  const handleSalvar = async (post) => {

    const atualizado =
      await salvarPost(post);

    setPosts((lista) =>
      lista.map((item) =>
        item.id === post.id
          ? atualizado
          : item
      )
    );
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.logoText}>

          <Text style={styles.vibe}>
            Vibe
          </Text>

          <Text style={styles.connect}>
            Connect
          </Text>

        </Text>

        {carregando ? (

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 100,
            }}
          >

            <ActivityIndicator />

          </View>

        ) : posts.length === 0 ? (

          <View
            style={{
              alignItems: "center",
              paddingTop: 80,
            }}
          >

            <Text>
              Nenhuma publicação ainda.
            </Text>

          </View>

        ) : (

          posts.map((post) => (

            <View
              key={post.id}
              style={styles.postCard}
            >

              <View style={styles.postHeader}>

                <TouchableOpacity
                  style={styles.userInfo}
                  activeOpacity={0.7}
                >

                  <View style={styles.avatar} />

                  <View style={styles.userTexts}>

                    <Text style={styles.userName}>
                      {post.usuario?.nome ||
                        post.username}
                    </Text>

                    <Text style={styles.postTime}>
                      {post.horario}
                    </Text>

                  </View>

                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.moreButton}
                  onPress={() =>
                    Alert.alert(
                      "Opções",
                      "Menu da publicação"
                    )
                  }
                >

                  <Image
                    source={require("../../../assets/pontos.png")}
                    style={styles.pontosIcon}
                    resizeMode="contain"
                  />

                </TouchableOpacity>

              </View>

              {post.imagem ? (
                <Image
                  source={require("../../../assets/igreja.png")}
                  style={{
                    width: "100%",
                    height: 220,
                    marginBottom: 10,
                  }}
                  resizeMode="cover"
                />
              ) : null}

              <Text style={styles.postText}>
                {post.legenda || post.texto}
              </Text>

              {post.hashtags ? (
                <Text
                  style={{
                    marginTop: 5,
                    color: "#39747A",
                  }}
                >
                  {post.hashtags}
                </Text>
              ) : null}

              <View style={styles.postActions}>

                <View style={styles.leftActions}>

                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() =>
                      handleCurtir(post)
                    }
                  >

                    <Image
                      source={require("../../../assets/curtida.png")}
                      style={styles.actionIcon}
                      resizeMode="contain"
                    />

                    <Text style={styles.actionNumber}>
                      {post.curtidas}
                    </Text>

                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() =>
                      navigation.navigate(
                        "Publicacao",
                        {
                          post,
                        }
                      )
                    }
                  >

                    <Image
                      source={require("../../../assets/comentario.png")}
                      style={styles.actionIcon}
                      resizeMode="contain"
                    />

                    <Text style={styles.actionNumber}>
                      {post.comentarios}
                    </Text>

                  </TouchableOpacity>

                </View>

                <TouchableOpacity
                  onPress={() =>
                    handleSalvar(post)
                  }
                >

                  <Image
                    source={require("../../../assets/salvar.png")}
                    style={styles.actionIcon}
                    resizeMode="contain"
                  />

                </TouchableOpacity>

              </View>

            </View>

          ))

        )}

      </ScrollView>

      <Footer
        navigation={navigation}
        telaAtiva="home"
      />

    </View>
  );
}