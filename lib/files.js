const fs = require('fs');
const chalk = require('chalk');

const { parseFilePath } = require('./helpers')

const FIRESTORE_INDEXES_FILE_NAME = 'firestore.indexes.json'
const FIRESTORE_INDEXES_LIMIT = 200

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
    fs.writeFileSync(actualPath, JSON.stringify(defaultFirestoreIndexFile, null, 2), function (err) {
      if (err) throw err;
      console.log(chalk.green(`\nCreated ${FIRESTORE_INDEXES_FILE_NAME}!`));
    });
  },
  writeIndexFile(filePath, newIndexes) {
    filePath = parseFilePath(filePath)
    const actualPath = `${filePath}${FIRESTORE_INDEXES_FILE_NAME}`
    fs.readFile(actualPath, (err, data) => {
      if (err) throw err;
      let fileData = JSON.parse(data);
      let indexes = fileData.indexes
      indexes = indexes.concat(newIndexes)
      const uniqueArray = indexes.filter((thing, index) => {
          const _thing = JSON.stringify(thing);
          return index === indexes.findIndex(obj => {
              return JSON.stringify(obj) === _thing;
          });
      });
  
      fileData.indexes = uniqueArray
    
      fs.writeFile(actualPath, JSON.stringify(fileData, null, 2), (err) => {
          if (err) throw err;
          console.log(`Total composite indexes: ${chalk.blue(uniqueArray.length)} out of ${chalk.red(FIRESTORE_INDEXES_LIMIT)}`)
          console.log('Added composite indexes succesfully!');
      });
  });
  }
}