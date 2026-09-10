import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  footer: {
    height: 70,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#DDDDDD",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
  },

  icone: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },

  texto: {
    fontSize: 8,
    color: "#3A6B6F",
    marginTop: 3,
  },

});

export default styles;