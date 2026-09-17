
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 25,
  },

  // CABEÇALHO

  header: {
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
  },

  botaoVoltar: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },

  seta: {
    fontFamily: "Poppins_400Regular",
    fontSize: 36,
    color: "#430019",
    lineHeight: 36,
  },

  titulo: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#430019",
  },

  espaco: {
    width: 30,
  },

  // FOTO

  fotoContainer: {
    height: 170,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 20,
  },

  foto: {
    width: 140,
    height: 140,
    borderRadius: 73,
    resizeMode: "cover",
  },

  camera: {
    position: "absolute",
    right: 98,
    bottom: 3,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3A6B6F",
    alignItems: "center",
    justifyContent: "center",
  },

  cameraIcone: {
    width: 23,
    height: 23,
    resizeMode: "contain",
  },

  // CAMPOS

  campo: {
    marginBottom: 10,
  },

  label: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: "#430019",
    marginBottom: 5,
  },

  input: {
    width: "100%",
    height: 45,
    backgroundColor: "#E7F6FF",
    borderRadius: 10,
    paddingHorizontal: 18,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#1A1A1A",
  },

  inputBio: {
    height: 85,
    paddingTop: 12,
    paddingBottom: 25,
    textAlignVertical: "top",
  },

  contador: {
    position: "absolute",
    right: 15,
    bottom: 10,
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    color: "#575757",
  },

  // BOTÃO

  botaoSalvar: {
    width: "100%",
    height: 48,
    backgroundColor: "#FFF1B5",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  textoBotao: {
    fontFamily: "Poppins_700Bold",
    fontSize: 13,
    color: "#350616",
  },

});

export default styles;