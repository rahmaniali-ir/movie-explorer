const getFolderName = folderPath => {
  return folderPath.split("\\").reverse()[0]
}

export const insertTargetFolders = folderPaths => {
  return new Promise((resolve, reject) => {
    const parsedPaths = folderPaths.map(folderPath => {
      return {
        name: getFolderName(folderPath),
        path: folderPath,
      }
    })

    resolve(parsedPaths)
  })
}
