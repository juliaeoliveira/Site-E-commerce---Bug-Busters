import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./style";

export default function Recomprar({ navigation }) {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregarPedidos() {
    try {
      setLoading(true);
      const data = await AsyncStorage.getItem("pedidosRecompra");
      const lista = data ? JSON.parse(data) : [];
      setPedidos(lista.reverse()); // mais recentes primeiro
    } catch (error) {
      console.log(error);
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

  async function comprarNovamente(pedido) {
    try {
      await AsyncStorage.setItem("carrinho", JSON.stringify(pedido.itens));
      navigation.navigate("carrinho");
    } catch (error) {
      console.log("Erro ao recriar carrinho:", error);
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case "Cancelado":
        return "#E53935";
      case "Em andamento":
        return "#FB8C00";
      default:
        return "#43A047";
    }
  }

  function renderPedido({ item }) {
    return (
      <View style={styles.card}>
        <View style={styles.topRow}>
          <Text style={styles.title}>Pedido #{item.id}</Text>
          <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
            {item.status || "Finalizado"}
          </Text>
        </View>

        <Text style={styles.text}>📅 {item.data}</Text>

        <Text style={styles.total}>R$ {item.valor_total}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => comprarNovamente(item)}
        >
          <Text style={styles.buttonText}>Recomprar</Text>
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
        <Text style={styles.empty}>🛒 Não foi feito nenhum pedido</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recomprar</Text>

      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPedido}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}