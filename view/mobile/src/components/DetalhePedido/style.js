import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F6F2", // Bege clarinho de fundo
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F6F2",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#800F0F", // Vinho extraído do botão da imagem
    marginBottom: 5,
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EFE1D1", // Bege médio da seção de agendamentos
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: "#4A4A4A",
    fontWeight: "500",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#800F0F",
    paddingLeft: 10,
  },
  itemCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#D9C5B2", // Tom de dourado/nude das bordas
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  nomeProduto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#800F0F",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    color: "#777",
  },
  value: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  subtotal: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#43A047", // Mantendo o verde para valores positivos
  },
  totalContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#D9C5B2",
    alignItems: "flex-end",
    marginTop: 10,
  },
  totalText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#800F0F",
  },
});