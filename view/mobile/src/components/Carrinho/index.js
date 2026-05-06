import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from "./style";
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { getCartData } from '../../services/api'; // Importe a função que criamos
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Carrinho({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [sugestoes, setSugestoes] = useState([]);

  // Carrinho local (mockado ou vindo de um Context/Storage)
  const [cart, setCart] = useState([
    {
      id: 1,
      nome: "Camaleão dourado",
      preco: 359.90,
      qtd: 1,
      img: require("../../assets/images/coleção3.jpg")
    }
  ]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);

        // 1. Verifica se o token existe antes de chamar a API
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          setLoading(false);
          // Não usamos Alert aqui para evitar o Warning "not attached to an Activity"
          navigation.navigate("Login");
          return;
        }

        // 2. Chama a API
        const data = await getCartData();

        // 3. Atualiza os estados
        setNomeUsuario(data.usuario.primeiro_nome);
        setSugestoes(data.sugestoes);

      } catch (error) {
        console.error("Erro ao carregar dados do carrinho:", error);

        if (error.message.includes("Sessão expirada") || error.message.includes("401")) {
          // Se o token for inválido, limpa o armazenamento e desloga
          await AsyncStorage.removeItem("token");
          navigation.navigate("Login");
        }
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);
  function aumentar(id) {
    setCart(cart.map(item =>
      item.id === id ? { ...item, qtd: item.qtd + 1 } : item
    ));
  }

  // Adicione 'route' nos parâmetros da função lá no topo: export default function Carrinho({ navigation, route }) {

  useEffect(() => {
    // Verifica se existe um novo item vindo dos parâmetros da rota
    if (route.params?.itemAdicionado) {
      const novoItem = route.params.itemAdicionado;

      setCart(prevCart => {
        // Evita duplicar o produto se ele já estiver no carrinho
        const jaExiste = prevCart.find(item => item.id === novoItem.id);
        if (jaExiste) {
          return prevCart.map(item =>
            item.id === novoItem.id ? { ...item, qtd: item.qtd + 1 } : item
          );
        }
        return [...prevCart, novoItem];
      });
    }
  }, [route.params?.itemAdicionado]);

  function diminuir(id) {
    setCart(cart.map(item =>
      item.id === id && item.qtd > 1
        ? { ...item, qtd: item.qtd - 1 }
        : item
    ));
  }

  function remover(id) {
    setCart(cart.filter(item => item.id !== id));
  }

  const total = cart.reduce((sum, item) => sum + item.preco * item.qtd, 0);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    // 1. View principal com flex: 1 garante que a tela ocupe todo o espaço
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      <ScrollView
        style={styles.body}
        contentContainerStyle={{ paddingBottom: 20 }} // Espaço extra no fim do scroll
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Ionicons name="cart-outline" size={35} />
          <Text style={styles.title}>Carrinho de {nomeUsuario}</Text>
        </View>

        {/* Itens do Carrinho */}
        <View style={styles.card}>
          {cart.map(item => (
            <View key={item.id} style={styles.item}>
              {/* AJUSTE NA IMAGEM: Suporta tanto local (require) quanto API (uri) */}
              <Image
                source={item.img?.uri ? { uri: item.img.uri } : item.img}
                style={styles.image}
              />

              <View style={styles.info}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>

                <View style={styles.controls}>
                  <TouchableOpacity onPress={() => diminuir(item.id)} style={styles.btn}>
                    <Text style={{ fontSize: 20 }}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtd}>{item.qtd}</Text>
                  <TouchableOpacity onPress={() => aumentar(item.id)} style={styles.btn}>
                    <Text style={{ fontSize: 20 }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity onPress={() => remover(item.id)}>
                <Ionicons name="trash-outline" size={22} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* SEÇÃO DE SUGESTÕES */}
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            Sugestões para você
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {sugestoes.map(prod => (
              <TouchableOpacity
                key={prod.id}
                style={{ marginRight: 15, width: 120 }}
                onPress={() => navigation.navigate("Detalhes", { product: prod })}
              >
                <Image
                  source={{ uri: prod.imagem1_url }}
                  style={{ width: 120, height: 120, borderRadius: 10 }}
                />
                <Text numberOfLines={1} style={{ fontSize: 12, marginTop: 5 }}>
                  {prod.nome_produto}
                </Text>
                <Text style={{ fontWeight: 'bold' }}>R$ {prod.preco.toFixed(2)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* 2. FOOTER FORA DO SCROLLVIEW: Ele fica fixo na parte inferior da tela */}
      <View style={styles.footer}>
        <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkout}>
          <Text style={styles.checkoutText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}