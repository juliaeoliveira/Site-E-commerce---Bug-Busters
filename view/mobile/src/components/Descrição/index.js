import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  Dimensions
} from "react-native";
import { styles } from "./style";
import { useState, useRef } from "react";

export default function Descricao({ route, navigation }) {
  const { product } = route.params;

  const [tab, setTab] = useState("details");
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);
  const [indexAtual, setIndexAtual] = useState(0);

  const scrollRef = useRef();
  const { width } = Dimensions.get("window");

  const imagens = [
    product.imagem1_url,
    product.imagem2_url,
    product.imagem3_url,
    product.imagem4_url
  ];

  const tamanhos = ["P", "M", "G", "GG"];

  function adicionarCarrinho() {
    if (!tamanhoSelecionado) {
      Alert.alert("Atenção", "Selecione um tamanho");
      return;
    }

    Alert.alert(
      "Sucesso",
      `Produto adicionado 🛒\nTamanho: ${tamanhoSelecionado}`
    );
  }

  function handleScroll(event) {
    const position = event.nativeEvent.contentOffset.x;
    const index = Math.round(position / width);
    setIndexAtual(index);
  }

  function proximaImagem() {
    if (indexAtual < imagens.length - 1) {
      scrollRef.current.scrollTo({
        x: (indexAtual + 1) * width,
        animated: true
      });
    }
  }

  function imagemAnterior() {
    if (indexAtual > 0) {
      scrollRef.current.scrollTo({
        x: (indexAtual - 1) * width,
        animated: true
      });
    }
  }

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.icon}>←</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >

        
        <View>

          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {imagens.map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={[styles.image, { width }]}
              />
            ))}
          </ScrollView>

         
          <View style={styles.dots}>
            {imagens.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  indexAtual === index && styles.dotActive
                ]}
              />
            ))}
          </View>

          {/* 👉 SETA ESQUERDA */}
          {indexAtual > 0 && (
            <TouchableOpacity style={styles.arrowLeft} onPress={imagemAnterior}>
              <Text style={styles.arrowText}>‹</Text>
            </TouchableOpacity>
          )}

          {/* 👉 SETA DIREITA */}
          {indexAtual < imagens.length - 1 && (
            <TouchableOpacity style={styles.arrowRight} onPress={proximaImagem}>
              <Text style={styles.arrowText}>›</Text>
            </TouchableOpacity>
          )}

        </View>

        {/* INFO */}
        <View style={styles.info}>
          <Text style={styles.nome}>{product.nome_produto}</Text>
          <Text style={styles.categoria}>Coleção</Text>

          <View style={styles.priceRow}>
            <Text style={styles.preco}>
              R$ {Number(product.preco).toFixed(2)}
            </Text>
            <Text style={styles.oldPrice}>R$ 3000,00</Text>
            <Text style={styles.discount}>12%</Text>
          </View>

          {/* TAMANHOS */}
          <Text style={styles.sectionTitle}>Tamanhos</Text>
          <View style={styles.sizes}>
            {tamanhos.map((tam, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setTamanhoSelecionado(tam)}
                style={[
                  styles.sizeBtn,
                  tamanhoSelecionado === tam && styles.sizeSelected
                ]}
              >
                <Text
                  style={
                    tamanhoSelecionado === tam
                      ? styles.sizeTextSelected
                      : styles.sizeText
                  }
                >
                  {tam}
                </Text>
              </TouchableOpacity>
            ))}
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
                Avaliações
              </Text>
            </TouchableOpacity>
          </View>

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

      {/* BOTÃO */}
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