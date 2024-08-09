import '../gesture-handler';
import { getWorkouts } from '../BackEnd';
import { Text, ScrollView, View, Image, TextInput, Button, Alert, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import { styles } from '../styles/styles';

function getBackEnd() {
    var workouts = [];

    workouts = getWorkouts();

    return (workouts);
};

export function HomePage({ navigation }) {
    var workouts = getBackEnd();

    return (
        <View style={{flex:1}}>
            <AppBar/>
            
            <ScrollView style={{flex:1}}>

                <Workouts navigation={navigation} workouts={workouts}/>

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
                    <Text onPress={() => Alert.alert('--Add Workout--')}>+ Add Workout</Text>
                </View>
            </View>
            <View style={[{ paddingBottom: 15 }]}></View>
        </View>);
};

function Workouts({navigation, workouts = []}) {
    // Transform the workouts information into tabs for navigation.

    workoutViews = [];

    for (i = 0; i < workouts.length; i++) {
        workoutViews.push(<WorkoutTab navigation={navigation} key={i} workout={workouts[i]}/>);
    };

    return (workoutViews);
};

function WorkoutTab({ navigation, key, workout }) {

    var exercisesText = [];
    var workoutBodypart  = workout.getBodypart();
    var workoutExercises = workout.getExercises();

    // Limit the exercises to a max of 3 for size purposes.
    for (i = 0; i < workoutExercises.length && i < 3 ; i++) {
        exercisesText.push(<Text>- {workoutExercises[i].exercise}</Text>);
    }

    return (
        <View style={[{ paddingBottom: 15 }]}>
            <TouchableNativeFeedback onPress={() => navigation.navigate('Workout', workout)}>
                <View style={styles.workoutContainer}>
                    <Text style={styles.setTitleContainer}>{workoutBodypart}</Text>
                    {exercisesText}
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};
