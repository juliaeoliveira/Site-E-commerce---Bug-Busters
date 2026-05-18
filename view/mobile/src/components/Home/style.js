// style.js

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* HEADER */
  header: {
    width: "100%",
    padding: 10,
    backgroundColor: "#eae4d8",
    marginTop: 40,
  },

  searchInput: {
    backgroundColor: "#eee",
    borderWidth: 1,
    borderColor: "#523800",
    padding: 10,
    borderRadius: 8,
    fontSize: 14,
  },

  /* BANNER */
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },

  /* CATEGORIAS */
  categorias: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    paddingHorizontal: 10,
  },

  circulo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
  },

  imgCirculo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  /* AGENDAMENTO */
  agendamento: {
    backgroundColor: "#DFCAA4",
    padding: 20,
    alignItems: "center",
    marginTop: 25,
  },

  titulo: {
    color: "#790000",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitulo: {
    color: "#790000",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 18,
  },

  botao: {
    borderWidth: 1,
    backgroundColor: "#790000",
    borderColor: "#790000",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 5,
  },

  textoBotao: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  /* TITULO PRODUTOS */
  tituloProdutos: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#222",
  },

  /* CARDS */
  card: {
    width: 170,
    marginBottom: 20,
    marginLeft: "6%",
  },

  cardImage: {
    width: 170,
    height: 200,
    borderRadius: 5,
    resizeMode: "cover",
  },

  cardNome: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    marginHorizontal: 4,
    color: "#222",
  },

  cardPreco: {
    fontSize: 13,
    color: "#777",
    marginHorizontal: 4,
    marginTop: 2,
  },

});