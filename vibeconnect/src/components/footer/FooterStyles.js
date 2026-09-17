import { StyleSheet } from "react-native";

export default StyleSheet.create({
  footer: {
    height: 82,
    backgroundColor: "#FFFFFF",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    borderTopWidth: 1,
    borderTopColor: "#DDDDDD",

    paddingBottom: 5,
  },

  botao: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },

  icone: {
    width: 34,
    height: 34,

    marginBottom: 2,
  },

  iconeAtivo: {
    opacity: 1,
  },

  texto: {
    fontSize: 17,
    color: "#39747A",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
});