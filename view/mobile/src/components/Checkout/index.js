// index.js

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Image,
  Modal,
  FlatList,

} from "react-native";

import { useState } from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./style";

import { checkoutMobile, getEnderecos, criarEndereco } from "../../services/api";

import { Ionicons } from "@expo/vector-icons";


export default function Checkout({ navigation }) {

  const [enderecosSalvos, setEnderecosSalvos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
  const [adicionandoNovoEndereco, setAdicionandoNovoEndereco] = useState(false);
  const [carregandoEnderecos, setCarregandoEnderecos] = useState(true);

  const [novoEndereco, setNovoEndereco] = useState({
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const [pagamento, setPagamento] = useState(null);

  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        // Carrega carrinho do AsyncStorage
        const storedCart = await AsyncStorage.getItem("carrinho");
        if (storedCart) {
          setCarrinho(JSON.parse(storedCart));
        }

        // Carrega endereços salvos
        const enderecos = await getEnderecos();
        if (enderecos && Array.isArray(enderecos)) {
          setEnderecosSalvos(enderecos);
          if (enderecos.length > 0) {
            // Seleciona o primeiro endereço como padrão
            setEnderecoSelecionado(enderecos[0]);
          }
        } else if (enderecos) {
          // Se retornar um único endereço (não é array)
          setEnderecosSalvos([enderecos]);
          setEnderecoSelecionado(enderecos);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        Alert.alert("Aviso", "Nenhum endereço cadastrado. Adicione um para continuar.");
      } finally {
        setCarregandoEnderecos(false);
      }
    };

    carregarDados();
  }, []);

  const frete = 50;

  const subtotal = carrinho.reduce(
    (acc, item) => acc + (item.preco * item.qtd),
    0
  );

  const total = subtotal + frete;

  async function finalizarCompra() {
    if (!enderecoSelecionado) {
      Alert.alert("Atenção", "Selecione um endereço antes de finalizar.");
      return;
    }

    if (!pagamento) {
      Alert.alert("Atenção", "Selecione um método de pagamento antes de finalizar.");
      return;
    }

    const metodoPagamento = pagamento === "Pix"
      ? "pix"
      : pagamento === "Cartão"
      ? "debito"
      : "boleto";

    const dados = {
      metodo_pagamento: metodoPagamento,
      frete,
      itens: carrinho.map((item) => ({
        id_produto: item.id,
        tamanho: item.tamanho,
        quantidade: item.qtd,
        preco_unitario: item.preco,
        subtotal: item.preco * item.qtd
      }))
    };

    try {
      const resposta = await checkoutMobile(dados);
      await AsyncStorage.removeItem("carrinho");
      Alert.alert("Sucesso", `Pedido enviado com sucesso! ID: ${resposta.id_pedido}`);
      navigation.navigate("pedidos");
    } catch (error) {
      console.error("Erro checkout:", error);
      Alert.alert("Erro", error.message || "Não foi possível finalizar o pedido.");
    }
  }

  async function salvarNovoEndereco() {
    if (
      !novoEndereco.cep ||
      !novoEndereco.rua ||
      !novoEndereco.numero
    ) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    try {
      const enderecoCriado = await criarEndereco(novoEndereco);
      
      setEnderecosSalvos([...enderecosSalvos, enderecoCriado]);
      setEnderecoSelecionado(enderecoCriado);
      setAdicionandoNovoEndereco(false);
      setNovoEndereco({
        cep: "",
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
      });
      
      Alert.alert("Sucesso", "Endereço adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar endereço:", error);
      Alert.alert("Erro", error.message || "Não foi possível adicionar o endereço.");
    }
  }

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >

      {/* 🔙 VOLTAR */}
      <TouchableOpacity
        style={styles.voltarContainer}
        onPress={() => navigation.goBack()}
      >

        <Ionicons
          name="arrow-back"
          size={24}
          color="#790000"
        />

        <Text style={styles.voltar}>
          Voltar para o carrinho
        </Text>

      </TouchableOpacity>

      {/* 📍 ENDEREÇO */}
      <View style={styles.card}>

        <Text style={styles.titulo}>
          Endereço de Envio
        </Text>

        {carregandoEnderecos ? (
          <Text>Carregando endereços...</Text>
        ) : enderecosSalvos.length > 0 ? (
          <>
            {/* Lista de endereços salvos */}
            <FlatList
              scrollEnabled={false}
              data={enderecosSalvos}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setEnderecoSelecionado(item)}
                  style={[
                    styles.opcao,
                    enderecoSelecionado === item && styles.opcaoSelecionada,
                  ]}
                >
                  <View style={styles.opcaoEsquerda}>
                    <View
                      style={[
                        styles.radioOuter,
                        enderecoSelecionado === item &&
                        styles.radioOuterSelecionado,
                      ]}
                    >
                      {enderecoSelecionado === item && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.opcaoTexto}>
                        {item.rua}, {item.numero}
                      </Text>
                      <Text style={{ fontSize: 12, color: "#666" }}>
                        {item.bairro} - {item.cidade}/{item.estado}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />

            {/* Botão para adicionar novo endereço */}
            <TouchableOpacity
              style={[styles.botaoSalvar, { marginTop: 15 }]}
              onPress={() => setAdicionandoNovoEndereco(true)}
            >
              <Text style={styles.botaoTexto}>
                + Adicionar outro endereço
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={{ marginBottom: 15 }}>Nenhum endereço cadastrado.</Text>
            <TouchableOpacity
              style={styles.botaoSalvar}
              onPress={() => setAdicionandoNovoEndereco(true)}
            >
              <Text style={styles.botaoTexto}>
                + Adicionar endereço
              </Text>
            </TouchableOpacity>
          </>
        )}

      </View>

      {/* MODAL - Adicionar Novo Endereço */}
      <Modal
        visible={adicionandoNovoEndereco}
        animationType="slide"
        transparent={true}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}>
          <View style={[styles.card, { borderRadius: 20, margin: 15 }]}>
            <TouchableOpacity
              onPress={() => setAdicionandoNovoEndereco(false)}
              style={{ alignSelf: "flex-end", padding: 10 }}
            >
              <Ionicons name="close" size={24} color="#790000" />
            </TouchableOpacity>

            <Text style={styles.titulo}>
              Novo Endereço
            </Text>

            <ScrollView
              scrollEnabled={true}
              style={{ maxHeight: 400 }}
              showsVerticalScrollIndicator={false}
            >
              <TextInput
                placeholder="CEP"
                style={styles.input}
                value={novoEndereco.cep}
                onChangeText={(v) =>
                  setNovoEndereco({ ...novoEndereco, cep: v })
                }
              />

              <TextInput
                placeholder="Rua"
                style={styles.input}
                value={novoEndereco.rua}
                onChangeText={(v) =>
                  setNovoEndereco({ ...novoEndereco, rua: v })
                }
              />

              <TextInput
                placeholder="Número"
                style={styles.input}
                keyboardType="numeric"
                value={novoEndereco.numero}
                onChangeText={(v) =>
                  setNovoEndereco({ ...novoEndereco, numero: v })
                }
              />

              <TextInput
                placeholder="Complemento"
                style={styles.input}
                value={novoEndereco.complemento}
                onChangeText={(v) =>
                  setNovoEndereco({
                    ...novoEndereco,
                    complemento: v,
                  })
                }
              />

              <TextInput
                placeholder="Bairro"
                style={styles.input}
                value={novoEndereco.bairro}
                onChangeText={(v) =>
                  setNovoEndereco({ ...novoEndereco, bairro: v })
                }
              />

              <TextInput
                placeholder="Cidade"
                style={styles.input}
                value={novoEndereco.cidade}
                onChangeText={(v) =>
                  setNovoEndereco({ ...novoEndereco, cidade: v })
                }
              />

              <TextInput
                placeholder="Estado"
                style={styles.input}
                value={novoEndereco.estado}
                onChangeText={(v) =>
                  setNovoEndereco({ ...novoEndereco, estado: v })
                }
              />
            </ScrollView>

            <TouchableOpacity
              style={styles.botaoSalvar}
              onPress={salvarNovoEndereco}
            >
              <Text style={styles.botaoTexto}>
                Salvar endereço
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botaoSalvar, { backgroundColor: "#ccc", marginTop: 10 }]}
              onPress={() => setAdicionandoNovoEndereco(false)}
            >
              <Text style={[styles.botaoTexto, { color: "#333" }]}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 💳 PAGAMENTO */}
      <View style={styles.card}>

        <Text style={styles.titulo}>
          Pagamento
        </Text>

        {["Cartão", "Pix", "Boleto"].map((item) => (

          <TouchableOpacity
            key={item}
            onPress={() => setPagamento(item)}
            style={[
              styles.opcao,
              pagamento === item &&
              styles.opcaoSelecionada,
            ]}
          >

            <View style={styles.opcaoEsquerda}>

              <View
                style={[
                  styles.radioOuter,
                  pagamento === item &&
                  styles.radioOuterSelecionado,
                ]}
              >

                {pagamento === item && (
                  <View style={styles.radioInner} />
                )}

              </View>

              <Text style={styles.opcaoTexto}>
                {item}
              </Text>

            </View>

          </TouchableOpacity>

        ))}

      </View>

      {/* 🛒 RESUMO */}
      <View style={styles.card}>

        <Text style={styles.titulo}>
          Resumo do pedido
        </Text>

        {carrinho.map((item, index) => (

          <View
            key={index}
            style={styles.resumoItem}
          >

            <View style={styles.produtoInfo}>

              <Image
                source={item.img}
                style={styles.produtoImagem}
              />

              <View>

                <Text style={styles.produtoNome}>
                  {item.nome}
                </Text>

                <Text style={styles.produtoPreco}>
                  R$ {item.preco}
                </Text>

              </View>

            </View>

          </View>

        ))}

      </View>

      {/* 💰 TOTAL */}
      <View style={styles.card}>

        <View style={styles.linha}>

          <Text>Subtotal</Text>

          <Text>
            R$ {subtotal}
          </Text>

        </View>

        <View style={styles.linha}>

          <Text>Frete</Text>

          <Text style={styles.freteTexto}>
            R$ {frete}
          </Text>

        </View>

        <View style={styles.linha}>

          <Text style={styles.totalTexto}>
            Total
          </Text>

          <Text style={styles.totalTexto}>
            R$ {total}
          </Text>

        </View>

      </View>

      {/* 🔥 BOTÃO */}
      <TouchableOpacity style={styles.botao} onPress={finalizarCompra}>

        <Text style={styles.botaoTexto}>
          Finalizar Compra
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
}