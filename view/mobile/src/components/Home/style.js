// style.js

import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({

  /* CONTAINER */
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* HEADER */
  header: {
    width: "100%",
    padding: 10,
    marginTop: 40,
  },

  /* BARRA DE BUSCA */
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#523800",
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#fff",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,

    elevation: 2,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: "#222",
  },

  /* CARROSSEL */
  image: {
    width: width,
    height: 230,
    resizeMode: "cover",
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },

  dotActive: {
    width: 18,
    backgroundColor: "#790000",
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

  /* TITULO */
  tituloProdutos: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#222",
  },

  /* PRODUTOS */
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