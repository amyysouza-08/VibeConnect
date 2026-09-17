import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
  },

  scrollContent: {
    paddingTop: 10,
    paddingBottom: 10,
  },

  abas: {
    height: 60,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#DDDDDD",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  iconeAba: {
    width: 23,
    height: 23,
    resizeMode: "contain",
  },

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