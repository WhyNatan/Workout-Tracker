import * as SQLite from 'expo-sqlite';

export async function connectToDatabase() {
    const db = await SQLite.openDatabaseAsync("Workout-Tracker", {
        useNewConnection: true
        });
    return db;
};

export async function createTables(db: SQLite.SQLiteDatabase) {

    const workoutQuery = `
        CREATE TABLE IF NOT EXISTS Workouts (
            workoutId INTEGER DEFAULT 1,
            bodyPart TEXT,
            PRIMARY KEY(workoutId)
        )
    `;

    const exerciseQuery = `
        CREATE TABLE IF NOT EXISTS Exercises (
        exerciseId INTEGER,
        workoutId INTEGER,
        exercise TEXT,
        notes TEXT
        )
    `;

    const setQuery = `
        CREATE TABLE IF NOT EXISTS Sets (
        setId INTEGER,
        exerciseId INTEGER,
        workoutId INTEGER,
        setOrder INTEGER,
        reps TEXT,
        weight TEXT,
        bestSetReps TEXT,
        bestSetWeight TEXT
        )
    `;

    // `execAsync()` is useful for bulk queries when you want to execute altogether.
    // Please note that `execAsync()` does not escape parameters and may lead to SQL injection.
    try {
        await db.execAsync(workoutQuery);
        await db.execAsync(exerciseQuery);
        await db.execAsync(setQuery);
        // await db.execAsync('DROP TABLE Workouts; DROP TABLE Exercises; DROP TABLE Sets;')
    } catch (error) {
        console.error("Error inside createTables:", error);
        throw Error(`Failed to create tables`);
    };

};