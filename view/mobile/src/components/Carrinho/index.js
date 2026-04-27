import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
import { styles } from "./style";
import { Ionicons } from "@expo/vector-icons";

export default function Endereco() {
  const [tela, setTela] = useState("lista");
  const [endereco, setEndereco] = useState(null);

  const [form, setForm] = useState({
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
  });

  function salvarEndereco() {
    setEndereco(form);
    setTela("lista");
  }

  // ===== TELA PRINCIPAL =====
  if (tela === "lista") {
    return (
      <View style={styles.container}>
       
        <View style={styles.header}>
          <Ionicons name="location-sharp" size={50} color="#fff" />
          <Text style={styles.titulo}>Endereço</Text>
        </View>

      
        <View style={styles.box}>
          {!endereco ? (
            <>
              <Text style={styles.texto}>
                Você ainda não possui um endereço cadastrado.
              </Text>

              <TouchableOpacity onPress={() => setTela("form")}>
                <Text style={styles.link}>Cadastrar endereço</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.texto}>Seu endereço:</Text>
              <Text style={styles.dado}>Rua: {endereco.rua}, {endereco.numero}</Text>
              <Text style={styles.dado}>Bairro: {endereco.bairro}</Text>
              <Text style={styles.dado}>Cidade: {endereco.cidade}   -   Estado: {endereco.estado}</Text>
              <Text style={styles.dado}>CEP: {endereco.cep}</Text>
              <Text style={styles.dado}>Complemento: {endereco.complemento}</Text>

              <TouchableOpacity onPress={() => setTela("form")}>
                <Text style={styles.link}>Editar endereço</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  }

  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Cadastrar Endereço</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="Rua:"
          style={styles.input}
          onChangeText={(t) => setForm({ ...form, rua: t })}
        />

        <TextInput
          placeholder="Número:"
          style={styles.input}
          onChangeText={(t) => setForm({ ...form, numero: t })}
        />

        <TextInput
          placeholder="Bairro:"
          style={styles.input}
          onChangeText={(t) => setForm({ ...form, bairro: t })}
        />

        <TextInput
          placeholder="Cidade:"
          style={styles.input}
          onChangeText={(t) => setForm({ ...form, cidade: t })}  
        />

        <TextInput
          placeholder="Estado:"
          style={styles.input}
          onChangeText={(t) => setForm({ ...form, estado: t })}
        />

        <TextInput
          placeholder="CEP:"
          style={styles.input}
          onChangeText={(t) => setForm({ ...form, cep: t })}
        />

        <TextInput
          placeholder="Complemento (opcional):"
          style={styles.input}
          onChangeText={(t) => setForm({ ...form, complemento: t })}
        />

        <TouchableOpacity style={styles.botao} onPress={salvarEndereco}>
          <Text style={styles.botaoTexto}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setTela("lista")}>
          <Text style={styles.cancelar}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}