import * as SQLite from 'expo-sqlite';

type Set = {
    setId: number;
    exerciseId: number;
    setOrder: number;
    reps: string;
    weight: string;
    bestSetReps: string;
    bestSetWeight: string;
};

export const addSet = async (db: SQLite.SQLiteDatabase, set: Set) => {
  const insertQuery = await db.prepareAsync(`
    INSERT INTO Sets (setId, exerciseId, setOrder, reps, weight, bestSetReps, bestSetWeight)
    VALUES ($setId, $exerciseId, $setOrder, $reps, $weight, $bestSetReps, $bestSetWeight)
  `);

  try {
    return await insertQuery.executeAsync({ $setId: set.setId, $exerciseId: set.exerciseId, $setOrder: set.setOrder, $reps: set.reps, $weight: set.weight, $bestSetReps: set.bestSetReps, $bestSetWeight: set.bestSetWeight });
  } catch (error) {
    console.error("Error inside addExercise:", error);
    throw Error("Failed to add Exercise.");
  };
}

export const getSetsOfExercise = async (db: SQLite.SQLiteDatabase, exerciseId: number): Promise<Set[]> => {
  try {
      const sets: Set[] = await db.getAllAsync(`SELECT * FROM Sets WHERE exerciseId = ${exerciseId}`);
      return sets;
  } catch (error) {
      console.error(error);
      throw Error(`Failed to get Sets Of ExerciseId: ${exerciseId} from database`);
  };
};
