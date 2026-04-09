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


const Tabs = createBottomTabNavigator();

export function Routes() {
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
        component={Login}
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

      
    </Tabs.Navigator>
  );
}
