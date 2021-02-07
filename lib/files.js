const path = require('path');
const fs = require('fs');

const { parseFilePath } = require('./helpers')

const FIRESTORE_INDEXES_FILE_NAME = 'firestore.indexes.json'

const defaultFirestoreIndexFile = {
  "indexes": [],
  "fieldOverrides": []
}

module.exports = {
  indexFileExists(filePath) {
    filePath = parseFilePath(filePath)
    const actualPath = `${filePath}${FIRESTORE_INDEXES_FILE_NAME}`
    return fs.existsSync(actualPath);
  },
  createNewIndexFile(filePath) {
    filePath = parseFilePath(filePath)
    const actualPath = `${filePath}${FIRESTORE_INDEXES_FILE_NAME}`
    fs.writeFile(actualPath, JSON.stringify(defaultFirestoreIndexFile, null, 2), function (err) {
      if (err) throw err;
      console.log(`Created ${FIRESTORE_INDEXES_FILE_NAME}!`);
    });
  }
}