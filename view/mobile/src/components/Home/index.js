// index.js

import { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";

import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Linking,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { styles } from "./style";
import { getProducts, searchProducts } from "../../services/api";

const { width } = Dimensions.get("window");

export default function Home({ navigation }) {

  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");

  // CARROSSEL
  const scrollRef = useRef(null);
  const [bannerAtivo, setBannerAtivo] = useState(0);

  const banners = [
    require("../../assets/images/banner1.png"),
    require("../../assets/images/banner2.png"),
  ];

  const handleSearch = () => {

    navigation.navigate("searchresults", {
      query: searchText,
    });
  };

  // PRODUTOS
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

  // AUTO PLAY DO CARROSSEL
  useEffect(() => {

    const interval = setInterval(() => {

      const proximoBanner =
        bannerAtivo === banners.length - 1
          ? 0
          : bannerAtivo + 1;

      scrollRef.current?.scrollTo({
        x: proximoBanner * width,
        animated: true,
      });

      setBannerAtivo(proximoBanner);

    }, 4000);

    return () => clearInterval(interval);

  }, [bannerAtivo]);

  function renderItem({ item }) {

    return (

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("detalhes", {
            product: item,
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

  function ListHeader() {

    return (
      <>

        {/* CARROSSEL */}
        <View>

          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            ref={scrollRef}
            onMomentumScrollEnd={(event) => {

              const slide = Math.round(
                event.nativeEvent.contentOffset.x / width
              );

              setBannerAtivo(slide);
            }}
          >

            {banners.map((banner, index) => (

              <Image
                key={index}
                source={banner}
                style={styles.image}
              />

            ))}

          </ScrollView>

          {/* BOLINHAS */}
          <View style={styles.pagination}>

            {banners.map((_, index) => (

              <View
                key={index}
                style={[
                  styles.dot,
                  bannerAtivo === index &&
                  styles.dotActive,
                ]}
              />

            ))}

          </View>

        </View>

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
              Linking.openURL("https://web.whatsapp.com")
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

    <View style={styles.container}>

      {/* BARRA DE BUSCA */}
      <View style={styles.header}>

        <View style={styles.searchContainer}>

          <Ionicons
            name="search"
            size={18}
            color="#777"
            style={styles.searchIcon}
          />

          <TextInput
            placeholder="Buscar produtos..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />

        </View>

      </View>

      {/* PRODUTOS */}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />

      <StatusBar style="auto" />

    </View>
  );
}