import { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TextInput, TouchableOpacity, Alert,  Linking, ScrollView } from 'react-native';
import { styles } from "./style";
import { getProducts } from "../../services/api";


export default function Home() {

  return (
     <ScrollView style={styles.container}
    contentContainerStyle={{ paddingBottom: 20 }}
    showsVerticalScrollIndicator={false} 
    bounces={false} 
    overScrollMode="never" 
  >
      
      {/* HEADER */}
      <View style={styles.header}>
        <TextInput
          placeholder="Buscar produtos..."
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* BANNER */}
      <Image
        source={require('../../assets/images/foto.jpg')}
        style={styles.image}
      />

      {/* CATEGORIAS */}
      <View style={styles.categorias}>
        <TouchableOpacity style={styles.circulo}>
          <Image source={require('../../assets/images/coleção1.jpg')} style={styles.imgCirculo} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.circulo}>
          <Image source={require('../../assets/images/coleção2.jpg')} style={styles.imgCirculo} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.circulo}>
          <Image source={require('../../assets/images/coleção3.jpg')} style={styles.imgCirculo} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.circulo}>
          <Image source={require('../../assets/images/coleção4.jpg')} style={styles.imgCirculo} />
        </TouchableOpacity>
      </View>

      {/* AGENDAMENTO */}
      <View style={styles.agendamento}>
        <Text style={styles.titulo}>AGENDAMENTOS</Text>

        <Text style={styles.subtitulo}>
          Sua grande dia merece um vestido à altura! Fale com nossas atendentes e agende um horário conosco
        </Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => Linking.openURL('https://web.whatsapp.com')}
        >
          <Text style={styles.textoBotao}>(11) 4002-8922</Text>
        </TouchableOpacity>
      </View>

      {/* PRODUTOS */}
      <View style={styles.produtos}>
        
        <Text style={styles.tituloProdutos}>Produtos</Text>

        <View style={styles.linhaCards}>

          {/* CARD 1 */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => console.log('clicou no produto 1')}
          >
            <Image
              source={require('../../assets/images/coleção1.jpg')}
              style={styles.cardImage}
            />
            <Text style={styles.cardNome}>Vestido Longo</Text>
            <Text style={styles.cardPreco}>R$ 299,90</Text>
          </TouchableOpacity>

          {/* CARD 2 */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => console.log('clicou no produto 2')}
          >
            <Image
              source={require('../../assets/images/coleção2.jpg')}
              style={styles.cardImage}
            />
            <Text style={styles.cardNome}>Vestido Curto</Text>
            <Text style={styles.cardPreco}>R$ 199,90</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.linhaCards}>

          {/* CARD 1 */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => console.log('clicou no produto 1')}
          >
            <Image
              source={require('../../assets/images/coleção1.jpg')}
              style={styles.cardImage}
            />
            <Text style={styles.cardNome}>Vestido Longo</Text>
            <Text style={styles.cardPreco}>R$ 299,90</Text>
          </TouchableOpacity>

          {/* CARD 2 */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => console.log('clicou no produto 2')}
          >
            <Image
              source={require('../../assets/images/coleção2.jpg')}
              style={styles.cardImage}
            />
            <Text style={styles.cardNome}>Vestido Curto</Text>
            <Text style={styles.cardPreco}>R$ 199,90</Text>
          </TouchableOpacity>

        </View>

      </View>


      <StatusBar style="auto" />
    </ScrollView>
  );
}

