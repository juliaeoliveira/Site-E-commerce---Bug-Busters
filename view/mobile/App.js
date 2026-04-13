
import { useFonts, Aboreto_400Regular } from '@expo-google-fonts/aboreto';
import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './stack.routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Aboreto_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
}