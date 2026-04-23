import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getEnderecos } from "../../services/api";
import { styles } from "./style";

export default function Enderecos({ navigation }) {
  const [endereco, setEndereco] = useState(null);
  const [loading, setLoading] = useState(true);
  const [temEndereco, setTemEndereco] = useState(true);

  async function carregarEndereco() {
    try {
      setLoading(true);
      const data = await getEnderecos();
      setEndereco(data);
      setTemEndereco(true);
    } catch (error) {
      console.log(error.message);

      // 👇 se vier 404 da API
      if (error.message.includes("Nenhum endereço")) {
        setTemEndereco(false);
      }
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarEndereco();
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

      <Text style={styles.title}>Endereço</Text>

      {!temEndereco ? (
        // 🔥 NÃO TEM ENDEREÇO
        <View style={styles.card}>
          <Text style={styles.emptyText}>
            Você ainda não possui um endereço cadastrado.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("criarEndereco")}
          >
            <Text style={styles.buttonText}>Cadastrar endereço</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // ✅ TEM ENDEREÇO
        <>
          <View style={styles.card}>
            <Text style={styles.label}>CEP</Text>
            <Text style={styles.value}>{endereco?.cep}</Text>

            <Text style={styles.label}>Rua</Text>
            <Text style={styles.value}>{endereco?.rua}</Text>

            <Text style={styles.label}>Número</Text>
            <Text style={styles.value}>{endereco?.numero}</Text>

            <Text style={styles.label}>Complemento</Text>
            <Text style={styles.value}>{endereco?.complemento}</Text>

            <Text style={styles.label}>Bairro</Text>
            <Text style={styles.value}>{endereco?.bairro}</Text>

            <Text style={styles.label}>Cidade</Text>
            <Text style={styles.value}>{endereco?.cidade}</Text>

            <Text style={styles.label}>Estado</Text>
            <Text style={styles.value}>{endereco?.estado}</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("editarEndereco")}
          >
            <Text style={styles.buttonText}>Editar endereço</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}