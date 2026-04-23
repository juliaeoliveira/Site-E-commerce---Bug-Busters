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
  const { id } = route.params;

  const [pedido, setPedido] = useState(null);
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await getDetalhePedido(id);
        setPedido(data.pedido);
        setItens(data.itens);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pedido #{pedido.id}</Text>

      <Text>Status: {pedido.status}</Text>
      <Text>Total: R$ {pedido.total}</Text>

      <Text style={styles.subHeader}>Itens:</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.produto.nome}</Text>
            <Text>Qtd: {item.quantidade}</Text>
            <Text>R$ {item.preco}</Text>
          </View>
        )}
      />
    </View>
  );
}