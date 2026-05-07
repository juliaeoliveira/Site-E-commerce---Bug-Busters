// index.js

import { useState, useEffect, useRef } from "react";
import { StatusBar } from 'expo-status-bar';

import {
  Text,
 View,
  Image,
  TextInput,
  TouchableOpacity,
  Linking,
  FlatList,
  Dimensions,
} from 'react-native';

import { styles } from "./style";
import { getProducts, searchProducts } from "../../services/api";

const { width } = Dimensions.get("window");

export default function Home({ navigation }) {

  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");

  // CARROSSEL
  const [bannerAtivo, setBannerAtivo] = useState(0);
  const bannerRef = useRef(null);

  const banners = [
    require('../../assets/images/foto.jpg'),
    require('../../assets/images/coleção1.jpg'),
    require('../../assets/images/coleção2.jpg'),
  ];

  const handleSearch = () => {
    navigation.navigate('searchresults', {
      query: searchText
    });
  };

  useEffect(() => {

    async function loadProducts() {

      try {

        const data = searchText.trim()
          ? await searchProducts(searchText.trim())
          : await getProducts();

        setProducts(data);

      } catch (error) {
        console.log(error);
      }
    }

    loadProducts();

  }, [searchText]);

  // AUTO PLAY DO BANNER
  useEffect(() => {

    const interval = setInterval(() => {

      let proximo = bannerAtivo + 1;

      if (proximo >= banners.length) {
        proximo = 0;
      }

      bannerRef.current?.scrollToIndex({
        index: proximo,
        animated: true,
      });

      setBannerAtivo(proximo);

    }, 3500);

    return () => clearInterval(interval);

  }, [bannerAtivo]);

  function renderItem({ item }) {

    return (

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("detalhes", {
            product: item
          })
        }
      >

        <Image
          source={{ uri: item.imagem1_url }}
          style={styles.cardImage}
        />

        <Text style={styles.cardNome}>
          {item.nome_produto}
        </Text>

        <Text style={styles.cardPreco}>
          R$ {Number(item.preco).toFixed(2)}
        </Text>

      </TouchableOpacity>
    );
  }

  function BannerCarousel() {

    return (

      <View>

        <FlatList
          ref={bannerRef}
          data={banners}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item }) => (

            <Image
              source={item}
              style={styles.bannerImage}
            />

          )}
          onMomentumScrollEnd={(event) => {

            const slide = Math.round(
              event.nativeEvent.contentOffset.x / width
            );

            setBannerAtivo(slide);
          }}
        />

        {/* BOLINHAS */}
        <View style={styles.pagination}>

          {banners.map((_, index) => (

            <View
              key={index}
              style={[
                styles.dot,
                bannerAtivo === index &&
                styles.dotAtivo
              ]}
            />

          ))}

        </View>

      </View>
    );
  }

  function ListHeader() {

    return (
      <>

        {/* CARROSSEL */}
        <BannerCarousel />

        {/* CATEGORIAS */}
        <View style={styles.categorias}>

          <TouchableOpacity style={styles.circulo}>

            <Image
              source={require('../../assets/images/coleção1.jpg')}
              style={styles.imgCirculo}
            />

          </TouchableOpacity>

          <TouchableOpacity style={styles.circulo}>

            <Image
              source={require('../../assets/images/coleção2.jpg')}
              style={styles.imgCirculo}
            />

          </TouchableOpacity>

          <TouchableOpacity style={styles.circulo}>

            <Image
              source={require('../../assets/images/coleção3.jpg')}
              style={styles.imgCirculo}
            />

          </TouchableOpacity>

          <TouchableOpacity style={styles.circulo}>

            <Image
              source={require('../../assets/images/coleção4.jpg')}
              style={styles.imgCirculo}
            />

          </TouchableOpacity>

        </View>

        {/* AGENDAMENTO */}
        <View style={styles.agendamento}>

          <Text style={styles.titulo}>
            AGENDAMENTOS
          </Text>

          <Text style={styles.subtitulo}>
            Seu grande dia merece um vestido à altura!
            Clique no botão abaixo e marque uma consultoria online.
          </Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={() =>
              Linking.openURL('https://web.whatsapp.com')
            }
          >

            <Text style={styles.textoBotao}>
              (11) 4002-8922
            </Text>

          </TouchableOpacity>

        </View>

        {/* TITULO */}
        <Text style={styles.tituloProdutos}>
          Vestidos
        </Text>

      </>
    );
  }

  return (

    <View style={{ flex: 1 }}>

      <View style={styles.header}>

        <TextInput
          placeholder="Buscar produtos..."
          placeholderTextColor="#999"
          style={styles.searchInput}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />

      </View>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />

      <StatusBar style="auto" />

    </View>
  );
}