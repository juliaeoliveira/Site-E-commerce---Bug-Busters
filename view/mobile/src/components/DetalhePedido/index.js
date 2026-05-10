import {
  View,
  Text,
  ActivityIndicator,
  FlatList
} from "react-native";

import { useState, useEffect } from "react";

import { getDetalhePedido } from "../../services/api";

import { styles } from "./style";

export default function DetalhePedido({ route }) {

  const { id_pedido } = route.params;

  const [pedido, setPedido] = useState(null);
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function carregar() {

      try {

        const data = await getDetalhePedido(id_pedido);

        setPedido(data.pedido);
        setItens(data.itens);

      } catch (error) {

        console.log("Erro ao carregar pedido:", error.message);

      } finally {

        setLoading(false);

      }
    }

    carregar();

  }, [id_pedido]);

  function formatarPreco(valor) {

    return Number(valor).toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL"
      }
    );
  }

  function formatarData(dataISO) {

    return new Date(dataISO).toLocaleString(
      "pt-BR",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }
    );
  }

  function getStatusColor(status) {

    switch (status) {

      case "cancelado":
        return "#E53935";

      case "pendente":
        return "#FB8C00";

      default:
        return "#43A047";
    }
  }

  if (loading) {

    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!pedido) {

    return (
      <View style={styles.center}>
        <Text>Pedido não encontrado</Text>
      </View>
    );
  }

  return (

    <View style={styles.container}>

      <Text style={styles.header}>
        Pedido #{pedido.id}
      </Text>

      <View style={styles.infoContainer}>

        <Text style={styles.infoText}>
          📅 {formatarData(pedido.data)}
        </Text>

        <Text
          style={[
            styles.status,
            {
              color: getStatusColor(pedido.status)
            }
          ]}
        >
          {pedido.status}
        </Text>

      </View>

      <Text style={styles.sectionTitle}>
        Itens do pedido
      </Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => {

          const subtotal =
            Number(item.preco) * Number(item.quantidade);

          return (

            <View style={styles.itemCard}>

              <Text style={styles.nomeProduto}>
                {item.produto.nome}
              </Text>

              <View style={styles.row}>
                <Text style={styles.label}>
                  Tamanho:
                </Text>

                <Text style={styles.value}>
                  {item.tamanho}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>
                  Quantidade:
                </Text>

                <Text style={styles.value}>
                  {item.quantidade}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>
                  Preço unitário:
                </Text>

                <Text style={styles.value}>
                  {formatarPreco(item.preco)}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>
                  Subtotal:
                </Text>

                <Text style={styles.subtotal}>
                  {formatarPreco(subtotal)}
                </Text>
              </View>

            </View>
          );
        }}
      />

      <View style={styles.totalContainer}>

        <Text style={styles.totalText}>
          Total: {formatarPreco(pedido.valor_total)}
        </Text>

      </View>

    </View>
  );
}