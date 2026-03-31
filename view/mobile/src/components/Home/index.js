import { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TextInput, TouchableOpacity, Linking, FlatList } from 'react-native';
import { styles } from "./style";
import { getProducts } from "../../services/api";

export default function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadProducts();
  }, []);

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => console.log(item.nome)}
      >
        <Image
          source={{ uri: item.imagem1_url }}
          style={styles.cardImage}
        />
        <Text style={styles.cardNome}>{item.nome_produto}</Text>
        <Text style={styles.cardPreco}>
          R$ {Number(item.preco).toFixed(2)}
        </Text>
      </TouchableOpacity>
    );
  }

  function ListHeader() {
    return (
      <>
        {/* HEADER */}
        <View style={styles.header}>
          <TextInput
            placeholder="Buscar produtos..."
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>

        {/* BANNER */}
        <Image
          source={require('../../assets/images/foto.jpg')}
          style={styles.image}
        />

        {/* CATEGORIAS */}
        <View style={styles.categorias}>
          <TouchableOpacity style={styles.circulo}>
            <Image source={require('../../assets/images/coleção1.jpg')} style={styles.imgCirculo} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circulo}>
            <Image source={require('../../assets/images/coleção2.jpg')} style={styles.imgCirculo} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circulo}>
            <Image source={require('../../assets/images/coleção3.jpg')} style={styles.imgCirculo} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circulo}>
            <Image source={require('../../assets/images/coleção4.jpg')} style={styles.imgCirculo} />
          </TouchableOpacity>
        </View>

        {/* AGENDAMENTO */}
        <View style={styles.agendamento}>
          <Text style={styles.titulo}>AGENDAMENTOS</Text>

          <Text style={styles.subtitulo}>
            Seu grande dia merece um vestido à altura! Fale com nossas atendentes e agende um horário conosco
          </Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => Linking.openURL('https://web.whatsapp.com')}
          >
            <Text style={styles.textoBotao}>(11) 4002-8922</Text>
          </TouchableOpacity>
        </View>

        {/* TÍTULO */}
        <Text style={styles.tituloProdutos}>Produtos</Text>
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
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    />
  );
}