import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getDadosConta } from "../../services/api";
import { styles } from "./style";

export default function DadosConta({ navigation }) {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);

  async function carregarDados() {
    try {
      setLoading(true);
      const response = await getDadosConta();
      setDados(response);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Dados da Conta</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.value}>{dados?.nome}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{dados?.email}</Text>

        <Text style={styles.label}>Data de nascimento</Text>
        <Text style={styles.value}>{dados?.data_nascimento}</Text>

        <Text style={styles.label}>Telefone</Text>
        <Text style={styles.value}>{dados?.telefone}</Text>
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate("editarConta")}
      >
        <Text style={styles.buttonText}>Editar dados</Text>
      </TouchableOpacity>

    </View>
  );
}