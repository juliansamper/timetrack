const chalk = require('chalk');

import moment from "moment";

class LudyConsole {
    private static appname:string = "Time Tracker";

    static info(message: string, type: string = "INFO") {
        let dateTime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
        console.log(`[${ dateTime }] [${ type }] ${ this.appname }: ${ message }`);
    }

    static start(message: string) {
        this.info(chalk.bold.green(message), "START");
    }

    static end(message: string) {
        this.info(chalk.bold.green(message), "END");
    }

    static error(message: string) {
        let dateTime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
        console.error(`[${ dateTime }] [ERROR] ${ this.appname }: ${ chalk.red(message) }`);
        //this.info(message, "ERROR");
    }
}

module.exports = {
    LudyConsole
};