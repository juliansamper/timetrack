import { createServer } from './server'
const { LudyConsole } = require('./utils/LudyConsole');
const CONFIG = require('../index.json');

let _server;
createServer()
    .then(server => {
        _server = server.listen(process.env.PORT, () => {
            if (CONFIG.const.startClean) {
                process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
                console.clear();
            }
            LudyConsole.start(`${CONFIG.apps[0].name} Service Up on port ${process.env.PORT}.`);
        });
    })
    .catch(err => {
        console.error(`Error: ${err}`)
    });

/**
 * @author Julian Samper
 * @description Función para manejar el correcto cierre/apagado del servicio.
 * @param signal
 */
let handleExit = (signal) => {
    _server.close(function () {
        LudyConsole.end(`Service Down (${signal}).`);
    });
};

process.on('SIGINT', handleExit);   // Cierre por (Ctrl + C).
process.on('SIGQUIT', handleExit);  // Cierre por teclado.
process.on('SIGTERM', handleExit);  // Cierre desde el Sistema Operativo (e.g. Comando kill).