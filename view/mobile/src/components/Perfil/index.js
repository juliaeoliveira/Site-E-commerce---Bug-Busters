import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from "./style";
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { getPerfil } from "../../services/api";


export default function Perfil( {navigation}) {
  const [nome, setNome] = useState("");

async function carregarPerfil() {
  try {
    const data = await getPerfil();
    setNome(data.nome);
  } catch (error) {
    console.log(error.message);
  }
}

async function handleLogout() {
  try {
    await AsyncStorage.removeItem("token");
    
    navigation.reset({
      index: 0,
      routes: [{ name: "login" }],
    });
    
  } catch (error) {
    console.log("Erro ao sair:", error);
  }
}

useFocusEffect(
  useCallback(() => {
    carregarPerfil();
  }, [])
);

  return (
    <View style={styles.body}>

   <View style={styles.header}>
  <Ionicons name="person-circle-outline" style={styles.foto} size={40} />

  <View>
    <Text style={styles.username}>{nome ? nome : "Carregando..."}</Text>

    <TouchableOpacity style={styles.botaoSair} onPress={handleLogout}>
      <Text style={styles.textoBotaoSair}>Sair</Text>
    </TouchableOpacity>
  </View>
</View>


      {/* Sua Conta */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Sua Conta</Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("dadosConta")}>

            <MaterialIcons name="manage-accounts" size={28} />
            <Text>Dados da conta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("endereco")}>
            <Ionicons name="location-outline" size={28}  />
            <Text>Endereços cadastrados</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Pedidos */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Pedidos</Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("pedidos")}>
            <FontAwesome5 name="shopping-bag" size={24} />
            <Text>Seus pedidos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("comprarNovamente")}>
            <Ionicons name="cart-outline" size={28} />
            <Text>Comprar novamente</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Suporte */}
      <View style={styles.cards}>
        <Text style={styles.sectionTitles}>Suporte</Text>

        <View style={styles.supportItem}>
          <Ionicons name="logo-whatsapp" size={20} color="white"/>
          <Text style={styles.supportText}>(11) 98291-1653</Text>
        </View>

        <View style={styles.supportItem}>
          <Ionicons name="mail-outline" size={20} color="white" />
          <Text style={styles.supportText}>sobveuoficial@gmail.com</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.link}>Trocas e Devoluções</Text>
        <Text style={styles.link}>Fretes e Entregas</Text>
        <Text style={styles.link}>Política de Privacidade</Text>
        <Text style={styles.link}>Termos de Uso</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}