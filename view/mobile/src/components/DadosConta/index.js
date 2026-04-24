import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator
} from 'react-native';
import { styles } from "./style";
import { Ionicons } from '@expo/vector-icons';
import { useState, useCallback  } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { getDadosConta, editarUsuario } from "../../services/api";

export default function DadosConta({ navigation }) {
  const [dados, setDados] = useState(null);
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);


  const [modalVisible, setModalVisible] = useState(false);
  const [perfilEditando, setPerfilEditando] = useState({});
  const [erroSenha, setErroSenha] = useState('');

  function formatarDataParaInput(dataISO) {
    if (!dataISO) return "";

    const data = new Date(dataISO);

    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  function formatarTelefoneParaInput(numero) {
    if (!numero) return "";
    
    let numeros = numero.replace(/\D/g, "").slice(0, 11);
    
    if (numeros.length > 10) {
      return `(${numeros.slice(0,2)}) ${numeros.slice(2,7)}-${numeros.slice(7)}`;
    } else if (numeros.length > 6) {
      return `(${numeros.slice(0,2)}) ${numeros.slice(2,6)}-${numeros.slice(6)}`;
    } else if (numeros.length > 2) {
      return `(${numeros.slice(0,2)}) ${numeros.slice(2)}`;
    }
  
    return numeros;
  }

  function formatarData(data) {
    const partes = data.split("/");
    if (partes.length !== 3) return data;

    const [dia, mes, ano] = partes;
    return `${ano}-${mes}-${dia}`;
  }

  function formatarInputData(texto) {
    let numeros = texto.replace(/\D/g, "").slice(0, 8);

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
      return `(${numeros.slice(0,2)}) ${numeros.slice(2,7)}-${numeros.slice(7)}`;
    } else if (numeros.length > 6) {
      return `(${numeros.slice(0,2)}) ${numeros.slice(2,6)}-${numeros.slice(6)}`;
    } else if (numeros.length > 2) {
      return `(${numeros.slice(0,2)}) ${numeros.slice(2)}`;
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

  function abrirModal() {
    setNome(dados?.nome || "");
    setEmail(dados?.email || "");
    setTelefone(formatarTelefoneParaInput(dados?.telefone));
    setDataNascimento(formatarDataParaInput(dados?.data_nascimento));

    setPerfilEditando({
      senha: "",
      senha_confirmar: ""
    });

    setErroSenha('');
    setModalVisible(true);
  }

  function validarSenha() {
    if (perfilEditando.senha.length < 6) {
      setErroSenha('Senha precisa ter pelo menos 6 caracteres');
      return false;
    }

    if (perfilEditando.senha !== perfilEditando.senha_confirmar) {
      setErroSenha('As senhas não coincidem');
      return false;
    }

    setErroSenha('');
    return true;
  }

  function salvar() {
    if (!validarSenha()) return;

    setPerfil(perfilEditando);
    setModalVisible(false);
  }

  async function handleSalvar() {
      try {
        if (!nome || !email) {
          Alert.alert("Erro", "Preencha todos os campos!");
          return;
        }
  
        if (!validarData(dataNascimento)) {
          Alert.alert("Erro", "Data inválida!");
          return;
        }
  
        if (!validarEmail(email)) {
          Alert.alert("Erro", "Email inválido!");
          return;
        }
  
        const dados = {
          nome_cliente: nome,
          email,
          data_nascimento: formatarData(dataNascimento),
          telefone
        };
  
        await editarUsuario(dados);
  
        Alert.alert("Sucesso", "Dados atualizados!");
        setModalVisible(false);
        navigation.reset({
          index: 0,
          routes: [{ name: "home" }],
        });
  
      } catch (error) {
        Alert.alert("Erro", error.message);
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
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={80} color="#fff" marginTop={30} />
        <Text style={styles.username}>
          {dados?.nome || 'Usuário'}
        </Text>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Dados da Conta</Text>

        <Info label="Nome:" value={dados?.nome} />
        <Info label="Email:" value={dados?.email} />
        <Info label="Telefone:" value={formatarTelefoneParaInput(dados?.telefone)} />
        <Info label="Data de Nascimento:" value={formatarDataParaInput(dados?.data_nascimento)} />
        <Info label="Senha:" placeholder='••••••••'/>

        <TouchableOpacity
          style={styles.botaoEditar}
          onPress={abrirModal}
        >
          <Text style={styles.textoBotao}>Editar dados</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>

          <Text style={styles.sectionTitle}>
            Editar Perfil
          </Text>

          <Input label="Nome" value={nome}
            onChange={setNome}
          />

          <Input label="Email" value={email}
            onChange={setEmail}
          />

          <Input label="Telefone" value={formatarTelefoneParaInput(telefone)}
            onChange={(text) => setTelefone(formatarTelefone(text))}
          />

          <Input label="Data de Nascimento" value={dataNascimento}
            onChange={(text) => setDataNascimento(formatarInputData(text))}
            keyboardType="numeric"
          />

          <Input label="Senha" secure
            value={perfilEditando.senha}
            onChange={(t) =>
              setPerfilEditando(p => ({ ...p, senha: t }))
            }
          />

          <Input label="Confirmar senha" secure
            value={perfilEditando.senha_confirmar}
            onChange={(t) =>
              setPerfilEditando(p => ({ ...p, senha_confirmar: t }))
            }
          />

          {erroSenha ? (
            <Text style={styles.erro}>
              {erroSenha}
            </Text>
          ) : null}

          <TouchableOpacity
            style={styles.botaoSalvar}
            onPress={() => { 
            handleSalvar(); 
            salvar();
          }}
          >
            <Text style={styles.textoBotao}>
              Salvar alterações
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelar}>
              Cancelar
            </Text>
          </TouchableOpacity>

        </View>
      </Modal>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

/* COMPONENTES AUXILIARES */

function Info({ label, value, placeholder }) {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || placeholder || '-'}</Text>
    </View>
  );
}

function Input({ label, value, onChange, secure }) {
  return (
    <View style={styles.inputBox}>
      <Text style={styles.inputLabel}>{label}</Text>

      <TextInput
        value={value}
        secureTextEntry={secure}
        onChangeText={onChange}
        style={styles.input}
      />
    </View>
  );
}