import { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { styles } from "./style";
import { getColecoes } from "../../services/api";

export default function Colecoes({ navigation }) {
  const [colecoes, setColecoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadColecoes() {
      try {
        const data = await getColecoes();
        setColecoes(data || []);
      } catch (error) {
        console.error("Erro ao carregar coleções:", error);
        setColecoes([]);
      } finally {
        setLoading(false);
      }
    }

    loadColecoes();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#790000" />
      </View>
    );
  }

  const renderColecao = ({ item }) => {
    // item = { nome: "categoria", produtos: [...] }
    return (
      <View style={styles.colecaoContainer}>
        <Text style={styles.nomeColecao}>{item.nome}</Text>
        
        <FlatList
          data={item.produtos}
          renderItem={({ item: produto }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("detalhes", { product: produto })}
            >
              <Image
                source={{ uri: produto.imagem1_url }}
                style={styles.cardImage}
              />
              <Text style={styles.cardNome}>{produto.nome_produto}</Text>
              <Text style={styles.cardPreco}>
                R$ {Number(produto.preco).toFixed(2)}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(produto) => String(produto.id)}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Coleções</Text>
      
      <FlatList
        data={colecoes}
        renderItem={renderColecao}
        keyExtractor={(item) => item.nome}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}