import { View, Text, TextInput, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import { styles } from "./style";
import { CreateUser } from "../../services/api";
import { useState, useMemo } from "react";
import { Alert } from "react-native";

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const requisitossenha = useMemo(() => [
    { id: "len",     ok: senha.length >= 8,                   label: "Mínimo 8 caracteres" },
    { id: "upper",   ok: /[A-Z]/.test(senha),                 label: "Uma letra maiúscula" },
    { id: "lower",   ok: /[a-z]/.test(senha),                 label: "Uma letra minúscula" },
    { id: "num",     ok: /\d/.test(senha),                    label: "Um número" },
    { id: "special", ok: /[@#$%^&+=!\-]/.test(senha),         label: "Um caractere especial (@#$%^&+=!-)" },
    { id: "space",   ok: senha.length > 0 && !/ /.test(senha), label: "Sem espaços" },
  ], [senha]);

  const senhaValida = requisitossenha.every((r) => r.ok);
  const senhasIguais = senha === confirmarSenha && confirmarSenha.length > 0;
  const formularioValido = senhaValida && senhasIguais;

  function formatarData(data) {
  const partes = data.split("/"); // ["25","12","2000"]

  if (partes.length !== 3) return data;

  const [dia, mes, ano] = partes;

  return `${ano}-${mes}-${dia}`;
}

  function formatarInputData(texto) {
  // Remove tudo que não for número
  let numeros = texto.replace(/\D/g, "");

  // Limita a 8 dígitos (DDMMAAAA)
  numeros = numeros.slice(0, 8);

  // Adiciona as barras automaticamente
  if (numeros.length >= 5) {
    return `${numeros.slice(0,2)}/${numeros.slice(2,4)}/${numeros.slice(4)}`;
  } else if (numeros.length >= 3) {
    return `${numeros.slice(0,2)}/${numeros.slice(2)}`;
  }

  return numeros;
}

function formatarTelefone(texto) {
  let numeros = texto.replace(/\D/g, "").slice(0, 11);

  if (numeros.length > 10) {
    return `(${numeros.slice(0,2)}) ${numeros.slice(2,7)}-${numeros.slice(7)}`;// para celular com 9 dígitos
  } else if (numeros.length > 6) {
    return `(${numeros.slice(0,2)}) ${numeros.slice(2,6)}-${numeros.slice(6)}`;// para telefone fixo ou celular com 8 dígitos
  } else if (numeros.length > 2) {
    return `(${numeros.slice(0,2)}) ${numeros.slice(2)}`;// para quando o usuário ainda está digitando o número
  }

  return numeros;
}

function validarData(data) {
  const [dia, mes, ano] = data.split("/").map(Number);

  if (!dia || !mes || !ano) return false;

  const dataObj = new Date(ano, mes - 1, dia);

  return (
    dataObj.getFullYear() === ano &&
    dataObj.getMonth() === mes - 1 &&
    dataObj.getDate() === dia
  );
}

  function validarEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

  async function handleCadastro() {
  try {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    if (!validarData(dataNascimento)) {
      Alert.alert("Erro", "Data de nascimento inválida!");
      return;
    }
// para que nao seja uma data maluca tipo 99/99/9999

    if (!senhaValida) {
      Alert.alert("Erro", "A senha não atende aos requisitos!");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert("Erro", "E-mail inválido!");
      return;
    }
// pelo menos 1 caractere que não seja espaço
// precisa ter um @
// 	mais caracteres (domínio)
// um ponto .
// mais caracteres (tipo .com)

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

  return (
    <View style={styles.container}>

      {/* IMAGEM DE FUNDO */}
      <ImageBackground
        source={require("../../assets/images/casamento.jpg")}
        style={styles.topo}
      >
        
      </ImageBackground>

      {/* FORMULÁRIO */}
      <ScrollView
        style={styles.formContainer}
        contentContainerStyle={styles.formContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.title}>Realize seu cadastro</Text>

        <Text style={styles.label}>Nome Completo</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

        <Text style={styles.label}>Data de Nascimento</Text>
        <TextInput style={styles.input} value={dataNascimento} onChangeText={(text) => setDataNascimento(formatarInputData(text))} placeholder="DD/MM/AAAA" keyboardType="numeric" />

        <Text style={styles.label}>Telefone</Text>
        <TextInput style={styles.input} value={telefone} onChangeText={(text) => setTelefone(formatarTelefone(text))} placeholder="(11) 99999-9999" />

        <Text style={styles.label}>E-mail</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry />

        {/* REQUISITOS DA SENHA */}
        {senha.length > 0 && (
          <View style={styles.requisitosContainer}>
            {requisitossenha.map((req) => (
              <View key={req.id} style={styles.requisitoLinha}>
                <Text style={req.ok ? styles.requisitoIconOk : styles.requisitoIconFail}>
                  {req.ok ? "✓" : "✗"}
                </Text>
                <Text style={req.ok ? styles.requisitoTextoOk : styles.requisitoTextoFail}>
                  {req.label}
                </Text>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.label}>Confirmar senha</Text>
        <TextInput style={styles.input} value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry />

        {/* FEEDBACK CONFIRMAÇÃO */}
        {confirmarSenha.length > 0 && (
          <Text style={senhasIguais ? styles.senhaOk : styles.senhaFail}>
            {senhasIguais ? "✓ Senhas coincidem" : "✗ Senhas não coincidem"}
          </Text>
        )}

        <TouchableOpacity
          style={[styles.botao, !formularioValido && styles.botaoInativo]}
          onPress={handleCadastro}
          disabled={!formularioValido}
        >
          <Text style={styles.textoBotao}>Criar conta</Text>
        </TouchableOpacity>

        <Text style={styles.login}>
          Já possui login? {" "}
          <Text
          style={styles.entre}
          onPress={() => navigation.navigate('login')}
          >
           Login.
          </Text>
        </Text>


      </ScrollView>
    </View>
  );
}