import { useEffect, useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Alert,  Linking, ScrollView } from 'react-native';
import { styles } from "./style";


const TASK_KEY = "@tasks";

export default function Tasks() {

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
       
      <Text style={styles.titulo}>O vestido dos seus sonhos começa aqui</Text>

      {/* GRID DE CARDS */}
      <View style={styles.grid}>

        {/* CARD 1 */}
        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../assets/images/coleção1.jpg')}
            style={styles.cardImage}
          />
          <Text style={styles.cardNome}>Vestido Longo</Text>
          <Text style={styles.cardPreco}>R$ 299,90</Text>
        </TouchableOpacity>

        {/* CARD 2 */}
        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../assets/images/coleção2.jpg')}
            style={styles.cardImage}
          />
          <Text style={styles.cardNome}>Vestido Curto</Text>
          <Text style={styles.cardPreco}>R$ 199,90</Text>
        </TouchableOpacity>

        {/* CARD 3 */}
        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../assets/images/coleção3.jpg')}
            style={styles.cardImage}
          />
          <Text style={styles.cardNome}>Vestido Festa</Text>
          <Text style={styles.cardPreco}>R$ 399,90</Text>
        </TouchableOpacity>

        {/* CARD 4 */}
        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../assets/images/coleção4.jpg')}
            style={styles.cardImage}
          />
          <Text style={styles.cardNome}>Vestido Luxo</Text>
          <Text style={styles.cardPreco}>R$ 499,90</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => console.log('clicou no produto 5')}
        >
          <Image
            source={require('../../assets/images/coleção1.jpg')}
            style={styles.cardImage}
          />
          <Text style={styles.cardNome}>Vestido Princesa</Text>
          <Text style={styles.cardPreco}>R$ 599,90</Text>
        </TouchableOpacity>

        {/* CARD 6 */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => console.log('clicou no produto 6')}
        >
          <Image
            source={require('../../assets/images/coleção2.jpg')}
            style={styles.cardImage}
          />
          <Text style={styles.cardNome}>Vestido Clássico</Text>
          <Text style={styles.cardPreco}>R$ 349,90</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
    
  );
}
