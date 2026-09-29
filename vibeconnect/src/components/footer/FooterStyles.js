import { StyleSheet } from "react-native";

export default StyleSheet.create({

  footer: {
    height: 82,
    width: "100%",

    backgroundColor: "#FFFFFF",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderTopWidth: 1,
    borderTopColor: "#DDDDDD",

    paddingBottom: 5,
  },


  // Cada botão ocupa exatamente 25%
  botao: {
    width: "25%",
    height: 82,

    alignItems: "center",
    justifyContent: "center",
  },


  // Todos os ícones possuem a mesma caixa
  icone: {
    width: 28,
    height: 28,

    marginBottom: 3,
  },


  iconeAtivo: {
    opacity: 1,
  },


  texto: {
    fontSize: 13,
    color: "#39747A",

    fontFamily: "Poppins_400Regular",

    textAlign: "center",

    includeFontPadding: false,
  },

});