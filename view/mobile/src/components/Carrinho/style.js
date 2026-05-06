import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  body: {
    flex: 1,
    backgroundColor: "#eae4d8",
    paddingTop: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    gap: 10,
    marginTop: 25,
  },


  title: {
    fontSize: 25,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 12,
    padding: 10,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  image: {
    width: 90,
    height: 150,
    borderRadius: 8,
  },

  info: {
    flex: 1,
    marginLeft: 10,
    marginTop: 30,
  },

  nome: {
    fontSize: 17,
    fontWeight: "bold",
  },

  preco: {
    fontSize: 15,
    color: "green",
    marginTop: 2,
  },

  controls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

btn: {
  width: 25,
  height: 25,
  backgroundColor: "#f2f2f2",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "#ddd"
},

btnText: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#333"
},
  qtd: {
    marginHorizontal: 20,
  },

  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  total: {
    fontSize: 18,
    fontWeight: "bold",
  },

  checkout: {
    backgroundColor: "#790000",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },

  checkoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
tamanhoContainer: {
  flexDirection: "row",
  marginTop: 8
},

tamanhoBtn: {
  width: 25,
  height: 25,
  borderRadius: 50,
  borderWidth: 1,
  borderColor: "#ccc",
  marginRight: 8,
  justifyContent: "center",
  alignItems: "center"
},

tamanhoSelecionado: {
  backgroundColor: "#000",
  borderColor: "#000"
},

tamanhoTexto: {
  fontSize: 13
},

tamanhoTextoSelecionado: {
  color: "#fff",
  fontWeight: "bold"
},

linha: {
  height: 2,
  backgroundColor: "black",
  marginTop: 30,
  width: "100%"
},

emptyContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 20
},

emptyText: {
  fontSize: 18,
  fontWeight: "bold",
  marginTop: 10,
  color: "#333"
},

emptySubText: {
  fontSize: 14,
  color: "#888",
  marginTop: 5,
  textAlign: "center"
}

});