import '../gesture-handler';
import { Text, ScrollView, View, Image, TextInput, Button, Alert, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import { styles } from '../styles/styles';

export function HomePage({ navigation }) {
  return (
    <View style={{flex:1}}>
        <AppBar/>
        
        <ScrollView style={{flex:1}}>

            <WorkoutTab navigation={navigation}/>
            <WorkoutTab navigation={navigation}/>
            <WorkoutTab navigation={navigation}/>
            <WorkoutTab navigation={navigation}/>
            <WorkoutTab navigation={navigation}/>
            <WorkoutTab navigation={navigation}/>
            <WorkoutTab navigation={navigation}/>
            <WorkoutTab navigation={navigation}/>
            <WorkoutTab navigation={navigation}/>
        </ScrollView>
    </View>
    
  );
};

const AppBar = () => {
    return (
        <View style={styles.container}>
            {/* Space at the top to adjust for the bar */}
            <View style={[{ paddingTop: 30 }]}></View>

            <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }]}>
                <View style={[{ flex: 1 }]}>
                    <Text style={styles.appbarTitle}>Workout Tracker</Text>
                </View>
                <View style={[{ paddingRight: 20 }]}>
                    <Text onPress={() => Alert.alert('--Add Set--')}>+ Add Set</Text>
                </View>
            </View>
            <View style={[{ paddingBottom: 15 }]}></View>
        </View>);
};

function WorkoutTab({ navigation }) {
    return (
        <View style={[{ paddingBottom: 15 }]}>
            <TouchableNativeFeedback onPress={() => navigation.navigate('Workout')}>
                <View style={styles.workoutContainer}>
                    <Text style={styles.setTitleContainer}>Chest</Text>
                    <Text>3x 12 reps of 60kg - Bench Press</Text>
                    <Text>3x 11 reps of 50kg - Incline Bench Press</Text>
                    <Text>3x 14 reps of 20kg - Chest Flys</Text>
                    {/* Limit to only 3 lines of sets */}
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};
