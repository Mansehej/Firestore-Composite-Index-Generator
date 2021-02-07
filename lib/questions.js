const inquirer = require('inquirer');

module.exports = {
  askQueryDetails() {
    const questions = [
      {
        name: 'sortFields',
        type: 'input',
        message: 'Enter the fields you want to sort by (seperated by commas)'
      },
      {
        name: 'filterFields',
        type: 'input',
        message: 'Enter the fields you want to filter or search by (seperated by commas)',
      },
      {
        name: 'collections',
        type: 'input',
        message: 'Enter the collections you want to generate indexes for (seperated by commas)',
      }
    ];
    return inquirer.prompt(questions);
  },
  askIndexFilePath() {
    const questions = [
      {
        name: 'path',
        type: 'input',
        message: 'Where is your index.js file located? (We will create one for you if it doesn\'t exist)',
        default: '/'
      }
    ]
    return inquirer.prompt(questions);
  }
};