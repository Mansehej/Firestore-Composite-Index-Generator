const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const { askQueryDetails, askIndexFilePath } = require('./lib/questions');
const { addBackticksToString } = require('./lib/helpers')
const { getCompositeIndexes } = require('./lib/generator')
const { indexFileExists } = require('./lib/files');

clear();

console.log(
    chalk.white(
        figlet.textSync('Firestore-CIG', { horizontalLayout: 'full' })
    )
);

async function run() {
    var queryDetails = await askQueryDetails()
    var filePath = await askIndexFilePath()
    for (var detail in queryDetails) {
        const detailList = queryDetails[detail].split(',')
        const whiteSpaceTrimmedList = detailList.map(element => element.trim())
        const nonEmptyValueList = whiteSpaceTrimmedList.filter(element => element.length > 0)
        const multipleWordParsedList = nonEmptyValueList.map(element => element.split(' ').length > 1 ? addBackticksToString(element) : element)
        queryDetails[detail] = multipleWordParsedList
    }
    const compositeIndexes = getCompositeIndexes(queryDetails)
    if (indexFileExists(filePath.path)) {
        // TODO add indexes
    }
    else {
        // TODO create file and add indexes
    }

};

run();