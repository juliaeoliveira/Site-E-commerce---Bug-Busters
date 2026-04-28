import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { styles } from "./style";
import { useState } from 'react';

export default function Tasks({ navigation }) {

  const dressCollections = {
    1: [
      { id: 1, name: "Vestido Floral", image: require("../../assets/images/pexels-daisatj-5062276.jpg") },
      { id: 2, name: "Vestido Leve", image: require("../../assets/images/pexels-rnnzeravac-12573815.jpg") },
      { id: 3, name: "Vestido Casual", image: require("../../assets/images/pexels-jonathanborba-30822468.jpg") },
      { id: 4, name: "Vestido Solto", image: require("../../assets/images/pexels-daisatj-5062276.jpg") },
      { id: 5, name: "Vestido Praia", image: require("../../assets/images/pexels-rnnzeravac-12573815.jpg") },
      { id: 6, name: "Vestido Curto", image: require("../../assets/images/pexels-jonathanborba-30822468.jpg") },
    ],
    2: [
      { id: 7, name: "Vestido Elegante", image: require("../../assets/images/pexels-jonathanborba-30822468.jpg") },
      { id: 8, name: "Vestido Festa", image: require("../../assets/images/pexels-daisatj-5062276.jpg") },
      { id: 9, name: "Vestido Noite", image: require("../../assets/images/pexels-rnnzeravac-12573815.jpg") },
      { id: 10, name: "Vestido Luxo", image: require("../../assets/images/pexels-jonathanborba-30822468.jpg") },
      { id: 11, name: "Vestido Social", image: require("../../assets/images/pexels-daisatj-5062276.jpg") },
      { id: 12, name: "Vestido Gala", image: require("../../assets/images/pexels-rnnzeravac-12573815.jpg") },
    ],
    3: [
      { id: 13, name: "Vestido Verão", image: require("../../assets/images/pexels-rnnzeravac-12573815.jpg") },
      { id: 14, name: "Vestido Tropical", image: require("../../assets/images/pexels-daisatj-5062276.jpg") },
      { id: 15, name: "Vestido Colorido", image: require("../../assets/images/pexels-jonathanborba-30822468.jpg") },
      { id: 16, name: "Vestido Fresco", image: require("../../assets/images/pexels-rnnzeravac-12573815.jpg") },
      { id: 17, name: "Vestido Dia", image: require("../../assets/images/pexels-daisatj-5062276.jpg") },
      { id: 18, name: "Vestido Light", image: require("../../assets/images/pexels-jonathanborba-30822468.jpg") },
    ],
    4: [
      { id: 19, name: "Vestido Premium", image: require("../../assets/images/pexels-jonathanborba-30822468.jpg") },
      { id: 20, name: "Vestido Sofisticado", image: require("../../assets/images/pexels-rnnzeravac-12573815.jpg") },
      { id: 21, name: "Vestido Exclusivo", image: require("../../assets/images/pexels-daisatj-5062276.jpg") },
      { id: 22, name: "Vestido Moderno", image: require("../../assets/images/pexels-jonathanborba-30822468.jpg") },
      { id: 23, name: "Vestido Chic", image: require("../../assets/images/pexels-rnnzeravac-12573815.jpg") },
      { id: 24, name: "Vestido Estilo", image: require("../../assets/images/pexels-daisatj-5062276.jpg") },
    ]
  };

  const collections = [
    { id: 1, image: require("../../assets/images/coleção1.jpg") },
    { id: 2, image: require("../../assets/images/coleção2.jpg") },
    { id: 3, image: require("../../assets/images/coleção3.jpg") },
    { id: 4, image: require("../../assets/images/coleção4.jpg") },
  ];

  const [selected, setSelected] = useState(1);

  const dresses = dressCollections[selected];

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

      <FlatList
        data={dresses}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.dressContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.dressCard}>
            <Image source={item.image} style={styles.dressImage} />
            <Text style={styles.dressName}>{item.name}</Text>
          </View>
        )}
      />

    </View>
  );
}
