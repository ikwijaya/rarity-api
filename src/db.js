
 const { DB_URL, DB_SSL, DB_CLIENT, DB_LOG } = process.env
 const { Sequelize } = require('sequelize')
 const { relation } = require('./db_relation')
 const _DB_SSL = DB_SSL == '1' ? true : false
 
 const sq = new Sequelize(DB_URL, {
   dialect: DB_CLIENT,
   dialectOptions: {
     ssl: _DB_SSL ? { require: true, rejectUnauthorized: false } : null,
     connectTimeout: 60000
   },
   pool: {
     max: 5,
     min: 0,
     acquire: 30000,
     idle: 10000
   },
   logging: console.log
 });
 
 const df = [
   require('./models/attr.model'),
   require('./models/project.model'),
   require('./models/token.model'),
 ];
 
 for (let m of df) { m(sq); }
 relation(sq)
 
 module.exports = sq;