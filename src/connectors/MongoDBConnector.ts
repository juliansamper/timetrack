const mongoose = require('mongoose');
const { LudyConsole } = require("../utils/LudyConsole");

// const uri: string = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@timetrackcluster0.ktn9n.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
const uri: string = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@timetrackcluster1.ktn9n.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

let db: any;

db = mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => {
        LudyConsole.info('Base de datos conectada');
    })
    .catch(e => {
        LudyConsole.error('Error al conectar la Base de datos' + e);
        LudyConsole.error(e);
    });

export default db;