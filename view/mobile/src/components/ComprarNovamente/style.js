import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  /* CONTAINER */
  container: {
    flex: 1,
    backgroundColor: "#eae4d8",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginVertical: 40,
  },

  emptyText: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    fontStyle: "italic",
  },

  /* HEADER */
  header: {
    width: "100%",
    // padding: 12,
    // paddingHorizontal: 16,
    // backgroundColor: "#eae4d8",
    justifyContent: "center",
    marginTop: "14%",
  },
  titleContainer: {
    width: "100%",
    backgroundColor: "#790000", // cor da faixa
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  // searchInput: {
  //   backgroundColor: '#fff',
  //   borderWidth: 1,
  //   borderColor: "#523800",
  //   padding: 12,
  //   paddingHorizontal: 16,
  //   borderRadius: 8,
  //   fontSize: 14,
  //   color: '#333',
  // },

  // /* CARROSSEL */
  // bannerImage: {
  //   width: width,
  //   height: 220,
  //   resizeMode: "cover",
  // },

  // pagination: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: 10,
  //   marginBottom: 5,
  // },

  // dot: {
  //   width: 8,
  //   height: 8,
  //   borderRadius: 4,
  //   backgroundColor: "#ccc",
  //   marginHorizontal: 4,
  // },

  // dotAtivo: {
  //   width: 18,
  //   backgroundColor: "#790000",
  //   borderRadius: 4,
  // },

  /* CATEGORIAS */
  // categorias: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   paddingHorizontal: 20,
  //   marginTop: 25,
  // },

  // circulo: {
  //   width: 60,
  //   height: 60,
  //   borderRadius: 30,
  //   overflow: 'hidden',
  //   borderWidth: 2,
  //   borderColor: '#eae4d8',
  //   elevation: 2,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 1 },
  //   shadowOpacity: 0.15,
  //   shadowRadius: 2,
  // },

  // imgCirculo: {
  //   width: '100%',
  //   height: '100%',
  //   resizeMode: 'cover',
  // },

  /* AGENDAMENTO */
  // agendamento: {
  //   backgroundColor: '#DFCAA4',
  //   padding: 20,
  //   paddingVertical: 25,
  //   alignItems: 'center',
  //   marginTop: 25,
  // },

  titulo: {
    color: "#fff4f4",
    fontSize: 20,
    fontWeight: "bold",
    // marginBottom: 10,
    letterSpacing: 2,
  },

  subtitulo: {
    color: "#790000",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 18,
    paddingHorizontal: 10,
  },

  botao: {
    borderWidth: 1,
    backgroundColor: "#790000",
    borderColor: "#790000",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
  },

  // textoBotao: {
  //   color: '#fff',
  //   fontSize: 12,
  //   fontWeight: '600',
  //   letterSpacing: 0.5,
  // },//não existe

  /* TITULO */
  // tituloProdutos: {
  //   fontFamily: 'Aboreto_400Regular',
  //   marginTop: 20,
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   marginBottom: 16,
  //   textAlign: 'center',
  //   color: '#333',
  //   letterSpacing: 1,
  // },//não existe

  /* PRODUTOS */
  // produtos: {
  //   marginTop: 20,
  //   paddingLeft: 16,
  // }, //não existe

  // card: {
  //   width: 170,
  //   marginBottom: 20,
  //   marginLeft: "6%",
  // },

  // cardImage: {
  //   width: 170,
  //   height: 200,
  //   borderRadius: 3,
  //   backgroundColor: "#f5f5f5",
  // },

  // cardNome: {
  //   marginTop: 6,
  //   fontSize: 14,
  //   fontWeight: "500",
  //   marginHorizontal: 12,
  //   color: "#333",
  // },

  // cardPreco: {
  //   fontSize: 13,
  //   color: "#777",
  //   marginHorizontal: 12,
  //   marginTop: 2,
  // },

  // linhaCards: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   gap: 20,
  //   alignItems: "center",
  // }, //não existe

  dressContainer: {
    paddingHorizontal: 10,
  },
  dressCard: {
    marginTop: 30,
    width: "30%",
    marginHorizontal: "10%",
    marginBottom: 25,
  },

  dressImage: {
    marginLeft: -25,
    width: "140%",
    height: 260,
    borderRadius: 10,
    marginBottom: 5,
  },

  dressName: {
    marginRight: 0,
    fontSize: 14,
    marginBottom: 3,
  },

  dressPrice: {
    marginRight: 40,
    fontSize: 12,
    color: "#777",
  },
});
