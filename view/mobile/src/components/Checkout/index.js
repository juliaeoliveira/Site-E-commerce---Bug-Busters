import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  TextInput 
} from "react-native";
import { useState } from "react";
import { styles } from "./style";

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
    { nome: "Vestido Noiva Clássico", preco: 1200 },
    { nome: "Vestido Elegante", preco: 900 }
  ];

  const frete = 50;

  const subtotal = carrinho.reduce((acc, item) => acc + item.preco, 0);
  const total = subtotal + frete;

  function salvarEndereco() {
    if (!endereco.cep || !endereco.rua || !endereco.numero) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    setEditandoEndereco(false);
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
    >


      <View style={styles.card}>
        <Text style={styles.titulo}>Endereço</Text>

        {!editandoEndereco ? (
          <>
            <Text>
              {endereco.rua}, {endereco.numero}
            </Text>

            <Text>
              {endereco.bairro} - {endereco.cidade}/{endereco.estado}
            </Text>

            <Text>CEP: {endereco.cep}</Text>

            {endereco.complemento ? (
              <Text>Compl: {endereco.complemento}</Text>
            ) : null}

            <TouchableOpacity onPress={() => setEditandoEndereco(true)}>
              <Text style={styles.link}>Alterar endereço</Text>
            </TouchableOpacity>
          </>
        ) : (

         
          <View style={{ gap: 10 }}>

            <TextInput
              placeholder="CEP"
              style={styles.input}
              value={endereco.cep}
              onChangeText={(v) => setEndereco({ ...endereco, cep: v })}
            />

            <TextInput
              placeholder="Rua"
              style={styles.input}
              value={endereco.rua}
              onChangeText={(v) => setEndereco({ ...endereco, rua: v })}
            />

            <TextInput
              placeholder="Número"
              style={styles.input}
              value={endereco.numero}
              onChangeText={(v) => setEndereco({ ...endereco, numero: v })}
              keyboardType="numeric"
            />

            <TextInput
              placeholder="Complemento"
              style={styles.input}
              value={endereco.complemento}
              onChangeText={(v) => setEndereco({ ...endereco, complemento: v })}
            />

            <TextInput
              placeholder="Bairro"
              style={styles.input}
              value={endereco.bairro}
              onChangeText={(v) => setEndereco({ ...endereco, bairro: v })}
            />

            <TextInput
              placeholder="Cidade"
              style={styles.input}
              value={endereco.cidade}
              onChangeText={(v) => setEndereco({ ...endereco, cidade: v })}
            />

            <TextInput
              placeholder="Estado"
              style={styles.input}
              value={endereco.estado}
              onChangeText={(v) => setEndereco({ ...endereco, estado: v })}
            />

            <TouchableOpacity style={styles.botaoSalvar} onPress={salvarEndereco}>
              <Text style={styles.botaoTexto}>Salvar endereço</Text>
            </TouchableOpacity>

          </View>
        )}
      </View>

     
      <View style={styles.card}>
        <Text style={styles.titulo}>Pagamento</Text>

        {["Cartão", "Pix", "Boleto"].map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setPagamento(item)}
            style={[
              styles.opcao,
              pagamento === item && styles.opcaoSelecionada
            ]}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      
      <View style={styles.card}>
        <Text style={styles.titulo}>Resumo do pedido</Text>

        {carrinho.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text>{item.nome}</Text>
            <Text>R$ {item.preco}</Text>
          </View>
        ))}
      </View>

      
      <View style={styles.card}>
        <View style={styles.linha}>
          <Text>Subtotal</Text>
          <Text>R$ {subtotal}</Text>
        </View>

        <View style={styles.linha}>
          <Text>Frete</Text>
          <Text>R$ {frete}</Text>
        </View>

        <View style={styles.linha}>
          <Text style={{ fontWeight: "bold" }}>Total</Text>
          <Text style={{ fontWeight: "bold" }}>R$ {total}</Text>
        </View>
      </View>

     
      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>Finalizar Compra</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}