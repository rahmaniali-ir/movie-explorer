export const SQLKeyValueString = obj => {
  const pairs = Object.keys(obj).map(key =>
    typeof obj[key] === "number" ? `${obj[key]}` : `'${obj[key]}'`
  )

  return pairs.join(", ")
}

export const shuffleArray = arr => arr.sort(() => Math.random() - 0.5)
