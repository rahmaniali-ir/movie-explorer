const SQLKeyValueString = obj => {
  const pairs = Object.keys(obj).map(key =>
    typeof obj[key] === "number" ? `${obj[key]}` : `'${obj[key]}'`
  )

  return pairs.join(", ")
}

export { SQLKeyValueString }
