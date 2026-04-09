import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1, // ocupa toda a tela disponível
        backgroundColor: '#eae4d8', // cor de fundo da tela (cinza claro)
    },

    header: {
        width: '100%', // ocupa toda a largura da tela
        padding: 10, // espaço interno (respiro em todos os lados)
        backgroundColor: '#eae4d8', // cor de fundo branca
        marginTop: 40, // empurra o header pra baixo (pra não ficar na status bar)
    },

    searchInput: {
        backgroundColor: '#eee', // fundo cinza claro do input
        padding: 10, // espaço interno (deixa o input maior)
        borderRadius: 8, // bordas arredondadas
    },

    
    titulo: {
        color: '#790000',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 70,
        marginBottom: 20,
    },

    grid: {
        marginTop: 40,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },

    card: {
        width: '49%', 
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 20,
        padding: 10,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardImage: {
        width: '100%',
        height: 350,
        borderRadius: 10,
        marginBottom: 10,
    },
    cardNome: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },


overlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'center',
  alignItems: 'center',
},

modalCard: {
  width: '90%',
  height: 300,
  flexDirection: 'row',
  backgroundColor: '#d8cbb3',
  borderRadius: 15,
  overflow: 'hidden',
},

modalImage: {
  width: '45%',
  height: '100%',
},

modalText: {
  flex: 1,
  padding: 15,
  justifyContent: 'center',
},

tituloModal: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#5a2d1a',
},

estacao: {
  marginTop: 5,
  fontSize: 14,
  fontWeight: '600',
  color: '#5a2d1a',
},

descricao: {
  marginTop: 10,
  fontSize: 13,
  lineHeight: 18,
  color: '#5a2d1a',
},

botao: {
  marginTop: 15,
  backgroundColor: '#5a2d1a',
  paddingVertical: 10,
  borderRadius: 6,
  alignItems: 'center',
},

botaoTexto: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 13,
},

closeInside: {
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 10,
  backgroundColor: 'rgba(255,255,255,0.7)',
  borderRadius: 20,
  width: 30,
  height: 30,
  justifyContent: 'center',
  alignItems: 'center',
},

closeText: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#5a2d1a',
},
});