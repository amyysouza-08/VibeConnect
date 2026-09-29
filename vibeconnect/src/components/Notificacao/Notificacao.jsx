import React, {
  useCallback,
  useState,
} from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  useFocusEffect,
} from "@react-navigation/native";

import styles from "./NotificacaoStyle";

import Footer from "../footer/Footer";

import {
  getNotificacoes,
} from "../../api/api";

// =====================================================
// ÍCONES DAS NOTIFICAÇÕES
// =====================================================

const icones = {
  curtida: require(
    "../../../assets/curtida-preenchida.png"
  ),

  comentario: require(
    "../../../assets/comentario-not.png"
  ),

  seguidor: require(
    "../../../assets/follow.png"
  ),

  salvo: require(
    "../../../assets/salvar-preenchido.png"
  ),

  padrao: require(
    "../../../assets/notificacao.png"
  ),
};

// =====================================================
// ESCOLHER ÍCONE PELO TIPO
// =====================================================

function iconePorTipo(tipo) {
  return (
    icones[tipo] ||
    icones.padrao
  );
}

// =====================================================
// TELA DE NOTIFICAÇÕES
// =====================================================

export default function Notificacao({
  navigation,
}) {
  const [
    notificacoes,
    setNotificacoes,
  ] = useState([]);

  const [
    carregando,
    setCarregando,
  ] = useState(true);

  // ===================================================
  // CARREGAR NOTIFICAÇÕES
  // ===================================================

  const carregarNotificacoes =
    useCallback(async () => {
      try {
        setCarregando(true);

        console.log(
          "CARREGANDO NOTIFICAÇÕES..."
        );

        const dados =
          await getNotificacoes();

        console.log(
          "NOTIFICAÇÕES RECEBIDAS:",
          dados
        );

        if (Array.isArray(dados)) {
          setNotificacoes(dados);
        } else {
          setNotificacoes([]);
        }
      } catch (error) {
        console.log(
          "ERRO AO CARREGAR NOTIFICAÇÕES:",
          error
        );

        Alert.alert(
          "Erro",
          error?.message ||
            "Não foi possível carregar as notificações."
        );
      } finally {
        setCarregando(false);
      }
    }, []);

  // ===================================================
  // RECARREGAR TODA VEZ QUE ENTRAR NA TELA
  // ===================================================

  useFocusEffect(
    useCallback(() => {
      carregarNotificacoes();
    }, [carregarNotificacoes])
  );

  // ===================================================
  // TELA
  // ===================================================

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top"]}
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <View style={styles.header}>

        <Text style={styles.titulo}>
          Notificações
        </Text>

      </View>

      {/* =================================================
          CONTEÚDO
      ================================================= */}

      {carregando ? (

        // =================================================
        // CARREGANDO
        // =================================================

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

      ) : (

        // =================================================
        // LISTA
        // =================================================

        <ScrollView
          style={styles.lista}
          contentContainerStyle={[
            styles.listaConteudo,
            notificacoes.length === 0 && {
              flexGrow: 1,
            },
          ]}
          showsVerticalScrollIndicator={false}
        >

          {/* =================================================
              NENHUMA NOTIFICAÇÃO
          ================================================= */}

          {notificacoes.length === 0 ? (

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 30,
              }}
            >

              <Text
                style={{
                  fontSize: 16,
                  color: "#777777",
                  textAlign: "center",
                }}
              >
                Nenhuma notificação ainda.
              </Text>

            </View>

          ) : (

            // =================================================
            // NOTIFICAÇÕES
            // =================================================

            notificacoes.map(
              (notificacao) => (

                <TouchableOpacity
                  key={String(
                    notificacao.id
                  )}
                  style={styles.card}
                  activeOpacity={0.8}
                >

                  {/* =================================================
                      ÍCONE
                  ================================================= */}

                  <View
                    style={
                      styles.iconeContainer
                    }
                  >

                    <Image
                      source={iconePorTipo(
                        notificacao.tipo
                      )}
                      style={
                        styles.iconeImagem
                      }
                      resizeMode="contain"
                    />

                  </View>

                  {/* =================================================
                      TEXTO
                  ================================================= */}

                  <View
                    style={styles.conteudo}
                  >

                    <Text
                      style={
                        styles.mensagem
                      }
                    >

                      <Text
                        style={
                          styles.nome
                        }
                      >
                        {notificacao.nome ||
                          "Usuário"}
                      </Text>

                      {" "}

                      {notificacao.mensagem ||
                        ""}

                    </Text>

                    {/* =================================================
                        HORÁRIO
                    ================================================= */}

                    <Text
                      style={
                        styles.horario
                      }
                    >
                      {notificacao.horario ||
                        "Agora"}
                    </Text>

                  </View>

                </TouchableOpacity>

              )
            )

          )}

        </ScrollView>

      )}

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer
        telaAtiva="notificacao"
        navigation={navigation}
      />

    </SafeAreaView>
  );
}