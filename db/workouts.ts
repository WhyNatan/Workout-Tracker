import { enablePromise, SQLiteDatabase } from 'react-native-sqlite-storage';

type Workout = {
    workoutId: number;
    bodyPart: string;
};

enablePromise(true);

export const addWorkout = async (db: SQLiteDatabase, workout: Workout) => {
    const insertQuery = `
     INSERT INTO Workouts (workoutId, bodyPart)
     VALUES (?, ?)
   `
    const values = [
      workout.workoutId,
      workout.bodyPart,
    ];

    console.log("ADDWORKOUT");
    console.log(db);

    try {
      return db.executeSql(insertQuery, values)
    } catch (error) {
      console.error(error)
      throw Error("Failed to add Workout.")
    }
  }

export const getWorkouts = async (db: SQLiteDatabase): Promise<Workout[]> => {
    try {
        const workouts: Workout[] = [];
        const results = await db.executeSql("SELECT * FROM Workouts");
        results.forEach((result) => {
          for (let index = 0; index < result.rows.length; index++) {
              workouts.push(result.rows.item(index))
          };
        });
        return workouts;
    } catch (error) {
        console.error(error)
        throw Error("Failed to get Workouts from database")
    }
};

export const deleteWorkout = async (db: SQLiteDatabase, workout: Workout) => {
  const deleteQuery = `
    DELETE FROM Workouts
    WHERE id = ?
  `
  const values = [workout.workoutId]
  try {
    return db.executeSql(deleteQuery, values)
  } catch (error) {
    console.error(error)
    throw Error("Failed to remove Workout.")
  }
};