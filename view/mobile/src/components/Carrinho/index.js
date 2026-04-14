import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from "./style";
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function Carrinho( {navegation}) {
  return (
    <View style={styles.body}>

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={40} />
        <Text style={styles.username}>Pedro H Nascimento</Text>
      </View>

      {/* Sua Conta */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Sua Conta</Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.item}>

            <MaterialIcons name="manage-accounts" size={28} />
            <Text>Dados da conta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Ionicons name="location-outline" size={28} />
            <Text>Endereços cadastrados</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Pedidos */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Pedidos</Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.item}>
            <FontAwesome5 name="shopping-bag" size={24} />
            <Text>Seus pedidos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Ionicons name="cart-outline" size={28} />
            <Text>Comprar novamente</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Suporte */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Suporte</Text>

        <View style={styles.supportItem}>
          <Ionicons name="logo-whatsapp" size={20} />
          <Text style={styles.supportText}>(11) 98291-1653</Text>
        </View>

        <View style={styles.supportItem}>
          <Ionicons name="mail-outline" size={20} />
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