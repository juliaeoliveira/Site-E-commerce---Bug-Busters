import { View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from "./style";

export default function Cadastro({ navigation }) {
  return (
    <View style={styles.container}>

      {/* IMAGEM DE FUNDO */}
      <ImageBackground
        source={require("../../assets/images/casamento.jpg")}
        style={styles.topo}
      >
        
      </ImageBackground>

      {/* FORMULÁRIO */}
      <View style={styles.formContainer}>

        <Text style={styles.title}>Realize seu cadastro</Text>

        <Text style={styles.label}>Nome Completo</Text>
        <TextInput style={styles.input} />

        <Text style={styles.label}>Data de Nascimento</Text>
        <TextInput style={styles.input} placeholder="DD/MM/AAAA" />

        <Text style={styles.label}>Telefone</Text>
        <TextInput style={styles.input} placeholder="(11) 99999-9999" />

        <Text style={styles.label}>E-mail</Text>
        <TextInput style={styles.input} />

        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} secureTextEntry />

        <Text style={styles.label}>Confirmar senha</Text>
        <TextInput style={styles.input} secureTextEntry />

        <TouchableOpacity style={styles.botao}>
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


      </View>
    </View>
  );
}