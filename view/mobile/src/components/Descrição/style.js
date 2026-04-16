import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
    
  },

  icon: {
    fontSize: 20,
    backgroundColor: "#eee",
    padding: 5,
    borderRadius: 20,
  },

  image: {
    width: "100%",
    height: 450,
    marginTop: 30,
  },


  

  info: {

    padding: 20,
  },

  nome: {
    fontSize: 20,
    fontWeight: "bold",
  },

  categoria: {
    color: "#888",
    marginBottom: 10,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  preco: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E53935",
  },

  oldPrice: {
    textDecorationLine: "line-through",
    color: "#999",
    marginLeft: 10,
  },

  discount: {
    color: "#E53935",
    marginLeft: 10,
  },

  tabs: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#eee",
    borderRadius: 20,
    padding: 5,
  },

  tabBtn: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 20,
  },

  tabActive: {
    backgroundColor: "#000",
  },

  desc: {
    marginTop: 15,
    color: "#555",
  },

  botao: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
});