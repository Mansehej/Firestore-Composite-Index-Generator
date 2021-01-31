const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const { askQueryDetails } = require('./lib/questions');
const { addBackticksToString } = require('./lib/helpers')

clear();

console.log(
    chalk.white(
        figlet.textSync('Firestore-CIG', { horizontalLayout: 'full' })
    )
);

async function run() {
    const queryDetails = await askQueryDetails()
    for (var detail in queryDetails) {
        const detailList = queryDetails[detail].split(',')
        const whiteSpaceTrimmedList = detailList.map(element => element.trim())
        const nonEmptyValueList = whiteSpaceTrimmedList.filter(element => element.length > 0)
        const multipleWordParsedList = nonEmptyValueList.map(element => element.split(' ').length > 1 ? addBackticksToString(element) : element)
        queryDetails[detail] = multipleWordParsedList
    }
};

run();