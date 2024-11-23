import * as SQLite from 'expo-sqlite';

type Set = {
    setId: number;
    exerciseId: number;
    workoutId: number;
    setOrder: number;
    reps: string;
    weight: string;
    bestSetReps: string;
    bestSetWeight: string;
};

export const addSet = async (db: SQLite.SQLiteDatabase, set: Set) => {
  const insertQuery = await db.prepareAsync(`
    INSERT INTO Sets (setId, exerciseId, workoutId, setOrder, reps, weight, bestSetReps, bestSetWeight)
    VALUES ($setId, $exerciseId, $workoutId, $setOrder, $reps, $weight, $bestSetReps, $bestSetWeight)
  `);

  try {
    return await insertQuery.executeAsync({ $setId: set.setId, $exerciseId: set.exerciseId, $workoutId: set.workoutId, $setOrder: set.setOrder, $reps: set.reps, $weight: set.weight, $bestSetReps: set.bestSetReps, $bestSetWeight: set.bestSetWeight });
  } catch (error) {
    console.error("Error inside addExercise:", error);
    throw Error("Failed to add Exercise.");
  };
}

export const getSetsOfExerciseOfWorkout = async (db: SQLite.SQLiteDatabase, exerciseId: number, workoutId: number): Promise<Set[]> => {
  try {
      const sets: Set[] = await db.getAllAsync(`SELECT * FROM Sets WHERE exerciseId = ${exerciseId} AND workoutId = ${workoutId}`);
      return sets;
  } catch (error) {
      console.error(error);
      throw Error(`Failed to get Sets Of ExerciseId: ${exerciseId} from database`);
  };
};

export const addEmptySet = async (db: SQLite.SQLiteDatabase, exerciseId: number, workoutId: number) => {

  try {
    // Find the biggest workout Id and add 1 for an auto increment.
    var biggestSetId:number = await db.getFirstAsync(`SELECT MAX(setId) FROM Sets WHERE exerciseId = ${exerciseId} AND workoutId = ${workoutId};`);
    biggestSetId++;
  } catch(error) {
    console.error("Error inside addEmptySet:", error);
    throw Error("Failed to find biggest SetId.");
  };

  var tempSet: Set = {
    setId: biggestSetId,
    exerciseId: exerciseId,
    workoutId: workoutId,
    setOrder: biggestSetId,
    reps: "",
    weight: "",
    bestSetReps: "",
    bestSetWeight: "",
  };

  const insertQuery = await db.prepareAsync(`
    INSERT INTO Sets (setId, exerciseId, workoutId, setOrder, reps, weight, bestSetReps, bestSetWeight)
    VALUES ($setId, $exerciseId, $workoutId, $setOrder, $reps, $weight, $bestSetReps, $bestSetWeight)
  `);

  try {
    return await insertQuery.executeAsync({ $setId: tempSet.setId, $exerciseId: tempSet.exerciseId, $workoutId: tempSet.workoutId, $setOrder: tempSet.setOrder, $reps: tempSet.reps, $weight: tempSet.weight, $bestSetReps: tempSet.bestSetReps, $bestSetWeight: tempSet.bestSetWeight });
  } catch (error) {
    console.error("Error inside addEmptySet:", error);
    throw Error("Failed to add Set.");
  };
};
