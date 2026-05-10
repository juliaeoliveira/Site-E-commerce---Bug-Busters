import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native";

import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { styles } from "./style";
import { getPedidos } from "../../services/api";

export default function MeusPedidos({ navigation }) {

  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregarPedidos() {

    try {

      setLoading(true);

      const lista = await getPedidos();

      setPedidos(lista);

    } catch (error) {

      console.log("Erro ao carregar pedidos:", error);

      setPedidos([]);

    } finally {

      setLoading(false);

    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarPedidos();
    }, [])
  );

  function formatarData(dataISO) {

    return new Date(dataISO).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
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

  function abrirDetalhes(pedido) {

    navigation.navigate(
      "detalhePedido",
      {
        id_pedido: pedido.id
      }
    );
  }

  function renderPedido({ item }) {

    return (

      <View style={styles.card}>

        <View style={styles.topRow}>

          <Text style={styles.title}>
            Pedido #{item.id}
          </Text>

          <Text
            style={[
              styles.status,
              {
                color: getStatusColor(item.status)
              }
            ]}
          >
            {item.status.toUpperCase() || "Finalizado"}
          </Text>

        </View>

        <Text style={styles.text}>
          📅 {formatarData(item.data)}
        </Text>

        <Text style={styles.total}>
          R$ {Number(item.valor_total).toFixed(2)}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => abrirDetalhes(item)}
        >

          <Text style={styles.buttonText}>
            Ver detalhes
          </Text>

        </TouchableOpacity>

      </View>
    );
  }

  if (loading) {

    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!pedidos.length) {

    return (
      <View style={styles.center}>
        <Text style={styles.empty}>
          🛒 Nenhum pedido encontrado
        </Text>
      </View>
    );
  }

  return (

    <View style={styles.container}>

      <Text style={styles.header}>
        Meus Pedidos
      </Text>

      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPedido}
        showsVerticalScrollIndicator={false}
      />

    </View>
  );
}