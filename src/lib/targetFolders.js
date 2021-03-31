import { getTable, deleteFromTable, insertIntoTable } from "./database"

const fs = window.require("fs")

export const getFolderName = folderPath => {
  return folderPath.split("\\").reverse()[0]
}

export const insertTargetFolders = folderPaths => {
  return new Promise((resolve, reject) => {
    insertIntoTable("targetFolders", folderPaths).then(() => resolve())
  })
}

const getDBTargetFolders = () => {
  return new Promise((resolve, reject) => {
    getTable("targetFolders").then(resolve)
  })
}

const removeNonExistingDBPaths = () => {
  return new Promise((resolve, reject) => {
    getDBTargetFolders().then(paths => {
      paths.forEach(async folder => {
        const folderExists = fs.existsSync(folder.path)

        if (!folderExists)
          await deleteFromTable("targetFolders", `path = '${folder.path}'`)
      })

      resolve()
    })
  })
}

export const getExistingTargetPaths = () => {
  return new Promise((resolve, reject) => {
    removeNonExistingDBPaths().then(() => {
      getDBTargetFolders().then(rows => {
        if (rows.length > 0) resolve(rows)
        else resolve([])
      })
    })
  })
}
