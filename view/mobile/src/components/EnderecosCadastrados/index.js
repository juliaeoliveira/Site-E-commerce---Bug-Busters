import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  editable,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator
} from 'react-native';
import { styles } from "./style";
import { Ionicons } from '@expo/vector-icons';
import { useState, useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { getEnderecos, editarEndereco } from "../../services/api";

export default function Endereco({ navigation }) {
  const [dados, setDados] = useState(null);
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const [temEndereco, setTemEndereco] = useState(true);

  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  async function carregarDados() {
    try {
      setLoading(true);
      const response = await getEnderecos();

      // se vier lista, pega o primeiro
      const endereco = Array.isArray(response) ? response[0] : response;

      if (endereco) {
        setDados(endereco);
        setTemEndereco(true);
      } else {
        setTemEndereco(false);
      }
    } catch (error) {
      console.log(error.message);

      if (error.message && error.message.includes("Nenhum endereço")){
        setTemEndereco(false);
      }
    } finally {
      setLoading(false);
    }
  }

  async function buscarCEP(cep) {
    try {
      const cepLimpo = cep.replace(/\D/g, "");

      if (cepLimpo.length !== 8) return;

      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        Alert.alert("Erro", "CEP não encontrado");
        return;
      }

      // Preenche os campos automaticamente
      setRua(data.logradouro || "");
      setBairro(data.bairro || "");
      setCidade(data.localidade || "");
      setEstado(data.uf || "");

    } catch (error) {
      Alert.alert("Erro", "Erro ao buscar CEP");
    }
  }

  function abrirModal() {
    setCep(dados?.cep || "");
    setRua(dados?.rua || "");
    setNumero(dados?.numero || "");
    setComplemento(dados?.complemento || "");
    setBairro(dados?.bairro || "");
    setCidade(dados?.cidade || "");
    setEstado(dados?.estado || "");

    setModalVisible(true);
  }

  function normalizarEstado(estado) {
  if (!estado) return "";

  const estados = {
    "acre": "AC", "alagoas": "AL", "amapá": "AP", "amazonas": "AM",
    "bahia": "BA", "ceará": "CE", "distrito federal": "DF",
    "espírito santo": "ES", "goiás": "GO", "maranhão": "MA",
    "mato grosso": "MT", "mato grosso do sul": "MS",
    "minas gerais": "MG", "pará": "PA", "paraíba": "PB",
    "paraná": "PR", "pernambuco": "PE", "piauí": "PI",
    "rio de janeiro": "RJ", "rio grande do norte": "RN",
    "rio grande do sul": "RS", "rondônia": "RO",
    "roraima": "RR", "santa catarina": "SC",
    "são paulo": "SP", "sergipe": "SE", "tocantins": "TO"
  };

  const estadoFormatado = estado.trim().toLowerCase();

  // se já vier tipo "SP", mantém
  if (estadoFormatado.length === 2) {
    return estadoFormatado.toUpperCase();
  }

  return estados[estadoFormatado] || estado.toUpperCase();
}

  async function handleSalvar() {
    try {
      if (!cep || !rua || !numero || !bairro || !cidade || !estado) {
        Alert.alert("Erro", "Preencha os campos obrigatórios!");
        return;
      }

      const dadosEnvio = {
        cep,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado: normalizarEstado(estado)
      };

      await editarEndereco(dadosEnvio);

      Alert.alert("Sucesso", "Endereço atualizado!");
      setModalVisible(false);

      navigation.reset({
        index: 0,
        routes: [{ name: "perfil" }],
      });

    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  }

  function formatarCEP(texto) {
    let numeros = texto.replace(/\D/g, "").slice(0, 8);

    if (numeros.length > 5) {
      return `${numeros.slice(0,5)}-${numeros.slice(5)}`;
    }

    return numeros;
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
        <Ionicons name="location-outline" size={80} color="#fff" />
        <Text style={styles.username}>
          Endereço
        </Text>
      </View>

      {!temEndereco ? (
        // NÃO TEM ENDEREÇO
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
        // TEM ENDEREÇO
        <>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Seu Endereço</Text>

        <Info label="CEP:" value={dados?.cep} />
        <Info label="Rua:" value={dados?.rua} />
        <Info label="Número:" value={dados?.numero} />
        <Info label="Complemento:" value={dados?.complemento} />
        <Info label="Bairro:" value={dados?.bairro} />
        <Info label="Cidade:" value={dados?.cidade} />
        <Info label="Estado:" value={dados?.estado} />

        <TouchableOpacity
          style={styles.botaoEditar}
          onPress={abrirModal}
        >
          <Text style={styles.textoBotao}>Editar endereço</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>

          <Text style={styles.sectionTitle}>
            Editar Endereço
          </Text>

          <Input label="CEP" value={cep}
            onChange={(text) => {
              const cepFormatado = formatarCEP(text);
              setCep(cepFormatado);
            
              // dispara busca automática quando completar
              if (cepFormatado.length === 9) {
                buscarCEP(cepFormatado);
                
              }
            }}
          />
          <Input label="Rua" value={rua} onChange={setRua} editable={false} />
          <Input label="Número" value={numero} onChange={setNumero} />
          <Input label="Complemento" value={complemento} onChange={setComplemento} />
          <Input label="Bairro" value={bairro} onChange={setBairro} editable={false} />
          <Input label="Cidade" value={cidade} onChange={setCidade} editable={false} />
          <Input label="Estado" value={estado} onChange={setEstado} editable={false} />

          <TouchableOpacity
            style={styles.botaoSalvar}
            onPress={handleSalvar}
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
      </>
    )}
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

function Input({ label, value, onChange, editable = true }) {
  return (
    <View style={styles.inputBox}>
      <Text style={styles.inputLabel}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChange}
        style={styles.input}
        editable={editable}
      />
    </View>
  );
}