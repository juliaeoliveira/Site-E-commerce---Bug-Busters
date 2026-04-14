import { View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from "./style";
import { CreateUser } from "../../services/api";
import { useState } from "react";
import { Alert } from "react-native";

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  async function handleCadastro() {
    try {
      if (!nome || !email || !senha || !confirmarSenha) {
        Alert.alert("Erro", "Preencha todos os campos!");
        return;
      }

      if (senha !== confirmarSenha) {
        Alert.alert("Erro", "As senhas não coincidem!");
        return;
      }

      const userData = {
        nome_cliente: nome,
        data_nascimento: formatarData(dataNascimento),
        telefone,
        email,
        senha,
        confirmar_senha: confirmarSenha
      };

      await CreateUser(userData);

      Alert.alert("Sucesso", "Conta criada com sucesso!");

      navigation.navigate("login");

    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  }

  function formatarData(data) {
    const partes = data.split("/"); // ["25","12","2000"]

    if (partes.length !== 3) return data;

    const [dia, mes, ano] = partes;

    return `${ano}-${mes}-${dia}`;
  }
  return (
    <View style={styles.container}>

      {/* IMAGEM DE FUNDO */}
      <ImageBackground
        source={require("../../assets/images/casamento.jpg")}
        style={styles.topo}
      >
        <Text style={styles.titulo}>Realize seu cadastro</Text>
      </ImageBackground>

      {/* FORMULÁRIO */}
      <View style={styles.formContainer}>

        <Text style={styles.label} >Nome Completo</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

        <Text style={styles.label}>Data de Nascimento</Text>
        <TextInput style={styles.input} placeholder="DD/MM/AAAA" value={dataNascimento} onChangeText={setDataNascimento} />

        <Text style={styles.label}>Telefone</Text>
        <TextInput style={styles.input} placeholder="(11) 99999-9999" value={telefone} onChangeText={setTelefone} />

        <Text style={styles.label}>E-mail</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} secureTextEntry value={senha} onChangeText={setSenha} />

        <Text style={styles.label}>Confirmar senha</Text>
        <TextInput style={styles.input} secureTextEntry value={confirmarSenha} onChangeText={setConfirmarSenha} />

        <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
          <Text style={styles.textoBotao}>Criar conta</Text>
        </TouchableOpacity>

        <Text
          style={styles.login}
          onPress={() => navigation.navigate('login')}
        >
          Já possui login? Login.
        </Text>

      </View>
    </View>
  );
}