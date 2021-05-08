const inquirer = require('inquirer');
require('colors');

const menuQuestions = [
    {
        type: 'list',
        name: 'option',
        message: 'What`s you wanna do?',
        choices: [{
            value: '1',
            name: `${'1'.blue}. Search place`
        },
        {
            value: '2',
            name: `${'2'.blue}. History`
        },
        {
            value: '0',
            name: `${'0'.red}. EXIT`
        }

    ]
    }
]

const menu = async () => {
    console.clear();
    console.log('========================='.green);
    console.log('   Select a option');
    console.log('========================='.green);


    const { option } = await inquirer.prompt(menuQuestions)

    return option
}


const pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'enter'.red} to continue`
        }
    ];
    console.log('\n')
    await inquirer.prompt(question)

}

const readInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate( value ){
                if(value.length === 0) return 'Please, insert a value'
                return true
            }

        }
    ];
    const { description } = await inquirer.prompt(question)
    return description
}

const listPlaces = async ( places = [] ) => {
    const choices = places.map( (place, i) => {
        const index = `${ i + 1 }`.green;
        return{
            value: place.id,
            name: `${index} ${place.name}`
        }
    })
    choices.unshift({
        value: '0',
        name:'0.'.green + 'Cancel'
    })
    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Select place',
            choices
        }
    ];

    const { id } = await inquirer.prompt(questions)
    return id
}

const confirm = async ( message ) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message: message
        }
    ];
    const { ok } = await inquirer.prompt(question)
    return ok
}

const checkList = async (tasks) => {
    const choices = tasks.map((task, i) => {
        const index = `${i + 1}`.green;
        return {
            value: task.id,
            name: `${index} ${task.description}`,
            checked: ( task.completedAt ) ? true : false
        }
    })

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select',
            choices
    }
]
const { ids } = await inquirer.prompt(question)
return ids
}



module.exports = {
    menu,
    pause,
    readInput,
    listPlaces,
    confirm,
    checkList
}