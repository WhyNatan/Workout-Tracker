import '../gesture-handler';
import '../BackEnd';
import { BackEndManager} from '../BackEnd';
import { addWorkout, getWorkouts } from '../db/workouts.tsx';
import { addExercise, getExercises, getExercisesOfWorkout } from '../db/exercises.tsx';
import { React, useState } from 'react';
import { View, Text, Alert, TextInput, TouchableNativeFeedback, Button } from 'react-native';
import { styles } from '../styles/styles';
import { Icon } from '@rneui/base';
import { ScrollView } from 'react-native-gesture-handler';

// Keeping it global to ease the use of it in the submit function.
var WorkoutId;

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

export function WorkoutPage({ navigation, route }) {
    var workoutId = route.params;
    var workoutBodyPart  = workout.getBodyPart();
    var workoutExercises = workout.getExercises();
    
    WorkoutId = workoutId;

    return (

        <View style={[{flex:1}]}>
            <AppBar navigation={navigation}/>

            <ScrollView style={[{paddingLeft: 20, paddingTop: 10}]}>
                <TextInput style={styles.exerciseBodyPart} value={workoutBodyPart}/>

                <ExercisesBlock exercises={workoutExercises}/>

                <TouchableNativeFeedback onPress={()=>{Alert.alert("Add Exercise")}}>
                    <View style={styles.addExerciseContainer}> 
                        <Text style={styles.addExercise}>
                            Add Exercise
                        </Text>
                    </View>
                </TouchableNativeFeedback>

            </ScrollView>
        </View>
    );
};

function ExercisesBlock(exercises) {
    
    // Weird adaptation because the "exercises" from the prop is encapsulating the actual "exercises" variable.
    var workoutExercises = exercises.exercises;
    var exerciseBlocks = [];

    for (i = 0; i < workoutExercises.length; i++) {
        exerciseBlocks.push(<ExerciseBlock exercise={workoutExercises[i]} key={i}/>);
    };

    return (exerciseBlocks);
};

function ExerciseBlock(props) {
    const [exerciseName, setExerciseName]   = useState(props.exercise.getExercise());
    const [exerciseSets, setExerciseSets]   = useState(props.exercise.getSets());
    const [exerciseNotes, setExerciseNotes] = useState(props.exercise.getNotes());

    const exerciseId = props.exercise.getExerciseId();

  return (
    <View style={[{marginBottom:40}]}>
        <View style={[styles.exerciseTitleContainer, styles.containerRow]}>
            <TextInput style={styles.exerciseTitle} value={exerciseName} onChangeText={newExerciseName => setExerciseName(newExerciseName)}/>
            <Text> </Text>
            <Icon name='edit' size={15}/>
        </View>

        {/* Caption line */}
        <View style={[styles.exerciseCaptionContainer, styles.containerRow]}>
            <GridCell width={3}> 
                <Text style={styles.exerciseCaption}>Set</Text> 
            </GridCell>
            <GridCell width={8}> 
                <Text style={styles.exerciseCaption}>Previous</Text> 
            </GridCell>
            <GridCell width={5}> 
                <Text style={styles.exerciseCaption}>Reps</Text> 
            </GridCell>
            <GridCell width={5}> 
                <Text style={styles.exerciseCaption}>Weight</Text> 
            </GridCell>
            <GridCell width={9}> 
                <Text style={styles.exerciseCaption}>Best Set</Text> 
            </GridCell>
            <GridCell width={2}> 
                <Icon name='check' size ={22}/>
            </GridCell>
        </View>

        {/* <SetsView sets={exerciseSets}/> */}
        <SetsView sets={exerciseSets} exerciseId={exerciseId}/>

        <View style={styles.exerciseAddContainer}>
            <Text style={styles.exerciseAdd} onPress={() => Alert.alert("Add Set")}>Add Set</Text>
        </View>

        <View style={styles.exerciseFooterContainer}>
            <View style={styles.containerRow}>
                <Text style={[{fontWeight: 'bold', fontSize: 14,}]}>Notes </Text>
                <Icon name='notes' size={13} />
            </View>
            <TextInput 
                style={[styles.exerciseNotes, styles.multilineText]}
                value={exerciseNotes}
                onChangeText={newExerciseNotes => setExerciseNotes(newExerciseNotes)}
                placeholder="Write notes here."
                multiline
            />
        </View>
    </View>
  ); 
};

// function SetsView(sets){
// function SetsView(sets, currentExerciseId) {
function SetsView(props) {

    var exerciseId = props.exerciseId;
    // var workoutSets = sets.sets;
    var workoutSets = props.sets;
    var setRows = [];

    for (i = 0; i < workoutSets.length; i++) {
        const setNumber = workoutSets[i].setNumber;
        const [setReps, setSetReps]     = useState("");
        const [setWeight, setSetWeight] = useState("");

        setRows.push(
            <View style={[styles.exerciseLineContainer, styles.containerRow]} key={i}>
                <GridCell width={3}> 
                    <Text style={styles.exerciseLine}>{workoutSets[i].setNumber}</Text> 
                </GridCell>
                <GridCell width={8}> 
                    <Text style={styles.exerciseLine}>{workoutSets[i].reps} x {workoutSets[i].weight}</Text> 
                </GridCell>
                <GridCell width={5}> 
                    <TextInput style={styles.exerciseLineEditable} value={setReps} onChangeText={newSetReps => setSetReps(newSetReps)}/> 
                </GridCell>
                <GridCell width={5}> 
                    <TextInput style={styles.exerciseLineEditable} value={setWeight} onChangeText={newSetWeight => setSetWeight(newSetWeight)}/> 
                </GridCell>
                <GridCell width={9}> 
                    <Text style={styles.exerciseLine}>{workoutSets[i].bestSetReps} x {workoutSets[i].bestSetWeight}</Text> 
                </GridCell>
                <GridCell width={2}> 
                    <Icon name='check' size={20} onPress={()=>{submitSet(WorkoutId, exerciseId, setNumber, setReps, setWeight)}}/>
                </GridCell>
            </View>
        );
    };

    return (setRows);
};

const GridCell = ({width, children}) => {
    return (
        <View style={[{width: (width * 10), alignItems: 'center'}]}>
            {children}
        </View>
    )
};

const AppBar = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Space at the top to adjust for the bar */}
            <View style={[{ paddingTop: 30 }]}></View>

            <View style={styles.containerRow}>
                <TouchableNativeFeedback onPress={() => navigation.goBack()}>
                    <View style={styles.containerRow}>
                        <Icon name='chevron-left' size={40}/>
                        <Text style={{fontSize: 20,}}>Back</Text>
                    </View>
                </TouchableNativeFeedback>
                <View style={[{ flex: 1 }]}>
                    {/* <Text style={styles.appbarTitle}>Workout Tracker</Text> */}
                </View>
            </View>
            <View style={[{ paddingBottom: 15 }]}></View>
        </View>);
};

function submitSet(workoutId, exerciseId, workoutSetNumber, newSetReps, newSetWeight) {
    BackEndManager.saveWorkoutExerciseSet(workoutId, exerciseId, workoutSetNumber, newSetReps, newSetWeight);
};