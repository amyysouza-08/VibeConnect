import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingTop: 40,
  },

  scrollContent: {
    paddingTop: 10,
    paddingBottom: 20,
  },

  // ===================================================
  // ABAS
  // ===================================================

  abas: {
    height: 60,

    borderTopWidth: 1,
    borderBottomWidth: 1,

    borderColor: "#DDDDDD",

    flexDirection: "row",

    justifyContent: "space-around",

    alignItems: "center",
  },

  // Cada aba ocupa o mesmo espaço
  aba: {
    flex: 1,

    height: 60,

    justifyContent: "center",

    alignItems: "center",
  },

  // ===================================================
  // GRADE DO FIGMA
  // ===================================================

  iconeAba: {
    width: 24,
    height: 24,

    resizeMode: "contain",

    alignSelf: "center",
  },

  // ===================================================
  // PUBLICAÇÕES
  // ===================================================

  publicacoes: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between",

    paddingHorizontal: 5,

    paddingTop: 10,
  },

  publicacao: {
    width: "32%",

    height: 100,

    backgroundColor: "#FFF1B5",

    marginBottom: 5,
  },

});

export default styles;