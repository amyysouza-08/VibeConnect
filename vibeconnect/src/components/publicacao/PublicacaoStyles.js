import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    /* =========================
       TELA
    ========================= */

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    keyboardArea: {
        flex: 1,
    },

    scroll: {
        flex: 1,
    },

    scrollContent: {
        paddingHorizontal: 18,
        paddingTop: 17,
        paddingBottom: 80,
    },


    /* =========================
       CABEÇALHO
    ========================= */

    header: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 18,
    },

    backButton: {
        width: 30,
        height: 35,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    backIcon: {
        width: 35,
        height: 35,
    },

    menuButton: {
        width: 30,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },

    menuIcon: {
        width: 23,
        height: 23,
    },


    /* =========================
       USUÁRIO
    ========================= */

    userContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },

    userInfo: {
        flex: 1,
        minWidth: 0,
        marginLeft: 10,
        justifyContent: 'center',
    },

    avatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#AAAAAA',
    },

    username: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14,
        color: '#5C0F2D',
        lineHeight: 18,
        flexShrink: 0,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 1,
    },

    locationIcon: {
        width: 15,
        height: 15,
        marginRight: 4,
        resizeMode: 'contain',
    },

    locationText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 11,
        color: '#777477',
        lineHeight: 15,
    },


    /* =========================
       FOTO
    ========================= */

    postImage: {
        width: '100%',
        height: 300,
        backgroundColor: '#EEEEEE',
        borderRadius: 15,
        overflow: 'hidden',
    },

    /* =========================
       AÇÕES
    ========================= */

    actionsContainer: {
        width: '100%',
        height: 42,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 3,
    },

    actionsLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    action: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 11,
    },

    actionIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },

    shareIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },

    actionNumber: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 11,
        color: '#555555',
        marginLeft: 4,
    },


    /* =========================
       SALVAR
    ========================= */

    saveButton: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },

    saveIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },


    /* =========================
       LEGENDA
    ========================= */

    captionContainer: {
        marginTop: 0,
    },

    caption: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 13,
        color: '#555555',
        lineHeight: 19,
    },

    captionUsername: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 13,
        color: '#5C0F2D',
    },

    hashtags: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 11,
        color: '#777477',
        marginTop: 1,
    },


    /* =========================
       COMENTÁRIOS
    ========================= */

    allCommentsButton: {
        marginTop: 14,
        marginBottom: 10,
    },

    allComments: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        color: '#777477',
    },

    commentContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 11,
        marginBottom: 2,
    },

    commentAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#AAAAAA',
    },

    commentContent: {
        flex: 1,
        marginLeft: 10,
        paddingTop: 1,
    },

    commentText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        color: '#555555',
        lineHeight: 18,
    },

    commentUsername: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 12,
        color: '#5C0F2D',
    },

    commentTime: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 10,
        color: '#777477',
        marginTop: 1,
    },


    /* =========================
       CAMPO DE COMENTÁRIO
    ========================= */

    commentInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 3,
    },

    commentInputAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#AAAAAA',
        marginRight: 10,
    },

    commentInputContainer: {
        flex: 1,
        height: 46,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E4F4FC',
        borderRadius: 23,
        paddingLeft: 15,
        paddingRight: 6,
    },

    commentInput: {
        flex: 1,
        fontFamily: 'Poppins_400Regular',
        fontSize: 11,
        color: '#397179',
        paddingVertical: 0,
    },

    sendButton: {
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
    },

    sendIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },

});

export default styles;