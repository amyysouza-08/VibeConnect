import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 70,
  },

  logoText: {
    fontSize: 29,
    lineHeight: 36,
    fontFamily: "Poppins_700Bold",
    fontWeight: "700",
    marginLeft: 3,
    marginBottom: 8,
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

  postCard: {
    width: 342,
    height: 170,
    backgroundColor: "#E7F6FF",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingTop: 13,
    paddingBottom: 12,
  },

  postHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#A9A9A9",
  },

  userTexts: {
    marginLeft: 9,
    justifyContent: "center",
  },

  userName: {
    color: "#430019",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "Poppins_500Medium",
  },

  postTime: {
    color: "#A8A8A8",
    fontSize: 10,
    lineHeight: 15,
    fontFamily: "Poppins_400Regular",
  },

  moreButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -4,
  },

  pontosIcon: {
    width: 20,
    height: 20,
  },

  postText: {
  color: "#161616",
  fontSize: 14,
  lineHeight: 21,
  fontFamily: "Poppins_400Regular",
  marginTop: 12,
},

  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },

  leftActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },

  actionIcon: {
    width: 22,
    height: 22,
  },

  actionNumber: {
    color: "#430019",
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
    marginLeft: 3,
  },

});

export default styles;