import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    paddingTop: 15,
    paddingBottom: 15,
  },

  topo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  fotoPerfil: {
    width: 82,
    height: 82,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#350616",
  },

  estatisticas: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: 15,
  },

  estatistica: {
    alignItems: "center",
  },

  numero: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#350616",
  },

  label: {
    fontFamily: "Poppins_400Regular",
    fontSize: 9,
    color: "#555555",
    marginTop: 3,
  },

  nome: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#350616",
    marginTop: 3,
  },

  bio: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "#444444",
    marginTop: 5,
  },

  localizacaoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  localizacaoIcone: {
    width: 17,
    height: 17,
    marginRight: 6,
  },

  localizacao: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "#777777",
  },

  botao: {
    height: 34,
    backgroundColor: "#E0F3FA",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  textoBotao: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "#555555",
  },

});

export default styles;