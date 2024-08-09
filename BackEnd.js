import jsonData from "./storage/workouts.json";

class Workout {
    constructor(bodypart, exercises){ 
        this.bodypart = bodypart;
        this.exercises = exercises;
        console.log(`Workout for ${this.bodypart} created.`)
    };

    getBodypart() {
        return this.bodypart;
    };

    getExercises() {
        return this.exercises;
    };
};

class Exercise {
    constructor(exercise, sets, notes) {
        this.exercise = exercise;
        this.sets = sets;
        this.notes = notes;
    };

    getExercise() {
        return this.exercise;
    };

    getSets() {
        return this.sets;
    };

    getNotes() {
        return this.notes;
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
};

export function getWorkouts() {
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
                exercise = json.workouts[i].exercises[j].exercise, 
                sets     = sets, 
                notes    = json.workouts[i].exercises[j].notes
            ));
        };

        workouts.push(new Workout(bodypart = json.workouts[i].bodypart, exercises = exercises));
    };

    return (workouts);
};

export function createWorkout(bodypart) {

    var sets = [];
    var exercises = [];

    switch (bodypart) {
        case 'Chest':
            sets.push(new Set(exercise = 'Bench Press', setNumber = 1, order = 1, reps = 5, weight = 60, bestSetReps = 12, bestSetWeight = 60));
            sets.push(new Set(exercise = 'Bench Press', setNumber = 2, order = 1, reps = 5, weight = 60, bestSetReps = 6, bestSetWeight = 60));

            exercises.push(new Exercise(exercise = 'Bench Press', sets = sets, notes = 'No notes.'));

            sets = [];
            sets.push(new Set(exercise = 'Incline Bench Press', setNumber = 1, order = 1, reps = 10, weight = 50, bestSetReps = 11, bestSetWeight = 50));
            sets.push(new Set(exercise = 'Incline Bench Press', setNumber = 2, order = 1, reps = 7, weight = 50, bestSetReps = 8, bestSetWeight = 50));

            exercises.push(new Exercise(exercise = 'Incline Bench Press', sets = sets, notes = 'No notes, again.'));

            sets = [];
            sets.push(new Set(exercise = 'Crucifixo', setNumber = 1, order = 1, reps = 9, weight = 20, bestSetReps = 14, bestSetWeight = 20));
            sets.push(new Set(exercise = 'Crucifixo', setNumber = 2, order = 1, reps = 6, weight = 20, bestSetReps = 10, bestSetWeight = 20));

            exercises.push(new Exercise(exercise = 'Crucifixo', sets = sets, notes = 'No notes, once again.'));

            sets = [];
            sets.push(new Set(exercise = 'Chest Pull Machine', setNumber = 1, order = 1, reps = 10, weight = '13P', bestSetReps = 12, bestSetWeight = '13P'));
            sets.push(new Set(exercise = 'Chest Pull Machine', setNumber = 2, order = 1, reps = 7, weight = '13P', bestSetReps = 10, bestSetWeight = '13P'));

            exercises.push(new Exercise(exercise = 'Chest Pull Machine', sets = sets, notes = 'No notes, one more time.'));

            var workout = new Workout(bodypart = bodypart, exercises = exercises);

            break;
        default:
            var workout = new Workout(bodypart = 'New Workout', exercises = []);
            console.log("defaulted");
            break;
    };

    return(workout);
};