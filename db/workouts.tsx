import * as SQLite from 'expo-sqlite';

type Workout = {
    workoutId: number;
    bodyPart: string;
};

export const addWorkout = async (db: SQLite.SQLiteDatabase, workout: Workout) => {
  const insertQuery = await db.prepareAsync(`
    INSERT INTO Workouts (workoutId, bodyPart)
    VALUES ($workoutId, $bodyPart)
  `);

  try {
    return await insertQuery.executeAsync({ $workoutId: workout.workoutId, $bodyPart: workout.bodyPart });
  } catch (error) {
    console.error("Error inside addWorkout:", error);
    throw Error("Failed to add Workout.");
  };
}

export const getWorkout = async (db: SQLite.SQLiteDatabase, workoutId: number): Promise<Workout[]> => {
  try {
      const workout: Workout[] = await db.getAllAsync(`SELECT * FROM Workouts WHERE workoutId = ${workoutId}`);
      // console.log("getWorkout, workout:", workouts);
      return workout;
  } catch (error) {
      console.error(error)
      throw Error("Failed to get Workouts from database")
  }
};

export const getWorkouts = async (db: SQLite.SQLiteDatabase): Promise<Workout[]> => {
  try {
      const workouts: Workout[] = await db.getAllAsync("SELECT * FROM Workouts");
      // console.log("getWorkouts, workouts:", workouts);
      return workouts;
  } catch (error) {
      console.error(error)
      throw Error("Failed to get Workouts from database")
  }
};

export const deleteWorkout = async (db: SQLite.SQLiteDatabase, workout: Workout) => {
  const deleteQuery = await db.prepareAsync(`
    DELETE FROM Workouts
    WHERE id = $workoutId
  `);

  try {
    return await deleteQuery.executeAsync({ $workoutId: workout.workoutId });
  } catch (error) {
    console.error("Error inside deleteWorkout:", error);
    throw Error("Failed to remove Workout.");
  };
};