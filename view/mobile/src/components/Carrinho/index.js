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
      tamanho: "M",
      img: require("../../assets/images/coleção3.jpg")
    },
    {
      id: 2,
      nome: "Amor sem fim",
      preco: 199.90,
      qtd: 1,
      tamanho: "M",
      img: require("../../assets/images/coleção4.jpg")
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

  function alterarTamanho(id, tamanho) {
    setCart(cart.map(item =>
      item.id === id ? { ...item, tamanho } : item
    ));
  }

  const total = cart.reduce((sum, item) => sum + item.preco * item.qtd, 0);

  if (loading) {
    return (

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  {
    cart.length === 0 ? (
      <View style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={80} color="black" />
        <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
        <Text style={styles.emptySubText}>Adicione produtos para continuar</Text>
      </View>
    ) : (
      <>
        <View style={styles.card}>
          {cart.map(item => (
            <View key={item.id} style={styles.item}>

              <Image source={item.img} style={styles.image} />

              <View style={styles.info}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>

                <View style={styles.tamanhoContainer}>
                  {["P", "M", "G", "GG"].map(t => (
                    <TouchableOpacity
                      key={t}
                      onPress={() => alterarTamanho(item.id, t)}
                      style={[
                        styles.tamanhoBtn,
                        item.tamanho === t && styles.tamanhoSelecionado
                      ]}
                    >
                      <Text style={[
                        styles.tamanhoTexto,
                        item.tamanho === t && styles.tamanhoTextoSelecionado
                      ]}>
                        {t}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={{ marginTop: 5 }}>Tamanho: {item.tamanho}</Text>

                <View style={styles.controls}>
                  <TouchableOpacity onPress={() => diminuir(item.id)} style={styles.btn}>
                    <Text style={styles.btnText}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.qtd}>{item.qtd}</Text>

                  <TouchableOpacity onPress={() => aumentar(item.id)} style={styles.btn}>
                    <Text style={styles.btnText}>+</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.linha} />
              </View>

              <TouchableOpacity onPress={() => remover(item.id)}>
                <Ionicons name="trash-outline" size={22} color="red" />
              </TouchableOpacity>

            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

          <TouchableOpacity
            style={styles.checkout}
            onPress={() => navigation.navigate("Checkout")}
          >

            <Text style={styles.checkoutText}>Finalizar Compra</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }

  <StatusBar style="auto" />
  </View >
  );
}