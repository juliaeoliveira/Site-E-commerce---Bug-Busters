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
    fontSize: 30,
    backgroundColor: "#eee",
    padding: 5,
    borderRadius: 20,
  },

  image: {
    height: 550,
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
    backgroundColor: "#790000",
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
    backgroundColor: "#790000",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },

  sectionTitle: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 16,
  },

  sizes: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  sizeBtn: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  sizeSelected: {
    backgroundColor: "#790000",
    borderColor: "#790000",
  },

  sizeText: {
    color: "#333",
  },

  sizeTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },

  
  dots: {
    position: "absolute",
    bottom: 15,
    alignSelf: "center",
    flexDirection: "row",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginHorizontal: 5,
  },

  dotActive: {
    backgroundColor: "#790000",
    width: 10,
    height: 10,
  },

 
  arrowLeft: {
    position: "absolute",
    left: 10,
    top: "45%",
  },

  arrowRight: {
    position: "absolute",
    right: 10,
    top: "45%",
  },

  arrowText: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",

    
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});