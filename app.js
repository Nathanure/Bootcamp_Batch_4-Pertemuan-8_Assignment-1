// Imported modules
const yargs = require('yargs');
const cli = require('./local_modules/readlineCLI')

// Command for Yargs
yargs.command({
    command: 'add',
    describe: 'add new contact',
    builder: {
        name: {
            describe: 'Contact Name',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Contact Email',
            demandOption: true,
            type: 'string',
        },
        mobile: {
            describe: 'Contact Mobile Phone number',
            demandOption: false,
            type: 'string',
        }
    },
    handler(argv) {
        const contact = {
            name: argv.name,
            email: argv.email,
            mobile: argv.mobile
        };
        // Make a folder named "data" and a JSON file named "contacts.json"
        cli.fsJSON('./data', './data/contacts.json');
        // Input the data inside JSON
        cli.saveJSON(argv.name, argv.email, argv.mobile);
    }
})

yargs.command({
    command: 'list',
    describe: 'list contact',
    handler() {
        // List all data in JSON
        cli.listJSON();
    }
})

yargs.command({
    command: 'search',
    describe: 'search specific contact',
    builder: {
        name: {
            describe: 'Contact Name',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        // Search the data in JSON based of a names
        cli.searchJSON(argv.name);
    }
})

yargs.command({
    command: 'delete',
    describe: 'delete specific contact',
    builder: {
        name: {
            describe: 'Contact Name',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        // Search the data in JSON based of a names
        cli.deleteJSON(argv.name);
    }
})

yargs.parse();