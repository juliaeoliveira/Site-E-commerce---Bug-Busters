import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  // BARRA DE PESQUISA
  container: {
    flex: 1, // ocupa toda a tela disponível
    
  },

  header: {
    width: '100%', // ocupa toda a largura da tela
    padding: 10, // espaço interno (respiro em todos os lados)
    backgroundColor: '#eae4d8', // cor de fundo branca
    marginTop: 40, // empurra o header pra baixo (pra não ficar na status bar)
  },

  searchInput: {
    backgroundColor: '#eee', // fundo cinza claro do input
    borderWidth: 1,
    borderColor: "#523800",
    padding: 10, // espaço interno (deixa o input maior)
    borderRadius: 8, // bordas arredondadas
  },
  // BANNER
  image: {
    width: '100%',
    height: 200,
  },
  // CATEGORIAS BOLINHAS
  categorias: {
    flexDirection: 'row', // deixa lado a lado
    justifyContent: 'space-around', // distribui bem na tela
    marginTop: 25,
  },
  circulo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  imgCirculo: {
    width: '100%',
    height: '100%',
  },
  // BANNER AGENDAMENTOS
  agendamento: {
    backgroundColor: '#DFCAA4', // cor parecida com a da imagem
    padding: 20,
    alignItems: 'center',
    marginTop: 25,
  },

  titulo: {
    color: '#790000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitulo: {
    color: '#790000',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 15,
  },

  botao: {
    borderWidth: 1,
    backgroundColor: "#790000",
    borderColor: '#790000',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 4,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 12,
  },

  // PRODUTOS
  produtos: {
    marginTop: 20,
    paddingLeft: 16,
  },

  tituloProdutos: {
    fontFamily: 'Aboreto_400Regular',
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    marginRight: 10,

  },

  card: {
    width: 170,
    marginBottom: 20,
    marginLeft: "6%",
  },

  cardImage: {
    width: 170,
    height: 200,
    borderRadius: 3,


  },

  cardNome: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 12,
  },

  cardPreco: {
    fontSize: 13,
    color: '#777',
    marginHorizontal: 12,
  },
  linhaCards: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center',
  },
  


},
);
