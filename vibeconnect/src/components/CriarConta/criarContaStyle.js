import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 33,
    justifyContent: "center",
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 22,
  },

  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 3,
  },

  nomeLogo: {
    fontFamily: "Poppins_700Bold",
    fontSize: 35,
  },

  vibe: {
    color: "#350616",
  },

  connect: {
    color: "#C1DBE8",
  },

  titulo: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: "#1A1A1A",
    marginBottom: 12,
  },

  campo: {
    marginBottom: 12,
  },

  label: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#1A1A1A",
    marginBottom: 5,
  },

  input: {
    height: 43,
    backgroundColor: "#E7F6FF",
    borderRadius: 8,
    paddingHorizontal: 14,
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "#1A1A1A",
  },

  botaoCriar: {
    height: 48,
    backgroundColor: "#FFF1B5",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 7,
  },

  textoBotao: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#350616",
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },

  textoLogin: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#999999",
  },

  entrar: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#350616",
    textDecorationLine: "underline",
    marginLeft: 4,
  },
});

export default styles;