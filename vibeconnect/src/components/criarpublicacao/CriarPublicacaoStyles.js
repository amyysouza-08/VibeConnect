import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 0,
  },

  // HEADER
  header: {
    width: "100%",
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },

  botaoVoltar: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
    zIndex: 2,
  },

  setaVoltar: {
    width: 33,
    height: 33,
  },

  titulo: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    color: "#430019",
  },

  botaoPublicar: {
    width: 78,
    height: 30,
    borderRadius: 16,
    backgroundColor: "#FFE995",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    zIndex: 2,
  },

  textoPublicar: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "#555555",
  },

  // FOTO / VÍDEO
  areaMidia: {
    width: "100%",
    height: 243,
    borderWidth: 1,
    borderColor: "#548A98",
    borderRadius: 10,
    backgroundColor: "#E4F5FC",
    justifyContent: "center",
    alignItems: "center",
  },

  iconeImagem: {
    width: 50,
    height: 45,
    marginBottom: 9,
  },

  textoMidia: {
    fontFamily: "Poppins_400Regular",
    fontSize: 17,
    color: "#397179",
    textAlign: "center",
  },

  // LEGENDA
  legendaContainer: {
    width: "100%",
    height: 120,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 11,
    marginTop: 24,
    position: "relative",
  },

  inputLegenda: {
    flex: 1,
    paddingHorizontal: 11,
    paddingTop: 11,
    paddingBottom: 25,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#444444",
  },

  contador: {
    position: "absolute",
    right: 10,
    bottom: 7,
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "#777777",
  },

  // OPÇÕES
  opcao: {
    width: "100%",
    height: 59,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 11,
    marginTop: 15,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  iconeOpcao: {
    width: 25,
    height: 25,
    marginRight: 11,
  },

  textoOpcao: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#777777",
  },

  todos: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#777777",
    marginRight: 12,
  },

  // SETA DIREITA
  chevron: {
    width: 11,
    height: 20,
    justifyContent: "center",
  },

  chevronLinha1: {
    position: "absolute",
    width: 10,
    height: 2,
    backgroundColor: "#777777",
    borderRadius: 2,
    transform: [{ rotate: "45deg" }],
    top: 6,
  },

  chevronLinha2: {
    position: "absolute",
    width: 10,
    height: 2,
    backgroundColor: "#777777",
    borderRadius: 2,
    transform: [{ rotate: "-45deg" }],
    bottom: 6,
  },
});

export default styles;