import '../gesture-handler';
import { addWorkout, getWorkouts, getWorkout, updateWorkoutBodyPart } from '../db/workouts.tsx';
import { addExercise, addEmptyExercise, getExercises, getExercisesOfWorkout, updateExerciseOfWorkout, deleteExerciseOfWorkout } from '../db/exercises.tsx';
import { getSetsOfExerciseOfWorkout, addEmptySet, deleteSetOfExercise, updateSetOfExercise } from '../db/sets.tsx';
import { useCallback, useEffect, React, useState } from 'react';
import { View, Text, Alert, TextInput, TouchableNativeFeedback, Button } from 'react-native';
import { styles } from '../styles/styles';
import { Icon } from '@rneui/base';
import { ScrollView } from 'react-native-gesture-handler';
import { useSQLiteContext } from 'expo-sqlite';

// Keeping it global to ease the use of it in the submit function.
var WorkoutId;

var updatePage;

async function getWorkoutBodyPart(db, workoutId) {

    try {
        var workout = await getWorkout(db, workoutId);

        return (workout.bodyPart);
    } catch (e) {
        console.error(e);
    };
};

async function getWorkoutExercises(db, workoutId) {

    var completeExercises = [];
    var exercises = [];

    try {
        exercises = await getExercisesOfWorkout(db, workoutId);

        // Getting the exercises of the workouts
        for (i = 0; i < exercises.length; i++) {
            sets = await getSetsOfExerciseOfWorkout(db, exercises[i].exerciseId, exercises[i].workoutId);
            
            completeExercises.push({exercise: exercises[i].exercise, exerciseId: exercises[i].exerciseId, sets: sets, notes: exercises[i].notes});
        };
    } catch (e) {
        console.error(e);
    };

    return (completeExercises);
};

async function prepareToAddEmptyExercise(db, workoutId) {

    await addEmptyExercise(db, workoutId);
    await updatePage();
};

async function prepareToAddEmptySet(db, exerciseId, workoutId) {

    await addEmptySet(db, exerciseId, workoutId);
    await updatePage();
};

async function requestUpdateExercise(db, exerciseId, workoutId, exercise, notes) {
    var tempExercise= {
        exerciseId: exerciseId,
        workoutId: workoutId,
        exercise: exercise,
        notes: notes,
    };

    await updateExerciseOfWorkout(db, tempExercise);
};

async function requestUpdateWorkout(db, workoutId, workoutBodyPart) {
    var tempWorkout= {
        workoutId: workoutId,
        bodyPart: workoutBodyPart,
    };

    await updateWorkoutBodyPart(db, tempWorkout);
};

async function requestUpdateSetOfExercise(db, setId, exerciseId, workoutId, setReps, setWeight) {
    var tempSet= {
        setId: setId,
        exerciseId: exerciseId,
        workoutId: workoutId,
        setOrder: setId,
        reps: setReps,
        weight: setWeight,
        bestSetReps: setReps,
        bestSetWeight: setWeight,
    };

    await updateSetOfExercise(db, tempSet);
    await updatePage();

    return true;
};

async function confirmDeleteExercise(db, exerciseId, workoutId) {

    async function deleteConfirmedExercise(db, exerciseId, workoutId) {
        try {
            console.log("deleting exercise:"+exerciseId);
            await deleteExerciseOfWorkout(db, exerciseId, workoutId);
            await updatePage();
        } catch (e) {
            console.error(e);
        };
    };

    // Confirm if a delete was requested or not
    Alert.alert(
        '',
        `Are you sure you want to delete this Exercise?`,  
        [
            {text: 'Yes', onPress: () => deleteConfirmedExercise(db, exerciseId, workoutId)},
            {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
        { cancelable: false },
    );
};

async function confirmDeleteSet(db, setId, exerciseId, workoutId) {
    async function deleteConfirmedSet(db, setId, exerciseId, workoutId) {
        try {
            console.log("deleting set:"+setId);
            await deleteSetOfExercise(db, setId, exerciseId, workoutId);
            await updatePage();
        } catch (e) {
            console.error(e);
        };
    };

    // Confirm if a delete was requested or not
    Alert.alert(
        '',
        `Are you sure you want to delete this Set?`,  
        [
            {text: 'Yes', onPress: () => deleteConfirmedSet(db, setId, exerciseId, workoutId)},
            {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
        { cancelable: false },
    );
};

export function WorkoutPage({ navigation, route }) {
    var workoutId = route.params;

    WorkoutId = workoutId;

    const db = useSQLiteContext();
    const [workoutBodyPart, setWorkoutBodyPart] = useState([]);
    const [workoutExercises, setWorkoutExercises] = useState([]);

    useEffect(() => {
        async function setup() {
            var temp_workoutBodyPart = await getWorkoutBodyPart(db, workoutId);
            var temp_workoutExercises = await getWorkoutExercises(db, workoutId);
            setWorkoutBodyPart(temp_workoutBodyPart);
            setWorkoutExercises(temp_workoutExercises);
        };
        updatePage = setup;
        setup();
    }, []);

    async function prepareUpdateWorkoutBodyPart(newWorkoutBodyPart) {
        await setWorkoutBodyPart(newWorkoutBodyPart);
        await requestUpdateWorkout(db, WorkoutId, newWorkoutBodyPart);
    };

    return (
        <View style={[{flex:1}]}>
            <AppBar navigation={navigation}/>

            <ScrollView style={styles.workoutBackground}>
                <TextInput style={styles.exerciseBodyPart} value={workoutBodyPart} onChangeText={newWorkoutBodyPart => prepareUpdateWorkoutBodyPart(newWorkoutBodyPart)}/>

                <ExercisesBlock exercises={workoutExercises}/>

                <TouchableNativeFeedback onPress={()=>{prepareToAddEmptyExercise(db, workoutId)}}>
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

function ExercisesBlock(props) {
    
    var workoutExercises = props.exercises;
    var exerciseBlocks = [];

    for (i = 0; i < workoutExercises.length; i++) {
        exerciseBlocks.push(<ExerciseBlock exercise={workoutExercises[i]} key={i}/>);
    };

    return (exerciseBlocks);
};

function ExerciseBlock(props) {
    const [exerciseName, setExerciseName]   = useState(props.exercise.exercise);
    const [exerciseNotes, setExerciseNotes] = useState(props.exercise.notes);

    var exerciseSets = props.exercise.sets;
    var exerciseId = props.exercise.exerciseId;

    const db = useSQLiteContext();

    async function prepareUpdateExerciseName(newExerciseName) {
        await setExerciseName(newExerciseName);
        await requestUpdateExercise(db, exerciseId, WorkoutId, newExerciseName, exerciseNotes);
    };

    async function prepareUpdateExerciseNotes(newExerciseNotes) {
        await setExerciseNotes(newExerciseNotes);
        await requestUpdateExercise(db, exerciseId, WorkoutId, exerciseName, newExerciseNotes);
    };
    
  return (
    <View style={[{marginBottom:40}, styles.exerciseContainer]}>
        <View style={[styles.exerciseTitleContainer, styles.containerRow]}>
            <TextInput style={styles.exerciseTitle} value={exerciseName} onChangeText={newExerciseName => prepareUpdateExerciseName(newExerciseName)}/>
            <Text> </Text>
            <Icon name='edit' size={15}/>
            <Icon name='delete' iconStyle={{}} size={20} onPress={() => confirmDeleteExercise(db, exerciseId, WorkoutId)}/>
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
                <Icon name='check' size={22}/>
            </GridCell>
        </View>

        <SetsView sets={exerciseSets} exerciseId={exerciseId}/>

        <TouchableNativeFeedback onPress={() => prepareToAddEmptySet(db, exerciseId, WorkoutId,)}>
            <View style={styles.exerciseAddContainer}>
                <Text style={styles.exerciseAdd}>Add Set</Text>
            </View>
        </TouchableNativeFeedback>

        <View style={styles.exerciseFooterContainer}>
            <View style={styles.containerRow}>
                <Text style={[{fontWeight: 'bold', fontSize: 14,}]}>Notes </Text>
                <Icon name='notes' size={13} />
            </View>
            <TextInput 
                style={[styles.exerciseNotes, styles.multilineText]}
                value={exerciseNotes}
                onChangeText={newExerciseNotes => prepareUpdateExerciseNotes(newExerciseNotes)}
                placeholder="Write notes here."
                multiline
            />
        </View>
    </View>
  ); 
};

function SetsView(props) {

    var exerciseId = props.exerciseId;
    var workoutSets = props.sets;
    var setRows = [];

    for (i = 0; i < workoutSets.length; i++) {
        setRows.push(<SetView workoutSet={workoutSets[i]} exerciseId = {exerciseId} key={i}/>);
    };

    return (setRows);
};

function SetView(props) {
    const exerciseId = props.exerciseId;
    const workoutSet = props.workoutSet;
    const setId = workoutSet.setId;
    const [setReps, setSetReps]     = useState(workoutSet.setReps);
    const [setWeight, setSetWeight] = useState(workoutSet.setWeight);

    const db = useSQLiteContext();

    async function prepareUpdateExerciseSet(setReps, setWeight) {
        var setWasUpdated = await requestUpdateSetOfExercise(db, setId, exerciseId, WorkoutId, setReps, setWeight);
        if (setWasUpdated) {
            setSetReps("");
            setSetWeight("");
        };
    };

    return(
        <TouchableNativeFeedback onLongPress={() => confirmDeleteSet(db, setId, exerciseId, WorkoutId)}>
            <View style={[styles.exerciseLineContainer, styles.containerRow]} key={i}>
                <GridCell width={3}> 
                    <Text style={styles.exerciseLine}>{workoutSet.setOrder}</Text> 
                </GridCell>
                <GridCell width={8}> 
                    <Text style={styles.exerciseLine}>{workoutSet.reps} x {workoutSet.weight}</Text> 
                </GridCell>
                <GridCell width={5}> 
                    <TextInput style={styles.exerciseLineEditable} value={setReps} onChangeText={newSetReps => setSetReps(newSetReps)}/> 
                </GridCell>
                <GridCell width={5}> 
                    <TextInput style={styles.exerciseLineEditable} value={setWeight} onChangeText={newSetWeight => setSetWeight(newSetWeight)}/> 
                </GridCell>
                <GridCell width={9}> 
                    <Text style={styles.exerciseLine}>{workoutSet.bestSetReps} x {workoutSet.bestSetWeight}</Text> 
                </GridCell>
                <GridCell width={2}> 
                    <Icon name='check' size={20} onPress={()=>{prepareUpdateExerciseSet(setReps, setWeight)}}/>
                </GridCell>
            </View>
        </TouchableNativeFeedback>
    );
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
                </View>
            </View>
            <View style={[{ paddingBottom: 15 }]}></View>
        </View>);
};