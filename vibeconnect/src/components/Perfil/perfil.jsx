import React, {
  useCallback,
  useState,
} from "react";

import {
  View,
  ScrollView,
  Image,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";

import {
  useFocusEffect,
} from "@react-navigation/native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import Header from "../Header/header";
import Info from "../Info/info";
import Footer from "../footer/Footer";

import {
  getUsuario,
  getPosts,
  obterUsuarioLogado,
} from "../../api/api";

import styles from "./perfilStyle";

export default function Perfil({ navigation }) {

  const [usuario, setUsuario] =
    useState(null);

  const [publicacoes, setPublicacoes] =
    useState([]);

  const [carregando, setCarregando] =
    useState(true);

  // =====================================================
  // CARREGAR PERFIL
  // =====================================================

  const carregarUsuario = async () => {

    try {

      setCarregando(true);

      const logado =
        await obterUsuarioLogado();

      if (!logado?.id) {

        Alert.alert(
          "Erro",
          "Usuário não encontrado."
        );

        return;
      }

      // =================================================
      // BUSCAR USUÁRIO
      // =================================================

      const dadosUsuario =
        await getUsuario(logado.id);

      // =================================================
      // BUSCAR PUBLICAÇÕES
      // =================================================

      const todosPosts =
        await getPosts();

      // =================================================
      // PEGAR SOMENTE OS POSTS DO USUÁRIO
      // =================================================

      const postsDoUsuario =
        todosPosts.filter(
          (post) =>
            String(post.usuarioId) ===
            String(logado.id)
        );

      setUsuario({
        ...dadosUsuario,

        // O número de publicações vem
        // realmente dos posts encontrados.
        publicacoes:
          postsDoUsuario.length,

        // Não usar valores antigos/falsos
        // vindos do objeto do usuário.
        seguidores:
          Number(
            dadosUsuario?.seguidores || 0
          ),

        seguindo:
          Number(
            dadosUsuario?.seguindo || 0
          ),
      });

      setPublicacoes(
        postsDoUsuario
      );

    } catch (error) {

      console.log(
        "ERRO AO CARREGAR PERFIL:",
        error
      );

      Alert.alert(
        "Erro",
        error?.message ||
          "Não foi possível carregar o perfil."
      );

    } finally {

      setCarregando(false);

    }
  };

  // =====================================================
  // ATUALIZAR AO ENTRAR NA TELA
  // =====================================================

  useFocusEffect(
    useCallback(() => {

      carregarUsuario();

    }, [])
  );

  // =====================================================
  // CARREGANDO
  // =====================================================

  if (carregando) {

    return (
      <View
        style={styles.container}
      >

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          <ActivityIndicator
            size="large"
          />

        </View>

        <Footer
          telaAtiva="perfil"
          navigation={navigation}
        />

      </View>
    );
  }

  // =====================================================
  // TELA
  // =====================================================

  return (
    <View
      style={styles.container}
    >

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }
      >

        {/* =============================================
            HEADER
        ============================================== */}

        <Header
          usuario={usuario}
        />

        {/* =============================================
            INFORMAÇÕES DO PERFIL
        ============================================== */}

        <Info
          usuario={usuario}
          navigation={navigation}
        />

        {/* =============================================
            ABAS
        ============================================== */}

        <View
          style={styles.abas}
        >

          {/* ===========================================
              GRADE DO FIGMA
          ============================================ */}

          <View
            style={styles.aba}
          >

            <Image
              source={require(
                "../../../assets/grade.png"
              )}
              style={styles.iconeAba}
              resizeMode="contain"
            />

          </View>

          {/* ===========================================
              SALVOS
              ÍCONE DO PACOTE
          ============================================ */}

          <View
            style={styles.aba}
          >

            <MaterialCommunityIcons
              name="bookmark-outline"
              size={25}
              color="#350616"
            />

          </View>

        </View>

        {/* =============================================
            PUBLICAÇÕES
        ============================================== */}

        <View
          style={{
            width: "100%",
            paddingHorizontal: 16,
            paddingBottom: 30,
          }}
        >

          {publicacoes.length === 0 ? (

            <View
              style={{
                alignItems: "center",
                paddingVertical: 40,
              }}
            >

              <Text
                style={{
                  fontSize: 15,
                  color: "#777777",
                  fontFamily:
                    "Poppins_400Regular",
                }}
              >
                Nenhuma publicação ainda.
              </Text>

            </View>

          ) : (

            publicacoes.map(
              (post) => (

                <View
                  key={post.id}
                  style={{
                    width: "100%",
                    marginBottom: 20,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 12,
                    overflow: "hidden",
                  }}
                >

                  {/* =================================
                      IMAGEM
                  ================================== */}

                  {post.imagem ? (

                    <Image
                      source={{
                        uri: post.imagem,
                      }}
                      style={{
                        width: "100%",
                        height: 320,
                      }}
                      resizeMode="cover"
                    />

                  ) : null}

                  {/* =================================
                      LEGENDA
                  ================================== */}

                  {post.texto ? (

                    <View
                      style={{
                        padding: 12,
                      }}
                    >

                      <Text
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily:
                            "Poppins_400Regular",
                        }}
                      >
                        {post.texto}
                      </Text>

                    </View>

                  ) : null}

                  {/* =================================
                      LOCALIZAÇÃO
                  ================================== */}

                  {post.localizacao ? (

                    <View
                      style={{
                        paddingHorizontal: 12,
                        paddingBottom: 8,
                      }}
                    >

                      <Text
                        style={{
                          fontSize: 12,
                          color: "#777777",
                          fontFamily:
                            "Poppins_400Regular",
                        }}
                      >
                        {post.localizacao}
                      </Text>

                    </View>

                  ) : null}

                  {/* =================================
                      DATA
                  ================================== */}

                  <View
                    style={{
                      paddingHorizontal: 12,
                      paddingBottom: 12,
                    }}
                  >

                    <Text
                      style={{
                        fontSize: 12,
                        color: "#999999",
                        fontFamily:
                          "Poppins_400Regular",
                      }}
                    >
                      {post.horario || "Agora"}
                    </Text>

                  </View>

                </View>

              )
            )

          )}

        </View>

      </ScrollView>

      {/* =============================================
          FOOTER
      ============================================== */}

      <Footer
        telaAtiva="perfil"
        navigation={navigation}
      />

    </View>
  );
}