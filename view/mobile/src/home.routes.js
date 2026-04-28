import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import Descricao from "./components/Descrição";
import Resultado from './components/Resultado'
import Colecoes from './components/Colecoes'

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="homeMain"
        component={Home}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="detalhes"
        component={Descricao}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
      name="colecoes"
      component={Colecoes}
      options={{ headerShown: false }}
      />

      <Stack.Screen
      name="searchresults"
      component={Resultado}
      options={{ headerShown: false }}/>
    </Stack.Navigator>



  );
}