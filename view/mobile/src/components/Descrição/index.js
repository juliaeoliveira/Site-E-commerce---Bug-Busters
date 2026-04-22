import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  Alert 
} from "react-native";
import { styles } from "./style";
import { useState } from "react";

export default function Descricao({ route, navigation }) {
  const { product } = route.params;
  const [tab, setTab] = useState("details");

  // 👉 FUNÇÃO DO BOTÃO
  function adicionarCarrinho() {
    Alert.alert("Sucesso", "Produto adicionado ao carrinho 🛒");
  }

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.icon}>←</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* IMAGEM PRINCIPAL */}
        <Image
          source={{ uri: product.imagem1_url }}
          style={styles.image}
        />

        {/* INFO */}
        <View style={styles.info}>
          <Text style={styles.nome}>{product.nome_produto}</Text>
          <Text style={styles.categoria}>Coleção </Text>

          {/* PREÇO */}
          <View style={styles.priceRow}>
            <Text style={styles.preco}>
              R$ {Number(product.preco).toFixed(2)}
            </Text>

            <Text style={styles.oldPrice}>R$ 199.99</Text>
            <Text style={styles.discount}>12%</Text>
          </View>

          {/* TABS */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tabBtn, tab === "details" && styles.tabActive]}
              onPress={() => setTab("details")}
            >
              <Text style={tab === "details" && { color: "#fff" }}>
                Detalhes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabBtn, tab === "reviews" && styles.tabActive]}
              onPress={() => setTab("reviews")}
            >
              <Text style={tab === "reviews" && { color: "#fff" }}>
                avaliações

              </Text>
            </TouchableOpacity>
          </View>

          {/* CONTEÚDO */}
          {tab === "details" ? (
            <Text style={styles.desc}>
              {product.descricao}
            </Text>
          ) : (
            <Text style={styles.desc}>
              Ainda não há avaliações.
            </Text>
          )}
        </View>

      </ScrollView>

      {/* BOTÃO FIXO */}
      <TouchableOpacity 
        style={styles.botao} 
        onPress={adicionarCarrinho}
      >
        <Text style={styles.botaoTexto}>
          Adicionar ao Carrinho
        </Text>
      </TouchableOpacity>

    </View>
  );
}