import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  ActivityIndicator,
  Alert 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

// Importações internas
import { styles } from "./style";
import { getCartData } from '../../services/api';

export default function Carrinho({ navigation, route }) {

  const [loading, setLoading] = useState(true);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  
  // 1. Estado do carrinho começa VAZIO
  const [cart, setCart] = useState([]);

  async function loadCartFromStorage() {
    try {
      const storedCart = await AsyncStorage.getItem("carrinho");
      const parsedCart = storedCart ? JSON.parse(storedCart) : [];
      setCart(Array.isArray(parsedCart) ? parsedCart : []);
    } catch (error) {
      console.error("Erro ao carregar carrinho do armazenamento:", error);
      setCart([]);
    }
  }

  async function persistCart(updatedCart) {
    try {
      await AsyncStorage.setItem("carrinho", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Erro ao salvar carrinho:", error);
    }
  }

  // Carregar dados iniciais (Usuário, Sugestões e Carrinho salvo)
  useEffect(() => {

    const carregarDados = async () => {

      try {

        setLoading(true);
        const token = await AsyncStorage.getItem("token");
        
        await loadCartFromStorage();

        if (token) {
          const data = await getCartData();
          setNomeUsuario(data.usuario.primeiro_nome);
          setSugestoes(data.sugestoes);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        if (error.message.includes("401")) {
          await AsyncStorage.removeItem("token");
        }

      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  // Recarregar carrinho sempre que a tela for focada
  useFocusEffect(
    React.useCallback(() => {
      loadCartFromStorage();
    }, [])
  );

  // Funções de Controle
  function aumentar(id, tamanho) {
    const updatedCart = cart.map(item =>
      (item.id === id && item.tamanho === tamanho) ? { ...item, qtd: item.qtd + 1 } : item
    );
    setCart(updatedCart);
    persistCart(updatedCart);
  }

  function diminuir(id, tamanho) {
    const updatedCart = cart.map(item =>
      (item.id === id && item.tamanho === tamanho && item.qtd > 1)
        ? { ...item, qtd: item.qtd - 1 }
        : item
    );
    setCart(updatedCart);
    persistCart(updatedCart);
  }

  function remover(id, tamanho) {
    const updatedCart = cart.filter(item => !(item.id === id && item.tamanho === tamanho));
    setCart(updatedCart);
    persistCart(updatedCart);
  }

  function alterarTamanho(id, antigoTamanho, novoTamanho) {
    const updatedCart = cart.map(item =>
      (item.id === id && item.tamanho === antigoTamanho) 
        ? { ...item, tamanho: novoTamanho } 
        : item
    );
    setCart(updatedCart);
    persistCart(updatedCart);
  }

  const total = cart.reduce(
    (sum, item) => sum + item.preco * item.qtd,
    0
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView 
        style={styles.body} 
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Ionicons name="cart-outline" size={35} />
          <Text style={styles.title}>Carrinho de {nomeUsuario}</Text>
        </View>

        {/* LISTA DE ITENS OU MENSAGEM DE VAZIO */}
        {cart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="basket-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate("home")}
              style={{ marginTop: 10 }}
            >
              <Text style={{ color: '#007AFF' }}>Explorar produtos</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.card}>
            {cart.map((item, index) => (
              <View key={`${item.id}-${item.tamanho}-${index}`} style={styles.item}>
                <Image 
                  source={item.img?.uri ? { uri: item.img.uri } : item.img} 
                  style={styles.image} 
                />

                <View style={styles.info}>
                  <Text style={styles.nome}>{item.nome}</Text>
                  <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>

                  {/* Seleção de Tamanho no Carrinho */}
                  <View style={styles.tamanhoContainer}>
                    {["P", "M", "G", "GG"].map(t => (
                      <TouchableOpacity
                        key={t}
                        onPress={() => alterarTamanho(item.id, item.tamanho, t)}
                        style={[
                          styles.tamanhoBtn,
                          item.tamanho === t && styles.tamanhoSelecionado
                        ]}
                      >
                        <Text style={[
                          styles.tamanhoTexto,
                          item.tamanho === t && styles.tamanhoTextoSelecionado
                        ]}>{t}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Controles de Quantidade */}
                  <View style={styles.controls}>
                    <TouchableOpacity onPress={() => diminuir(item.id, item.tamanho)} style={styles.btn}>
                      <Text style={styles.btnText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtd}>{item.qtd}</Text>
                    <TouchableOpacity onPress={() => aumentar(item.id, item.tamanho)} style={styles.btn}>
                      <Text style={styles.btnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity onPress={() => remover(item.id, item.tamanho)}>
                  <Ionicons name="trash-outline" size={22} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* SEÇÃO DE SUGESTÕES */}
        <View style={{ padding: 20 }}>
          <Text style={styles.sectionTitleSugestoes}>Sugestões para você</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {sugestoes.map(prod => (
              <TouchableOpacity
                key={prod.id}
                style={{ marginRight: 15, width: 120 }}
                onPress={() => navigation.navigate("detalhes", { product: prod })}
              >
                <Image source={{ uri: prod.imagem1_url }} style={{ width: 120, height: 120, borderRadius: 10 }} />
                <Text numberOfLines={1} style={{ fontSize: 12, marginTop: 5 }}>{prod.nome_produto}</Text>
                <Text style={{ fontWeight: 'bold' }}>R$ {prod.preco.toFixed(2)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* FOOTER FIXO (Apenas se houver itens) */}
      {cart.length > 0 && (
        <View style={styles.footer}>
          <View>
            <Text style={{ color: '#666' }}>Total do pedido</Text>
            <Text style={styles.total}>R$ {total.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            style={styles.checkout}
            onPress={async () => {
              const token = await AsyncStorage.getItem("token");
              if (!token) {
                Alert.alert(
                  "Atenção",
                  "Você precisa se cadastrar ou fazer login para finalizar a compra",
                  [
                    { text: "Fazer Login", onPress: () => navigation.navigate("login") },
                    { text: "Cadastrar", onPress: () => navigation.navigate("cadastro") },
                    { text: "Cancelar", style: "cancel" }
                  ]
                );
                return;
              }
              navigation.navigate("Checkout");
            }}
          >
            <Text style={styles.checkoutText}>Finalizar</Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style="dark" />
    </View>
  );
}