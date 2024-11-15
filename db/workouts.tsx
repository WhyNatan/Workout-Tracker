import * as SQLite from 'expo-sqlite';

type Workout = {
    workoutId: number;
    bodyPart: string;
};

export const getWorkoutBiggestId = async (db: SQLite.SQLiteDatabase): Promise<Workout> => {
  try {
    const workoutBiggestId:Workout = await db.getFirstAsync(`SELECT MAX(workoutId) AS workoutId FROM Workouts;`);
    return workoutBiggestId;
  }  
  catch (error) {
    console.error("Error inside getWorkoutBiggestId:", error)
    throw Error("Failed to get Workouts from database")
  }
};

export const addWorkout = async (db: SQLite.SQLiteDatabase, bodyPart: string) => {
  const insertQuery = await db.prepareAsync(`
    INSERT INTO Workouts (workoutId, bodyPart)
    VALUES ($workoutId, $bodyPart)
  `);

  try {
    // Find the biggest workout Id and add 1 for an auto increment.
    var biggestWorkoutId:number = await db.getFirstAsync(`SELECT MAX(workoutId) FROM Workouts;`);
    biggestWorkoutId++;
    return await insertQuery.executeAsync({ $workoutId: biggestWorkoutId, $bodyPart: bodyPart });
  } catch (error) {
    console.error("Error inside addWorkout:", error);
    throw Error("Failed to add Workout.");
  };
}

export const getWorkout = async (db: SQLite.SQLiteDatabase, workoutId: number): Promise<Workout[]> => {
  try {
      const workout: Workout[] = await db.getFirstAsync(`SELECT * FROM Workouts WHERE workoutId = ${workoutId}`);
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

export const updateWorkoutBodyPart = async (db: SQLite.SQLiteDatabase, workout: Workout) => {
  var tempWorkout: Workout = {
    workoutId: workout.workoutId,
    bodyPart: workout.bodyPart,
  };

  const updateQuery = `
    UPDATE Workouts 
    SET bodyPart = '${tempWorkout.bodyPart}'
    WHERE workoutId = ${tempWorkout.workoutId};
  `;
  
  try {
    await db.runAsync(updateQuery);
  } catch (error) {
    console.error("Error inside updateWorkoutBodyPart:", error);
    throw Error("Failed to update Workout.");
  };
};

export const deleteWorkout = async (db: SQLite.SQLiteDatabase, workoutId: number) => {
  const deleteQuery = await db.prepareAsync(`
    DELETE FROM Workouts
    WHERE workoutId = $workoutId
  `);

  try {
    return await deleteQuery.executeAsync({ $workoutId: workoutId });
  } catch (error) {
    console.error("Error inside deleteWorkout:", error);
    throw Error("Failed to remove Workout.");
  };
};