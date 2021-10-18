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
        name: 'isCollectionGroup',
        type: 'confirm',
        default: false,
        message: 'Is this a collectionGroup query? (N for collection query)',
      },
      {
        name: 'collections',
        type: 'input',
        message: 'Enter the collection groups/collections you want to generate indexes for (seperated by commas)',
        validate(collectionName) {
          if(collectionName.length == 0) {
            return 'Atleast one collection must be entered.'
          }
          return true
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  askIndexFilePath() {
    const questions = [
      {
        name: 'path',
        type: 'input',
        message: 'Where is your firestore.indexes.json file located? (We will create one for you if it doesn\'t exist)',
        default: '/'
      }
    ]
    return inquirer.prompt(questions);
  }
};