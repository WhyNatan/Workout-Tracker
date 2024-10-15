import '../gesture-handler';
import { connectToDatabase, createTables } from '../db/database.tsx';
import { addWorkout, getWorkouts, deleteWorkout } from '../db/workouts.tsx';
import { addExercise, getExercises, getExercisesOfWorkout } from '../db/exercises.tsx';
import { BackEndManager } from '../BackEnd';
import { Text, ScrollView, View, Image, TextInput, Button, Alert, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { styles } from '../styles/styles';
import { useSQLiteContext } from 'expo-sqlite';

async function getBackEnd(db) {
    
    // console.log("inside getBackEnd");

    var completeWorkouts = [];
    var workouts = [];
    var exercises = [];

    try {
        workouts = await getWorkouts(db);

        // console.log("workouts var:", workouts);

        // Getting the exercises of the workouts
        for (i = 0; i < workouts.length; i++) {
            exercises = await getExercisesOfWorkout(db, workouts[i].workoutId);
            
            completeWorkouts.push({bodyPart: workouts[i].bodyPart, workoutId: workouts[i].workoutId, exercises: exercises});
        };
    } catch (e) {
        console.error(e);
    };

    // console.log("GetBackEnd: ", completeWorkouts);]\

    return (completeWorkouts);
};

async function addWorkoutButton(db) {
    await addWorkout(db, "New Workout");
    checkAllWorkouts(db);
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
    var placeholder;

    useEffect(() => {
        async function setup() {
            var temp_workouts = await getBackEnd(db);
            setWorkouts(temp_workouts);
        };
        setup();
    }, []);
    // }, [workouts]);

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
                    {/* <Text onPress={() => Alert.alert('--Add Workout--')}>+ Add Workout</Text> */}
                    <Text onPress={() => addWorkoutButton(db)}>+ Add Workout</Text>
                </View>
            </View>
            <View style={[{ paddingBottom: 15 }]}></View>
        </View>);
};

function Workouts({navigation, workouts = []}) {
    // Transform the workouts information into tabs for navigation.

    // console.log("inside Workouts:", workouts);
    workoutViews = [];

    for (i = 0; i < workouts.length; i++) {
        workoutViews.push(<WorkoutTab navigation={navigation} workout={workouts[i]} key={i}/>);
    };

    return (workoutViews);
};

function WorkoutTab({ navigation, workout, key }) {
    const db = useSQLiteContext();

    var exercisesText = [];
    var workoutBodyPart  = workout.bodyPart;
    var workoutExercises = workout.exercises;

    // Not run through length if there are no exercises.
    if (workoutExercises != undefined) {
        // Limit the exercises to a max of 3 for size purposes.
        for (i = 0; i < workoutExercises.length && i < 3 ; i++) {
            exercisesText.push(<Text>- {workoutExercises[i].exercise}</Text>);
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
