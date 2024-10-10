import './gesture-handler';
// import { connectToDatabase, createTables } from './db/db.ts';
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
        {/* <SQLiteProvider databaseName='workout-tracker' onInit={console.log("sqliteprovider initiated")} useSuspense> */}
        <SQLiteProvider databaseName='workout-tracker' onInit={runCreateTables} useSuspense>
        {/* <SQLiteProvider databaseName='workout-tracker' onInit={loadData}> */}
          <MyStack/>
        </SQLiteProvider>
      </Suspense>
    </NavigationContainer>
  );
};

function Fallback() {
  return(
    <View>
      {/* <Icon name="loading" /> */}
      <Text>AAAAA</Text>
    </View>
  );
};

// async function migrateDbIfNeeded(db) {
//   await createTables(db);
// };

async function runCreateTables(db) {
  // console.log("Inside runCreateTables.");
  await createTables(db);
  // console.log("Inside runCreateTables, tables created.");
};