import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f3eb",
    padding: 15,
  },

 
  card: {
    backgroundColor: "#fff",
    padding: 15,
    margimTop: 50, 
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  titulo: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },

  /* 🔗 LINK */
  link: {
    color: "#790000",
    marginTop: 10,
    fontWeight: "bold",
  },

  /* 📝 FORMULÁRIO */
  input: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },

  botaoSalvar: {
    backgroundColor: "#790000",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  /* 💳 PAGAMENTO */
  opcao: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginTop: 8,
  },

  opcaoSelecionada: {
    borderColor: "#790000",
    backgroundColor: "#f2e5e5",
  },

  /* 🛒 ITENS */
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  /* 💰 TOTAL */
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  /* 🔥 BOTÃO FINAL */
  botao: {
    backgroundColor: "#790000",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});