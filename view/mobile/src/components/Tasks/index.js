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
      

       
      <Text style={styles.titulo}>Nossas Coleções</Text>

      {/* GRID DE CARDS */}
      <View style={styles.grid}>

        {/* CARD 1 */}
        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../assets/images/coleção1.jpg')}
            style={styles.cardImage}
          />
          <Text style={styles.cardNome}>Brisa do altar</Text>
      
        </TouchableOpacity>

        {/* CARD 2 */}
        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../assets/images/coleção2.jpg')}
            style={styles.cardImage}
          />
          <Text style={styles.cardNome}>Sussurros</Text>
       
        </TouchableOpacity>

        {/* CARD 3 */}
        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../assets/images/coleção3.jpg')}
            style={styles.cardImage}
          />
          <Text style={styles.cardNome}>Encanto</Text>
      
        </TouchableOpacity>

        {/* CARD 4 */}
        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../assets/images/coleção4.jpg')}
            style={styles.cardImage}
          />
          <Text style={styles.cardNome}>O Desabrochar</Text>
        
        </TouchableOpacity>


      </View>
    </ScrollView>
    
  );
}
