function findAllKeys(list) {
  console.debug('Find all keys in: ', list)

  let keys = new Set()

  for (let object of list) {
    for (let key of Object.keys(object)) {
      keys.add(key)
    }
  }

  return keys
}

export { findAllKeys }
