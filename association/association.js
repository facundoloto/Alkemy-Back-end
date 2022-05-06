const User=require('../models/user');
const Categories = require('../models/categories');
const Type = require('../models/type');
const Record = require('./models/records'); //importing the record model

// Uno a uno
Type.hasOne(Record, { as: "record", foreignKey: "typeId" });
// Añade una clave userId a la tabla addresses
Record.belongsTo(Type, { as: "type", foreignKey: "typeId" });
// Usuario tiene una direccion
// añadir una clave foranea userId a la tabla addresses
Categories.hasOne(Record, { as: "record", foreignKey: "categoriesId" });
// Añade una clave userId a la tabla addresses
Record.belongsTo(Categories, { as: "categories", foreignKey: "CategoriesId" });
// Uno a muchos, 1 a N
// Usuario va a tener muchos posts o publicaciones
// Se añade una clave userId a la tabla posts
User.hasMany(Record, { as: "record", foreignKey: "userId" });
// Se añade una clave userId a la tabla posts
Record.belongsTo(User, { as: "user" });