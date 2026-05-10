import { useCallback, useState } from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";

import { StatusBar } from "expo-status-bar";

import { useFocusEffect } from "@react-navigation/native";

import { styles } from "./style";

import { getComprarNovamente } from "../../services/api";

export default function ComprarNovamente({ navigation }) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(

    useCallback(() => {

      async function loadProducts() {

        try {

          setLoading(true);

          const data = await getComprarNovamente();

          setProducts(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      }

      loadProducts();

    }, [])

  );

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

  if (loading) {

    return (

      <View style={styles.loadingContainer}>

        <ActivityIndicator size="large" />

      </View>

    );
  }

  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.titulo}>
          Comprar Novamente
        </Text>

      </View>

      {products.length === 0 ? (

        <View style={styles.emptyContainer}>

          <Text style={styles.emptyText}>
            Você ainda não comprou nenhum produto.
          </Text>

        </View>

      ) : (

        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20
          }}
        />

      )}

      <StatusBar style="auto" />

    </View>

  );
}