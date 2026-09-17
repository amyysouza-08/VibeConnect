import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    height: 60,
    paddingHorizontal: 15,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  nomeUsuario: {
    fontSize: 15,
    fontWeight: "600",
    color: "#350616",
    fontFamily: "Poppins_400Regular"
  },

  icone: {
    width: 23,
    height: 23,
    resizeMode: "contain",
  },

});

export default styles;