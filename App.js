import './gesture-handler';
import { connectToDatabase, createTables } from './db/database.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { HomePage } from './screens/HomePage';
import { WorkoutPage } from './screens/WorkoutPage';
import { createStackNavigator } from '@react-navigation/stack';
import { useCallback, useEffect, Suspense } from 'react';
import { View, Icon, Text } from 'react-native';
import { SQLiteProvider } from 'expo-sqlite';

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

  const loadData = useCallback(async () => {
    try {
      console.log("App running loadData.");
      const db = await connectToDatabase();
      await createTables(db);
      console.log("Created tables succesfully.");
    } catch (error) {
      console.error("Error inside loadData:", error);
    };
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <NavigationContainer>
      <Suspense fallback={<Fallback />}>
        <SQLiteProvider databaseName='workout-tracker' onInit={runCreateTables} useSuspense>
          <MyStack/>
        </SQLiteProvider>
      </Suspense>
    </NavigationContainer>
  );
};

function Fallback() {
  return(
    <View>
      <Text>Fall Back while Loading</Text>
    </View>
  );
};

async function runCreateTables(db) {
  await createTables(db);
};