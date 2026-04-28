import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert
} from "react-native";
import { styles } from "./style";
import { criarEndereco } from "../../services/api";

export default function CadastrarEndereco({ navigation }) {

  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [complemento, setComplemento] = useState("");

  // =========================
  // FORMATA CEP
  // =========================
  function formatarCEP(texto) {
    let numeros = texto.replace(/\D/g, "").slice(0, 8);

    if (numeros.length > 5) {
      return `${numeros.slice(0, 5)}-${numeros.slice(5)}`;
    }
    return numeros;
  }

  // =========================
  // VIA CEP
  // =========================
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

      setRua(data.logradouro || "");
      setBairro(data.bairro || "");
      setCidade(data.localidade || "");
      setEstado(data.uf || "");

    } catch {
      Alert.alert("Erro", "Erro ao buscar CEP");
    }
  }

  // =========================
  // NORMALIZAR ESTADO
  // =========================
  function normalizarEstado(estado) {
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

    const chave = estado.toLowerCase().trim();

    // já é sigla
    if (estado.length === 2) {
      return estado.toUpperCase();
    }

    return estados[chave] || estado.toUpperCase();
  }

  // =========================
  // VALIDAÇÃO
  // =========================
  function validar() {
    if (!cep || cep.length < 9) {
      Alert.alert("Erro", "CEP inválido");
      return false;
    }

    if (!rua || !numero || !bairro || !cidade || !estado) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios");
      return false;
    }

    return true;
  }

  // =========================
  // SALVAR
  // =========================
  async function handleSalvar() {
    try {
      if (!validar()) return;

      const dados = {
        cep,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado: normalizarEstado(estado)
      };

      await criarEndereco(dados);

      Alert.alert("Sucesso", "Endereço cadastrado!");

      navigation.reset({
        index: 0,
        routes: [{ name: "home" }],
      });

    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.titulo}>Cadastrar Endereço</Text>
        </View>

        {/* FORM */}
        <View style={styles.form}>

          <TextInput
            placeholder="CEP:"
            style={styles.input}
            value={cep}
            onChangeText={(text) => {
              const formatado = formatarCEP(text);
              setCep(formatado);

              if (formatado.length === 9) {
                buscarCEP(formatado);
              }
            }}
            keyboardType="numeric"
          />

          <TextInput label="Rua:"    placeholder="Ex: Rua das Flores" style={styles.input} value={rua} onChangeText={setRua} editable={false}/>
          <TextInput label="Número:" placeholder="Ex: 123" style={styles.input} value={numero} onChangeText={setNumero} />
          <TextInput label="Bairro:" placeholder="Ex: Vila Madalena" style={styles.input} value={bairro} onChangeText={setBairro} editable={false}/>
          <TextInput label="Cidade:" placeholder="Ex: São Paulo" style={styles.input} value={cidade} onChangeText={setCidade} editable={false}/>
          <TextInput label="Estado:" placeholder="Ex: São Paulo"style={styles.input} value={estado} onChangeText={setEstado} editable={false} />

          <TextInput
            placeholder="Complemento (opcional):"
            style={styles.input}
            value={complemento}
            onChangeText={setComplemento}
          />

          {/* BOTÃO SALVAR */}
          <TouchableOpacity style={styles.botao} onPress={handleSalvar}>
            <Text style={styles.textoBotao}>Salvar</Text>
          </TouchableOpacity>

          {/* CANCELAR */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancelar}>Cancelar</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}