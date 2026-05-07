// style.js

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f8f3eb",
    padding: 15,
  },

  /* 🔙 VOLTAR */
  voltarContainer: {
    marginTop: 50,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  voltar: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#790000",
  },

  /* 📦 CARD */
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,

    elevation: 2,
  },

  titulo: {
    fontWeight: "bold",
    marginBottom: 15,
    fontSize: 18,
    color: "#222",
  },

  /* 🔗 LINK */
  link: {
    color: "#790000",
    marginTop: 10,
    fontWeight: "bold",
  },

  /* 📝 INPUT */
  input: {
    backgroundColor: "#f1f1f1",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 15,
  },

  botaoSalvar: {
    backgroundColor: "#790000",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },

  /* 💳 PAGAMENTO */
  opcao: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    marginTop: 10,
  },

  opcaoSelecionada: {
    borderColor: "#790000",
    backgroundColor: "#f3e4e4",
  },

  opcaoEsquerda: {
    flexDirection: "row",
    alignItems: "center",
  },

  opcaoTexto: {
    fontSize: 15,
    color: "#222",
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#bbb",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  radioOuterSelecionado: {
    borderColor: "#790000",
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#790000",
  },

  /* 🛒 RESUMO */
  resumoItem: {
    marginBottom: 15,
  },

  produtoInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  produtoImagem: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },

  produtoNome: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
    marginBottom: 4,
  },

  produtoPreco: {
    fontSize: 14,
    color: "#790000",
    fontWeight: "bold",
  },

  /* 💰 TOTAL */
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  freteTexto: {
    color: "#790000",
    fontWeight: "bold",
  },

  totalTexto: {
    fontWeight: "bold",
    fontSize: 16,
  },

  /* 🔥 BOTÃO */
  botao: {
    backgroundColor: "#790000",
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 40,
    marginTop: 5,
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

});