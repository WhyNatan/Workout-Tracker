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

type MaxSetId = {
  maxSetId: number;
}

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
    var getBiggestSetId:MaxSetId = await db.getFirstAsync(`SELECT MAX(setId) AS maxSetId FROM Sets WHERE exerciseId = ${exerciseId} AND workoutId = ${workoutId};`);
    var biggestSetId:number = getBiggestSetId.maxSetId;
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

export const updateSetOfExercise = async (db: SQLite.SQLiteDatabase, set: Set) => {
  var tempSet= {
    setId: set.setId,
    exerciseId: set.exerciseId,
    workoutId: set.workoutId,
    setOrder: set.setId,
    reps: set.reps,
    weight: set.weight,
    bestSetReps: "0",
    bestSetWeight: "0",
};
  
  try {
    const tempOrigSet: Set = await db.getFirstAsync(`SELECT * FROM Sets WHERE setId = ${tempSet.setId} AND exerciseId = ${tempSet.exerciseId} AND workoutId = ${tempSet.workoutId}`);

    // Check which weights are higher, the new ones or the old ones.
    // If the weight is bigger, substitute the weight and reps variable.
    if (tempSet.weight > tempOrigSet.bestSetWeight) {
      tempSet.bestSetWeight = tempSet.weight;
      tempSet.bestSetReps = tempSet.reps;
    } else {
      tempSet.bestSetWeight = tempOrigSet.bestSetWeight;

      // If it is the same weight, check to see if reps increased.
      if (tempSet.weight == tempOrigSet.bestSetWeight) {
        // If it did increase, update the value in the bestSet.
        if (tempSet.reps > tempOrigSet.bestSetReps) {
          tempSet.bestSetReps = tempSet.reps;
        } else {
          tempSet.bestSetReps = tempOrigSet.bestSetReps;
        };
      };
    };

    const updateQuery = `
      UPDATE Sets 
      SET setOrder = '${tempSet.setOrder}', reps = '${tempSet.reps}', weight = '${tempSet.weight}', bestSetReps = '${tempSet.bestSetReps}', bestSetWeight = '${tempSet.bestSetWeight}'
      WHERE setId = ${tempSet.setId} AND exerciseId = ${tempSet.exerciseId} AND workoutId = ${tempSet.workoutId};
    `;

    await db.runAsync(updateQuery);
  } catch (error) {
    console.error("Error inside updateExerciseOfWorkout:", error);
    throw Error("Failed to update Exercise.");
  };
};

export const deleteSetOfExercise = async (db: SQLite.SQLiteDatabase, setId:number, exerciseId: number, workoutId: number) => {
  const deleteQuery = await db.prepareAsync(`
    DELETE FROM Sets
    WHERE setId = $setId
    AND exerciseId = $exerciseId
    AND workoutId = $workoutId
  `);

  try {
    return await deleteQuery.executeAsync({ $setId: setId, $exerciseId: exerciseId, $workoutId: workoutId });
  } catch (error) {
    console.error("Error inside deleteSetOfExercise:", error);
    throw Error("Failed to remove Set.");
  };
};

export const deleteAllSetsOfExercise = async (db: SQLite.SQLiteDatabase, exerciseId: number, workoutId: number) => {
  const deleteQuery = await db.prepareAsync(`
    DELETE FROM Sets
    WHERE exerciseId = $exerciseId
    AND workoutId = $workoutId
  `);

  try {
    return await deleteQuery.executeAsync({ $exerciseId: exerciseId, $workoutId: workoutId });
  } catch (error) {
    console.error("Error inside deleteAllSetsOfExercise:", error);
    throw Error("Failed to remove Sets.");
  };
};

export const deleteAllSetsOfWorkout = async (db: SQLite.SQLiteDatabase, workoutId: number) => {
  const deleteQuery = await db.prepareAsync(`
    DELETE FROM Sets
    WHERE workoutId = $workoutId
  `);

  try {
    return await deleteQuery.executeAsync({ $workoutId: workoutId });
  } catch (error) {
    console.error("Error inside deleteAllSetsOfWorkout:", error);
    throw Error("Failed to remove Sets.");
  };
};