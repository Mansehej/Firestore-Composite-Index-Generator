const path = require('path');
const fs = require('fs');

const FIRESTORE_INDEXES_FILE_NAME = 'firestore.indexes.json'

module.exports = {
  indexFileExists(filePath) {
    if (filePath == '') {
      filePath = ''
    }
    else if (filePath.charAt(0) == '/') {
      filePath = filePath.substring(1)
    }
    else {
      filePath = filePath + '/'
    }
    const actualPath = `${filePath}${FIRESTORE_INDEXES_FILE_NAME}`

    return fs.existsSync(actualPath);
  }
}