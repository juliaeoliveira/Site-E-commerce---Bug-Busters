import { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Linking,
  FlatList,
} from "react-native";
import { styles } from "./style";
import { productService } from "../../services/api";
import { ActivityIndicator } from "react-native";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0); // Representa 'skip'
  const [hasMore, setHasMore] = useState(true); // Indica se há mais páginas para carregar
  const [searchQuery, setSearchQuery] = useState(""); // Estado para a busca
  const limit = 10; // Itens por página

  const fetchProducts = useCallback(async () => {
    if (loading || !hasMore) return; // Evita múltiplas chamadas ou chamadas desnecessárias

    setLoading(true);
    try {
      const data = await productService.getProducts(page * limit, limit);
      if (data.length === 0) {
        setHasMore(false); // Não há mais produtos
      } else {
        setProducts((prevProducts) => {
          const novos = data.filter(
            (novo) => !prevProducts.some((p) => p.id === novo.id),
          );
          return [...prevProducts, ...novos];
        });
      }
    } catch (error) {
      console.error("Erro ao carregar produtos paginados:", error);
      // Tratar o erro (exibir mensagem ao usuário)
    } finally {
      setLoading(false);
    }
  }, [page, hasMore]);

  // Função para buscar produtos
  const handleSearch = useCallback(async (query) => {
    setSearchQuery(query);
    setPage(0);
    setHasMore(true);
    
    if (query.trim() === "") {
      // Se a busca estiver vazia, carrega os produtos normais
      setProducts([]);
      return;
    }

    setLoading(true);
    try {
      const data = await productService.searchProducts(query, null, null, null, null, 0, limit);
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchProducts();
  }, []); // Chamar apenas na montagem inicial

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagem1_url }} style={styles.imagemProduto} />
      <Text style={styles.nome}>{item.nome_produto}</Text>
      <Text>R$ {parseFloat(item.preco).toFixed(2)}</Text>
    </View>
  );
  function ListHeader() {
    return (
      <>
        {/* HEADER */}
        <View style={styles.header}>
          <TextInput
            placeholder="Buscar produtos..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {/* BANNER */}
        <Image
          source={require("../../assets/images/foto.jpg")}
          style={styles.image}
        />

        {/* CATEGORIAS */}
        <View style={styles.categorias}>
          <TouchableOpacity style={styles.circulo}>
            <Image
              source={require("../../assets/images/coleção1.jpg")}
              style={styles.imgCirculo}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circulo}>
            <Image
              source={require("../../assets/images/coleção2.jpg")}
              style={styles.imgCirculo}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circulo}>
            <Image
              source={require("../../assets/images/coleção3.jpg")}
              style={styles.imgCirculo}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circulo}>
            <Image
              source={require("../../assets/images/coleção4.jpg")}
              style={styles.imgCirculo}
            />
          </TouchableOpacity>
        </View>

        {/* AGENDAMENTO */}
        <View style={styles.agendamento}>
          <Text style={styles.titulo}>AGENDAMENTOS</Text>

          <Text style={styles.subtitulo}>
            Seu grande dia merece um vestido à altura! Clique no botão abaixo e
            marque uma consultoria online.
          </Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => Linking.openURL("https://web.whatsapp.com")}
          >
            <Text style={styles.textoBotao}>(11) 4002-8922</Text>
          </TouchableOpacity>
        </View>

        {/* TÍTULO */}
        <Text style={styles.tituloProdutos}>Vestidos</Text>
      </>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      ListHeaderComponent={ListHeader}
      ListFooterComponent={renderFooter}
      onEndReached={fetchProducts}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      style={styles.vestidos}
    />
  );
}
