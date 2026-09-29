import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 40,
  },

  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 40,
  },

  // =====================================================
  // LOGO
  // =====================================================

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

  // =====================================================
  // CARD
  // =====================================================

  postCard: {
    width: "100%",
    backgroundColor: "#E4F5FC",
    borderRadius: 15,
    marginBottom: 16,
    overflow: "hidden",
    paddingTop: 14,
    paddingHorizontal: 14,
    paddingBottom: 12,
  },

  // =====================================================
  // CABEÇALHO
  // =====================================================

  postHeader: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
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

  // =====================================================
  // TRÊS PONTOS
  // =====================================================

  moreButton: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  pontosIcon: {
    width: 20,
    height: 20,
  },

  // =====================================================
  // IMAGEM
  // =====================================================

  postImage: {
    width: "100%",
    height: 220,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 0,
  },

  // =====================================================
  // TEXTO
  // =====================================================

  postText: {
    color: "#161616",
    fontSize: 14,
    lineHeight: 21,
    fontFamily: "Poppins_400Regular",
    marginTop: 12,
  },

  hashtags: {
    marginTop: 5,
    color: "#39747A",
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
  },

  // =====================================================
  // AÇÕES
  // =====================================================

  postActions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
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
    width: 25,
    height: 25,
  },

  actionIconActive: {
    opacity: 0.65,
  },

  actionNumber: {
    color: "#430019",
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
    marginLeft: 3,
  },

  // =====================================================
  // CARREGANDO
  // =====================================================

  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },

  emptyContainer: {
    alignItems: "center",
    paddingTop: 80,
  },

  emptyText: {
    color: "#777777",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },

  // =====================================================
  // MODAL
  // =====================================================

  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  modalComentario: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 30,
  },

  modalTitulo: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#430019",
    marginBottom: 15,
  },

  inputComentario: {
    width: "100%",
    minHeight: 100,
    maxHeight: 150,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingTop: 12,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#333333",
    textAlignVertical: "top",
  },

  modalBotoes: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 15,
  },

  botaoCancelar: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },

  textoCancelar: {
    color: "#777777",
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },

  botaoEnviar: {
    backgroundColor: "#FFE995",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },

  textoEnviar: {
    color: "#430019",
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },

});

export default styles;