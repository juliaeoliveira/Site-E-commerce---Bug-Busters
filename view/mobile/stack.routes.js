import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from './routes'; // Tabs
import Cadastro from './components/Cadastro';
import Login from './components/Login';
import Carrinho from './src/components/Carrinho';


const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Main" component={Routes} />
        <Stack.Screen name="Carrinho" component={Carrinho} />
    </Stack.Navigator>
  );
}