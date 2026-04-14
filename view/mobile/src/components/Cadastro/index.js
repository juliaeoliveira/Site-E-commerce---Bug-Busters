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
        <Text style={styles.titulo}>Cadastro</Text>
      </ImageBackground>

      {/* FORMULÁRIO */}
      <View style={styles.formContainer}>

        <Text style={styles.label}>Nome Completo</Text>
        <TextInput style={styles.input} />

        <Text style={styles.label}>E-mail</Text>
        <TextInput style={styles.input} />

        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} secureTextEntry />

        <TouchableOpacity style={styles.botao}>
          <Text style={styles.textoBotao}>Criar conta</Text>
        </TouchableOpacity>

        <Text
          style={styles.login}
          onPress={() => navigation.navigate('login')}
        >
          Já tem conta? Entrar
        </Text>

      </View>
    </View>
  );
}