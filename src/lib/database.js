import { SQLKeyValueString } from "./utilities"

// const sqlite3 = require("sqlite3").verbose()
const sqlite3 = window.require("sqlite3").verbose()

let db

const dbDo = func => {
  db = new sqlite3.Database("database.sqlite3")
  func()
  db.close(() => (db = null))
}

const initialize = () => {
  dbDo(() => {
    db.run(`CREATE TABLE IF NOT EXISTS "settings" (
      "name"	TEXT UNIQUE,
      "value"	TEXT,
      PRIMARY KEY("name")
    );`)
  })
}

const getTable = table => {
  return new Promise((resolve, reject) => {
    dbDo(() => {
      db.all(`SELECT * FROM '${table}'`, (err, rows) => {
        if (err) reject(err)

        resolve(rows)
      })
    })
  })
}

const getTableWhere = (table, where) => {
  return new Promise((resolve, reject) => {
    dbDo(() => {
      db.all(`SELECT * FROM '${table}' Where ${where}`, (err, rows) => {
        if (err) reject(err)

        resolve(rows)
      })
    })
  })
}

const insertIntoTable = (table, values) => {
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

initialize()
export { getTable, getTableWhere, insertIntoTable }
export default db

// db.serialize(function () {
//   // let stmt = db.prepare("INSERT INTO lorem VALUES (?)")
//   // for (let i = 0; i < 10; i++) {
//   //   stmt.run("Ipsum " + i)
//   // }
//   // stmt.finalize()

//   db.each("SELECT * FROM settings", function (err, row) {
//     console.log(row)
//     // console.log(row.id + ": " + row.info)
//   })
// })
