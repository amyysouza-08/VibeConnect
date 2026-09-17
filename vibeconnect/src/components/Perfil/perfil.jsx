import React, {
  useCallback,
  useState,
} from "react";

import {
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";

import {
  useFocusEffect,
} from "@react-navigation/native";

import Header from "../Header/header";
import Info from "../Info/info";
import Footer from "../footer/Footer";

import {
  getUsuario,
  obterUsuarioLogado,
} from "../../api/api";

import styles from "./perfilStyle";

export default function Perfil({ navigation }) {

  const [usuario, setUsuario] =
    useState(null);

  const [carregando, setCarregando] =
    useState(true);

  const carregarUsuario = async () => {

    try {

      setCarregando(true);

      const logado =
        obterUsuarioLogado();

      const dados =
        await getUsuario(logado?.id);

      setUsuario(dados);

    } catch (error) {

      Alert.alert(
        "Erro",
        error.message
      );

    } finally {
      setCarregando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarUsuario();
    }, [])
  );

  return (
    <View style={styles.container}>

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

        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              styles.scrollContent
            }
          >

            <Header usuario={usuario} />

            <Info
              usuario={usuario}
              navigation={navigation}
            />

            <View style={styles.abas}>

              <Image
                source={require("../../../assets/grade.png")}
                style={styles.iconeAba}
              />

              <Image
                source={require("../../../assets/video.png")}
                style={styles.iconeAba}
              />

              <Image
                source={require("../../../assets/salvar-perfil.png")}
                style={styles.iconeAba}
              />

            </View>

          </ScrollView>

          <Footer
            telaAtiva="perfil"
            navigation={navigation}
          />
        </>

      )}

    </View>
  );
}