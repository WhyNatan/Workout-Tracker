import { openDatabase, enablePromise, SQLiteDatabase } from 'react-native-sqlite-storage';

var SQLite = require('react-native-sqlite-storage');

function errorCB(err) {
    console.log("SQL Error: " + err);
    throw Error("Could not connect to database");
};

function successCB() {
    console.log("SQL executed fine");
};

function openCB() {
    console.log("Database OPENED");
};

// Enable promise for SQLite
// SQLite.enablePromise(true);
enablePromise(true);

export const connectToDatabase = async () => {
    // return SQLite.openDatabase(
    return openDatabase(
        {name: "workout-tracker.db", location: "default" },
        console.log("Connected to the database succesfully."),
        (error) => {
        errorCB(error);
        }
    );
};

export const dbSingleton = connectToDatabase();

export const createTables = async (db: SQLiteDatabase) => {
    const workoutQuery = `
        CREATE TABLE IF NOT EXISTS Workouts (
            workoutId INTEGER DEFAULT 1,
            bodyPart TEXT,
            PRIMARY KEY(workoutId)
        )
    `;

    const exerciseQuery = `
        CREATE TABLE IF NOT EXISTS Exercises (
        exerciseId INTEGER PRIMARY KEY AUTOINCREMENT,
        exercise TEXT,
        notes TEXT
        )
    `;

    const setQuery = `
        CREATE TABLE IF NOT EXISTS Sets (
        setId INTEGER PRIMARY KEY AUTOINCREMENT,
        order INTEGER,
        reps TEXT,
        weight TEXT,
        bestSetReps TEXT,
        bestSetWeight TEXT
        )
    `;

    try {
        await db.executeSql(workoutQuery);
        await db.executeSql(exerciseQuery);
        await db.executeSql(setQuery);
    } catch (error) {
        console.error("Error inside createTables:", error);
        throw Error(`Failed to create tables`);
    };
};

export const getTableNames = async (db: SQLiteDatabase): Promise<string[]> => {
    try {
      const tableNames: string[] = []
      const results = await db.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
      )
      results?.forEach((result) => {
        for (let index = 0; index < result.rows.length; index++) {
          tableNames.push(result.rows.item(index).name)
        }
      })
      return tableNames
    } catch (error) {
      console.error(error)
      throw Error("Failed to get table names from database")
    }
  }
  
  // export const removeTable = async (db: SQLiteDatabase, tableName: Table) => {
  export const removeTable = async (db: SQLiteDatabase, tableName: String) => {
    const query = `DROP TABLE IF EXISTS ${tableName}`
    try {
      await db.executeSql(query)
    } catch (error) {
      console.error(error)
      throw Error(`Failed to drop table ${tableName}`)
    }
  }