import * as SQLite from 'expo-sqlite';

type Exercise = {
    exerciseId: number;
    workoutId: number;
    exercise: string;
    notes: string;
};

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
}

export const getExercises = async (db: SQLite.SQLiteDatabase): Promise<Exercise[]> => {
  try {
      const exercises: Exercise[] = await db.getAllAsync("SELECT * FROM Exercises");
    //   console.log("getWorkouts, workouts:", workouts);
      return exercises;
  } catch (error) {
      console.error(error)
      throw Error("Failed to get Exercises from database")
  };
};

export const getExercisesOfWorkout = async (db: SQLite.SQLiteDatabase, workoutId: number): Promise<Exercise[]> => {
    try {
        const exercises: Exercise[] = await db.getAllAsync(`SELECT * FROM Exercises WHERE workoutId = ${workoutId}`);
        // console.log("getExercisesOfWorkout, Exercises:", exercises);
        return exercises;
    } catch (error) {
        console.error(error)
        throw Error(`Failed to get Exercises of workoutId ${workoutId} from database`);
    };
  };

// export const deleteWorkout = async (db: SQLite.SQLiteDatabase, workout: Workout) => {
//   const deleteQuery = await db.prepareAsync(`
//     DELETE FROM Workouts
//     WHERE id = $workoutId
//   `);

//   try {
//     return await deleteQuery.executeAsync({ $workoutId: workout.workoutId });
//   } catch (error) {
//     console.error("Error inside deleteWorkout:", error);
//     throw Error("Failed to remove Workout.");
//   };
// };