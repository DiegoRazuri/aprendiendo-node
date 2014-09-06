var mongoose = require("mongoose");

//conexion a la base de datos con mongoose
mongoose.connect('mongodb://localhost/' + 'backendpro');

module.exports = mongoose;