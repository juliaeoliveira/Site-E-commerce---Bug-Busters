import { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from "./style";


export default function Carrinho() {

  return (
    <View style={styles.body}>

      <View >
        <Text style={styles.title}>Carrinho</Text>
      </View>


      <StatusBar style="auto" />
    </View>
  );
}

