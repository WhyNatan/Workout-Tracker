import * as SQLite from 'expo-sqlite';

type Exercise = {
    exerciseId: number;
    workoutId: number;
    exercise: string;
    notes: string;
};

type MaxExerciseId = {
  maxExerciseId: number;
}

export const addExercise = async (db: SQLite.SQLiteDatabase, exercise: Exercise) => {
  const insertQuery = await db.prepareAsync(`
    INSERT INTO Exercises (exerciseId, workoutId, exercise, notes)
    VALUES ($exerciseId, $workoutId, $exercise, $notes)
  `);

  try {
    return await insertQuery.executeAsync({ $exerciseId: exercise.exerciseId, $workoutId: exercise.workoutId, $exercise: exercise.exercise, $notes: exercise.notes });
  } catch (error) {
    console.error("Error inside addExercise:", error);
    throw Error("Failed to add Exercise.");
  };
};

export const addEmptyExercise = async (db: SQLite.SQLiteDatabase, workoutId: number) => {

  try {
    // Find the biggest workout Id, translate it into a number using a custom type and add 1 for an auto increment.
    var getBiggestExerciseId:MaxExerciseId = await db.getFirstAsync(`SELECT MAX(exerciseId) AS maxExerciseId FROM Exercises WHERE workoutId = ${workoutId};`);
    var biggestExerciseId:number = getBiggestExerciseId.maxExerciseId;
    biggestExerciseId++;

  } catch(error) {
    console.error("Error inside addEmptyExercise:", error);
    throw Error("Failed to find biggest ExerciseId.");
  };

  var tempExercise: Exercise = {
    exerciseId: biggestExerciseId,
    workoutId: workoutId,
    exercise: "",
    notes: "",
  };

  const insertQuery = await db.prepareAsync(`
    INSERT INTO Exercises (exerciseId, workoutId, exercise, notes)
    VALUES ($exerciseId, $workoutId, $exercise, $notes)
  `);

  try {
    return await insertQuery.executeAsync({ $exerciseId: tempExercise.exerciseId, $workoutId: tempExercise.workoutId, $exercise: tempExercise.exercise, $notes: tempExercise.notes });
  } catch (error) {
    console.error("Error inside addEmptyExercise:", error);
    throw Error("Failed to add Exercise.");
  };
};

export const getExercises = async (db: SQLite.SQLiteDatabase): Promise<Exercise[]> => {
  try {
      const exercises: Exercise[] = await db.getAllAsync("SELECT * FROM Exercises");
    //   console.log("getWorkouts, workouts:", workouts);
      return exercises;
  } catch (error) {
      console.error(error);
      throw Error("Failed to get Exercises from database");
  };
};

export const getExercisesOfWorkout = async (db: SQLite.SQLiteDatabase, workoutId: number): Promise<Exercise[]> => {
  try {
    const exercises: Exercise[] = await db.getAllAsync(`SELECT * FROM Exercises WHERE workoutId = ${workoutId}`);
    // console.log("getExercisesOfWorkout, Exercises:", exercises);
    return exercises;
  } catch (error) {
    console.error(error);
    throw Error(`Failed to get Exercises of workoutId ${workoutId} from database`);
  };
};

export const updateExerciseOfWorkout = async (db: SQLite.SQLiteDatabase, exercise: Exercise) => {
  var tempExercise: Exercise = {
    exerciseId: exercise.exerciseId,
    workoutId: exercise.workoutId,
    exercise: exercise.exercise,
    notes: exercise.notes,
  };

  const updateQuery = `
    UPDATE Exercises 
    SET exerciseId = ${tempExercise.exerciseId}, exercise = '${tempExercise.exercise}', notes = '${tempExercise.notes}'
    WHERE workoutId = ${tempExercise.workoutId};
  `;
  
  try {
    await db.runAsync(updateQuery);
  } catch (error) {
    console.error("Error inside updateExerciseOfWorkout:", error);
    throw Error("Failed to update Exercise.");
  };
};

export const deleteExerciseOfWorkout = async (db: SQLite.SQLiteDatabase, exerciseId: number, workoutId: number) => {
  const deleteQuery = await db.prepareAsync(`
    DELETE FROM Exercises
    WHERE exerciseId = $exerciseId
    AND workoutId = $workoutId
  `);

  try {
    return await deleteQuery.executeAsync({ $exerciseId: exerciseId, $workoutId: workoutId });
  } catch (error) {
    console.error("Error inside deleteExerciseOfWorkout:", error);
    throw Error("Failed to remove Exercise.");
  };
};