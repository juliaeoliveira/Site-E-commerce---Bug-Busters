import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import { searchProducts } from "../../services/api";

export default function Resultado({ route }) {
  const { query } = route.params; // Pega aquilo que foi digitado na home
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Chamando a função searchProducts(query) e atualizando o estado
    async function loadResults() {
      setLoading(true);
      try {
        const data = await searchProducts(query);
        setProducts(data);
      } catch (error) {
        console.log("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    }

    if (query) {
      loadResults();
    }
  }, [query]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} colo="#000" />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Resultados para: {query}
      </Text>

     <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#eee' }}>
             {/* Use o nome da propriedade que vem da sua API (ex: nome_produto) */}

             <Image style={{width: 100, height: 150 }} source={{ uri: item.imagem1_url }}/>
            <Text style={{ fontSize: 16 }}>{item.nome_produto || item.nome || item.title}</Text>
            <Text style={{ color: 'green' }}>R$ {item.preco}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Nenhum produto encontrado para "{query}".
          </Text>
        }
      />
    </View>
  );
}
