import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { styles } from "./style";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function HomeScreen() {
  const [dresses, setDresses] = useState([
    { id: 1, name: "Vestido Floral", image: require("../../assets/images/pexels-daisatj-5062276.jpg") },
    { id: 2, name: "Vestido Elegante", image: require("../../assets/images/pexels-jonathanborba-30822468.jpg") },
    { id: 3, name: "Vestido Verão", image: require("../../assets/images/pexels-rnnzeravac-12573815.jpg") },
  ]);

  const [collections] = useState([
    { id: 1, image: require("../../assets/images/coleção1.jpg") },
    { id: 2, image: require("../../assets/images/coleção2.jpg") },
    { id: 3, image: require("../../assets/images/coleção3.jpg") },
    { id: 4, image: require("../../assets/images/coleção4.jpg") },
  ]);

  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <Text style={styles.title}>Coleção</Text>
      </View>

      <View style={styles.circlesContainer}>
        {collections.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.circle,
              selected === item.id && styles.circleActive
            ]}
            onPress={() => setSelected(item.id)}
          >
            <Image source={item.image} style={styles.circleImage} />
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.dressContainer}>
        {dresses.map((dress) => (
          <View key={dress.id} style={styles.dressCard}>
            <Image source={dress.image} style={styles.dressImage} />
            <Text style={styles.dressName}>{dress.name}</Text>
          </View>
        ))}
      </ScrollView>

    </View>
  );
}