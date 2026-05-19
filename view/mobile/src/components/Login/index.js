import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { styles } from "./style";
import { Login as LoginApi } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useFocusEffect(
    useCallback(() => {
      async function verificarToken() {
        const token = await AsyncStorage.getItem("token");

        if (token) {
          navigation.navigate("perfil");
        }
      }

      verificarToken();
    }, [])
  );

  async function handleLogin() {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Erro", "Email inválido!");
      return;
    }

    try {
      const data = await LoginApi(email, senha);
      
      // salvar token
      await AsyncStorage.setItem("token", data.access_token);
      console.log("Token salvo:", data.access_token);

      Alert.alert("Sucesso", "Login realizado!");

      // força atualização
     navigation.reset({
      index: 0,
      routes: [{ name: "login" }],
    });
    } catch (error) {
          Alert.alert("Erro", error.message);
          console.log(error);
        }
      }

  const isDisabled = !email || !senha;

  return (
    <View style={styles.container}>

      {/* IMAGEM DE CIMA */}
      <ImageBackground
        source={require("../../assets/images/noiva.jpg")}
        style={styles.topo}
      >
      </ImageBackground>

      {/* CARD */}
      <View style={styles.content}>

        <Text style={styles.title}>Bem-vinda de volta</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Digite seu email"
          placeholderTextColor="#523800"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          placeholderTextColor="#523800"
          secureTextEntry
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          style={[styles.button, isDisabled && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isDisabled}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.texto}>
          Não possui uma conta?{" "}
          <Text
            style={styles.cadastro}
            onPress={() => navigation.navigate("cadastro")}
          >
            Cadastre-se
          </Text>
        </Text>

      </View>
    </View>
  );
}