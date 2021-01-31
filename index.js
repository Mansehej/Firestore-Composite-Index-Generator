const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

clear();

console.log(
    chalk.white(
        figlet.textSync('Firestore-CIG', { horizontalLayout: 'full' })
    )
);