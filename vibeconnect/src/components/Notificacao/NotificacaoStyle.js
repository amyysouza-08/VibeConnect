import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    height: 82,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },

  titulo: {
    fontSize: 23,
    fontWeight: '700',
    color: '#350616',
     fontFamily: "Poppins_700Regular",
  },

  lista: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  listaConteudo: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
  },

  card: {
    width: '100%',
    minHeight: 88,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },

  iconeContainer: {
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  iconeImagem: {
    width: 31,
    height: 31,
    resizeMode: 'contain',
  },

  conteudo: {
    flex: 1,
    justifyContent: 'center',
  },

  mensagem: {
    fontSize: 16,
    lineHeight: 22,
    color: '#555555',
    fontWeight: '400',
     fontFamily: "Poppins_400Regular",
  },

  nome: {
    fontWeight: '700',
    color: '#202124',
     fontFamily: "Poppins_700Regular",
  },

  horario: {
    marginTop: 2,
    fontSize: 15,
    color: '#8E8E93',
     fontFamily: "Poppins_400Regular",
  },

});

export default styles;