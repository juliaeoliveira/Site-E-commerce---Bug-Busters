import { useState } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from "./style";

export default function Tasks() {

  const [selecionado, setSelecionado] = useState(null);

  return (
    <View style={{ flex: 1 }}>
      
      <ScrollView style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false} 
        bounces={false} 
        overScrollMode="never" 
      >
      
      <Text style={styles.titulo}>Nossas Coleções</Text>

      <View style={styles.grid}>

        {/* CARD 1 */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => setSelecionado({
            nome: "Brisa do altar",
            estacao: "VERÃO",
            descricao: "No calor do Verão, o amor é celebrado sob o sol intenso e a leveza do vento...",
            imagem: require('../../assets/images/coleção1.jpg')
          })}
        >
          <Image source={require('../../assets/images/coleção1.jpg')} style={styles.cardImage}/>
          <Text style={styles.cardNome}>Brisa do altar</Text>
        </TouchableOpacity>

        {/* CARD 2 */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => setSelecionado({
            nome: "Sussurros",
            estacao: "OUTONO",
            descricao: "Detalhes delicados que contam histórias silenciosas e encantadoras.",
            imagem: require('../../assets/images/coleção2.jpg')
          })}
        >
          <Image source={require('../../assets/images/coleção2.jpg')} style={styles.cardImage}/>
          <Text style={styles.cardNome}>Sussurros</Text>
        </TouchableOpacity>

        {/* CARD 3 */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => setSelecionado({
            nome: "Encanto",
            estacao: "INVERNO",
            descricao: "Peças que despertam beleza, charme e fascínio em cada detalhe.",
            imagem: require('../../assets/images/coleção3.jpg')
          })}
        >
          <Image source={require('../../assets/images/coleção3.jpg')} style={styles.cardImage}/>
          <Text style={styles.cardNome}>Encanto</Text>
        </TouchableOpacity>

        {/* CARD 4 */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => setSelecionado({
            nome: "O Desabrochar",
            estacao: "PRIMAVERA",
            descricao: "Inspirada no florescer e na transformação de momentos únicos.",
            imagem: require('../../assets/images/coleção4.jpg')
          })}
        >
          <Image source={require('../../assets/images/coleção4.jpg')} style={styles.cardImage}/>
          <Text style={styles.cardNome}>O Desabrochar</Text>
        </TouchableOpacity>

      </View>
      </ScrollView>

      {/* MODAL */}
      {selecionado && (
        <View style={styles.overlay}>

          <View style={styles.modalCard}>

            {/* X */}
            <TouchableOpacity 
              style={styles.closeInside}
              onPress={() => setSelecionado(null)}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

            {/* IMAGEM */}
            <Image source={selecionado.imagem} style={styles.modalImage} />

            {/* TEXTO */}
            <View style={styles.modalText}>
              <Text style={styles.tituloModal}>{selecionado.nome}</Text>

              {/* 🔥 AGORA DINÂMICO */}
              <Text style={styles.estacao}>
                Estação: {selecionado.estacao}
              </Text>

              <Text style={styles.descricao}>
                {selecionado.descricao}
              </Text>

              <TouchableOpacity style={styles.botao}>
                <Text style={styles.botaoTexto}>VER COLEÇÃO</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      )}

    </View>
  );
}