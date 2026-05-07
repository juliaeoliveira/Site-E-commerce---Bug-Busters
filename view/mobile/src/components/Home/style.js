// style.js

import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({

  /* CONTAINER */
  container: {
    flex: 1,
  },

  /* HEADER */
  header: {
    width: '100%',
    padding: 10,
    backgroundColor: '#eae4d8',
    marginTop: 40,
  },

  searchInput: {
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: "#523800",
    padding: 10,
    borderRadius: 8,
  },

  /* CARROSSEL */
  bannerImage: {
    width: width,
    height: 220,
    resizeMode: "cover",
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },

  dotAtivo: {
    width: 18,
    backgroundColor: "#790000",
  },

  /* CATEGORIAS */
  categorias: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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

  /* AGENDAMENTO */
  agendamento: {
    backgroundColor: '#DFCAA4',
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

  /* TITULO */
  tituloProdutos: {
    fontFamily: 'Aboreto_400Regular',
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    marginRight: 10,
  },

  /* PRODUTOS */
  produtos: {
    marginTop: 20,
    paddingLeft: 16,
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

});