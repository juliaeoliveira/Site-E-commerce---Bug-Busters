import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import AntDesign from '@expo/vector-icons/AntDesign';
import Home from "./components/Home";
import Tasks from "./components/Tasks";
import Carrinho from "./components/Carrinho";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useState } from "react";
import Perfil from "./components/Perfil";

const Tabs = createBottomTabNavigator();

export function Routes() {

  const [isLogado, setIsLogado] = useState(null);

  useFocusEffect(
  React.useCallback(() => {
    async function verificarLogin() {
      const token = await AsyncStorage.getItem("token");
      console.log("Token encontrado:", token);
      setIsLogado(!!token);
    }

    verificarLogin();
  }, [])
);

  if (isLogado === null) return null;

  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="home"
        component={Home}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
              return (
                <MaterialIcons name="home-filled" size={size} color={"#000"} />
              );
            }
            return (
              <MaterialIcons name="home-filled" size={size} color={color} />
            );
          },
        }}
      />

      <Tabs.Screen
        name="bars"
        component={Tasks}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
              return <Ionicons name="list" size={size} color={"#000"} />;
            }
            return <Ionicons name="list-outline" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="shop"
        component={Carrinho}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
              return (
                <FontAwesome name="shopping-cart" size={size} color={"#000"} />
              );
            }
            return (
              <FontAwesome name="shopping-cart" size={size} color={color} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="login"
        component={isLogado ? Perfil : Login}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
              return <FontAwesome name="user" size={size} color={"#000"} />;
            }
            return <FontAwesome name="user" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="cadastro"
        component={Cadastro}
        options={{
          tabBarItemStyle: { display: 'none' }, // 👈 ESCONDE DE VERDADE
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
}
