import jsonData from "./storage/workouts.json";

class Workout {
    constructor(workoutId, bodypart, exercises){ 
        this.workoutId = workoutId;
        this.bodypart = bodypart;
        this.exercises = exercises;
        console.log(`Workout for ${this.bodypart} created.`)
    };

    getWorkoutId() {
        return this.workoutId;
    };

    getBodypart() {
        return this.bodypart;
    };

    getExercises() {
        return this.exercises;
    };

    getExercise(exerciseId) {

        for (i = 0; i < this.exercises.length; i++) {
            if (this.exercises[i].exerciseId === exerciseId) {
                return this.exercises[i];
            };
        };
        
        // Return false in case of not finding a workout.
        return false;
    };
};

class Exercise {
    constructor(exerciseId, exercise, sets, notes) {
        this.exerciseId = exerciseId;
        this.exercise = exercise;
        this.sets = sets;
        this.notes = notes;
    };

    getExerciseId() {
        return this.exerciseId;
    };

    getExercise() {
        return this.exercise;
    };

    getSets() {
        return this.sets;
    };

    getSet(setNumber) {
        for (i = 0; i < this.sets.length; i++) {
            if (this.sets[i].setNumber === setNumber) {
                return this.sets[i];
            };
        };
        
        // Return false in case of not finding a workout.
        return false;
    };

    getNotes() {
        return this.notes;
    };

    setExerciseId(exerciseId) {
        this.exerciseId = exerciseId;
    };

    setExercise(exercise) {
        this.exercise = exercise;
    };

    setSets(sets) {
        this.sets = sets;
    };

    setNotes(notes) {
        this.notes = notes;
    };
};

class Set {
    constructor(setNumber, order, reps, weight, bestSetReps, bestSetWeight) {
        this.setNumber = setNumber;
        this.order = order;
        this.reps = reps;
        this.weight = weight;
        this.bestSetReps = bestSetReps;
        this.bestSetWeight = bestSetWeight;
    };

    getSetNumber() {
        return this.setNumber;
    };

    getOrder() {
        return this.order;
    };

    getReps() {
        return this.reps;
    };

    getWeight() {
        return this.weight;
    };
    
    getBestSetReps() {
        return this.bestSetReps;
    };

    getBestSetWeight() {
        return this.bestSetWeight;
    };

    setReps(reps) {
        this.reps = reps;
    };

    setWeight(weight) {
        this.weight = weight;
    };
};

class BackEndManagerClass {
    constructor(workouts) {
        this.workouts = workouts;
    };

    getWorkouts() {
        return this.workouts;
    };

    getWorkout(workoutId) {

        for (i = 0; i < this.workouts.length; i++) {
            if (this.workouts[i].workoutId === workoutId) {
                return this.workouts[i];
            };
        };
        
        // Return false in case of not finding a workout.
        return false;
    };

    saveWorkout(workout) {
        console.log(workout);
    };

    saveWorkoutExerciseSet(workoutId, exerciseId, workoutSetNumber, newSetReps, newSetWeight) {
        // console.log(`Saving workout for: workoutId: ${workoutId}, exerciseId: ${exerciseId}, workoutSetNumber: ${workoutSetNumber}, newSetReps: ${newSetReps}, newSetWeight: ${newSetWeight}`);
        try {
            var updatedWorkout = this.getWorkout(workoutId);
            var updatedExercise = updatedWorkout.getExercise(exerciseId);
            var updatedSet = updatedExercise.getSet(workoutSetNumber);
            
            // Verify the Set was found.
            if (updatedSet == false) {
                console.error("Set wasn't found. Not able to update.")
                return 0;
            }

            updatedSet.setReps(newSetReps);
            updatedSet.setWeight(newSetWeight);
        } catch(e) {
            console.error(e);
        }
    };
};

// Get the workouts from the backend and create the Manager for the pages to use.
var json = [];
var workouts = [];
var exercises = [];
var sets = [];

json = jsonData;

for (i = 0; i < json.workouts.length; i++) {
    
    exercises = [];
    for (j = 0; j < json.workouts[i].exercises.length; j++) {
        
        sets = [];
        for (k = 0; k < json.workouts[i].exercises[j].sets.length; k++) {
            sets.push(new Set(
                setNumber     = json.workouts[i].exercises[j].sets[k].setNumber,
                order         = json.workouts[i].exercises[j].sets[k].order,
                reps          = json.workouts[i].exercises[j].sets[k].reps,
                weight        = json.workouts[i].exercises[j].sets[k].weight, 
                bestSetReps   = json.workouts[i].exercises[j].sets[k].bestSetReps, 
                bestSetWeight = json.workouts[i].exercises[j].sets[k].bestSetWeight, 
            ));
        };

        exercises.push(new Exercise(
            exerciseId  = json.workouts[i].exercises[j].exerciseId, 
            exercise    = json.workouts[i].exercises[j].exercise, 
            sets        = sets, 
            notes       = json.workouts[i].exercises[j].notes
        ));
    };

    workouts.push(new Workout(workoutId = json.workouts[i].workoutId, bodypart = json.workouts[i].bodypart, exercises = exercises));
};

export const BackEndManager = new BackEndManagerClass(workouts = workouts);