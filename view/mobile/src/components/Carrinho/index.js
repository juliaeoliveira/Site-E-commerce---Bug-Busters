import { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from "./style";

export default function Carrinho() {
  return (
    <View style={styles.body}>
      <Text style={styles.title}>Carrinho</Text>
      <Text> Em desenvolvimento</Text>
    </View>
  );
}