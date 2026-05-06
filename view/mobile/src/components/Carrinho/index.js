import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { styles } from "./style";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function Carrinho({ navigation }) {

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

  function aumentar(id) {
    setCart(cart.map(item =>
      item.id === id ? { ...item, qtd: item.qtd + 1 } : item
    ));
  }

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

  return (
    <View style={styles.body}>

      <View style={styles.header}>
        <Ionicons name="cart-outline" size={35} />
        <Text style={styles.title}>Meu Carrinho</Text>
      </View>

      {cart.length === 0 ? (
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

            <TouchableOpacity style={styles.checkout}>
              <Text style={styles.checkoutText}>Finalizar Compra</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <StatusBar style="auto" />
    </View>
  );
}