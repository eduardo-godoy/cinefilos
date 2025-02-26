import * as ExpoSQLite from "expo-sqlite";
import { Platform } from "react-native";

if(Platform.OS !== "web") db = ExpoSQLite.openDatabase("sessions.db");


export const initSQLiteDB = () => {
    const promise = new Promise((resolve, reject)=>{
      db.transaction((tx)=> {
            tx.executeSql(
              "CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL);",
              [],
              (_, result) => resolve(result),
              (_, error) => reject(error)
            );
        });
    });
    return promise
};

export const insertSession = ({ email, localId, token }) => {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO sessions (localId, email, token) VALUES (?,?,?)",
          [localId, email, token],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
    return promise
};

export const getSession = () => {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * from sessions",
          [], 
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
    return promise
};

export const truncateSessionTable = () => {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE from sessions",
          [],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
    return promise
};
