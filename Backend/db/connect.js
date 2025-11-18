const mongoose = require ('mongoose');


const ConnectDb = (url) => {
mongoose.connect(url).then(()=>console.log("conectado"))
}

module.exports = ConnectDb;