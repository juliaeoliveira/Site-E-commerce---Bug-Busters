import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from "./style";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getPerfil } from "../../services/api";

export default function DadosConta({ navigation }) {
  const [perfil, setPerfil] = useState({
    nome: '',
    email: '',
    telefone: ''
  });

  async function carregarPerfil() {
    try {
      const data = await getPerfil();
      setPerfil({
        nome: data.nome,
        email: data.email,
        telefone: data.telefone
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarPerfil();
    }, [])
  );

  return (
    <ScrollView style={styles.body}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" style={styles.foto} size={60} />
        <Text style={styles.username}>{perfil.nome || 'eai, Pedro'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Dados da Conta</Text>

        {/* Nome */}
        <View style={styles.row}>
          <Text style={styles.label}>Nome completo: </Text>
          <Text style={styles.value}>{perfil.nome || '-'}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditarNome')}>
            <MaterialIcons name="edit" size={24} />
          </TouchableOpacity>
        </View>

        {/* Email */}
        <View style={styles.row}>
          <Text style={styles.label}>Email: </Text>
          <Text style={styles.value}>{perfil.email || '-'}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditarEmail')}>
            <MaterialIcons name="edit" size={24} />
          </TouchableOpacity>
        </View>

        {/* Telefone */}
        <View style={styles.row}>
          <Text style={styles.label}>Telefone: </Text>
          <Text style={styles.value}>{perfil.telefone || '-'}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditarTelefone')}>
            <MaterialIcons name="edit" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}