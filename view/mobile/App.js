import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './stack.routes';

export default function App() {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
}