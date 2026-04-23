import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getComprarNovamente } from "../../services/api";
import { styles } from "./style";

export default function ComprarNovamente({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");

  async function carregarProdutos() {
    try {
      setLoading(true);
      const data = await getComprarNovamente();

      if (data.mensagem) {
        setMensagem(data.mensagem);
        setProdutos([]);
      } else {
        setProdutos(data.produtos);
      }

    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarProdutos();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comprar novamente</Text>

      {mensagem ? (
        <Text style={styles.emptyText}>{mensagem}</Text>
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("descricao", { id: item.id })}
            >
              <Text style={styles.nome}>{item.nome_produto || item.nome}</Text>
              <Text style={styles.preco}>R$ {item.preco}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}