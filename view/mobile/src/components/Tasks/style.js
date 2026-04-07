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

});