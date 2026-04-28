import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { styles } from "./style";
import { useState, useEffect } from 'react';
import { getProdutosByCategoria } from "../../services/api";

export default function Tasks({ navigation }) {

  const dressCollections = {
    1: [
      { id: 1, name: "Vestido Floral", image: require("../../assets/images/pexels-daisatj-5062276.jpg") },
      { id: 2, name: "Vestido Leve", image: require("../../assets/images/pexels-rnnzeravac-12573815.jpg") },
      { id: 3, name: "Vestido Casual", image: require("../../assets/images/pexels-jonathanborba-30822468.jpg") },
      { id: 4, name: "Vestido Solto", image: require("../../assets/images/pexels-daisatj-5062276.jpg") },
      { id: 5, name: "Vestido Praia", image: require("../../assets/images/pexels-rnnzeravac-12573815.jpg") },
      { id: 6, name: "Vestido Curto", image: require("../../assets/images/pexels-jonathanborba-30822468.jpg") },
    ],
    2: [
      { id: 7, name: "Vestido Elegante", image: require("../../assets/images/pexels-jonathanborba-30822468.jpg") },
      { id: 8, name: "Vestido Festa", image: require("../../assets/images/pexels-daisatj-5062276.jpg") },
      { id: 9, name: "Vestido Noite", image: require("../../assets/images/pexels-rnnzeravac-12573815.jpg") },
      { id: 10, name: "Vestido Luxo", image: require("../../assets/images/pexels-jonathanborba-30822468.jpg") },
      { id: 11, name: "Vestido Social", image: require("../../assets/images/pexels-daisatj-5062276.jpg") },
      { id: 12, name: "Vestido Gala", image: require("../../assets/images/pexels-rnnzeravac-12573815.jpg") },
    ],
    3: [], // Será preenchido com produtos da categoria "encanto"
    4: []  // Será preenchido com produtos da categoria "o_desabrochar"
  };

  // Mapeamento das coleções para categorias do banco
  const collectionCategories = {
    1: "brisa_do_altar",    // Coleção 1 -> categoria "brisa_do_altar"
    2: "sussurros",         // Coleção 2 -> categoria "sussurros"
    3: "encanto",           // Coleção 3 -> categoria "encanto"
    4: "o_desabrochar"      // Coleção 4 -> categoria "o_desabrochar"
  };

  const collections = [
    { id: 1, image: require("../../assets/images/coleção1.jpg") },
    { id: 2, image: require("../../assets/images/coleção2.jpg") },
    { id: 3, image: require("../../assets/images/coleção3.jpg") },
    { id: 4, image: require("../../assets/images/coleção4.jpg") },
  ];

  const [selected, setSelected] = useState(1);
  const [realProducts, setRealProducts] = useState({});

  useEffect(() => {
    async function loadRealProducts() {
      const loadedProducts = {};

      // Tenta carregar produtos reais para todas as coleções
      for (const [collectionId, category] of Object.entries(collectionCategories)) {
        try {
          const products = await getProdutosByCategoria(category);
          if (products && products.length > 0) {
            loadedProducts[collectionId] = products;
          }
        } catch (error) {
          console.log(`Categoria "${category}" não encontrada no banco, usando dados mockados`);
        }
      }

      setRealProducts(loadedProducts);
    }

    loadRealProducts();
  }, []);

  // Combina produtos mockados com reais
  const getDressesForCollection = (collectionId) => {
    const category = collectionCategories[collectionId];

    // Se há produtos reais para esta categoria, usa eles
    if (realProducts[collectionId]?.length > 0) {
      return realProducts[collectionId].map(product => ({
        id: product.id,
        name: product.nome_produto,
        image: { uri: product.imagem1_url },
        price: product.preco
      }));
    } else {
      // Caso contrário, usa dados mockados
      return dressCollections[collectionId] || [];
    }
  };

  const dresses = getDressesForCollection(selected);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <Text style={styles.title}>Coleção</Text>
      </View>

      <View style={styles.circlesContainer}>
        {collections.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.circle,
              selected === item.id && styles.circleActive
            ]}
            onPress={() => setSelected(item.id)}
          >
            <Image source={item.image} style={styles.circleImage} />
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={dresses}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.dressContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.dressCard}
            onPress={() => {
              // Se for produto real da API, navega para detalhes
              if (item.price !== undefined) {
                navigation.navigate("detalhes", { product: {
                  id: item.id,
                  nome_produto: item.name,
                  preco: item.price,
                  imagem1_url: item.image.uri
                } });
              }
            }}
          >
            <Image source={item.image} style={styles.dressImage} />
            <Text style={styles.dressName}>{item.name}</Text>
            {item.price !== undefined && (
              <Text style={styles.dressPrice}>R$ {Number(item.price).toFixed(2)}</Text>
            )}
          </TouchableOpacity>
        )}
      />

    </View>
  );
}
