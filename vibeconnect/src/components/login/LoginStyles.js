import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

  /*
  ========================================
  TELA
  ========================================
  */

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",

    paddingHorizontal: 33,
    paddingTop: 120,
  },


  /*
  ========================================
  LOGO
  ========================================
  */

  logo: {
    width: 125,
    height: 125,

    marginBottom: 1,
  },


  /*
  ========================================
  NOME VIBECONNECT
  ========================================
  */

  logoText: {
    width: "100%",

    textAlign: "center",

    fontSize: 37,
    lineHeight: 42,

    fontFamily: "Poppins_700Bold",
    fontWeight: "700",
  },

  vibe: {
    color: "#430019",

    fontFamily: "Poppins_700Bold",
    fontWeight: "700",
  },

  connect: {
    color: "#B8D6E8",

    fontFamily: "Poppins_700Bold",
    fontWeight: "700",
  },


  /*
  ========================================
  FRASE
  ========================================
  */

  subtitle: {
    width: "100%",

    textAlign: "center",

    color: "#430019",

    fontSize: 14,
    lineHeight: 21,

    marginTop: 2,

    fontFamily: "Poppins_400Regular",
  },


  /*
  ========================================
  ESPAÇO
  ========================================
  */

  space: {
    height: 31,
  },


  /*
  ========================================
  ÍCONES
  ========================================
  */

  icon: {
    width: 22,
    height: 22,

    marginRight: 10,
  },

  eyeButton: {
    width: 30,
    height: 30,

    justifyContent: "center",
    alignItems: "center",
  },

  eyeIcon: {
    width: 22,
    height: 22,
  },


  /*
  ========================================
  CAMPOS DE TEXTO
  ========================================
  */

  inputContainer: {
    width: "100%",
    height: 42,

    backgroundColor: "#E7F6FF",

    borderRadius: 10,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 15,

    marginBottom: 11,
  },

  input: {
    flex: 1,

    height: "100%",

    fontSize: 14,

    color: "#1A1A1A",

    fontFamily: "Poppins_400Regular",
  },


  /*
  ========================================
  BOTÃO ENTRAR
  ========================================
  */

  loginButton: {
    width: "100%",
    height: 43,

    backgroundColor: "#430019",

    borderRadius: 24,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 3,
  },

  loginButtonText: {
    color: "#FFFFFF",

    fontSize: 14,

    fontFamily: "Poppins_500Medium",
  },


  /*
  ========================================
  ESQUECEU SENHA
  ========================================
  */

  forgotButton: {
    marginTop: 10,

    alignItems: "center",
  },

  forgotText: {
    color: "#430019",

    fontSize: 13,

    fontFamily: "Poppins_700Bold",
  },


  /*
  ========================================
  DIVISOR "OU"
  ========================================
  */

  dividerContainer: {
    width: "100%",

    flexDirection: "row",
    alignItems: "center",

    marginVertical: 19,
  },

  line: {
    flex: 1,

    height: 1,

    backgroundColor: "#E0E0E0",
  },

  orText: {
    color: "#C8C8C8",

    fontSize: 13,

    marginHorizontal: 14,

    fontFamily: "Poppins_400Regular",
  },


  /*
  ========================================
  CRIAR CONTA
  ========================================
  */

  createButton: {
    width: "100%",
    height: 43,

    backgroundColor: "#FFF0B3",

    borderRadius: 24,

    justifyContent: "center",
    alignItems: "center",
  },

  createButtonText: {
    color: "#430019",

    fontSize: 14,

    fontFamily: "Poppins_500Medium",
  },


  /*
  ========================================
  FINAL
  ========================================
  */

  registerContainer: {
    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",

    marginTop: 9,
  },

  registerText: {
    color: "#999999",

    fontSize: 13,

    fontFamily: "Poppins_400Regular",
  },

  registerLink: {
    color: "#430019",

    fontSize: 13,

    fontFamily: "Poppins_700Bold",

    textDecorationLine: "underline",
  },

});


export default styles;