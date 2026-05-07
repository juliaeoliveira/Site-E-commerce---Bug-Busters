// index.js

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";

import { useState } from "react";
import { styles } from "./style";
import { Ionicons } from "@expo/vector-icons";

export default function Checkout({ navigation }) {

  const [editandoEndereco, setEditandoEndereco] = useState(true);

  const [endereco, setEndereco] = useState({
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const [pagamento, setPagamento] = useState(null);

  const carrinho = [
    {
      nome: "Vestido Noiva Clássico",
      preco: 1200,
      img: require("../../assets/images/coleção3.jpg"),
    },
    {
      nome: "Vestido Elegante",
      preco: 900,
      img: require("../../assets/images/coleção4.jpg"),
    },
  ];

  const frete = 50;

  const subtotal = carrinho.reduce(
    (acc, item) => acc + item.preco,
    0
  );

  const total = subtotal + frete;

  function salvarEndereco() {

    if (
      !endereco.cep ||
      !endereco.rua ||
      !endereco.numero
    ) {

      alert("Preencha os campos obrigatórios!");
      return;
    }

    setEditandoEndereco(false);
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
          Endereço
        </Text>

        {!editandoEndereco ? (

          <>
            <Text>
              {endereco.rua}, {endereco.numero}
            </Text>

            <Text>
              {endereco.bairro} - {endereco.cidade}/{endereco.estado}
            </Text>

            <Text>
              CEP: {endereco.cep}
            </Text>

            {endereco.complemento ? (
              <Text>
                Compl: {endereco.complemento}
              </Text>
            ) : null}

            <TouchableOpacity
              onPress={() => setEditandoEndereco(true)}
            >

              <Text style={styles.link}>
                Alterar endereço
              </Text>

            </TouchableOpacity>

          </>

        ) : (

          <View>

            <TextInput
              placeholder="CEP"
              style={styles.input}
              value={endereco.cep}
              onChangeText={(v) =>
                setEndereco({ ...endereco, cep: v })
              }
            />

            <TextInput
              placeholder="Rua"
              style={styles.input}
              value={endereco.rua}
              onChangeText={(v) =>
                setEndereco({ ...endereco, rua: v })
              }
            />

            <TextInput
              placeholder="Número"
              style={styles.input}
              keyboardType="numeric"
              value={endereco.numero}
              onChangeText={(v) =>
                setEndereco({ ...endereco, numero: v })
              }
            />

            <TextInput
              placeholder="Complemento"
              style={styles.input}
              value={endereco.complemento}
              onChangeText={(v) =>
                setEndereco({
                  ...endereco,
                  complemento: v,
                })
              }
            />

            <TextInput
              placeholder="Bairro"
              style={styles.input}
              value={endereco.bairro}
              onChangeText={(v) =>
                setEndereco({ ...endereco, bairro: v })
              }
            />

            <TextInput
              placeholder="Cidade"
              style={styles.input}
              value={endereco.cidade}
              onChangeText={(v) =>
                setEndereco({ ...endereco, cidade: v })
              }
            />

            <TextInput
              placeholder="Estado"
              style={styles.input}
              value={endereco.estado}
              onChangeText={(v) =>
                setEndereco({ ...endereco, estado: v })
              }
            />

            <TouchableOpacity
              style={styles.botaoSalvar}
              onPress={salvarEndereco}
            >

              <Text style={styles.botaoTexto}>
                Salvar endereço
              </Text>

            </TouchableOpacity>

          </View>
        )}

      </View>

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
      <TouchableOpacity style={styles.botao}>

        <Text style={styles.botaoTexto}>
          Finalizar Compra
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
}