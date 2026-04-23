import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import AntDesign from '@expo/vector-icons/AntDesign';
import HomeStack from "./home.routes";
import Tasks from "./components/Tasks";
import Carrinho from "./components/Carrinho";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import Perfil from "./components/Perfil";
import DadosConta from "./components/DadosConta";
import Endereco from "./components/Endereco";
import Pedidos from "./components/Pedidos";
import DetalhePedido from "./components/DetalhePedido";
import EditarConta from "./components/EditarConta";
import ComprarNovamente from "./components/ComprarNovamente";
import CriarEndereco from "./components/CadastroEndereco";
import EditarEndereco from "./components/EditarEndereco";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useState } from "react";

const Tabs = createBottomTabNavigator();

export function Routes() {

  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="home"
        component={HomeStack}
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
        component={Login} // pode deixar Login mesmo
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            return <FontAwesome name="user" size={size} color={focused ? "#000" : color} />;
          },
        }}
        listeners={({ navigation }) => ({
          tabPress: async (e) => {
            e.preventDefault(); // 👈 impede navegação padrão
          
            const token = await AsyncStorage.getItem("token");
          
            if (token) {
              navigation.navigate("perfil"); // 👈 vai pro perfil
            } else {
              navigation.navigate("login"); // 👈 vai pro login
            }
          },
        })}
      />
      <Tabs.Screen
        name="cadastro"
        component={Cadastro}
        options={{
          tabBarItemStyle: { display: 'none' }, // 👈 ESCONDE DE VERDADE
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="perfil"
        component={Perfil}
        options={{
          tabBarItemStyle: { display: "none" },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="dadosConta"
        component={DadosConta}
        options={{
          tabBarItemStyle: { display: 'none' },
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="editarConta"
        component={EditarConta}
        options={{
          tabBarItemStyle: { display: 'none' },
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="endereco"
        component={Endereco}
        options={{
          tabBarItemStyle: { display: 'none' },
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="pedidos"
        component={Pedidos}
        options={{
          tabBarItemStyle: { display: 'none' },
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="detalhePedido"
        component={DetalhePedido}
        options={{
          tabBarItemStyle: { display: 'none' },
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="comprarNovamente"
        component={ComprarNovamente}
        options={{
          tabBarItemStyle: { display: 'none' },
          headerShown: false,
        }}
      />
      <Tabs.Screen 
      name="criarEndereco" 
      component={CriarEndereco} 
      options={{ 
        tabBarItemStyle: { display: 'none' }, 
        headerShown: false 
        }} 
      />
      <Tabs.Screen 
      name="editarEndereco" 
      component={EditarEndereco} 
      options={{ tabBarItemStyle: { display: 'none' }, 
      headerShown: false 
      }} 
    />
    </Tabs.Navigator>
  );
}
