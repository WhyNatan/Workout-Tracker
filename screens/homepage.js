import '../gesture-handler';
import { connectToDatabase, createTables, isDbReady } from '../db/database.tsx';
import { getWorkoutBiggestId, addWorkout, getWorkouts, deleteWorkout } from '../db/workouts.tsx';
import { addExercise, getExercises, getExercisesOfWorkout } from '../db/exercises.tsx';
import { Text, ScrollView, View, Image, TextInput, Button, Alert, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { styles } from '../styles/styles';
import { useSQLiteContext } from 'expo-sqlite';

// Will get overwritten with a function to refresh the workouts variable that is used to display the info on screen.
var updatePage;

async function getBackEnd(db) {

    var completeWorkouts = [];
    var workouts = [];
    var exercises = [];
    var workoutExercises = [];

    try {

        if (!isDbReady()) { 
            console.log("db is not ready yet.");
            return;
        };

        workouts = await getWorkouts(db);
        exercises = await getExercises(db);

        // Adding the exercises of the workouts
        for (i = 0; i < workouts.length; i++) {

            workoutExercises = [];
            for (j = 0; j < exercises.length; j++) {
                if (exercises[j].workoutId == workouts[i].workoutId) {
                    workoutExercises.push(exercises[j])
                }
            };

            completeWorkouts.push({bodyPart: workouts[i].bodyPart, workoutId: workouts[i].workoutId, exercises: workoutExercises});
        };
    } catch (e) {
        console.error("Error inside getBackEnd:", e);
    };

    return (completeWorkouts);
};

async function addWorkoutButton(db) {
    var workoutBiggestId = await getWorkoutBiggestId(db);

    await addWorkout(db, `New Workout ${(workoutBiggestId.workoutId + 1)}`);

    checkAllWorkouts(db);
    await updatePage();
};

async function checkAllWorkouts(db) {
    workouts = await getWorkouts(db);
    console.log(workouts);
};

async function confirmDeleteWorkout(db, workoutId,) {

    async function deleteConfirmedWorkout() {
        try {
            console.log("deleting workout:"+workoutId);
            await deleteWorkout(db, workoutId);
            await updatePage();
        } catch (e) {
            console.error(e);
        };
    };

    // Confirm if a delete was requested or not
    Alert.alert(
        '',
        'Are you sure you want to delete this Workout?',  
        [
            {text: 'Yes', onPress: () => deleteConfirmedWorkout(db, workoutId)},
            {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
        { cancelable: false },
    );
};

export function HomePage({ navigation }) {
    const db = useSQLiteContext();
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        async function setup() {
            console.log("Running Setup, workouts: ", workouts);
            var temp_workouts = await getBackEnd(db);
            await setWorkouts(temp_workouts);
            console.log("After running Setup: ", JSON.stringify(temp_workouts));
        };
        updatePage = setup;
        setup();

        // This will auto update the page once the "goBack" function of navigation on another page is called.
        const unsubscribe = navigation.addListener('focus', () => {
            updatePage();
        });
    }, []);

    console.log("----- Rendering HomePage -----");

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
    const db = useSQLiteContext();

    return (
        <View style={styles.container}>
            {/* Space at the top to adjust for the bar */}
            <View style={[{ paddingTop: 30 }]}></View>

            <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }]}>
                <View style={[{ flex: 1 }]}>
                    <Text style={styles.appbarTitle}>Workout Tracker</Text>
                </View>
                <View style={[{ paddingRight: 20 }]}>
                    <Text onPress={() => addWorkoutButton(db)}>+ Add Workout</Text>
                </View>
            </View>
            <View style={[{ paddingBottom: 15 }]}></View>
        </View>);
};

function Workouts({navigation, workouts = []}) {
    // Transform the workouts information into tabs for navigation.

    workoutViews = [];

    for (i = 0; i < workouts.length; i++) {
        workoutViews.push(<WorkoutTab navigation={navigation} workout={workouts[i]} key={i}/>);
    };

    return (workoutViews);
};

function WorkoutTab({ navigation, workout }) {
    const db = useSQLiteContext();

    var exercisesText = [];
    var workoutBodyPart  = workout.bodyPart;
    var workoutExercises = workout.exercises;

    // Not run through length if there are no exercises.
    if (workoutExercises != undefined) {
        // Limit the exercises to a max of 3 for size purposes.
        for (i = 0; i < workoutExercises.length && i < 3 ; i++) {
            exercisesText.push(<Text key={i}>- {workoutExercises[i].exercise}</Text>);
        }
    };

    return (
        <View style={[{ paddingBottom: 15 }]}>
            <TouchableNativeFeedback onPress={() => navigation.navigate('Workout', workout.workoutId)} onLongPress={() => confirmDeleteWorkout(db, workout.workoutId)}>
                <View style={styles.workoutContainer}>
                    <Text style={styles.setTitleContainer}>{workoutBodyPart}</Text>
                    {exercisesText}
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};
