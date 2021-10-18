#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const { askQueryDetails, askIndexFilePath } = require('./lib/questions');
const { addBackticksToString } = require('./lib/helpers')
const { getCompositeIndexes } = require('./lib/generator')
const { indexFileExists, createNewIndexFile, writeIndexFile } = require('./lib/files');

clear();

console.log(
    chalk.yellow(
        figlet.textSync('Firestore-CIG', { horizontalLayout: 'full' })
    )
);

async function run() {
    var queryDetails = await askQueryDetails()
    var filePath = await askIndexFilePath()
    for (var detail in queryDetails) {
        if (typeof queryDetails[detail] === "string") {
            const detailList = queryDetails[detail].split(',')
            const whiteSpaceTrimmedList = detailList.map(element => element.trim())
            const nonEmptyValueList = whiteSpaceTrimmedList.filter(element => element.length > 0)
            const multipleWordParsedList = nonEmptyValueList.map(element => element.split(' ').length > 1 ? addBackticksToString(element) : element)
            queryDetails[detail] = multipleWordParsedList
        }
    }
    const compositeIndexes = getCompositeIndexes(queryDetails)
    if (!indexFileExists(filePath.path)) {
        createNewIndexFile(filePath.path)
    }
    writeIndexFile(filePath.path, compositeIndexes)
};

run();