import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getPedidos } from "../../services/api";
import { styles } from "./style";

export default function Pedidos({ navigation }) {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregarPedidos() {
    try {
      setLoading(true);
      const data = await getPedidos();
      setPedidos(data);
    } catch (error) {
      console.log(error.message);
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

  function renderPedido({ item }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("detalhePedido", { id: item.id })}
      >
        <Text style={styles.title}>Pedido #{item.id}</Text>

        <Text style={styles.text}>Data: {item.data}</Text>
        <Text style={styles.text}>Status: {item.status}</Text>
        <Text style={styles.total}>R$ {item.valor_total}</Text>
      </TouchableOpacity>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!pedidos.length) {
    return (
      <View style={styles.container}>
        <Text>Nenhum pedido encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Seus Pedidos</Text>

      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPedido}
      />
    </View>
  );
}