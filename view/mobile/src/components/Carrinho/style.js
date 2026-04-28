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
    width: 60,
    height: 60,
    borderRadius: 8,
  },

  info: {
    flex: 1,
    marginLeft: 10,
  },

  nome: {
    fontSize: 16,
    fontWeight: "bold",
  },

  preco: {
    color: "green",
    marginTop: 2,
  },

  controls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  btn: {
    width: 30,
    height: 30,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },

  qtd: {
    marginHorizontal: 10,
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

});