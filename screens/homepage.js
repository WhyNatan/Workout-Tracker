import '../gesture-handler';
import { Text, Dimensions, ScrollView, View, Image, TextInput, Button, Alert, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
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
    const screenWidth = Dimensions.get('window').width;
    return (
        <View style={[{ paddingBottom: 15 }]}>
            <TouchableNativeFeedback onPress={() => navigation.navigate('Workout')}>
                <View style={[{ width: screenWidth - 20, height: 110, backgroundColor: '#C6C6C6', paddingLeft: 20, alignSelf: 'center', borderRadius: 15, padding: 10 }]}>
                    <Text style={styles.setTitle}>Chest</Text>
                    <Text>3x 12 reps of 60kg - Bench Press</Text>
                    <Text>3x 11 reps of 50kg - Incline Bench Press</Text>
                    <Text>3x 14 reps of 20kg - Chest Flys</Text>
                    {/* Limit to only 3 lines of sets */}
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};
