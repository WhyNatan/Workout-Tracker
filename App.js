import './gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { HomePage } from './screens/HomePage';
import { WorkoutPage } from './screens/WorkoutPage';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Home' 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomePage}/>
      <Stack.Screen name="Workout" component={WorkoutPage} />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
};