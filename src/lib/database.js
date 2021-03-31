import { SQLKeyValueString } from "./utilities"

// const sqlite3 = require("sqlite3").verbose()
const sqlite3 = window.require("sqlite3").verbose()

let db = null

const dbDo = func => {
  db = new sqlite3.Database("database.sqlite3")
  func()
  db.close(() => (db = null))
}

const initialize = () => {
  dbDo(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS "settings" (
      "name"	TEXT UNIQUE,
      "value"	TEXT,
      PRIMARY KEY("name")
    );

    CREATE TABLE IF NOT EXISTS "targetFolders" (
      "path"	TEXT NOT NULL UNIQUE,
      PRIMARY KEY("path")
    );
    `)
  })
}

export const getTable = table => {
  return new Promise((resolve, reject) => {
    dbDo(() => {
      db.all(`SELECT * FROM '${table}'`, (err, rows) => {
        if (err) reject(err)

        resolve(rows)
      })
    })
  })
}

export const getTableWhere = (table, where) => {
  return new Promise((resolve, reject) => {
    dbDo(() => {
      db.all(`SELECT * FROM '${table}' Where ${where}`, (err, rows) => {
        if (err) reject(err)

        resolve(rows)
      })
    })
  })
}

export const insertIntoTable = (table, values) => {
  return new Promise((resolve, reject) => {
    const SQLValues = values
      .map(value => `(${SQLKeyValueString(value)})`)
      .join(", ")
    console.log(SQLValues)

    dbDo(() => {
      db.run(`INSERT INTO '${table}' VALUES ${SQLValues}`, (err, rows) => {
        if (err) reject(err)

        resolve(rows)
      })
    })
  })
}

export const deleteFromTable = (table, where) => {
  return new Promise((resolve, reject) => {
    dbDo(() => {
      console.log(`DELETE FROM '${table}' Where ${where}`)
      db.run(`DELETE FROM '${table}' Where ${where}`, (err, rows) => {
        if (err) reject(err)

        resolve(rows)
      })
    })
  })
}

initialize()
export default db
