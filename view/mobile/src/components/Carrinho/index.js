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
      img: require("../../assets/images/coleção3.jpg") 
    },
    { 
      id: 2, 
      nome: "Amor sem fim", 
      preco: 199.90, 
      qtd: 1, 
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

  const total = cart.reduce((sum, item) => sum + item.preco * item.qtd, 0);

  return (
    <View style={styles.body}>

      <View style={styles.header}>
        <Ionicons name="cart-outline" size={35} />
        <Text style={styles.title}>Meu Carrinho</Text>
      </View>

      <View style={styles.card}>
        {cart.map(item => (
          <View key={item.id} style={styles.item}>

            {/* 👇 AGORA FUNCIONA */}
            <Image source={item.img} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>

              <View style={styles.controls}>
                <TouchableOpacity onPress={() => diminuir(item.id)} style={styles.btn}>
                  <Text>-</Text>
                </TouchableOpacity>

                <Text style={styles.qtd}>{item.qtd}</Text>

                <TouchableOpacity onPress={() => aumentar(item.id)} style={styles.btn}>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.linha}>
                _________________________________________
              </Text>
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

      <StatusBar style="auto" />
    </View>
  );
}