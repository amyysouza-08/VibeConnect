import React, {
  useEffect,
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

import styles from "./NotificacaoStyle";

import Footer from "../footer/Footer";

import {
  getNotificacoes,
} from "../../api/api";

const icones = {
  curtida: require("../../../assets/curtida-preenchida.png"),
  comentario: require("../../../assets/comentario-not.png"),
  seguidor: require("../../../assets/follow.png"),
  padrao: require("../../../assets/notificacao.png"),
};

function iconePorTipo(tipo) {
  return icones[tipo] || icones.padrao;
}

export default function Notificacao({
  navigation,
}) {

  const [notificacoes, setNotificacoes] =
    useState([]);

  const [carregando, setCarregando] =
    useState(true);

  useEffect(() => {
    carregarNotificacoes();
  }, []);

  const carregarNotificacoes = async () => {

    try {

      setCarregando(true);

      const dados =
        await getNotificacoes();

      setNotificacoes(dados);

    } catch (error) {

      Alert.alert(
        "Erro",
        error.message
      );

    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top"]}
    >

      <View style={styles.header}>

        <Text style={styles.titulo}>
          Notificações
        </Text>

      </View>

      {carregando ? (

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          <ActivityIndicator />

        </View>

      ) : (

        <ScrollView
          style={styles.lista}
          contentContainerStyle={
            styles.listaConteudo
          }
          showsVerticalScrollIndicator={false}
        >

          {notificacoes.map(
            (notificacao) => (

              <TouchableOpacity
                key={notificacao.id}
                style={styles.card}
                activeOpacity={0.8}
              >

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
                  />

                </View>

                <View
                  style={styles.conteudo}
                >

                  <Text
                    style={styles.mensagem}
                  >

                    <Text
                      style={styles.nome}
                    >
                      {notificacao.nome}
                    </Text>

                    {" "}
                    {notificacao.mensagem}

                  </Text>

                  <Text
                    style={styles.horario}
                  >
                    {notificacao.horario}
                  </Text>

                </View>

              </TouchableOpacity>

            )
          )}

        </ScrollView>

      )}

      <Footer
        telaAtiva="notificacao"
        navigation={navigation}
      />

    </SafeAreaView>
  );
}